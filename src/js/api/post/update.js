import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";

/**
 * Fetches a post by its ID and populates form fields with the post data.
 * 
 * This function sends a GET request to the API to retrieve a specific post by its ID. 
 * The post data is then used to populate the form fields on the page (title, body, media, and tags).
 * If the request fails, an error message is displayed, and an error is logged.
 * 
 * @async
 * @param {number} id The unique ID of the post to fetch.
 * @returns {Promise<object|void>} A promise that resolves to the post object or returns nothing if the request fails.
 * @throws {Error} Throws an error if the fetch request fails.
 */

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

/**
 * Updates a post by sending a PUT request to the API with the updated post data.
 * 
 * This function sends a PUT request to update a post by its ID. The post's title, body, tags, 
 * and media are updated based on the form data passed in. If the request is successful, the user 
 * is redirected to the updated post page. If the request fails, an error message is displayed.
 * 
 * @async
 * @param {number} id The unique ID of the post to update.
 * @param {string} title The updated title of the post.
 * @param {string} body The updated body/content of the post.
 * @param {string} [tags] A comma-separated string of tags for the post (optional).
 * @param {string} [media] The updated media URL for the post (optional).
 * @returns {Promise<void>} Resolves when the update is successful, alerts the user, and redirects to the single post page.
 * @throws {Error} Throws an error if the update request fails.
 */

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