import { getKey } from '../auth/key.js'; 

export async function readPost(id) {
    const apiUrl = `https://v2.api.noroff.dev/social/posts/${id}`;
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

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`, 
                'X-Noroff-API-Key': apiKey 
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const post = await response.json();
        addPostsToHTML(posts.data || posts);
        return post; 
    } catch (error) {
        console.error('Failed to fetch the post:', error);
        throw error; 
    }
}


export async function readPosts(limit = 12, page = 1, tag) {
    const apiUrl = 'https://v2.api.noroff.dev/social/posts';
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

    try {
        const url = new URL(apiUrl);
        url.searchParams.append('limit', limit);
        url.searchParams.append('page', page);
        if (tag) {
            url.searchParams.append('tag', tag);
        }
        url.searchParams.append('_author', 'true');

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
                'X-Noroff-API-Key': apiKey
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        console.log(posts);
        addPostsToHTML(posts.data || posts);
        return posts; 
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw error; 
    }
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
    const apiUrl = `https://v2.api.noroff.dev/social/users/${username}/posts`;
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

    try {
        const url = new URL(apiUrl);
        url.searchParams.append('limit', limit);
        url.searchParams.append('page', page);
        if (tag) {
            url.searchParams.append('tag', tag);
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
                'X-Noroff-API-Key': apiKey
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        addPostsToHTML(posts.data || posts); 
        return posts;
    } catch (error) {
        console.error('Failed to fetch posts by user:', error);
        throw error;
    }
}


function addPostsToHTML(posts) {
    const container = document.getElementById('posts-container');
    container.innerHTML = ''; 

    posts.forEach(post => {

        if (!post.media || typeof post.media !== 'object' || !post.media.url) {
            return; 
        }
       
        const postLink = document.createElement('a');
        postLink.href = `post/index.html?id=${post.id}`; 
        postLink.classList.add('post-link');

        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const title = document.createElement('h2');
        title.textContent = post.title;

        const content = document.createElement('p');
        content.textContent = post.body; 
         
         if (post.media && typeof post.media === 'object' && post.media.url) {
            const image = document.createElement('img');
            image.src = post.media.url;
            image.alt = post.media.alt; 
            image.classList.add('post-image');
            postElement.appendChild(image); 
        }

        const username = document.createElement('p');
        username.textContent = `Posted by: ${post.author.name || 'Unknown'}`; 
        username.classList.add('post-username');

        
        postElement.appendChild(username);
        postElement.appendChild(title);
        postElement.appendChild(content);

        
        postLink.appendChild(postElement);

        container.appendChild(postLink);
    });
}
