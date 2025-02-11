// Seleciona os elementos do DOM
const addButton = document.getElementById('addButton');
const itemInput = document.getElementById('itemInput');
const lista = document.getElementById('lista');

// Carregar itens da lista do localStorage (se houver)
function carregarLista() {
    const itens = JSON.parse(localStorage.getItem('itensLista')) || [];
    itens.forEach(itemText => {
        adicionarItemNaLista(itemText);
    });
}

// Função para adicionar um item à lista
function adicionarItemNaLista(itemText) {
    // Criação do novo elemento 'li'
    const newItem = document.createElement('li');
    newItem.textContent = itemText;

    // Criação do botão de remoção
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', function() {
        lista.removeChild(newItem);
        salvarLista(); // Salva a lista após remoção
    });

    // Adiciona o botão de remoção ao item
    newItem.appendChild(removeButton);

    // Adiciona o novo item à lista
    lista.appendChild(newItem);
}

// Função para salvar a lista no localStorage
function salvarLista() {
    const itens = [];
    const listaItems = lista.querySelectorAll('li');
    listaItems.forEach(item => {
        itens.push(item.firstChild.textContent); // Pega o texto do item
    });

    // Salva os itens no localStorage
    localStorage.setItem('itensLista', JSON.stringify(itens));
}

// Função para adicionar um item ao clicar no botão
addButton.addEventListener('click', function() {
    const itemText = itemInput.value.trim();

    if (itemText !== '') {
        adicionarItemNaLista(itemText);
        salvarLista(); // Salva a lista no localStorage
        itemInput.value = ''; // Limpa o campo de entrada
    }
});

// Adiciona a funcionalidade de pressionar "Enter" para adicionar um item
itemInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addButton.click();
    }
});

// Carregar a lista ao iniciar a página
carregarLista();