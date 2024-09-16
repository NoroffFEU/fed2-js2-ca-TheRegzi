export async function getKey(name) {
    try {
        const response = await fetch('https://v2.api.noroff.dev/auth/create-api-key', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        return data.data.key; 
      } catch (error) {
        console.error('Error creating or retrieving API key:', error);
        throw error;
      }
    }
