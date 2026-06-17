const mensagens = [
    // 1. Dia 0
    "GraÃ§a e paz! Que alegria ter vocÃª aqui.\n\nAqui estÃ¡ o PDF que preparei para te ajudar a dar os primeiros passos com mais direÃ§Ã£o:\n\nhttps://pregadormanasses.com/guia-passo-a-passo\n\nDepois que baixar, me diga: vocÃª sente que Deus tem um propÃ³sito para sua vida, mas ainda nÃ£o sabe exatamente como desenvolver isso?",

    // 2. Dia 2
    "MoisÃ©s foi chamado por Deus, mas nÃ£o se sentia pronto. Ele disse que nÃ£o sabia falar bem. Mesmo assim, Deus nÃ£o cancelou o chamado dele.\n\nÃ€s vezes, a inseguranÃ§a nÃ£o significa ausÃªncia de chamado. Significa que existe algo a ser desenvolvido.\n\nSua maior dificuldade hoje Ã© inseguranÃ§a, timidez ou falta de direÃ§Ã£o?",

    // 3. Dia 4
    "Davi estava no campo, longe dos olhos das pessoas, mas nÃ£o estava fora dos olhos de Deus.\n\nÃ€s vezes, o homem nÃ£o vÃª, a igreja nÃ£o percebe, ninguÃ©m chama, ninguÃ©m abre espaÃ§o... mas Deus jÃ¡ estÃ¡ formando algo dentro de vocÃª.\n\nVocÃª jÃ¡ sentiu que tem algo de Deus dentro de vocÃª, mas ainda precisa de oportunidade e direÃ§Ã£o?",

    // 4. Dia 6
    "TimÃ³teo tinha dom, mas Paulo precisou dizer: desperta o dom que hÃ¡ em ti.\n\nIsso mostra uma verdade importante: o problema nem sempre Ã© falta de chamado. Ã€s vezes Ã© falta de encorajamento, preparo e ambiente certo.\n\nVocÃª sente que precisa despertar algo que Deus jÃ¡ colocou em sua vida?",

    // 5. Dia 8
    "Apolo era eloquente e conhecia as Escrituras, mas ainda precisou ser instruÃ­do com mais precisÃ£o.\n\nIsso nos ensina que atÃ© quem jÃ¡ fala bem pode crescer mais quando recebe direÃ§Ã£o.\n\nVocÃª jÃ¡ teve alguÃ©m para orientar seu crescimento ministerial de perto?",

    // 6. Dia 10
    "A BÃ­blia diz: procura apresentar-te a Deus aprovado, como obreiro que maneja bem a palavra da verdade.\n\nChamado sem preparo vira peso. Boa vontade Ã© importante, mas fundamento bÃ­blico Ã© indispensÃ¡vel.\n\nVocÃª sente dificuldade para estudar a BÃ­blia de forma organizada?",

    // 7. Dia 12
    "TrÃªs motivos fazem muitos pregadores travarem:\n\n1. Falta de estrutura na mensagem.\n2. Falta de domÃ­nio do texto bÃ­blico.\n3. Medo de errar diante das pessoas.\n\nQual desses trÃªs mais acontece com vocÃª?",

    // 8. Dia 14
    "Uma mensagem simples precisa de cinco partes:\n\n1. Texto bÃ­blico.\n2. Ideia central.\n3. ExplicaÃ§Ã£o.\n4. AplicaÃ§Ã£o.\n5. ConclusÃ£o.\n\nQuando isso estÃ¡ claro, a pregaÃ§Ã£o fica mais segura.\n\nVocÃª costuma preparar suas mensagens com comeÃ§o, meio e fim?",

    // 9. Dia 16
    "Existe diferenÃ§a entre inspiraÃ§Ã£o e improviso.\n\nEsdras preparou o coraÃ§Ã£o para buscar a Lei do Senhor, cumprir e ensinar. Deus usa o pregador, mas o pregador precisa preparar o coraÃ§Ã£o e a mensagem.\n\nVocÃª jÃ¡ sentiu que depende muito do improviso na hora de falar?",

    // 10. Dia 18
    "VocÃª nÃ£o precisa crescer sozinho.\n\nA BÃ­blia diz que o ferro afia o ferro. Crescimento ministerial acontece melhor quando existe direÃ§Ã£o, ensino e comunhÃ£o com pessoas que tambÃ©m querem crescer.\n\nVocÃª gostaria de caminhar com outros irmÃ£os que desejam crescer no ministÃ©rio?",

    // 11. Dia 20
    "No Clube de Pregadores, estudamos BÃ­blia, teologia, pregaÃ§Ã£o, lideranÃ§a e vida ministerial prÃ¡tica.\n\nA ideia nÃ£o Ã© apenas acumular informaÃ§Ã£o, mas formar pessoas mais preparadas para servir a Deus com clareza.\n\nVocÃª gostaria de conhecer melhor como funcionam nossas aulas?",

    // 12. Dia 22
    "Muitos chegam inseguros, sem saber organizar uma mensagem, com medo de falar em pÃºblico ou com dificuldade de estudar a BÃ­blia.\n\nMas quando comeÃ§am a caminhar com direÃ§Ã£o, percebem que podem crescer.\n\nVocÃª se identifica com essa necessidade de ser mais preparado?",

    // 13. Dia 24
    "Toda segunda-feira, Ã s 20h, temos aula ao vivo no Clube de Pregadores.\n\nÃ‰ um ambiente de ensino, crescimento, perguntas, direÃ§Ã£o e aprofundamento bÃ­blico.\n\nQuer participar e conhecer de perto?",

    // 14. Dia 26
    "O Clube de Pregadores nÃ£o Ã© apenas um curso. Ã‰ um ambiente de crescimento contÃ­nuo.\n\nTem aulas ao vivo, apostilas, materiais de apoio, comunidade e direÃ§Ã£o para quem deseja crescer na Palavra e no ministÃ©rio.\n\nQuer que eu te explique como funciona a matrÃ­cula?",

    // 15. Dia 28
    "A BÃ­blia diz para nÃ£o desprezarmos o dia dos pequenos comeÃ§os.\n\nTodo crescimento ministerial comeÃ§a com uma decisÃ£o simples: dar o prÃ³ximo passo.\n\nPosso te enviar o link para vocÃª comeÃ§ar conosco?",

    // 16. Dia 30
    "O chamado precisa ser cultivado.\n\nPaulo orientou TimÃ³teo a nÃ£o negligenciar o dom que havia nele. O dom precisa de cuidado, dedicaÃ§Ã£o e desenvolvimento.\n\nVocÃª tem conseguido se dedicar ao crescimento do seu chamado?",

    // 17. Dia 32
    "Nem toda dor ministerial significa que vocÃª deve parar.\n\nPaulo disse que somos atribulados, mas nÃ£o angustiados; perplexos, mas nÃ£o desanimados. Pessoas podem ferir, mas isso nÃ£o deve matar o propÃ³sito.\n\nVocÃª jÃ¡ viveu algo na caminhada que quase te fez parar?",

    // 18. Dia 34
    "Antes de Deus usar alguÃ©m publicamente, Ele trata essa pessoa no secreto.\n\nDavi pediu: cria em mim um coraÃ§Ã£o puro. Depois disso, ele disse: entÃ£o ensinarei aos transgressores os teus caminhos.\n\nVocÃª sente que Deus estÃ¡ tratando Ã¡reas da sua vida para te usar melhor?",

    // 19. Dia 36
    "O lÃ­der tambÃ©m precisa ser cuidado e ensinado.\n\nPaulo disse aos presbÃ­teros: olhai por vÃ³s e por todo o rebanho. Antes de cuidar bem dos outros, o servo tambÃ©m precisa crescer.\n\nVocÃª lidera ou serve em alguma Ã¡rea da igreja?",

    // 20. Dia 38
    "Boa vontade nÃ£o substitui preparo.\n\nO zelo Ã© importante, mas o conhecimento bÃ­blico protege o servo de erros, exageros e confusÃµes.\n\nVocÃª sente falta de mais base bÃ­blica para servir com seguranÃ§a?",

    // 21. Dia 40
    "O pÃºlpito exige responsabilidade.\n\nTiago disse que nem todos deveriam se fazer mestres, porque receberiam maior juÃ­zo. Ensinar a Palavra Ã© sÃ©rio.\n\nVocÃª jÃ¡ sentiu o peso da responsabilidade antes de ministrar?",

    // 22. Dia 42
    "Uma dica simples para melhorar a leitura bÃ­blica em pÃºblico:\n\nLeia o texto antes, marque palavras difÃ­ceis, respeite a pontuaÃ§Ã£o e leia com calma.\n\nA leitura bem feita jÃ¡ prepara o coraÃ§Ã£o das pessoas para a mensagem.\n\nVocÃª sente dificuldade na leitura bÃ­blica diante das pessoas?",

    // 23. Dia 44
    "Para nÃ£o ficar sem palavras na hora da mensagem, nÃ£o dependa apenas de decorar tudo.\n\nDomine o texto bÃ­blico, organize ideias-chave e saiba para onde a mensagem precisa chegar.\n\nVocÃª costuma esquecer o que ia falar quando estÃ¡ pregando?",

    // 24. Dia 46
    "Antes de pregar um texto bÃ­blico, faÃ§a trÃªs perguntas:\n\n1. Qual Ã© o contexto?\n2. Qual Ã© o assunto central?\n3. Como esse texto se aplica hoje?\n\nIsso evita mensagens soltas e fortalece a pregaÃ§Ã£o.\n\nVocÃª gostaria de aprender um mÃ©todo simples para estudar a BÃ­blia?",

    // 25. Dia 48
    "VÃ­deos soltos podem ajudar, mas formaÃ§Ã£o contÃ­nua dÃ¡ sequÃªncia.\n\nQuando existe rotina, direÃ§Ã£o e acompanhamento, o crescimento deixa de depender apenas de momentos isolados.\n\nVocÃª hoje aprende mais sozinho ou tem uma rotina organizada de estudo?",

    // 26. Dia 50
    "Na aula ao vivo do Clube, o aluno nÃ£o recebe apenas conteÃºdo.\n\nEle aprende com explicaÃ§Ã£o, exemplos, aplicaÃ§Ã£o ministerial, apostila e possibilidade de crescer junto com outros irmÃ£os.\n\nQuer conhecer a prÃ³xima aula ao vivo?",

    // 27. Dia 52
    "No Clube temos pregadores, lÃ­deres, professores de EBD, intercessores, obreiros e irmÃ£os que simplesmente desejam conhecer melhor a BÃ­blia.\n\nNÃ£o Ã© sÃ³ para quem jÃ¡ estÃ¡ no pÃºlpito. Ã‰ para quem quer crescer.\n\nVocÃª se encaixa mais como pregador, lÃ­der, intercessor ou aluno da Palavra?",

    // 28. Dia 54
    "VocÃª nÃ£o precisa esperar se sentir pronto para comeÃ§ar.\n\nGideÃ£o se sentia pequeno, mas Deus o chamou enquanto ele ainda estava em processo.\n\nVocÃª gostaria de comeÃ§ar mesmo ainda se sentindo em processo?",

    // 29. Dia 56
    "No Clube de Pregadores vocÃª encontra aulas ao vivo, apostilas, materiais de apoio, comunidade, treinamentos prÃ¡ticos e formaÃ§Ã£o contÃ­nua.\n\nTudo pensado para ajudar no crescimento bÃ­blico e ministerial.\n\nQuer que eu te mande as informaÃ§Ãµes de matrÃ­cula?",

    // 30. Dia 58
    "O chamado merece investimento.\n\nPaulo disse a TimÃ³teo para meditar e se ocupar com essas coisas, para que o progresso dele fosse manifesto a todos.\n\nQuem se dedica cresce com mais direÃ§Ã£o.\n\nPosso te enviar o link para vocÃª comeÃ§ar sua formaÃ§Ã£o?",

    // 31. Dia 60
    "Talvez este seja o tempo do seu recomeÃ§o.\n\nDeus disse: eis que faÃ§o uma coisa nova. Ã€s vezes, depois de medo, frustraÃ§Ã£o ou paralisaÃ§Ã£o, o Senhor abre um novo caminho.\n\nVocÃª sente que estÃ¡ vivendo um tempo de recomeÃ§o ministerial?",

    // 32. Dia 62
    "O chamado continua falando.\n\nA BÃ­blia diz que os dons e a vocaÃ§Ã£o de Deus sÃ£o sem arrependimento. As dificuldades nÃ£o anulam aquilo que Deus colocou em sua vida.\n\nMesmo com lutas, vocÃª ainda sente que Deus quer te usar?",

    // 33. Dia 64
    "Jesus disse: eu vos escolhi para que vades e deis fruto.\n\nO propÃ³sito de Deus nÃ£o Ã© apenas emoÃ§Ã£o. Ã‰ fruto permanente, vida transformada e serviÃ§o fiel.\n\nVocÃª deseja frutificar mais no ministÃ©rio?",

    // 34. Dia 66
    "Existe um custo em permanecer sem direÃ§Ã£o.\n\nA pessoa tenta crescer sozinha, mas continua insegura, desorganizada, com medo de errar e sem constÃ¢ncia.\n\nVocÃª sente que jÃ¡ passou tempo demais tentando crescer sozinho?",

    // 35. Dia 68
    "O chamado sem desenvolvimento pode virar peso.\n\nQuando a pessoa serve sem preparo, comeÃ§a a carregar culpa, medo, pressÃ£o e comparaÃ§Ã£o.\n\nMas com direÃ§Ã£o, o serviÃ§o fica mais claro.\n\nVocÃª sente mais alegria ou mais peso quando pensa no ministÃ©rio?",

    // 36. Dia 70
    "O pregador precisa de clareza.\n\nDeus disse a Habacuque: escreve a visÃ£o e torna-a bem legÃ­vel. Organizar a mensagem tambÃ©m faz parte do serviÃ§o.\n\nSua maior dificuldade hoje Ã© preparar ou entregar a mensagem?",

    // 37. Dia 72
    "Checklist simples antes de pregar:\n\n1. Eu entendi o texto?\n2. Tenho uma ideia central?\n3. Tenho uma aplicaÃ§Ã£o prÃ¡tica?\n4. Sei como concluir?\n\nSe uma dessas respostas estiver confusa, a mensagem precisa ser melhor preparada.\n\nQuer que eu te mande um modelo simples de esboÃ§o?",

    // 38. Dia 74
    "Quatro sinais de que vocÃª precisa de treinamento ministerial:\n\n1. InseguranÃ§a constante.\n2. Falta de organizaÃ§Ã£o.\n3. Medo de perguntas.\n4. Dificuldade de aplicar o texto bÃ­blico.\n\nVocÃª se identifica com algum desses sinais?",

    // 39. Dia 76
    "Quando vocÃª estuda com constÃ¢ncia, algumas coisas mudam:\n\nMais seguranÃ§a, mais clareza, mais repertÃ³rio bÃ­blico e mais maturidade ministerial.\n\nCrescimento nÃ£o acontece por acidente. Ele nasce de uma rotina.\n\nVocÃª gostaria de ter uma rotina semanal de crescimento bÃ­blico e ministerial?",

    // 40. Dia 78
    "Por dentro da comunidade do Clube, os alunos aprendem juntos, tiram dÃºvidas, recebem materiais e crescem em um ambiente saudÃ¡vel.\n\nNinguÃ©m precisa caminhar sozinho quando existe uma comunidade com o mesmo propÃ³sito.\n\nVocÃª gostaria de fazer parte de uma comunidade assim?",

    // 41. Dia 80
    "Hoje pode ser um bom dia para dar um passo.\n\nToda segunda-feira, Ã s 20h, temos aula ao vivo no Clube de Pregadores. Ã‰ uma oportunidade de conhecer por dentro esse ambiente de crescimento.\n\nQuer entrar ainda hoje e participar da prÃ³xima aula?",

    // 42. Dia 82
    "O Clube nÃ£o Ã© sÃ³ para pregadores experientes.\n\nEle tambÃ©m Ã© para quem quer pregar, ensina EBD, lidera, intercede, serve na igreja ou deseja conhecer melhor a BÃ­blia.\n\nQuer que eu te mostre qual plano combina melhor com vocÃª?",

    // 43. Dia 84
    "As matrÃ­culas estÃ£o abertas para novos alunos do Clube de Pregadores.\n\nVocÃª pode entrar para uma formaÃ§Ã£o contÃ­nua com aulas ao vivo, apostilas, comunidade e direÃ§Ã£o ministerial.\n\nPosso te enviar o link de matrÃ­cula agora?",

    // 44. Dia 86
    "VocÃª nÃ£o precisa continuar sozinho.\n\nEclesiastes diz que melhor Ã© serem dois do que um, porque se um cair, o outro levanta o seu companheiro.\n\nCaminhar acompanhado fortalece o crescimento e ajuda a nÃ£o desistir.\n\nQuer comeÃ§ar essa caminhada conosco?",

    // 45. Dia 88
    "Durante esses dias, falei com vocÃª sobre chamado, preparo, inseguranÃ§a, direÃ§Ã£o, estudo bÃ­blico, pregaÃ§Ã£o e crescimento ministerial.\n\nO Clube de Pregadores existe para ajudar pessoas como vocÃª a crescerem com aulas ao vivo, apostilas, comunidade e formaÃ§Ã£o contÃ­nua.\n\nSe vocÃª deseja crescer no chamado, posso te enviar o link para comeÃ§ar hoje?"
];

const MENSAGEM_GUIA = mensagens[0];
const MENSAGENS_FOLLOW_UP = mensagens;

module.exports = { MENSAGEM_GUIA, MENSAGENS_FOLLOW_UP };

