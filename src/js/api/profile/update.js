import { headers } from "../headers";
import { API_SOCIAL_PROFILES } from "../constants";

export async function updateProfile(username, { avatar }) {

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
