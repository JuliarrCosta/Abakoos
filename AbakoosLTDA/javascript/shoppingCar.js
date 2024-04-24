function addToCartTable(productId) {
    var loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn === 'true') {
        var productElement = document.getElementById(productId);

        var productName = productElement.getAttribute("product-name");
        var productPrice = productElement.getAttribute("price");
        var productImage = productElement.getAttribute("image");

        var productQuantity = document.createElement("input");
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("value", "1");
        productQuantity.classList.add("quantity-input");

        var productRemove = document.createElement("img");
        productRemove.src = "../AbakoosLTDA/images/remove.png";
        productRemove.classList.add("remove-icon");
        productRemove.alt = "Remover";
        productRemove.addEventListener("click", function () {
            removeProduct(productId);
        });

        var productObject = {
            name: productName,
            image: productImage,
            price: productPrice,
            quantity: productQuantity,
            remove: productRemove
        };
        saveToLocalStorage(productId, productObject);
        anchorShoppingCart();
    } else {
        alert('Você precisa estar logado para adicionar itens ao carrinho.');
        // Pode redirecionar para a página de login ou tomar outra ação apropriada.
    }
}

function saveToLocalStorage(productId, productObject) {
    // Obtém o carrinho atual do localStorage ou cria um novo array se não existir
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Adiciona o novo item ao array
    cartItems.push({
        productId: productId,
        productObject: productObject
    });

    // Atualiza o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}
