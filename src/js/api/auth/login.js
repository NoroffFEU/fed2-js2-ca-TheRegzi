/**
 * Function to login a user by their email and password, by sending a POST request to the login API.
 * If the response is not okay, it throws a login error with a message from the API or a default message.
 * 
 * @async
 * @param {string} email The users registered email address.
 * @param {string} password The users registered password.
 * @returns {Promise<object>} A promise that returns the response in json.
 * @throws {Error} Throws an error if the login fails or the response is not okay.
 */

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

