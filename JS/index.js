document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('listaProdutos');
    if (!container) return;

    //POPULAR O CARROSSEL
    if (typeof produtosDB !== 'undefined') {
        const selecionados = produtosDB.sort(() => 0.5 - Math.random()).slice(0, 10);

        selecionados.forEach(prod => {
            //LARGURA FIXA PARA O CARROSSEL
            const cardWrapper = `
                <div style="min-width: 280px; max-width: 280px;">
                    ${criarCardHTML(prod)}
                </div>
            `;
            container.innerHTML += cardWrapper;
        });
    }

    //CLONAGEM (Infinito)
    const cards = Array.from(container.children);
    cards.forEach(card => container.appendChild(card.cloneNode(true)));
    
    //LÓGICA DE SCROLL
    const scrollAmount = 300; 
    const delay = 600; 
    let isAnimating = false;

    function verificarInfinito() {
        const maxScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= maxScroll) {
            container.style.scrollBehavior = 'auto'; 
            container.scrollLeft = container.scrollLeft - maxScroll;
            container.style.scrollBehavior = 'smooth'; 
        } else if (container.scrollLeft <= 0) {
            container.style.scrollBehavior = 'auto';
            container.scrollLeft = container.scrollLeft + maxScroll;
            container.style.scrollBehavior = 'smooth';
        }
    }

    window.scrollar = function(direcao) {
        if (isAnimating) return;
        isAnimating = true;
        container.style.scrollBehavior = 'smooth';

        if (direcao === 'direita') {
            container.scrollLeft += scrollAmount;
        } else {
            container.scrollLeft -= scrollAmount;
        }

        setTimeout(() => {
            isAnimating = false;
            verificarInfinito();
        }, delay);
    };

    container.addEventListener('scroll', function() {
        if (!isAnimating) {
             if (container.scrollLeft >= container.scrollWidth / 2 || container.scrollLeft <= 0) {
                 verificarInfinito();
             }
        }
    });
});