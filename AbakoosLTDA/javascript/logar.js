// Obter o estado de login do Local Storage
var loggedIn = localStorage.getItem('loggedIn');

function validateAndLogin() {

        // Obter os valores dos campos do formulário de login
        var loginEmail = document.getElementById('email').value;
        var loginPassword = document.getElementById('password').value;
    
        
        // Obter os dados do usuário do Local Storage
        var storedUserData = localStorage.getItem('userData');
        
        if (storedUserData) {
            var userData = JSON.parse(storedUserData);
            
            // Verificar se as credenciais estão corretas
            if (userData && userData.email === loginEmail && userData.password === loginPassword) {
                // Atualizar o valor de loggedIn para 'true'
                localStorage.setItem('loggedIn', 'true');
            } else {
              alert('Senha ou login incorretos');
            }
        }
        

    }

    localStorage.removeItem('errorMessage');
    if (loggedIn === 'true') {
        // Já está logado, redirecionar para a página principal
        window.location.href = "../AbakoosLTDA/index.html";

    }
