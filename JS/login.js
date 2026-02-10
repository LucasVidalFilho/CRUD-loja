const formularioLogin = document.querySelector('form');

formularioLogin.addEventListener('submit', function(event) {
    event.preventDefault();

    const emailLogin = document.getElementById('email').value;
    const senhaLogin = document.getElementById('senha').value;

    //Busca a lista de usuários no LocalStorage
    let listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados') || '[]');

    //Procura um usuário que tenha o MESMO e-mail e a MESMA senha
    const usuarioEncontrado = listaUsuarios.find(usuario => 
        usuario.email === emailLogin && usuario.senha === senhaLogin
    );

    if (usuarioEncontrado) {
        //Se encontrou, salva uma sessão simples para sabermos quem está logado
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        
        alert(`Bem-vindo de volta, ${usuarioEncontrado.nome}!`);
        window.location.href = 'index.html';
    } else {
        alert("E-mail ou senha incorretos!");
    }
});