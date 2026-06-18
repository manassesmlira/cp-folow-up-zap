const { enviarWhatsApp } = require('../lib/crm');
const { cadastrarLead, registrarDisparo } = require('../lib/db');
const { salvarMensagemFollowUp } = require('../lib/leadStore');
const { MENSAGEM_GUIA } = require('../lib/mensagens');

function tokenValido(req) {
    const expected = process.env.IMMEDIATE_DELIVERY_TOKEN || '';
    const headerToken = req.headers['x-cp-delivery-token'] || req.headers['x-immediate-delivery-token'];
    const bodyToken = req.body?.token;

    return Boolean(expected && (headerToken === expected || bodyToken === expected));
}

function normalizarTelefone(telefone) {
    const digits = String(telefone || '').replace(/[^0-9]/g, '');

    if (digits.length < 10) {
        return null;
    }

    return digits.startsWith('55') ? digits : `55${digits}`;
}

function jaRecebeuGuia(lead) {
    return Boolean(lead?.data_ultimo_disparo);
}

module.exports = async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Metodo nao permitido' });
    }

    if (!tokenValido(req)) {
        return res.status(401).json({ success: false, error: 'Token invalido' });
    }

    const body = req.body || {};
    const nome = body.nome || body.name || body.fname || body.firstname || body.first_name || null;
    const telefone = normalizarTelefone(body.telefone || body.whatsapp || body.zap || body.phone);

    if (!telefone) {
        return res.status(400).json({ success: false, error: 'Telefone valido e obrigatorio' });
    }

    let lead = null;
    let duplicate = false;

    try {
        const cadastro = await cadastrarLead({ nome, telefone });
        lead = cadastro?.lead || null;
        duplicate = Boolean(cadastro?.duplicate);
    } catch (error) {
        console.error('Erro ao cadastrar lead antes do envio do guia:', error.message);
        return res.status(502).json({ success: false, error: 'Falha ao cadastrar lead no WordPress' });
    }

    if (!lead?.id) {
        return res.status(502).json({ success: false, error: 'WordPress nao retornou o ID do lead' });
    }

    if (duplicate && jaRecebeuGuia(lead) && body.force !== true) {
        return res.status(200).json({
            success: true,
            skipped: true,
            reason: 'Lead ja existia e ja tinha disparo registrado.',
            lead_id: lead.id,
            telefone
        });
    }

    const enviado = await enviarWhatsApp(telefone, MENSAGEM_GUIA);

    if (!enviado) {
        return res.status(502).json({ success: false, error: 'Falha ao enviar WhatsApp', lead_id: lead.id });
    }

    await salvarMensagemFollowUp({
        numero: telefone,
        nome: nome || lead.nome,
        conteudo: MENSAGEM_GUIA,
        dia: 0,
        indiceMensagem: 0,
        leadFollowUpId: lead.id
    });

    await registrarDisparo(lead.id);

    return res.status(200).json({
        success: true,
        message: 'Lead cadastrado e guia enviado com sucesso',
        duplicate,
        lead_id: lead.id,
        telefone
    });
};
