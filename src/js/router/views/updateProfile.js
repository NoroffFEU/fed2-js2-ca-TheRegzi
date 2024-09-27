import { authGuard } from "../../utilities/authGuard";
import { updateProfile } from "../../api/profile/update"

authGuard();

/**
 * Handles the profile update form submission by gathering bio and avatar URL values,
 * and sending them to the updateProfile function.
 * If the profile is updated successfully, the user is redirected to the profile page.
 * If an error occurs, it logs the error to the console.
 *
 * @returns {void} This function doesn't return any value.
 */

const updateProfileForm = document.getElementById('updateProfile');

if (updateProfileForm) {
    updateProfileForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = localStorage.getItem('name'); 
        const bio = document.getElementById('update-bio').value;
        const avatarUrl = document.getElementById('update-avatar').value;

        const profileData = {
            bio: bio || '', 
            avatar: {
                url: avatarUrl || ''  
            }
        };

        try {
            const updatedProfile = await updateProfile(username, profileData);
            console.log('Profile updated successfully:', updatedProfile);
            window.location.href = '/profile/index.html'; 

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    });
} else {
    console.error("Update Profile form not found on the page.");
}