//Verifica se o usuário está logado. Se não estiver, chuta ele pro login.
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {
    window.location.href = 'login.html';
} else {
    //Preenche os campos com os dados atuais
    document.getElementById('nome').value = usuarioLogado.nome;
    document.getElementById('email').value = usuarioLogado.email;
    document.getElementById('senha').value = usuarioLogado.senha;
}

//Lógica para SAIR (Logout)
document.getElementById('btnSair').addEventListener('click', function() {
    localStorage.removeItem('usuarioLogado'); // Remove a sessão
    window.location.href = 'login.html'; // Manda pro login
});

//Lógica para SALVAR Alterações
document.getElementById('formPerfil').addEventListener('submit', function(event) {
    event.preventDefault();

    //Pega os novos valores
    const novoNome = document.getElementById('nome').value;
    const novaSenha = document.getElementById('senha').value;

    //Atualiza o objeto da sessão atual
    usuarioLogado.nome = novoNome;
    usuarioLogado.senha = novaSenha;
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

    //Atualiza a lista geral de cadastros
    let listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados') || '[]');
    
    //Encontra a posição do usuário na lista pelo email
    const index = listaUsuarios.findIndex(usuario => usuario.email === usuarioLogado.email);
    
    if (index !== -1) {
        listaUsuarios[index].nome = novoNome;
        listaUsuarios[index].senha = novaSenha;
        
        //Salva a lista atualizada
        localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios));
    }

    alert("Dados atualizados com sucesso!");
    
    // Recarrega a página para atualizar o nome na Navbar também
    location.reload(); 
});