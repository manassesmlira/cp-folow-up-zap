const API_URL = (process.env.LEAD_STORE_API_URL || '').replace(/\/+$/, '');
const API_TOKEN = process.env.LEAD_STORE_API_TOKEN || '';
const API_ENABLED = Boolean(API_URL && API_TOKEN);

async function requestLeadStore(path, options = {}) {
    if (!API_ENABLED) {
        return null;
    }

    try {
        const response = await fetch(`${API_URL}${path}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'X-Agente-Zap-Token': API_TOKEN,
                ...(options.headers || {})
            }
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error('LeadStore: erro na API Agente Zap:', response.status, data);
            return null;
        }

        return data;
    } catch (error) {
        console.error('LeadStore: falha ao comunicar com Agente Zap:', error.message);
        return null;
    }
}

async function buscarLeadAgenteZap(numero, limit = 5) {
    const params = new URLSearchParams({
        numero: String(numero || ''),
        limit: String(limit)
    });

    return requestLeadStore(`/lead?${params.toString()}`, {
        method: 'GET'
    });
}

async function salvarMensagemFollowUp({ numero, nome, conteudo, dia, indiceMensagem, leadFollowUpId }) {
    return requestLeadStore('/message', {
        method: 'POST',
        body: JSON.stringify({
            numero,
            nome,
            direcao: 'sistema',
            tipo: 'follow_up',
            external_message_id: `followup:${leadFollowUpId}:${dia}`,
            conteudo,
            metadata: {
                origem: 'cp-folow-up-zap',
                dia,
                indiceMensagem,
                leadFollowUpId
            }
        })
    });
}

function devePausarFollowUp(leadStoreResponse) {
    const lead = leadStoreResponse?.lead;

    if (!lead) {
        return false;
    }

    const etapa = lead.etapa || 'novo';
    const botAtivo = Number(lead.bot_ativo) === 1;

    return !botAtivo || ['humano', 'quer_matricula'].includes(etapa);
}

module.exports = {
    buscarLeadAgenteZap,
    salvarMensagemFollowUp,
    devePausarFollowUp
};
