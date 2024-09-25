/**
 * Registers a new user by sending their details to the register API. 
 * User gets registered by sending a POST request with their name, email and password. 
 * The bio and avatar fields are optional.
 * If the registration fails, it throws an error with a message from the API or a default message.
 * 
 * @async
 * @param {string} name The username of the new user.
 * @param {string} email The email address of the new user.
 * @param {string} password The password for the new user.
 * @param {string} [bio] A brief bio for the user's profile.
 * @param {string} [avatar] The avatar image object, containing a `url` and an `alt` description.
 * @param {string} [avatar.url] - The URL of the user's avatar image.
 * @param {string} [avatar.alt] - The alternative text for the avatar image.
 * @returns {Promise<object>} A promise that resolves to the response data in JSON format.
 * @throws {Error} Throws an error if the registration fails or the response is not okay.
 */

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