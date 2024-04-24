function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var cpf = document.getElementById('cpf').value;
    var cep = document.getElementById('cep').value;
    var birthdate = document.getElementById('birthdate').value;
    var password = document.getElementById('password').value;
  
    // Validar se os campos estão vazios
    if (!name || !email || !cpf || !cep || !birthdate || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    // Validar o formato do e-mail
    var emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
  
    // Validar se o CPF contém apenas números e é válido
    if (!/^\d{11}$/.test(cpf) || !validateCPF(cpf)) {
      alert('Por favor, insira um CPF válido.');
      return;
    }
  
    // Validar o formato do CEP
    if (!/^\d{8}$/.test(cep)) {
      alert('Por favor, insira um CEP válido.');
      return;
    }
  
    // Validar a data de nascimento
    var birthdateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!birthdateRegex.test(birthdate) || !validateBirthdate(birthdate)) {
      alert('Por favor, insira uma data de nascimento válida (DD/MM/AAAA) e certifique-se de ter pelo menos 18 anos.');
      return;
    }
  
    // Validar a senha
    if (password.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres.');
      return;
    }
  
    // Se todas as validações passarem, exiba uma mensagem de sucesso
    alert('Cadastro realizado com sucesso!');
  
  
  function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
  
    // Validação do CPF usando algoritmo específico
    var add = 0;
    for (var i = 0; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
    var rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
  
    add = 0;
    for (i = 0; i < 10; i++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
  
    return true;
  }
  
  function validateBirthdate(birthdate) {
    var parts = birthdate.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);
  
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var age = currentYear - year;
  
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return false;
    }
  
    if (month < 1 || month > 12) {
      return false;
    }
  
    if (day < 1 || day > 31) {
      return false;
    }
  
    if (year > currentYear || age < 18) {
      return false;
    }
    return true;
  
  }

  var userData = {
    name: name,
    email: email,
    cpf: cpf,
    cep: cep,
    birthdate: birthdate,
    password: password
  };
  
    // Obter dados armazenados
    var storedData = localStorage.getItem('userDataArray');

    // Verificar se já existe um array no localStorage
    var userDataArray = storedData ? JSON.parse(storedData) : [];

    // Adicionar o novo objeto ao array
    userDataArray.push(userData);

    // Armazenar o array atualizado no localStorage
    localStorage.setItem('userDataArray', JSON.stringify(userDataArray));

    // Simular um login automático
    localStorage.setItem('loggedIn', 'true');

    // Redirecionar para a página principal
  }
  var loggedIn = localStorage.getItem('loggedIn');
  if (loggedIn === 'true') {
      window.location.href = "../AbakoosLTDA/index.html";
  }