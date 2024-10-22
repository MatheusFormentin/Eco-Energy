let progress = 0; // Inicialize com 0%
const progressElement = document.querySelector('.circular-progress');
const valueElement = document.getElementById('progress-value');

function updateProgress() {
    progress++;

    if (progress > 100) {
        progress = 0; // Reinicie a barra se chegar a 100%
    }

    // Atualiza o gradiente da barra de progresso
    progressElement.style.background = `conic-gradient(#00ff00 ${progress * 3.6}deg, #222 ${progress * 3.6}deg)`;

    // Atualiza o valor percentualc
    valueElement.textContent = `${progress}%`;

    // Atualiza a cada 100ms
    setTimeout(updateProgress, 100);
}

updateProgress();

// Contador
const ctx = document.getElementById('countdownChart').getContext('2d');
const timeRemainingElement = document.getElementById('timeRemaining');

// Inicializa o gráfico de pizza
const countdownChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Tempo Restante', 'Tempo Esgotado'],
        datasets: [{
            data: [21600, 0], // 6 horas em segundos
            backgroundColor: ['blue', 'red'], // Azul para o tempo restante e vermelho para o tempo esgotado
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    }
});

function startCountdown(duration) {
    let timer = duration;
    
    const interval = setInterval(() => {
        // Atualiza o gráfico com o tempo restante
        countdownChart.data.datasets[0].data[0] = timer;
        countdownChart.data.datasets[0].data[1] = 21600 - timer; // Total de 6 horas em segundos
        countdownChart.update();

        // Atualiza o tempo restante no texto
        const hours = Math.floor(timer / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;
        timeRemainingElement.textContent = `Tempo restante: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (--timer < 0) {
            clearInterval(interval);
            timeRemainingElement.textContent = "Tempo Esgotado!";
            countdownChart.data.datasets[0].data[0] = 0;
            countdownChart.data.datasets[0].data[1] = 21600; // Total de 6 horas
            countdownChart.update();
        }
    }, 1000);
}

// Iniciar o contador com 6 horas em segundos
startCountdown(6 * 3600);

// Previsão de termino 
function calculateEndTime(durationInHours) {
    const now = new Date();
    const endTime = new Date(now.getTime() + durationInHours * 60 * 60 * 1000); // Converter horas em milissegundos

    // Formatar o horário para o formato HH:MM:SS
    const options = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    return endTime.toLocaleTimeString('pt-BR', options);
}

// Defina a duração do abastecimento em horas
const durationInHours = 6; // 6 horas de carregamento
const endTime = calculateEndTime(durationInHours);
document.getElementById('endTime').textContent = ` ${endTime}`;
