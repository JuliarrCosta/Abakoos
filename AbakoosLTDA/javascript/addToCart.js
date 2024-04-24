
let cartItemCount = 0;

function addToCart(productName) {
  cartItemCount++;
  updateCartIcon();

}

function updateCartIcon() {
  const cartIcon = document.querySelector(".shopping .quantity");
  if (cartIcon) {
    cartIcon.textContent = cartItemCount;
  }
}
