import { API_AUTH_KEY } from "../constants";

/** 
 * Retrieves an API key associated with a specific name.
 * It uses a POST request to the API_AUTH_KEY endpoint and expects the user to be authenticated
 * via a 'userToken' stored in 'localStorage'. If no token, it throws an authentication error.
 * If server response is not ok, it throws a network error.
 * 
 * @param {string} name This is the name of the user.
 * @returns {Promise<string>} - A promise that resolves to the API key.
 * @throws {Error} - Throws an error if the user is not authenticated or if the request fails.
 * 
 */

export async function getKey(name) {
  const userToken = localStorage.getItem('userToken');

  if (!userToken) {
    throw new Error('User is not authenticated');
  } 
    try {
        const response = await fetch(API_AUTH_KEY, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: name ? JSON.stringify({ name }) : null,
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
