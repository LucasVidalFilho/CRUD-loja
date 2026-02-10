// Seleciona o formulário de cadastro na página
const formularioCadastro = document.querySelector('form');

formularioCadastro.addEventListener('submit', function(event) {
    event.preventDefault();

    //Captura os valores dos inputs
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    // 2. Validações básicas
    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    //Recupera os usuários que já estão salvos (ou cria uma lista vazia)
    //JSON.parse para transformar o texto do localStorage em um Array
    let listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados') || '[]');

    // Verifica se o e-mail já existe
    const usuarioExiste = listaUsuarios.find(usuario => usuario.email === email);
    
    if (usuarioExiste) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    //Objeto do novo usuário
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    // Adiciona o novo usuário na lista
    listaUsuarios.push(novoUsuario);

    //Salva a lista atualizada no LocalStorage
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios));

    alert("Cadastro realizado com sucesso!");
    
    // Redireciona para a tela de login
    window.location.href = 'login.html';
});