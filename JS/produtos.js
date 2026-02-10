// --- BASE DE DADOS DE PRODUTOS ---

const produtosDB = [
    {
        id: 1,
        nome: "Creatina Crealkaline 300g Demons Lab",
        categoria: "Suplementos",
        precoOriginal: 59.90,
        precoAtual: 42.49,
        desconto: 29,
        freteGratis: true,
        emEstoque: true,
        avaliacao: 5,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_636248-MLA99508893822_112025-F.webp" 
    },
    {
        id: 2,
        nome: "Kit 2x Pré Treino Insane Orange 300g",
        categoria: "Suplementos",
        precoOriginal: 201.21,
        precoAtual: 191.14,
        desconto: 5,
        freteGratis: true,
        emEstoque: true,
        avaliacao: 4,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_912204-MLA99455274500_112025-F.webp"
    },
    {
        id: 3,
        nome: "Pré Treino Insane Mad Demons Lab",
        categoria: "Suplementos",
        precoOriginal: 149.90,
        precoAtual: 126.23,
        desconto: 15,
        freteGratis: true,
        emEstoque: true,
        avaliacao: 5,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_672280-MLA99482023546_112025-F.webp"
    },
    {
        id: 4,
        nome: "Psycho Killer Demons Lab 495ml",
        categoria: "Suplementos",
        precoOriginal: 0,
        precoAtual: 112.93,
        desconto: 0,
        freteGratis: true,
        emEstoque: true,
        avaliacao: 4,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_772460-MLA99952075415_112025-F.webp"
    },
    {
        id: 5,
        nome: "Hipercalórico Anabolic Mass 3kg",
        categoria: "Suplementos",
        precoOriginal: 120.00,
        precoAtual: 99.90,
        desconto: 0,
        freteGratis: false,
        emEstoque: true,
        avaliacao: 3,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_642283-MLB89592396278_082025-F-hipercalorico-anabolic-mass-3kg-c-32g-proteina-profit-lab.webp"
    },
    {
        id: 6,
        nome: "Marvel's Spider-Man: Miles Morales - PS5",
        categoria: "Games",
        precoOriginal: 249.90,
        precoAtual: 149.90,
        desconto: 40,
        freteGratis: true,
        emEstoque: true,
        avaliacao: 5,
        imagem: "https://m.media-amazon.com/images/I/81FBIrIvLVL._AC_SX679_.jpg"
    },
    {
        id: 7,
        nome: "Coleção Shakespeare - 6 Livros",
        categoria: "Livros",
        precoOriginal: 120.00,
        precoAtual: 89.90,
        desconto: 25,
        freteGratis: false,
        emEstoque: false,
        avaliacao: 5,
        imagem: "https://m.media-amazon.com/images/I/614GCLvmE4L._SY342_.jpg"
    },
    {
        id: 8,
        nome: "Fone de Ouvido TWS Bluetooth 5.0",
        categoria: "Áudio",
        precoOriginal: 150.00,
        precoAtual: 99.90,
        desconto: 33,
        freteGratis: true,
        emEstoque: true,
        avaliacao: 4,
        imagem: "https://m.media-amazon.com/images/I/51b6HiBncoL._AC_SX522_.jpg"
    },
    {
        id: 9,
        nome: "Perfume Asad Lattafa 100ml",
        categoria: "Perfumaria",
        precoOriginal: 250.00,
        precoAtual: 199.90,
        desconto: 20,
        freteGratis: true,
        emEstoque: true,
        avaliacao: 5,
        imagem: "https://m.media-amazon.com/images/I/415tTA0HfOL._AC_SX679_.jpg"
    },
    {
        id: 10,
        nome: "A Arte Da Guerra - Sun Tzu",
        categoria: "Livros",
        precoOriginal: 45.00,
        precoAtual: 29.90,
        desconto: 33,
        freteGratis: false,
        emEstoque: true,
        avaliacao: 5,
        imagem: "https://m.media-amazon.com/images/I/71jgxi5WW2L._SY522_.jpg"
    },

    {
        id: 11,
        nome: "Teclado Mecânico RGB Switch Blue",
        categoria: "Periféricos",
        precoOriginal: 450.00,
        precoAtual: 329.90,
        desconto: 27,
        freteGratis: true,
        emEstoque: true,
        avaliacao: 5,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_626049-MLA99449982912_112025-F.webp"
    },
    {
        id: 12,
        nome: "Mouse Vertical Ergonômico Pro",
        categoria: "Periféricos",
        precoOriginal: 180.00,
        precoAtual: 149.90,
        desconto: 17,
        freteGratis: true,
        emEstoque: true,
        avaliacao: 4,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_791481-MLB73370505190_122023-F.webp"
    },
    {
        id: 13,
        nome: "Monitor Ultrawide 29' LG",
        categoria: "Monitores",
        precoOriginal: 1200.00,
        precoAtual: 999.00,
        desconto: 16,
        freteGratis: false,
        emEstoque: true,
        avaliacao: 5,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_724842-MLA99581911526_122025-F.webp"
    },
    {
        id: 14,
        nome: "Copo térmico",
        categoria: "Utensilios",
        precoOriginal: 69.90,
        precoAtual: 49.90,
        desconto: 28,
        freteGratis: false,
        emEstoque: true,
        avaliacao: 5,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_701399-MLA99956977031_112025-F.webp"
    },
    {
        id: 15,
        nome: "Moletom Paris",
        categoria: "Moda",
        precoOriginal: 159.90,
        precoAtual: 119.90,
        desconto: 25,
        freteGratis: true,
        emEstoque: true,
        avaliacao: 5,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_780737-MLB99132177235_112025-F-moletom-paris-unissex-estampa-minimalista-flanelado-algodo.webp"
    },
    {
        id: 16,
        nome: "Meias (Par)",
        categoria: "Moda",
        precoOriginal: 29.90,
        precoAtual: 29.90,
        desconto: 0,
        freteGratis: false,
        emEstoque: false, // Esgotado
        avaliacao: 3,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_809174-MLB78742429105_082024-F.webp"
    },
    {
        id: 17,
        nome: "Pato de Borracha",
        categoria: "Decoração",
        precoOriginal: 25.00,
        precoAtual: 15.00,
        desconto: 40,
        freteGratis: false,
        emEstoque: true,
        avaliacao: 5,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_903998-MLA100111382505_122025-F.webp"
    },
    {
        id: 18,
        nome: "Livro Cálculo",
        categoria: "Livros",
        precoOriginal: 90.00,
        precoAtual: 79.90,
        desconto: 11,
        freteGratis: true,
        emEstoque: true,
        avaliacao: 5,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_603794-MLU50697748030_072022-F.webp"
    },
    {
        id: 19,
        nome: "SSD NVMe M.2 1TB",
        categoria: "Hardware",
        precoOriginal: 600.00,
        precoAtual: 450.00,
        desconto: 25,
        freteGratis: true,
        emEstoque: true,
        avaliacao: 5,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_932631-MLA96073227449_102025-F.webp"
    },
    {
        id: 20,
        nome: "Headset Gamer Redragon Zeus",
        categoria: "Hardware",
        precoOriginal: 800.00,
        precoAtual: 750.00,
        desconto: 6,
        freteGratis: true,
        emEstoque: false,
        avaliacao: 5,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_743438-MLA105468591979_012026-F.webp"
    }
];

//Criar card do produto
function criarCardHTML(produto) {
    const precoFormatado = produto.precoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const precoAntigo = produto.precoOriginal > 0 
        ? `R$ ${produto.precoOriginal.toFixed(2).replace('.', ',')}` 
        : '';

    let estrelasHTML = '';
    for (let i = 1; i <= 5; i++) {
        estrelasHTML += i <= produto.avaliacao 
            ? '<i class="bi bi-star-fill text-warning" style="font-size: 0.8rem;"></i>' 
            : '<i class="bi bi-star text-warning" style="font-size: 0.8rem;"></i>';
    }

    // Se tiver estoque, mostra: [Ver Detalhes] + [Ícone Carrinho]
    const botaoHTML = produto.emEstoque 
        ? `
            <div class="d-flex gap-2">
                <a href="detalhes.html?id=${produto.id}" class="btn btn-sm btn-primary flex-grow-1">
                    Ver detalhes
                </a>
                <button class="btn btn-sm btn-outline-success" onclick="adicionarAoCarrinho(${produto.id})" title="Adicionar ao Carrinho">
                    <i class="bi bi-cart-plus"></i>
                </button>
            </div>
          `
        : `<button class="btn btn-sm btn-secondary w-100" disabled>Esgotado</button>`;

    const opacidade = produto.emEstoque ? '1' : '0.6';

    return `
        <div class="card-ml" style="opacity: ${opacidade}; height: 100%;">
            <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
            <div class="card-ml-body">
                <h3 class="card-ml-title">${produto.nome}</h3>
                <div class="mb-1">${estrelasHTML} <span class="text-muted small">(${produto.avaliacao})</span></div>
                
                ${precoAntigo ? `<div class="text-through">${precoAntigo}</div>` : ''}
                
                <div class="d-flex align-items-center flex-wrap">
                    <span class="card-ml-price me-2">${precoFormatado}</span>
                    ${produto.desconto > 0 ? `<span class="card-ml-discount">${produto.desconto}% OFF</span>` : ''}
                </div>

                ${produto.freteGratis ? `<div class="card-ml-frete">Frete grátis ⚡</div>` : '<div class="text-muted small mt-1">Frete a calcular</div>'}
                
                <div class="mt-auto pt-3">
                   ${botaoHTML}
                </div>
            </div>
        </div>
    `;
}

//RENDERIZAÇÃO DA GRADE
function renderizarProdutos(lista) {
    const container = document.getElementById('gradeProdutos');
    if (!container) return; 

    document.getElementById('contadorProdutos').innerText = `${lista.length} produtos encontrados`;
    container.innerHTML = '';

    lista.forEach(produto => {
        container.innerHTML += `<div class="col">${criarCardHTML(produto)}</div>`;
    });
}



// FUNÇÃO DE FILTRAR
function aplicarFiltros() {
    const termoBusca = document.getElementById('buscaNome').value.toLowerCase();
    const min = parseFloat(document.getElementById('precoMin').value) || 0;
    const max = parseFloat(document.getElementById('precoMax').value) || Infinity;

    const produtosFiltrados = produtosDB.filter(produto => {
        const nomeCorresponde = produto.nome.toLowerCase().includes(termoBusca);
        const precoCorresponde = produto.precoAtual >= min && produto.precoAtual <= max;
        return nomeCorresponde && precoCorresponde;
    });

    renderizarProdutos(produtosFiltrados);
}

// --- INICIALIZAÇÃO SEGURA ---
document.addEventListener('DOMContentLoaded', () => {
    // Esse IF impede que o código quebre na Página Inicial
    if (document.getElementById('gradeProdutos')) {
        renderizarProdutos(produtosDB);
        document.getElementById('buscaNome').addEventListener('input', aplicarFiltros);
    }
});