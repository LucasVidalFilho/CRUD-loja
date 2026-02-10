document.addEventListener('DOMContentLoaded', function() {
    //Verifica login
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const linkLogin = document.getElementById('linkLogin');
    
    if (usuarioLogado && linkLogin) {
        linkLogin.innerHTML = `Olá, ${usuarioLogado.nome}`;
        linkLogin.href = 'perfil.html';
    }

    //BOTÃO DO CARRINHO NA NAVBAR
    // Só adiciona se não estivermos na página de perfil
    if (!window.location.pathname.includes('perfil.html')) {
        
        //Procura a lista da navbar
        const navbarNav = document.querySelector('.navbar-nav');
        
        if (navbarNav) {
            const liCarrinho = document.createElement('li');
            liCarrinho.className = 'nav-item ms-3';
            
            liCarrinho.innerHTML = `
                <a class="btn btn-outline-light position-relative border-0" data-bs-toggle="offcanvas" href="#offcanvasCarrinho" role="button">
                    <i class="bi bi-cart3 fs-5"></i>
                    <span id="contadorCarrinho" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="display: none;">
                        0
                    </span>
                </a>
            `;
            
            navbarNav.appendChild(liCarrinho);
            
            // Atualiza o contador assim que carrega
            atualizarContadorNavbar();
        }
    }
});

// Função auxiliar para atualizar o numero vermelho
function atualizarContadorNavbar() {
    const contador = document.getElementById('contadorCarrinho');
    const carrinho = JSON.parse(localStorage.getItem('carrinhoLoja')) || [];
    
    if (contador) {
        // Soma a quantidade total de itens
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        
        contador.innerText = totalItens;
        contador.style.display = totalItens > 0 ? 'block' : 'none';
    }
}