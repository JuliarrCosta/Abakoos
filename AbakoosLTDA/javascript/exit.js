function exit(){
    // Alterar o status loggedIn para false
    localStorage.setItem('loggedIn', 'false');
    location.reload(true);
  }