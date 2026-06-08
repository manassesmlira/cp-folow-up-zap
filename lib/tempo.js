// lib/tempo.js

// Verifica se a hora atual em São Paulo está entre 10h e 17h
function isHorarioComercial() {
    const formatador = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: 'numeric',
        hourCycle: 'h23'
    });
    
    const horaAtualSP = parseInt(formatador.format(new Date()), 10);
    
    // Retorna true se for maior ou igual a 10 e menor ou igual a 17
    return horaAtualSP >= 10 && horaAtualSP <= 17;
}

// Calcula quantos dias inteiros se passaram desde que o lead entrou
function calcularDiasPassados(dataEntrada) {
    const hoje = new Date();
    const entrada = new Date(dataEntrada);
    
    // Diferença em milissegundos convertida para dias
    const diferencaTempo = hoje.getTime() - entrada.getTime();
    const diferencaDias = Math.floor(diferencaTempo / (1000 * 3600 * 24));
    
    return diferencaDias;
}

module.exports = { isHorarioComercial, calcularDiasPassados };