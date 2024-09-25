import { headers } from "../headers";
import { API_SOCIAL_PROFILES } from "../constants";
import { fetchProfile } from "./read";

/**
 * This function fetches the logged-in user's profile using the stored username from `localStorage`, 
 * and populates the 'update' form fields with the user's bio and avatar URL.
 * Logs an error to the console if it fails to fetch the profile data.
 * 
 * @returns {void}
 * @throws {Error} Throws an error if it fails to fetch the profile data.
 */

async function populateForm() {
    try {
        const username = localStorage.getItem('name'); 
        const profileData = await fetchProfile(username); 
        
        document.getElementById('update-bio').value = profileData.bio || '';
        document.getElementById('update-avatar').value = profileData.avatar?.url || '';
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
}

populateForm();

/**
 * Updates the profile data of the logged in user by sending a 'PUT' request to the API.
 * It updates the profile's bio and avatar by sending new data to the API.
 * If the update request fails, an error is thrown with a message from the API or a default message.
 * 
 * @param {string} username The username of the logged-in user whose profile is being updated.
 * @param {string} avatar The URL of the user's avatar.
 * @returns {Promise<object>} A promise that resolves to the updated profile data in JSON format.
 * @throws {Error} Throws an error message from the API or a default message if the update fails or response is not okay. 
 */

export async function updateProfile(username, { bio, avatar }) {

    const apiUrl = `${API_SOCIAL_PROFILES}/${username}`;

    try {
        const requestHeaders = await headers();
        const response = await fetch(apiUrl, {
            method: 'PUT',  
            headers: requestHeaders,
            body: JSON.stringify({
                bio,
                avatar  
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update profile: ${errorData.message || response.status}`);
        }

        const updatedProfile = await response.json();
        console.log('Profile successfully updated:', updatedProfile);
        return updatedProfile; 

    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}
