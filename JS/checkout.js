let valorFrete = 0;
let subtotalCarrinho = 0;

document.addEventListener('DOMContentLoaded', () => {
    //SEGURANÇA
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const carrinho = JSON.parse(localStorage.getItem('carrinhoLoja')) || [];

    if (!usuarioLogado) {
        alert("Faça login para continuar.");
        window.location.href = 'login.html';
        return;
    }

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        window.location.href = 'index.html';
        return;
    }

    //RENDERIZAR RESUMO
    const containerItens = document.getElementById('resumoItens');
    
    carrinho.forEach(item => {
        const totalItem = item.preco * item.quantidade;
        subtotalCarrinho += totalItem;

        containerItens.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2 small">
                <div>
                    <span class="fw-bold">${item.quantidade}x</span> ${item.nome.substring(0, 20)}...
                </div>
                <div>${totalItem.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </div>
        `;
    });

    atualizarValores();

    //MÁSCARAS DE INPUT (UX)
    configurarMascaras();
});

//FUNÇÃO DE CÁLCULO DE VALORES
function atualizarValores() {
    const divSubtotal = document.getElementById('resumoSubtotal');
    const divFrete = document.getElementById('resumoFrete');
    const divTotal = document.getElementById('resumoTotal');

    divSubtotal.innerText = subtotalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    if (valorFrete > 0) {
        divFrete.innerText = valorFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else if (valorFrete === 0 && document.getElementById('checkoutRua').value !== "") {
        divFrete.innerText = "Grátis";
        divFrete.classList.add('text-success');
    } else {
        divFrete.innerText = "Calculando...";
    }

    const totalFinal = subtotalCarrinho + valorFrete;
    divTotal.innerText = totalFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

//API DE FRETE
function calcularFreteCheckout() {
    const cepInput = document.getElementById('checkoutCep').value.replace(/\D/g, '');
    
    if (cepInput.length !== 8) {
        alert("CEP inválido");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
        .then(res => res.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado");
                return;
            }

            // Preenche campos
            document.getElementById('checkoutRua').value = data.logradouro;
            document.getElementById('checkoutBairro').value = data.bairro;
            document.getElementById('checkoutCidade').value = `${data.localidade}/${data.uf}`;
            document.getElementById('checkoutNumero').focus();

            //Lógica de Preço (SP/RJ mais barato)
            if (data.uf === 'SP' || data.uf === 'RJ') {
                valorFrete = 15.00;
            } else {
                valorFrete = 35.00;
            }
            
            atualizarValores();
        });
}

//MÁSCARAS E VALIDAÇÃO DE CARTÃO
function configurarMascaras() {
    // Máscara Cartão
    document.getElementById('ccNumero').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value;
    });

    // Máscara Validade
    document.getElementById('ccValidade').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
}

//FINALIZAÇÃO
function concluirCompra() {
    //DADOS DO FORMULÁRIO
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const telefone = document.getElementById('checkoutTelefone').value;
    const rua = document.getElementById('checkoutRua').value;
    const num = document.getElementById('checkoutNumero').value;
    const bairro = document.getElementById('checkoutBairro').value;
    const cidade = document.getElementById('checkoutCidade').value;
    const cep = document.getElementById('checkoutCep').value;
    const ccNum = document.getElementById('ccNumero').value.replace(/\D/g, '');

    //VALIDAÇÕES
    if (!usuarioLogado || !usuarioLogado.email) {
        alert("Erro: Não encontramos seu e-mail de cadastro. Por favor, faça login novamente.");
        return;
    }
    if (!telefone || telefone.length < 10) {
        alert("Preencha um telefone válido."); return;
    }
    if (!rua || !num) {
        alert("Complete o endereço."); return;
    }
    if (ccNum.length < 16) {
        alert("Cartão inválido."); return;
    }

    //BOTÃO LOADING
    const btn = document.querySelector('button[onclick="concluirCompra()"]');
    const textoOriginal = btn.innerText;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processando...';
    btn.disabled = true;

    //PREPARAR DADOS PARA O EMAIL
    const carrinho = JSON.parse(localStorage.getItem('carrinhoLoja'));

    // Cabeçalho do Recibo
    let listaTexto = "\n";
    
    carrinho.forEach(item => {
        const totalItem = item.preco * item.quantidade;
        const unitario = item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const subtotal = totalItem.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        listaTexto += `${item.quantidade}x ${item.nome} (${unitario})-----------${subtotal}\n`;
        listaTexto += "\n";
    });

    //Totais Finais
    const freteTexto = document.getElementById('resumoFrete').innerText;
    const totalFinal = document.getElementById('resumoTotal').innerText;
    
    const enderecoCompleto = `${rua}, ${num} - ${bairro}\n${cidade} - CEP: ${cep}`;

    //Parâmetros para o EmailJS
    const templateParams = {
        to_name: usuarioLogado.nome,
        to_email: usuarioLogado.email,
        telefone_contato: telefone,     
        lista_produtos: listaTexto,
        valor_frete: freteTexto,
        total_valor: totalFinal,
        endereco_cliente: enderecoCompleto
    };

    //ENVIAR EMAIL
    emailjs.send('service_ku506gj', 'template_mep2eos', templateParams)
        .then(() => {
            alert(`Compra Confirmada! \nRecibo enviado para: ${usuarioLogado.email}`);
            localStorage.removeItem('carrinhoLoja');
            window.location.href = 'index.html';
        })
        .catch((err) => {
            console.error(err);
            alert("Erro no envio do email, mas compra registrada.");
            localStorage.removeItem('carrinhoLoja');
            window.location.href = 'index.html';
        })
        .finally(() => {
            btn.innerHTML = textoOriginal;
            btn.disabled = false;
        });
}