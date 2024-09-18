import { createPost } from "../../api/post/create.js";

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
