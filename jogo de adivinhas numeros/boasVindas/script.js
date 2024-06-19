document.addEventListener("DOMContentLoaded", () => {
    // Evento disparado quando o DOM é completamente carregado

    document.querySelectorAll('.audioIcon').forEach(function(audio) { //função para abaixar o vol do audio
        audio.volume = 0.5; // Volume 50%
    });

    // Captura o botão de iniciar jogo
    const startGameButton = document.getElementById("startGameButton");

    // Verifica se o botão foi encontrado
    if (startGameButton) {
        // Adiciona um ouvinte de evento para o clique no botão
        startGameButton.addEventListener("click", (event) => {
            // Impede o comportamento padrão do formulário
            event.preventDefault();

            // Captura o valor do nome de usuário do campo de entrada
            const userName = document.getElementById("username").value;

            // Expressão regular para validar apenas letras e espaços no nome
            const namePattern = /^[A-Za-zÁ-ú\s]+$/;

            // Validação do nome de usuário
            if (!userName) {
                alert("Por favor, digite seu nome.");
                document.getElementById("username").value = "";
                document.getElementById("username").focus();
            } else if (!namePattern.test(userName)) {
                alert("Por favor, digite um nome correspondente somente a letras e espaços.");
                document.getElementById("username").value = "";
                document.getElementById("username").focus();
            } else {
                // Armazena o nome de usuário na sessão
                sessionStorage.setItem("userName", userName);

                // Redireciona para a página do jogo
                window.location.href = "../jogo/game.html";
            }
        });
    }

    // Verifica se o formulário do jogo está presente na página
    if (document.getElementById("gameForm")) {
        // Recupera o nome de usuário da sessão
        const userName = sessionStorage.getItem("userName");

        // Exibe a mensagem de boas-vindas com o nome de usuário
        document.getElementById("welcomeMessage").innerText = `Bem-vindo, ${userName}!`;

        // Gera um número aleatório entre 1 e 100 para o jogo
        const targetNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 0; // Contador de tentativas

        // Adiciona um ouvinte de evento para o envio do formulário de jogo
        document.getElementById("gameForm").addEventListener("submit", (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Obtém o valor digitado pelo usuário
            const guess = parseInt(document.getElementById("guess").value, 10);
            attempts++; // Incrementa o contador de tentativas

            // Elemento para exibir feedback ao usuário
            const feedback = document.getElementById("feedback");

            // Variáveis para mensagem de feedback e cor do texto
            let message = '';
            let color = '';

            // Verifica se o palpite do usuário é correto
            if (guess === targetNumber) {
                // Determina o ranking e a maestria baseados no número de tentativas
                let ranking, mastery;
                if (attempts <= 3) {
                    ranking = "Gold";
                    mastery = "Mestre";
                } else if (attempts <= 7) {
                    ranking = "Prata";
                    mastery = "Expert";
                } else {
                    ranking = "Bronze";
                    mastery = "Iniciante";
                }

                // Calcula os pontos baseados no número de tentativas
                let points = 100 - attempts;

                // Armazena os resultados na sessão
                sessionStorage.setItem("resultMessage", `Parabéns, ${userName}! Você acertou em ${attempts} tentativas.`);
                sessionStorage.setItem("correctNumber", `O número correto era ${targetNumber}.`);
                sessionStorage.setItem("score", `Você fez ${attempts} tentativas para acertar.`);
                sessionStorage.setItem("ranking", `Seu ranking é ${ranking}, sua maestria é ${mastery}, você fez ${points} pontos.`);

                // Atualiza o ranking com os dados do jogador
                updateRanking(userName, attempts);

                // Redireciona para a página de resultado
                window.location.href = "../resultado/result.html";
            } else {
                // Feedback para o usuário se o palpite for incorreto
                if (guess < targetNumber) {
                    message = "<span class='red'>Tente um número maior.</span>";
                } else {
                    message = "<span class='blue'>Tente um número menor.</span>";
                }

                // Calcula a diferença entre o palpite e o número alvo
                const difference = Math.abs(guess - targetNumber);

                // Determina a cor do feedback baseado na proximidade do palpite
                if (difference <= 5) {
                    message += "<span class='green'> Você está muito perto!</span>";
                } else if (difference <= 15) {
                    message += "<span class='orange'> Você está mais ou menos perto.</span>";
                } else {
                    message += "<span class='red'> Você está longe.</span>";
                }

                // Exibe o feedback colorido para o usuário
                feedback.innerHTML = message;

                // Limpa o campo de entrada e define o foco nele para nova tentativa
                document.getElementById("guess").value = "";
                document.getElementById("guess").focus();
            }
        });
    }

    // Verifica se o elemento de mensagem de resultado está presente
    if (document.getElementById("resultMessage")) {
        // Exibe a mensagem de resultado armazenada na sessão
        const resultMessageElement = document.getElementById("resultMessage");
        const resultMessage = sessionStorage.getItem("resultMessage");
        if (resultMessageElement && resultMessage) {
            resultMessageElement.innerText = resultMessage;
        }

        // Exibe o número correto armazenado na sessão
        const correctNumberElement = document.getElementById("correctNumber");
        const correctNumber = sessionStorage.getItem("correctNumber");
        if (correctNumberElement && correctNumber) {
            correctNumberElement.innerText = correctNumber;
        }

        // Exibe a pontuação armazenada na sessão
        const scoreElement = document.getElementById("score");
        const score = sessionStorage.getItem("score");
        if (scoreElement && score) {
            scoreElement.innerText = score;
        }

        // Exibe o ranking armazenado na sessão
        const rankingElement = document.getElementById("ranking");
        const ranking = sessionStorage.getItem("ranking");
        if (rankingElement && ranking) {
            rankingElement.innerText = ranking;
        }
    }

    // Chama a função para exibir o ranking na tabela
    displayRanking();

    // Função para atualizar o ranking com os dados do jogador
    function updateRanking(userName, attempts) {
        // Recupera os dados do ranking do armazenamento local ou inicializa como array vazio
        let rankingData = JSON.parse(localStorage.getItem("rankingData")) || [];

        // Calcula os pontos com base no número de tentativas
        let points = 100 - attempts;

        // Adiciona os dados do jogador ao ranking
        rankingData.push({
            userName: userName,
            attempts: attempts,
            points: points
        });

        // Ordena o ranking com base nos pontos (maior para menor)
        rankingData.sort((a, b) => b.points - a.points);

        // Limita o ranking a 10 jogadores
        if (rankingData.length > 10) {
            rankingData = rankingData.slice(0, 10);
        }

        // Armazena o ranking atualizado no armazenamento local
        localStorage.setItem("rankingData", JSON.stringify(rankingData));
    }

    // Função para exibir o ranking na tabela HTML
    function displayRanking() {
        // Seleciona o corpo da tabela de ranking
        const rankingTableBody = document.querySelector("#rankingTable tbody");

        // Recupera os dados do ranking do armazenamento local ou inicializa como array vazio
        const rankingData = JSON.parse(localStorage.getItem("rankingData")) || [];

        // Verifica se o corpo da tabela e os dados do ranking estão presentes
        if (rankingTableBody && rankingData.length > 0) {
            // Gera o HTML para cada linha do ranking e o insere no corpo da tabela
            rankingTableBody.innerHTML = rankingData.map((data, index) =>
                `<tr>
                    <td>${data.userName}</td>
                    <td>${data.attempts}</td>
                    <td>${data.points}</td>
                </tr>`
            ).join(""); // Junta todas as linhas em uma única string HTML
        }
    }
});
