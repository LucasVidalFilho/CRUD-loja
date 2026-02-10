//VARIÁVEL GLOBAL (Para guardar o produto e usar no cálculo de frete)
let produtoSelecionado = null;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const idProduto = params.get('id');

    if (!idProduto) {
        window.location.href = 'index.html';
        return;
    }

    // Busca no DB e salva na variável global
    produtoSelecionado = produtosDB.find(p => p.id == parseInt(idProduto));

    if (!produtoSelecionado) {
        alert("Produto não encontrado!");
        window.location.href = 'index.html';
        return;
    }

    //PREENCHIMENTO DO HTML
    document.title = `${produtoSelecionado.nome} - Loja CRUD`;

    document.getElementById('imgProduto').src = produtoSelecionado.imagem;
    document.getElementById('catProduto').innerText = produtoSelecionado.categoria;
    document.getElementById('nomeProduto').innerText = produtoSelecionado.nome;
    document.getElementById('codProduto').innerText = `#${produtoSelecionado.id}`;

    const precoFormatado = produtoSelecionado.precoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('precoAtual').innerText = precoFormatado;

    if (produtoSelecionado.precoOriginal > 0) {
        document.getElementById('precoAntigo').innerText = produtoSelecionado.precoOriginal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else {
        document.getElementById('precoAntigo').style.display = 'none';
    }

    if (produtoSelecionado.desconto > 0) {
        document.getElementById('descontoProduto').innerText = `${produtoSelecionado.desconto}% OFF`;
    } else {
        document.getElementById('descontoProduto').style.display = 'none';
    }

    //Lógica visual do Frete
    const freteElem = document.getElementById('freteTexto');
    if (produtoSelecionado.freteGratis) {
        freteElem.innerHTML = '<i class="bi bi-truck"></i> Frete Grátis disponível!';
        freteElem.classList.add('text-success');
    } else {
        freteElem.innerText = 'Consulte o prazo de entrega';
        freteElem.classList.remove('text-success');
        freteElem.classList.add('text-muted');
    }

    const estoqueElem = document.getElementById('estoqueProduto');
    if (produtoSelecionado.emEstoque) {
        estoqueElem.innerText = "Em estoque";
        estoqueElem.classList.add('text-success');
    } else {
        estoqueElem.innerText = "Indisponível";
        estoqueElem.classList.add('text-danger');
        document.querySelectorAll('button').forEach(btn => btn.disabled = true);
    }

    const divEstrelas = document.getElementById('avaliacaoProduto');
    let estrelasHTML = '';
    for (let i = 1; i <= 5; i++) {
        estrelasHTML += i <= produtoSelecionado.avaliacao 
            ? '<i class="bi bi-star-fill"></i> ' 
            : '<i class="bi bi-star"></i> ';
    }
    divEstrelas.innerHTML = `${estrelasHTML} <span class="text-muted ms-2">(${produtoSelecionado.avaliacao} avaliações)</span>`;

    document.getElementById('descProduto').innerText = `Aproveite o melhor de ${produtoSelecionado.categoria} com o ${produtoSelecionado.nome}. Item original e com garantia.`;


    //Adicionar ao carrinho ou comprar direto
    const btnAdd = document.getElementById('btnAdicionarCarrinho');
    const btnBuy = document.getElementById('btnComprarAgora');

    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            // Chama a função global do arquivo carrinho.js
            adicionarAoCarrinho(produtoSelecionado.id); 
        });
    }

    if (btnBuy) {
        btnBuy.addEventListener('click', () => {
            adicionarAoCarrinho(produtoSelecionado.id);
            window.location.href = 'checkout.html';
        });
    }
});

//FUNÇÃO DE CÁLCULO DE FRETE
function calcularFrete() {
    const cepInput = document.getElementById('inputCep').value;
    const resultadoDiv = document.getElementById('resultadoFrete');
    
    if (!produtoSelecionado) return;

    const cep = cepInput.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 dígitos.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado!");
                resultadoDiv.classList.add('d-none');
                return;
            }

            //DEFINIR PREÇO BASE
            let precoSedex, prazoSedex, precoPac, prazoPac;

            if (data.uf === 'SP' || data.uf === 'RJ') {
                precoSedex = 25.90;
                prazoSedex = "1 a 2 dias úteis";
                precoPac = 15.50;
                prazoPac = "5 a 7 dias úteis";
            } else if (['MG', 'PR', 'SC', 'RS', 'ES'].includes(data.uf)) {
                precoSedex = 35.90;
                prazoSedex = "3 dias úteis";
                precoPac = 22.00;
                prazoPac = "7 a 10 dias úteis";
            } else {
                precoSedex = 55.00;
                prazoSedex = "5 dias úteis";
                precoPac = 35.00;
                prazoPac = "10 a 15 dias úteis";
            }

            //APLICAR FRETE GRÁTIS
            // Se o produto for Frete Grátis, zera o valor do PAC (Normal)
            if (produtoSelecionado.freteGratis) {
                precoPac = 0;
            }

            //ATUALIZAR HTML
            
            //SEDEX
            document.getElementById('precoSedex').innerText = `R$ ${precoSedex.toFixed(2).replace('.', ',')}`;
            document.getElementById('prazoSedex').innerText = `Chega em ${prazoSedex}`;
            
            // PAC (Normal) - Verificação visual
            const divPrecoPac = document.getElementById('precoPac');
            if (precoPac === 0) {
                divPrecoPac.innerText = "Grátis";
                divPrecoPac.classList.add("text-success");
            } else {
                divPrecoPac.innerText = `R$ ${precoPac.toFixed(2).replace('.', ',')}`;
                divPrecoPac.classList.remove("text-success");
            }
            
            document.getElementById('prazoPac').innerText = `Chega em ${prazoPac}`;

            // Endereço
            document.getElementById('enderecoDestino').innerText = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
            resultadoDiv.classList.remove('d-none');
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao consultar CEP.");
        });
}



//Máscara de CEP
document.getElementById('inputCep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5, 8);
    }
    e.target.value = value;
});