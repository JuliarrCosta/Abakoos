
// Recuperar os dados do Local Storage
var storedUserData = localStorage.getItem('userData');

// Verificar se há dados armazenados
if (storedUserData) {
  // Converter os dados JSON para objeto JavaScript
  var userData = JSON.parse(storedUserData);

  // Verificar se os dados do usuário existem
  if (userData && userData.name) {
    // Atualizar o conteúdo da div com o nome do usuário
    var userDiv = document.getElementById('user');
    if (userDiv) {
      userDiv.textContent = "OLÁ, " + userData.name + "!";
    }
  }
}

var loggedIn = localStorage.getItem('loggedIn');

if(loggedIn === 'false'){
    var userDiv = document.getElementById('user');
    if (userDiv) {
      userDiv.textContent = "";
    }
}