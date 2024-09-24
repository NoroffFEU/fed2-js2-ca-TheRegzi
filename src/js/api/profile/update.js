import { headers } from "../headers";
import { API_SOCIAL_PROFILES } from "../constants";
import { fetchProfile } from "./read";

async function populateForm() {
    try {
        const username = localStorage.getItem('name'); 
        const profileData = await fetchProfile(username); 
        console.log('Fetched Profile Data:', profileData);
        
        document.getElementById('update-bio').value = profileData.bio || '';
        document.getElementById('update-avatar').value = profileData.avatar?.url || '';
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
}

populateForm();

export async function updateProfile(username, { avatar }) {

    const apiUrl = `${API_SOCIAL_PROFILES}/${username}`;
    const bio = document.getElementById('update-bio').value;

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
