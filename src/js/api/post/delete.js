import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";

/**
 * Deletes a social media post by sending a 'DELETE' request to the 'API_SOCIAL_POST/{id}' endpoint. 
 * Requires the post's unique 'id' to delete it. 
 * If the deletion is successful, it alerts the user and redirects them to the homepage.
 * It throws an error if the deletion fails or the response is not okay.
 * 
 * @async
 * @param {number} id The unique id for the social media post to be deleted.
 * @returns {void} Alerts the user that the post is deleted successfully, and redirects to the homepage.
 * @throws {Error} Throws error if the deletion fails.
 */

export async function deletePost(id) {
    const apiUrl = `${API_SOCIAL_POSTS}/${id}`;
    
    try {
        const requestHeaders = await headers();
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: requestHeaders
        });
        
        if (response.status === 204) {
            alert('Post deleted successfully.');
            window.location.href = `/index.html`;
            return;
        } else {
            throw new Error('Failed to delete blog post.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting blog post: ' + error.message); 
    }
}

