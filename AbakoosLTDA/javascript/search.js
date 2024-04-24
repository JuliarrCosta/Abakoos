document.addEventListener("DOMContentLoaded", function () {
    // Função para realizar a busca
    function search() {
        // Obtém o valor inserido na barra de pesquisa
        var searchTerm = document.getElementById("search-bar").value.toLowerCase();

        // Obtém todos os elementos com a classe "product-card"
        var productCards = document.querySelectorAll(".product-cart-tot");

        // Itera sobre os elementos e verifica se o nome do produto corresponde ao termo de pesquisa
        productCards.forEach(function (card) {
            var productName = card.querySelector(".product-name").textContent.toLowerCase();

            // Se o nome do produto contiver o termo de pesquisa, mostra o produto, caso contrário, oculta
            if (productName.includes(searchTerm)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Adiciona um evento de entrada à barra de pesquisa
    document.getElementById("search-bar").addEventListener("input", search);
});