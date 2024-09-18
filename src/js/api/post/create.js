import { getKey } from '../auth/key.js'; 

export async function createPost(formData) {
    const userToken = localStorage.getItem('userToken');

    if (!userToken) {
        throw new Error('User is not authenticated');
    }

    let apiKey;
    try {
        apiKey = await getKey('My API Key Name'); 
    } catch (error) {
        console.error('Failed to retrieve API key:', error);
        throw new Error('Failed to retrieve API key');
    }

    const apiUrl = 'https://v2.api.noroff.dev/social/posts';
    const title = formData.get('title');
    const body = formData.get('body');
    const media = formData.get('post-image');
    const tags = formData.get('tags').split(',').map(tag => tag.trim());

    console.log('Creating post with data:', { title, body, media, tags });

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`, 
                'X-Noroff-API-Key': apiKey 
            },
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