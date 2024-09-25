import { login } from '../../api/auth/login';

/**
 * Handles user login by collecting the email and password from the form,
 * then calls the 'login' function to authenticate the user via the API.
 * On successful login, the user's token and name are stored in localStorage,
 * and the user is redirected to the homepage. If unsuccessful, an error is logged 
 * to the console and an alert is shown to the user.
 * 
 * @param {Event} event The form submission event to prevent default behavior.
 * @returns {void} This function does not return any value.
 */

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