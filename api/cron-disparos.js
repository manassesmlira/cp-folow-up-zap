const { isHorarioComercial, calcularDiasPassados } = require('../lib/tempo');
const { enviarWhatsApp } = require('../lib/crm');
const { buscarLeadsPendentesDeHoje, registrarDisparo, pausarLead } = require('../lib/db');
const { buscarLeadAgenteZap, salvarMensagemFollowUp, devePausarFollowUp } = require('../lib/leadStore');
const { MENSAGENS_FOLLOW_UP } = require('../lib/mensagens');




module.exports = async function (req, res) {
    try {
        const testToken = process.env.CRON_TEST_TOKEN || '';
        const query = req.query || {};
        const forceTest = query.force === '1' && testToken && query.token === testToken;

        // 1. TRAVA DE SEGURANCA: so funciona entre 10h e 17h (Horario de Sao Paulo), exceto teste manual com token.
        if (!forceTest && !isHorarioComercial()) {
            return res.status(200).json({ status: 'Pausado', motivo: 'Fora do horario comercial' });
        }

        // 2. Busca o lote de 10 leads pendentes
        const leads = await buscarLeadsPendentesDeHoje();
        console.log('Leads pendentes encontrados:', leads.length);

        // Se a fila estiver vazia, encerra a funÃ§Ã£o e avisa que estÃ¡ tudo em dia
        if (leads.length === 0) {
            return res.status(200).json({ status: 'Sucesso', mensagem: 'Nenhum lead pendente neste momento' });
        }

        let disparosComSucesso = 0;
        let leadsPausados = 0;
        let leadsDiaZeroIgnorados = 0;

        // 3. Processa cada lead do lote
        for (const lead of leads) {
            const diasPassados = calcularDiasPassados(lead.data_entrada);
            const statusAgenteZap = await buscarLeadAgenteZap(lead.telefone, 3);

            if (devePausarFollowUp(statusAgenteZap)) {
                console.log(`⏸️ Follow-up pausado para ${lead.telefone}: lead em etapa ${statusAgenteZap?.lead?.etapa || 'desconhecida'} no Agente Zap.`);
                await pausarLead(lead.id, 'pausado_por_status_agente_zap');
                leadsPausados++;
                continue;
            }

            // Regra principal: Apenas dias pares (0, 2, 4...) e dentro do limite de 90 dias (onde o dia 88 Ã© o Ãºltimo par)
            if (diasPassados === 0) {
                console.log('Lead ' + lead.telefone + ' esta no dia 0. A entrega do guia deve acontecer pelo plugin/CRM.');
                await registrarDisparo(lead.id);
                leadsDiaZeroIgnorados++;
            } else if (diasPassados % 2 === 0 && diasPassados <= 88) {
                
                const indiceMensagem = diasPassados / 2;
                const mensagemDoDia = MENSAGENS_FOLLOW_UP[indiceMensagem];

                if (mensagemDoDia) {
                    // Tenta enviar a mensagem via CRM
                    const sucesso = await enviarWhatsApp(lead.telefone, mensagemDoDia);
                    if (sucesso) {
                        await salvarMensagemFollowUp({
                            numero: lead.telefone,
                            nome: lead.nome,
                            conteudo: mensagemDoDia,
                            dia: diasPassados,
                            indiceMensagem,
                            leadFollowUpId: lead.id
                        });

                        // Se enviou com sucesso, carimba a data de hoje no banco
                        await registrarDisparo(lead.id);
                        disparosComSucesso++;
                    }
                } else {
                    // ProteÃ§Ã£o: se vocÃª esquecer de cadastrar a mensagem 45 no array, o sistema nÃ£o trava
                    console.log(`âš ï¸ Mensagem nÃ£o configurada para o Ã­ndice ${indiceMensagem}`);
                    await registrarDisparo(lead.id); 
                }

            } else {
                // O PULO DO GATO: Se hoje for "dia Ã­mpar" para este lead (ou se ele jÃ¡ passou de 90 dias),
                // nÃ³s nÃ£o enviamos mensagem, mas PRECISAMOS carimbar a data de hoje no banco.
                // Se nÃ£o fizermos isso, o sistema vai puxar ele de novo daqui a 10 minutos infinitamente e travar a fila.
                await registrarDisparo(lead.id);
            }
        }

        // Retorna um relatÃ³rio para o Vercel dizendo o que aconteceu nesta rodada
        return res.status(200).json({ 
            status: 'Concluido',
            teste_forcado: forceTest, 
            leads_processados: leads.length,
            disparos_realizados: disparosComSucesso,
            leads_pausados: leadsPausados,
            leads_dia_zero_ignorados: leadsDiaZeroIgnorados
        });

    } catch (erro) {
        console.error('âŒ Erro crÃ­tico no motor de disparos:', erro);
        return res.status(500).json({ erro: 'Falha interna no servidor' });
    }
};






