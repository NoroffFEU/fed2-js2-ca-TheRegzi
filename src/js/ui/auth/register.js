import { register } from '../../api/auth/register';

export async function onRegister(event) {
  event.preventDefault();

  const username = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const bio = document.getElementById('bio').value;
  const avatarUrl = document.getElementById('avatarUrl').value;
  const avatarAlt = document.getElementById('avatarAlt').value;
  

  const registrationData = {
    name: username,
    email: email,
    password: password,
    bio: bio || undefined,
    avatar: avatarUrl ? { url: avatarUrl, alt: avatarAlt || '' } : undefined,
    
  };

  console.log('Registration Data:', registrationData);

  try {
    // Call the register function
    const response = await register(registrationData);
    
    // Since the request was successful if we reach this point, show success message
    alert('Registration successful!');
    window.location.href = '/auth/login/';
    
  } catch (error) {
    // Handle errors thrown by the register function
    console.error("Registration error:", error);
    alert(error.message);
  }
}
