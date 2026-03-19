// 1. Inicia o carrinho buscando o que está salvo no navegador (localStorage)
let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

// 2. Função para atualizar o visual do carrinho (lista e contador)
function atualizarCarrinho() {
    let lista = document.getElementById("listaCarrinho");
    let total = 0;

    if (lista) {
        lista.innerHTML = "";
        carrinho.forEach((item, index) => {
            // Se o preço não existir (por ser personalizado), definimos um padrão ou pegamos do item
            let precoItem = item.preco ? parseFloat(item.preco) : 0;
            total += precoItem;

            let li = document.createElement("li");
            li.style.listStyle = "none";
            li.style.padding = "10px";
            li.style.borderBottom = "1px solid #eee";
            
            // Mostra o nome e o detalhe (como o tamanho da camiseta)
            li.innerHTML = `
                <strong>${item.nome}</strong> ${item.detalhes !== 'Padrão' ? '('+item.detalhes+')' : ''} 
                <button onclick="removerItem(${index})" style="float:right; border:none; background:none; cursor:pointer;">❌</button>
            `;
            lista.appendChild(li);
        });
    }

    // Atualiza o contador de itens no ícone azul (se ele existir na página atual)
    let contador = document.getElementById("contagem-carrinho");
    if (contador) {
        contador.innerText = carrinho.length;
    }

    // Salva a lista atualizada no navegador para não perder os dados
    localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));
}

// 3. Função para produtos que têm tamanho (Camisetas)
function adicionarDireto(nome, idSeletor) {
    const seletor = document.getElementById(idSeletor);
    const tamanho = seletor ? seletor.value : "Padrão";
    
    carrinho.push({ nome: nome, detalhes: tamanho });
    atualizarCarrinho();
    alert(nome + " (" + tamanho + ") adicionado!");
}

// 4. Função para produtos simples (Canecas, etc)
function adicionarSimples(nome) {
    carrinho.push({ nome: nome, detalhes: "Padrão" });
    atualizarCarrinho();
    alert(nome + " adicionado ao carrinho!");
}

// 5. Remover item
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// 6. Finalizar e mandar para o WhatsApp
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let numero = "5541991530405"; // Seu número
    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:%0A%0A";

    carrinho.forEach(item => {
        mensagem += `• ${item.nome} [${item.detalhes}]%0A`;
    });

    let url = `https://wa.me/${numero}?text=${mensagem}`;
    window.open(url, '_blank');
}

// Executa a atualização assim que o script carrega
atualizarCarrinho();

function abrirModal(nome, imagemPrincipal) {
    document.getElementById('modalProduto').style.display = "block";
    document.getElementById('modalNome').innerText = nome;
    document.getElementById('fotoPrincipal').src = imagemPrincipal;
}

function fecharModal() {
    document.getElementById('modalProduto').style.display = "none";
}

function mudarFoto(src) {
    document.getElementById('fotoPrincipal').src = src;
}

// Fecha o modal se clicar fora da caixa branca
window.onclick = function(event) {
    let modal = document.getElementById('modalProduto');
    if (event.target == modal) {
        fecharModal();
    }
}