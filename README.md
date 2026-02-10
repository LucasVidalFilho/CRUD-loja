# 📦 Loja CRUD - E-commerce Front-End

> Um simulador de loja virtual completo desenvolvido com JavaScript, focado em manipulação de DOM, consumo de APIs e persistência de dados local.

## 💻 Sobre o Projeto

Este projeto é uma aplicação Single Page Application (SPA) simulada, onde o foco foi criar uma experiência de e-commerce fluida sem a necessidade de um Back-End complexo. 

O sistema simula um banco de dados via JSON, gerencia estado com LocalStorage e utiliza APIs externas para enriquecer a experiência do usuário (cálculo de frete e envio de e-mails transacionais).

### 📸 Screenshots

| Home (Carrossel) | Detalhes do Produto |
|:---:|:---:|
|<img width="1851" height="918" alt="image" src="https://github.com/user-attachments/assets/38ec4d5c-bb0e-4ce8-8fcd-dca47dee43d9" /> | <img width="1850" height="912" alt="image" src="https://github.com/user-attachments/assets/3d3b2b0a-10a1-4dd9-a40a-a4fffac306df" />|

| Carrinho (Offcanvas) | Checkout & Email |
|:---:|:---:|
|<img width="1842" height="883" alt="image" src="https://github.com/user-attachments/assets/e36dc86c-b5aa-4e36-aaf7-01f6730bacd1" /> |<img width="1835" height="884" alt="image" src="https://github.com/user-attachments/assets/cc75dd21-83ac-4392-a0f6-2124d622028c" /> |

---

## ✨ Funcionalidades Principais

- **🏠 Home Dinâmica:** Carrossel de produtos gerado aleatoriamente a cada visita.
- **🔍 Filtros e Busca:** Filtragem em tempo real por nome e faixa de preço.
- **🛒 Carrinho de Compras:**
  - Adicionar/Remover itens.
  - Ajuste de quantidade.
  - Persistência de dados via `localStorage` (o carrinho não se perde ao atualizar a página).
  - Acesso via Offcanvas (Menu lateral) em todas as páginas.
- **📦 Cálculo de Frete:**
  - Integração com API **ViaCEP** para preenchimento automático de endereço.
  - Lógica de precificação baseada na região (UF) do usuário.
  - Suporte a regras de "Frete Grátis".
- **💳 Checkout Seguro:**
  - Validação de formulários com Regex (Cartão de Crédito e Telefone).
  - Máscaras de input em tempo real.
- **📧 Notificações:** Integração com **EmailJS** para envio automático de recibo detalhado para o e-mail do cliente após a compra.

---

## 🛠 Tecnologias Utilizadas

- **HTML5** (Semântico)
- **CSS3** (Customizado + Responsivo)
- **Bootstrap 5** (Grid System, Modais, Offcanvas e Utilitários)
- **JavaScript**
- **APIs Externas:**
  - [ViaCEP](https://viacep.com.br/) (Busca de endereços)
  - [EmailJS](https://www.emailjs.com/) (Envio de e-mails sem backend)

---

## 🚀 Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/LucasVidalFilho/CRUD-loja.git](https://github.com/LucasVidalFilho/CRUD-loja.git)

   Abra o projeto:
**2. Navegue até a pasta e abra o arquivo index.html no seu navegador.**

    Dica: Para uma melhor experiência, utilize a extensão Live Server do VS Code.

**3. Configuração do EmailJS (Opcional):**
  Para que o envio de e-mails funcione no seu clone local, você precisará de suas próprias chaves de API.

  Crie uma conta no EmailJS.

  Substitua a PUBLIC_KEY no arquivo checkout.html.

  Substitua o SERVICE_ID e TEMPLATE_ID no arquivo JS/checkout.js.

  
👨‍💻 Autor
Desenvolvido por [Lucas Vidal].

Esse projeto foi desenvolvido como parte do meu portfólio de Desenvolvimento Web Front-End.
