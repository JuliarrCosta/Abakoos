document.addEventListener("DOMContentLoaded", function () {
    // Chama a função para exibir os itens do carrinho ao carregar a página
    displayCartItems();
    
    function displayCartItems() {
        var cartTable = document.getElementById("root");
        var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        cartTable.innerHTML = '';

        cartItems.forEach(function (item) {
            var productObject = item.productObject;
            addToCartTableDOM(cartTable, productObject, item.productId);
        });

        // Atualiza o total ao exibir os itens
        updateTotalAmount();
    }

    function addToCartTableDOM(cartTable, productObject, productId) {
        var cartRow = cartTable.insertRow();
        var imgCell = cartRow.insertCell(0);
        var nameCell = cartRow.insertCell(1);
        var quantityCell = cartRow.insertCell(2);
        var priceCell = cartRow.insertCell(3);
        var removeCell = cartRow.insertCell(4);

        imgCell.innerHTML = `<img src="${productObject.image}" alt="${productObject.name}" style="width: 50px;">`;
        nameCell.textContent = productObject.name;

        var quantityInput = document.createElement("input");
        quantityInput.setAttribute("type", "number");
        quantityInput.setAttribute("min", "1");
        quantityInput.setAttribute("value", productObject.quantity) || 1;
        quantityInput.classList.add("quantity-input");

        // Adiciona um evento de input para atualizar a quantidade no objeto e salvar no localStorage
        quantityInput.addEventListener("input", function () {
            var newQuantity = parseInt(quantityInput.value, 10) || 1;
            updateQuantityInLocalStorage(productId, newQuantity);
            updatePriceAndTotal(productId, newQuantity); // Atualiza preço e total ao alterar a quantidade
        });

        quantityCell.appendChild(quantityInput);

        // Define o preço na célula
        priceCell.textContent = `R$${(productObject.price * productObject.quantity).toFixed(2)}`;

        var removeIcon = document.createElement("img");
        removeIcon.src = "../AbakoosLTDA/images/remove.png";
        removeIcon.classList.add("remove-icon");
        removeIcon.alt = "Remover";

        removeIcon.addEventListener("click", function () {
            removeProductFromTable(productId);
        });

        removeCell.appendChild(removeIcon);
        
    }

    function updateQuantityInLocalStorage(productId, newQuantity) {
        var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Encontrar e atualizar a quantidade no array com base no ID do produto
        var indexToUpdate = cartItems.findIndex(function (item) {
            return item.productId === productId;
        });

        if (indexToUpdate !== -1) {
            cartItems[indexToUpdate].productObject.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }

    function removeProductFromTable(productId) {
        var cartTable = document.getElementById("root");
        var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        var indexToRemove = cartItems.findIndex(function (item) {
            return item.productId === productId;
        });

        if (indexToRemove !== -1) {
            cartItems.splice(indexToRemove, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            displayCartItems();
        }
    }

    // Função para calcular e atualizar o preço e o total
    function updatePriceAndTotal(productId, newQuantity) {
        var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        var totalAmount = 0;

        cartItems.forEach(function (item) {
            if (item.productId === productId) {
                item.productObject.quantity = newQuantity; // Atualiza a quantidade no objeto do produto
            }

            totalAmount += item.productObject.price * (item.productObject.quantity || 1);
        });

        // Atualiza os elementos HTML com os totais
        document.getElementById("totalA").textContent = `R$${totalAmount.toFixed(2)}`;
        document.getElementById("totalB").textContent = `R$${totalAmount.toFixed(2)}`;

        // Atualiza o preço na tabela
        var cartTable = document.getElementById("root");
        cartTable.innerHTML = ''; // Limpa a tabela

        // Adiciona os itens de volta à tabela com os preços atualizados
        cartItems.forEach(function (item) {
            var productObject = item.productObject;
            addToCartTableDOM(cartTable, productObject, item.productId);
        });
    }
    updateTotalAmount();
    
    
});

// Função para calcular e atualizar o total dos preços na variável totalA e totalB
function updateTotalAmount() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var totalAmount = 0;

    cartItems.forEach(function (item) {
        totalAmount += item.productObject.price * (item.productObject.quantity || 1);
    });

    // Atualiza os elementos HTML com os totais
    document.getElementById("totalA").textContent = `R$${totalAmount.toFixed(2)}`;
    document.getElementById("totalB").textContent = `R$${totalAmount.toFixed(2)}`;
}

function applyDiscount() {
    var promoInput = document.querySelector('input[type="text"]');
    var promoValue = promoInput.value.trim().toUpperCase(); // Converte para maiúsculas para garantir a comparação sem distinção entre maiúsculas e minúsculas
    var discountDiv = document.querySelector('.discount');

    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var totalAmount = 0;

    // Calcula o valor total antes do desconto
    cartItems.forEach(function (item) {
        totalAmount += item.productObject.price * (item.productObject.quantity || 1);
    });

    // Aplica o desconto apenas se o código promocional for "UTFPR"
    if (promoValue === "UTFPR") {
        var discountAmount = totalAmount * 0.15;
        var discountedTotal = totalAmount - discountAmount;

        // Atualiza os elementos HTML com o valor total descontado e exibe o desconto
        document.getElementById("totalA").textContent = `R$${discountedTotal.toFixed(2)}`;
        document.getElementById("totalB").textContent = `R$${discountedTotal.toFixed(2)}`;
        discountDiv.textContent = `Desconto aplicado: -R$${discountAmount.toFixed(2)}`;
    } else {
        alert("Código promocional inválido");
        discountDiv.textContent = ""; // Limpa a div de desconto se o código for inválido
    }
}

