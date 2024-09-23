import { headers } from "../headers";

export async function deletePost(id) {
    const postId = new URLSearchParams(window.location.search).get('id');
    const apiUrl = `https://v2.api.noroff.dev/social/posts/${postId}`;
    
    try {
        const requestHeaders = await headers();
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: requestHeaders
        });
        
        if (response.status === 204) {
            alert('Blog post deleted successfully.');
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

