const { isHorarioComercial, calcularDiasPassados } = require('../lib/tempo');
const { enviarWhatsApp } = require('../lib/crm');
const { buscarLeadsPendentesDeHoje, registrarDisparo } = require('../lib/db');

// Aqui ficarão as suas 45 mensagens (no formato de texto puro ou usando as que geramos em JSON adaptadas).
// O índice 0 equivale ao Dia 0 (entrada), o índice 1 ao Dia 2, o índice 2 ao Dia 4, etc.
const mensagens = [
    "Olá! Que alegria ter você aqui. Hoje é o dia 1...", // Índice 0 (Dia 0)
    "Mensagem do dia 3...",                            // Índice 1 (Dia 2)
    "Mensagem do dia 5...",                            // Índice 2 (Dia 4)
    "Mensagem do dia 7...",                            // Índice 3 (Dia 6)
    // ... continue colando suas 45 mensagens aqui, separadas por vírgula.
];

module.exports = async function (req, res) {
    try {
        // 1. TRAVA DE SEGURANÇA: Só funciona entre 10h e 17h (Horário de São Paulo)
        if (!isHorarioComercial()) {
            return res.status(200).json({ status: 'Pausado', motivo: 'Fora do horário comercial' });
        }

        // 2. Busca o lote de 10 leads pendentes
        const leads = await buscarLeadsPendentesDeHoje();

        // Se a fila estiver vazia, encerra a função e avisa que está tudo em dia
        if (leads.length === 0) {
            return res.status(200).json({ status: 'Sucesso', mensagem: 'Nenhum lead pendente neste momento' });
        }

        let disparosComSucesso = 0;

        // 3. Processa cada lead do lote
        for (const lead of leads) {
            const diasPassados = calcularDiasPassados(lead.data_entrada);

            // Regra principal: Apenas dias pares (0, 2, 4...) e dentro do limite de 90 dias (onde o dia 88 é o último par)
            if (diasPassados % 2 === 0 && diasPassados <= 88) {
                
                const indiceMensagem = diasPassados / 2;
                const mensagemDoDia = mensagens[indiceMensagem];

                if (mensagemDoDia) {
                    // Tenta enviar a mensagem via CRM
                    const sucesso = await enviarWhatsApp(lead.telefone, mensagemDoDia);
                    
                    if (sucesso) {
                        // Se enviou com sucesso, carimba a data de hoje no banco
                        await registrarDisparo(lead.id);
                        disparosComSucesso++;
                    }
                } else {
                    // Proteção: se você esquecer de cadastrar a mensagem 45 no array, o sistema não trava
                    console.log(`⚠️ Mensagem não configurada para o índice ${indiceMensagem}`);
                    await registrarDisparo(lead.id); 
                }

            } else {
                // O PULO DO GATO: Se hoje for "dia ímpar" para este lead (ou se ele já passou de 90 dias),
                // nós não enviamos mensagem, mas PRECISAMOS carimbar a data de hoje no banco.
                // Se não fizermos isso, o sistema vai puxar ele de novo daqui a 10 minutos infinitamente e travar a fila.
                await registrarDisparo(lead.id);
            }
        }

        // Retorna um relatório para o Vercel dizendo o que aconteceu nesta rodada
        return res.status(200).json({ 
            status: 'Concluído', 
            leads_processados: leads.length,
            disparos_realizados: disparosComSucesso
        });

    } catch (erro) {
        console.error('❌ Erro crítico no motor de disparos:', erro);
        return res.status(500).json({ erro: 'Falha interna no servidor' });
    }
};