document.addEventListener('DOMContentLoaded', function() {
    // Exemplo de rolagem suave para links de navegação
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Exemplo de uma animação simples para a seção "Estatísticas" ao rolar
    const statisticsSection = document.getElementById('estatisticas');
    const statNumbers = document.querySelectorAll('.stat-item .number');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Quando 50% da seção está visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(numberElement => {
                    const targetNumber = parseInt(numberElement.textContent.replace(/[^0-9]/g, ''));
                    let currentNumber = 0;
                    const increment = targetNumber / 100; // Ajuste para a velocidade da animação

                    const interval = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= targetNumber) {
                            numberElement.textContent = targetNumber.toLocaleString('pt-BR');
                            clearInterval(interval);
                        } else {
                            numberElement.textContent = Math.floor(currentNumber).toLocaleString('pt-BR');
                        }
                    }, 20); // Velocidade da animação (milisegundos)
                });
                observer.unobserve(statisticsSection); // Parar de observar depois de animar
            }
        });
    }, observerOptions);

    if (statisticsSection) {
        observer.observe(statisticsSection);
    }
});