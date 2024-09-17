import { login } from '../../api/auth/login';

export async function onLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const loginData = {
    email: email,
    password: password,
  };

  try {
    const response = await login(loginData);
    const userToken = response.data.accessToken;
    const name = response.data.name;

    if (userToken) {
      localStorage.setItem('userToken', userToken);
      localStorage.setItem('name', name);

      alert('Login successful!');
      window.location.href = '/index.html'; 
    } else {
      console.log('User Token not found in response:', response);
      alert('Login failed: Token not found.');
    }
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message);
  }
}