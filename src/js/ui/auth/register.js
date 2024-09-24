import { register } from '../../api/auth/register';

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
