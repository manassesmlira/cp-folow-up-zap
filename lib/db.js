// lib/db.js

// Agora não usamos mais o mysql2, usamos chamadas HTTP (fetch) seguras
async function buscarLeadsPendentesDeHoje() {
    try {
        const url = `${process.env.WP_API_URL}?acao=buscar`;
        const token = process.env.WP_API_TOKEN;

        const resposta = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!resposta.ok) throw new Error('Falha de autenticação com a API do site');
        return await resposta.json();
        
    } catch (erro) {
        console.error('❌ Erro ao buscar leads na API:', erro.message);
        return []; // Retorna lista vazia para não quebrar o script
    }
}

async function registrarDisparo(idLead) {
    try {
        const url = `${process.env.WP_API_URL}?acao=atualizar`;
        const token = process.env.WP_API_TOKEN;

        await fetch(url, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idLead })
        });
    } catch (erro) {
        console.error(`❌ Erro ao atualizar o lead ${idLead} no banco:`, erro.message);
    }
}

module.exports = { buscarLeadsPendentesDeHoje, registrarDisparo };