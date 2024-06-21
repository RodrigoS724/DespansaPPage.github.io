document.getElementById('loginForm').onsubmit = async function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const gmail = document.getElementById('Lgmail').value;
    const pass = document.getElementById('Lpass').value;
    const url = `http://127.0.0.1:3000/login/${gmail}&${pass}`;

    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        const data = await response.json();

        
        if (data.message) {
        window.prompt(document.getElementsByClassName('response').innerText = data.message);
        }

        if (data.name && data.email) {
            document.getElementsByClassName('response').innerText = `Welcome ${data.name} (${data.email})`;
        }

    } catch (error) {
        console.error('Error:', error);
        document.getElementsByClassName('response').innerText = 'Error: ' + error.message;
    }
};

document.getElementById('registerForm').onsubmit = async function(event) {
  event.preventDefault(); 

  const name = document.getElementById('Rname').value;
  const gmail = document.getElementById('Rgmail').value;
  const pass = document.getElementById('Rpass').value;
  const Vpass = document.getElementById('RVpass').value;
  const url = `http://127.0.0.1:3000/register`;

  if (pass !== Vpass) {
      document.getElementsByClassName('response').innerText = 'Las contraseñas no coinciden';
      return;
  }

  const formData = {
      name: name,
      gmail: gmail,
      password: pass
  };

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
          document.getElementById('response').innerText = 'Registro exitoso';
      } else {
          document.getElementById('response').innerText = 'Error: ' + data.message;
      }
  } catch (error) {
      console.error('Error:', error);
      document.getElementById('response').innerText = 'Error: ' + error.message;
  }
};

function changeTab(ref){
    try {
    if(ref.getAttribute("data-tab") == "login"){
      document.getElementById("form-body").classList.remove('active');
      ref.parentNode.classList.remove('signup');
    } else {
      document.getElementById("form-body").classList.add('active');
      ref.parentNode.classList.add('signup');
    }
    } catch(msg){
      console.log(msg);
    }
  }