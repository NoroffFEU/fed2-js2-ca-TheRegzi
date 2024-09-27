import { register } from '../../api/auth/register';

/**
 * Handles user registration by collecting registration data from the form,
 * and calling the 'register' function. If the registration is successful,
 * the user is alerted and redirected to the login page. In case of failure,
 * an error is logged to the console and the user is alerted.
 * 
 * 
 * @param {Event} event The form submission event to prevent default behavior.
 * @returns {void} This function does not return any value.
 */

export async function onRegister(event) {
  event.preventDefault();

  const username = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const bio = document.getElementById('bio').value;
  const avatarUrl = document.getElementById('avatarUrl').value;
  

  const registrationData = {
    name: username,
    email: email,
    password: password,
    bio: bio || undefined,
    avatar: avatarUrl ? { url: avatarUrl, alt: 'Profile Avatar' } : undefined,
  };

  try {
    const response = await register(registrationData);
    alert('Registration successful!');
    window.location.href = '/auth/login/';
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.message);
  }
}
