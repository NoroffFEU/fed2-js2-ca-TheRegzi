export async function register({
  name,
  email,
  password,
  bio,
  avatar
}) {
  try {
    const response = await fetch('https://v2.api.noroff.dev/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        bio: bio || undefined,
        avatar: avatar?.url ? { url: avatar.url, alt: avatar.alt || '' } : undefined,
      })
    });

    console.log('Response status:', response.status);
    console.log('Response OK:', response.ok);


    if (!response.ok) {
      const errorData = await response.json();
      console.error('Full error response:', errorData);

      let errorMessage = 'Unknown error';
      if (errorData.errors && errorData.errors.length > 0) {
        errorMessage = errorData.errors.map(e => e.message).join(', ');
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }

      console.error('Extracted error message:', errorMessage);
      throw new Error(`Registration failed: ${errorMessage}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}