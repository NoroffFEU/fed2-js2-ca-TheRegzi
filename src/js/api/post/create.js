import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";

export async function createPost(formData) {
    
    const apiUrl = API_SOCIAL_POSTS;
    const title = formData.get('title');
    const body = formData.get('body');
    const media = formData.get('post-image');
    const tags = formData.get('tags').split(',').map(tag => tag.trim());

    try {
        const requestHeaders = await headers();
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify({
                title: title, 
                body: body || '', 
                tags: tags.length > 0 ? tags : [], 
                ...(media ? { media: { url: media, alt: 'Post Image' } } : {}) 
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('Response status:', response.status);
            console.log('Error data:', errorData);
            throw new Error(`Failed to create post: ${errorData.message || response.status}`);
        }

        const data = await response.json();
        console.log('Success:', data);
        return data;

    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}