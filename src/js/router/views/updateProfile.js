import { authGuard } from "../../utilities/authGuard";
import { updateProfile } from "./updateProfile"

authGuard();

document.getElementById('updateProfileForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = localStorage.getItem('name'); 
    const bio = document.getElementById('bio').value;
    const avatarUrl = document.getElementById('avatarUrl').value;

    const profileData = {
        bio: bio || '', 
        avatar: {
            url: avatarUrl || '' 
        }
    };

    try {
        const updatedProfile = await updateProfile(username, profileData);
        console.log('Profile updated successfully:', updatedProfile);
        window.location.href = 'index.html'; 

    } catch (error) {
        console.error('Error updating profile:', error);
    }
});