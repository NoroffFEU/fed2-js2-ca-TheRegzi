import { createPost } from "../../api/post/create.js";

/**
 * Handles the creation of a new post. Calls 'createPost' with the provided formData.
 * If the creation is successful, the user is alerted and redirected to the home page. 
 * In case of failure, an error is logged to the console and the user is alerted.
 * 
 * @param {FormData} formData The form data containing the post details to be submitted.
 * @returns {boolean} Returns true if the post was created successfully, false otherwise.
 */
export async function handleCreatePost(formData) {
    try {
        const result = await createPost(formData);
        console.log('Post created successfully:', result); 
        window.location.href = '/index.html';
        return true; 
    } catch (error) {
        console.error('Failed to create post:', error); 
        alert('Failed to create post: ' + error.message); 
        return false; 
    }
}
