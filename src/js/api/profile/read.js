import { headers } from "../headers";
import { API_SOCIAL_PROFILES } from "../constants";

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
