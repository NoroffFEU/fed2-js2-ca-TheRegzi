import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";

/**
 * Creates a new social media post by sending a POST request to the "API_SOCIAL_POSTS" endpoint.
 * The 'formData' should contain the fields title, body, media and tags. 
 * The `tags` field is expected to be a comma-separated string, which is split into an array of tags. 
 * The `media` field is optional and represents an image with a URL and alt text.
 * If the creation of the post fails, it throws an error message from the API or a default message.
 * 
 * @async
 * @param {FormData} formData The content inside the form. For example: 'formData.get('title')'.
 * @returns {Promise<object>} A promise that resolves to the response data in JSON format.
 * @throws {Error} Throws an error if the post creation fails or if the response is not okay.
 * 
 */

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
            throw new Error(`Failed to create post: ${errorData.message || response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}