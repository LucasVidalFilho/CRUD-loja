// Carrega o carrinho ou cria array vazio
let carrinho = JSON.parse(localStorage.getItem('carrinhoLoja')) || [];

//ADICIONAR AO CARRINHO
function adicionarAoCarrinho(produtoId) {
    // Busca o produto no Banco de Dados
    const produto = produtosDB.find(p => p.id == produtoId);

    if (!produto) return;

    // Verifica se já existe no carrinho
    const itemExistente = carrinho.find(item => item.id == produtoId);

    if (itemExistente) {
        itemExistente.quantidade += 1; //aumenta a quantidade
    } else {
        // Adiciona novo item
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.precoAtual,
            imagem: produto.imagem,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarOffcanvas();
    
    // Abre o Offcanvas automaticamente para mostrar que adicionou
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasCarrinho'));
    offcanvas.show();
}

//REMOVER ITEM
function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id != produtoId);
    salvarCarrinho();
    atualizarOffcanvas();
}

//ALTERAR QUANTIDADE (+ e -)
function alterarQuantidade(produtoId, mudanca) {
    const item = carrinho.find(i => i.id == produtoId);

    if (item) {
        item.quantidade += mudanca;

        // Se a quantidade for 0 ou menos remove o item
        if (item.quantidade <= 0) {
            removerDoCarrinho(produtoId);
        } else {
            salvarCarrinho();
            atualizarOffcanvas();
        }
    }
}

//SALVAR NO LOCAL STORAGE
function salvarCarrinho() {
    localStorage.setItem('carrinhoLoja', JSON.stringify(carrinho));
    // Chama a função do navbar.js para atualizar o numero vermelho
    if (typeof atualizarContadorNavbar === 'function') {
        atualizarContadorNavbar();
    }
}

//RENDERIZAR O HTML DO OFFCANVAS
function atualizarOffcanvas() {
    const listaElement = document.getElementById('listaCarrinho');
    const totalElement = document.getElementById('totalCarrinho');

    if (!listaElement) return;

    if (carrinho.length === 0) {
        listaElement.innerHTML = `
            <div class="text-center mt-5">
                <i class="bi bi-cart-x fs-1 text-muted"></i>
                <p class="text-muted mt-2">Seu carrinho está vazio.</p>
                <a href="produtos.html" class="btn btn-outline-warning btn-sm">Ver ofertas</a>
            </div>
        `;
        totalElement.innerText = "R$ 0,00";
        return;
    }

    listaElement.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        listaElement.innerHTML += `
            <div class="card mb-3 border-0 shadow-sm">
                <div class="row g-0 align-items-center">
                    <div class="col-3 p-2">
                        <img src="${item.imagem}" class="img-fluid rounded" alt="${item.nome}">
                    </div>
                    <div class="col-9">
                        <div class="card-body p-2">
                            <h6 class="card-title mb-1 text-truncate">${item.nome}</h6>
                            <p class="card-text text-primary fw-bold mb-1">
                                ${item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                            
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group btn-group-sm">
                                    <button class="btn btn-outline-secondary" onclick="alterarQuantidade(${item.id}, -1)">-</button>
                                    <span class="btn btn-light disabled text-dark" style="width: 30px;">${item.quantidade}</span>
                                    <button class="btn btn-outline-secondary" onclick="alterarQuantidade(${item.id}, 1)">+</button>
                                </div>
                                <button class="btn btn-sm text-danger border-0" onclick="removerDoCarrinho(${item.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    totalElement.innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

//FINALIZAR COMPRA
function finalizarCompra() {
    if (carrinho.length === 0) return;
    window.location.href = 'checkout.html';
}

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarOffcanvas);