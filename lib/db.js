// lib/db.js

const REST_API_URL = (process.env.FOLLOW_UP_API_URL || '').replace(/\/+$/, '');
const REST_API_TOKEN = process.env.FOLLOW_UP_API_TOKEN || process.env.WP_API_TOKEN || '';

function usarPluginRest() {
    return Boolean(REST_API_URL && REST_API_TOKEN);
}

function ocultarToken(url, token) {
    return token ? url.replace(token, 'TOKEN_OCULTO') : url;
}

async function chamarPluginRest(path, options = {}) {
    const url = `${REST_API_URL}${path}`;

    const resposta = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'X-CP-Follow-Up-Token': REST_API_TOKEN,
            ...(options.headers || {})
        }
    });

    const texto = await resposta.text();
    const dados = texto ? JSON.parse(texto) : null;

    if (!resposta.ok) {
        throw new Error(`Falha na API REST do follow-up. Status: ${resposta.status}. Resposta: ${texto}`);
    }

    return dados;
}

async function buscarLeadsPendentesDeHoje() {
    try {
        if (usarPluginRest()) {
            const url = `${REST_API_URL}/leads/pending?limit=10`;
            console.log('Buscando leads na API REST:', ocultarToken(url, REST_API_TOKEN));
            return await chamarPluginRest('/leads/pending?limit=10');
        }

        const token = process.env.WP_API_TOKEN;
        const url = `${process.env.WP_API_URL}?acao=buscar&token=${encodeURIComponent(token)}`;

        console.log('Buscando leads na API PHP:', ocultarToken(url, token));
        console.log('Token WP existe?', token ? 'SIM' : 'NAO');

        const resposta = await fetch(url);
        const texto = await resposta.text();

        console.log('Status da API WordPress:', resposta.status);
        console.log('Resposta bruta da API:', texto);

        if (!resposta.ok) {
            throw new Error(`Falha na API do site. Status: ${resposta.status}. Resposta: ${texto}`);
        }

        return JSON.parse(texto);
    } catch (erro) {
        console.error('Erro ao buscar leads na API:', erro.message);
        return [];
    }
}

async function registrarDisparo(idLead) {
    try {
        if (usarPluginRest()) {
            console.log('Atualizando lead via API REST:', idLead);
            const dados = await chamarPluginRest(`/leads/${idLead}/dispatch`, {
                method: 'POST',
                body: JSON.stringify({ id: idLead })
            });
            console.log('Resposta atualizacao REST:', dados);
            return;
        }

        const token = process.env.WP_API_TOKEN;
        const url = `${process.env.WP_API_URL}?acao=atualizar&token=${encodeURIComponent(token)}`;

        console.log('Atualizando lead via API PHP:', idLead);

        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idLead })
        });

        const texto = await resposta.text();

        console.log('Status atualizacao:', resposta.status);
        console.log('Resposta atualizacao:', texto);
    } catch (erro) {
        console.error(`Erro ao atualizar o lead ${idLead} no banco:`, erro.message);
    }
}

async function pausarLead(idLead, motivo = 'pausado') {
    try {
        if (usarPluginRest()) {
            console.log('Pausando follow-up via API REST:', idLead, motivo);
            const dados = await chamarPluginRest(`/leads/${idLead}/pause`, {
                method: 'POST',
                body: JSON.stringify({ id: idLead, motivo })
            });
            console.log('Resposta pausa REST:', dados);
            return;
        }

        const token = process.env.WP_API_TOKEN;
        const url = `${process.env.WP_API_URL}?acao=pausar&token=${encodeURIComponent(token)}`;

        console.log('Pausando follow-up via API PHP:', idLead, motivo);

        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idLead, motivo })
        });

        const texto = await resposta.text();

        console.log('Status pausa:', resposta.status);
        console.log('Resposta pausa:', texto);
    } catch (erro) {
        console.error(`Erro ao pausar o lead ${idLead} no banco:`, erro.message);
    }
}

module.exports = { buscarLeadsPendentesDeHoje, registrarDisparo, pausarLead };
