// lib/db.js

async function buscarLeadsPendentesDeHoje() {
    try {
        const url = `${process.env.WP_API_URL}?acao=buscar`;
        const token = process.env.WP_API_TOKEN;

        console.log('🔎 Buscando leads em:', url);
        console.log('🔐 Token WP existe?', token ? 'SIM' : 'NÃO');

        const resposta = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const texto = await resposta.text();

        console.log('📡 Status da API WordPress:', resposta.status);
        console.log('📦 Resposta bruta da API:', texto);

        if (!resposta.ok) {
            throw new Error(`Falha na API do site. Status: ${resposta.status}. Resposta: ${texto}`);
        }

        return JSON.parse(texto);
        
    } catch (erro) {
        console.error('❌ Erro ao buscar leads na API:', erro.message);
        return [];
    }
}

async function registrarDisparo(idLead) {
    try {
        const url = `${process.env.WP_API_URL}?acao=atualizar`;
        const token = process.env.WP_API_TOKEN;

        console.log('📝 Atualizando lead:', idLead);

        const resposta = await fetch(url, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idLead })
        });

        const texto = await resposta.text();

        console.log('📡 Status atualização:', resposta.status);
        console.log('📦 Resposta atualização:', texto);

    } catch (erro) {
        console.error(`❌ Erro ao atualizar o lead ${idLead} no banco:`, erro.message);
    }
}

module.exports = { buscarLeadsPendentesDeHoje, registrarDisparo };