import { headers } from "../headers";
import { API_SOCIAL_PROFILES } from "../constants";

/**
 * Fetches the profile data of the logged in user by sending a 'GET' request to the API. 
 * Retrieves the username from 'localStorage' (under the key 'name'), to fetch the logged in users profile.
 * If fetching fails or the response is not okay, it throws an error.
 * 
 * @async
 * @returns {Promise<object>} A promise that resolves to the profile data object of the logged-in user.
 * @throws {Error} Throws an error if fetching fails or response is not okay, including an error message from the API. 
 * 
 */

export async function fetchProfile() {

    const username = localStorage.getItem('name');
    const apiUrl = `${API_SOCIAL_PROFILES}/${username}`;
    
    try {
        const requestHeaders = await headers();
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: requestHeaders,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch profile: ${errorData.message || response.status}`);
        }

        const data = await response.json();
        return data.data;

    } catch (error) {
        console.error('Error getting profile details:', error);
        throw error;
    }
}

/**
 * Displays the users profile by dynamically creating the necessary HTML elements.
 * 
 * This function fetches the profile data of the logged-in user using `fetchProfile`, including `name`, `bio` and `avatar`.
 * It creates the structure for the profile and appends it to the 'container'.
 * 
 * @async
 * @param {object} data The profile data object of the logged-in user.
 * @returns {void}
 */

 export async function displayLoggedInUserProfile(data) {

    const profileData = await fetchProfile();
    
    const container = document.getElementById('profileDetails');
    container.innerHTML = ''; 

    const profileElement = document.createElement('div');
    profileElement.classList.add('profile');

    const username = document.createElement('h2');
    username.textContent = profileData.name;

    const content = document.createElement('p');
    content.textContent = profileData.bio;

    if (profileData.avatar && profileData.avatar.url) {
        const image = document.createElement('img');
        image.src = profileData.avatar.url;
        image.alt = profileData.avatar.alt || 'Profile Avatar';
        image.classList.add('profile-image');

    profileElement.appendChild(image);

    } 
    

    profileElement.appendChild(username);
    profileElement.appendChild(content);

    container.appendChild(profileElement);
}

export async function readProfiles(limit, page) {}
