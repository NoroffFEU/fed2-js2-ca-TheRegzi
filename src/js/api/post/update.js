import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";

export async function getPost(id) {
    const apiUrl = `${API_SOCIAL_POSTS}/${id}`;

    try {
        const requestHeaders = await headers();
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: requestHeaders
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.statusText}`);
        }

        const post = await response.json(); 

        document.getElementById('title').value = post.data.title || '';
        document.getElementById('body').value = post.data.body || '';
        document.getElementById('post-image').value = post.data.media && post.data.media.url ? post.data.media.url : ''; 
        document.getElementById('tags').value = post.data.tags || '';

        return post; 
    } catch (error) {
        console.error('Error fetching post:', error);
        alert('Could not fetch post data. Please try again later.');
    }
}

export async function updatePost(id, { title, body, tags, media }) {
    const apiUrl = `${API_SOCIAL_POSTS}/${id}`;

    try {
        const requestHeaders = await headers();
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: requestHeaders,

            body: JSON.stringify({
                title: title,         
                body: body,          
                tags: tags ? tags.split(',').map(tag => tag.trim()) : [], 
                media: media ? { url: media, alt: 'Image related to the post' } : null 
            })
        });

        if (response.ok) {
            const updatedPost = await response.json(); 
            console.log('Post updated successfully:', updatedPost);
            alert('Post updated successfully!');
            window.location.href = `/post/index.html?id=${id}`; 
            return; 
        } else {
            const errorMessage = await response.text();
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Failed to update the post:', error);
        alert(`Could not update the post: ${error.message}`);
        return; 
    }
}