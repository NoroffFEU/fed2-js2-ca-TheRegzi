import { getKey } from "./auth/key";

/**
 * Constructs and returns the headers needed for API requests.
 * 
 * This function sets the `'Content-Type': 'application/json'` header for all requests.
 * If available, it also appends the API key and the user's authentication token from localStorage.
 * 
 * - The API key (`X-Noroff-API-Key`) is retrieved via `getKey('My API Key Name')`.
 * - The Authorization token (`Bearer token`) is retrieved from localStorage.
 * 
 * @returns {Headers} An instance of the Headers object to be used in API requests.
 * 
 */

export async function headers() {
  const headers = new Headers();
 
  const apiKey = await getKey('My API Key Name'); 
  const userToken = localStorage.getItem('userToken');

  headers.append('Content-Type', 'application/json');

  if (apiKey) {
    headers.append('X-Noroff-API-Key', apiKey);
  }

  if (userToken) {
    headers.append('Authorization', `Bearer ${userToken}`);
  }

  return headers;
}