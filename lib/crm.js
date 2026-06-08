// lib/crm.js

async function enviarWhatsApp(telefone, mensagem) {
    const token = process.env.CRM_TOKEN;
    
    if (!token) {
        console.error("❌ ERRO: Token do CRM ausente no arquivo .env");
        return false;
    }

    // URL exata da Wascript com o token direto na rota
    const url = `https://api-whatsapp.wascript.com.br/api/enviar-texto/${token}`;
    
    try {
        // Usando fetch nativo para enviar a requisição HTTP
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            // A Wascript exige as chaves "phone" e "message"
            body: JSON.stringify({ 
                phone: telefone, 
                message: mensagem 
            })
        });

        const data = await response.json();

        // Validando o retorno de sucesso nativo da Wascript
        if (data.success) {
            console.log(`✅ Mensagem enviada com sucesso para: ${telefone}`);
            return true;
        } else {
            console.error(`⚠️ Erro no retorno da Wascript para ${telefone}:`, data);
            return false;
        }
    } catch (erro) {
        console.error(`❌ Falha de rede ao tentar conectar com a Wascript (${telefone}):`, erro.message);
        return false; // Retorna falso para não atualizar o banco e tentar de novo depois
    }
}

module.exports = { enviarWhatsApp };