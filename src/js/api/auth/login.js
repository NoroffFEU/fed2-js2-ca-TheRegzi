export async function login({ email, password }) {
    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
  
      console.log('Response status:', response.status);
      console.log('Response OK:', response.ok);
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.errors?.[0]?.message || errorData.message || 'Login failed';
  
        throw new Error(errorMessage);
      }

      return await response.json();
  
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  }

