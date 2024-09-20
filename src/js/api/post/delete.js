import { getKey } from "../auth/key";

export async function deletePost(id) {
    const postId = new URLSearchParams(window.location.search).get('id');
    const userToken = localStorage.getItem('userToken'); 
    const apiUrl = `https://v2.api.noroff.dev/social/posts/${postId}`;
    const apiKey = await getKey('My API Key Name');
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'X-Noroff-API-Key': apiKey
            },
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

