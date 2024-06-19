# Jogo de Adivinhação em HTML, CSS e JavaScript

### Objetivo

Desenvolver um jogo de adivinhação onde o usuário deve preencher um formulário com seu nome e pressionar o botão "Jogar". Após isso, ele será direcionado para uma tela onde deverá adivinhar um número escolhido aleatoriamente entre 1 até o número desejado. O jogo deve informar se o palpite está correto e, caso esteja, mostrar a pontuação final.

### Requisitos

1. *Tela de Boas-vindas:*
    - Deve conter um formulário onde o usuário possa inserir seu nome.
    - O Jogo não deve deixar o usuário jogar sem por o nome.
    - Um botão "Jogar" que, ao ser clicado, leva o usuário para a próxima tela.
2. *Tela de Jogo:*
    - Deve exibir uma mensagem de boas-vindas com o nome do usuário.
    - Um campo de entrada para o usuário digitar um número entre 1 e 100.
    - Um botão "Adivinhar" que verifica se o número está correto.
    - Uma mensagem de feedback que informa se o número é maior ou menor que o número correto.
    - O jogo não deve permitir que o usuário insira caracteres diferentes de números.
3. *Tela de Resultado:*
    - Deve ser exibida quando o usuário acertar o número.
    - Deve mostrar uma mensagem de parabéns com o nome do usuário.
    - Exibir o número correto que foi adivinhado.
    - Mostrar a pontuação final, que corresponde ao número de tentativas realizadas.
    - O jogo deve perguntar se o usuário gostaria de jogar novamente, se a escolha for sim deve iniciar o jogo automaticamente, caso contrário de ir para a tela inicial.

### Instruções de Implementação

1. *HTML*
    - Estruture três paginas principais:
    - Utilize formulários, inputs e botões conforme necessário para capturar as entradas do usuário.
2. *CSS* 
    - Adicione estilos para as diferentes telas para melhorar a experiência do usuário.
    - Inclua estilos para inputs e botões para garantir uma interface amigável.
3. *JavaScript* 
    - Implemente o controle de exibição das telas com base nas interações do usuário.
    - Use Math.random() para gerar o número aleatório que o usuário deve adivinhar.
    - Implemente a lógica de verificação dos palpites do usuário e atualize a interface com feedback e resultado.
    - Implemente as lógicas de autenticações necessárias.
