import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants.js";
import { deletePost } from './delete.js';

/**
 * Fetches a single post by sending a 'GET' request to the 'API_SOCIAL_POSTS/{postId} endpoint.
 * The function retrieves the post based on the unique id found in the URL's query parameters.
 * If the request is successful, it calls the function 'displaySinglePost' to display the post.
 * It throws an error if the response is not okay or if the fetching of the post fails. 
 * 
 * @async
 * @returns {void} Calls `displaySinglePost` with the post data but does not return anything.
 * @throws {Error} Throws an error if the post ID is not found in the URL or if the request fails.
 */
export async function fetchSinglePost() {
    const postId = new URLSearchParams(window.location.search).get('id'); 
    if (!postId) {
        console.error('Post ID not found in the URL');
        return;
    }
    const apiUrl = `${API_SOCIAL_POSTS}/${postId}?_author=true`;

    try {
        const requestHeaders = await headers();
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: requestHeaders
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const post = await response.json();
        displaySinglePost(post);
    } catch (error) {
        console.error('Failed to fetch the post:', error);
    }
}

/**
 * Displays a single post on the page by dynamically creating the necessary HTML elements.
 * 
 * This function takes the `post` object returned from the API, including its `title`, `body`, `media`, and `author`.
 * It creates the structure for the post and appends it to the 'container'. If the logged-in user is the author
 * of the post, the 'Edit' and 'Delete' buttons are added with the respective functionalities.
 * 
 *  
 * @param {object} post The post object that contains the details of the post, including:
 * @param {object} post.data - The data object inside the post.
 * @param {string} post.data.title - The title of the post.
 * @param {string} post.data.body - The body/content of the post.
 * @param {object} [post.data.media] - The media object for the post, including `url` and optional `alt`.
 * @param {string} [post.data.media.url] - The URL of the media associated with the post (if any).
 * @param {string} [post.data.media.alt] - The alt text for the media (optional).
 * @param {object} post.data.author - The author object containing details about the post creator.
 * @param {string} post.data.author.name - The username of the author.
 * 
 */

function displaySinglePost(post) {
    const container = document.getElementById('single-post-container');
    container.innerHTML = ''; 

    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const title = document.createElement('h2');
    title.textContent = post.data.title;

    const content = document.createElement('p');
    content.textContent = post.data.body;

    if (post.data.media && post.data.media.url) {
        const image = document.createElement('img');
        image.src = post.data.media.url;
        image.alt = post.data.media.alt || post.data.title;
        image.classList.add('post-image');
        postElement.appendChild(image);
    }

    const username = document.createElement('p');
    username.textContent = `Posted by: ${post.data.author.name || 'Unknown'}`;
    username.classList.add('post-username');

    postElement.appendChild(title);
    postElement.appendChild(username);
    postElement.appendChild(content);

    const loggedInUser = localStorage.getItem('name'); 
    if (loggedInUser === post.data.author.name) {  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.onclick = function() {
        window.location.href = `/post/edit/index.html?id=${post.data.id}`; 
    };
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
        const confirmed = confirm('Are you sure you want to delete this post?');
        if (confirmed) {
            console.log('Deleting post with ID:', post.data.id);
            deletePost(post.data.id); 
        }
    };

    postElement.appendChild(editButton);
    postElement.appendChild(deleteButton);
}
    container.appendChild(postElement);
}

export async function readPosts(limit = 12, page = 1, tag) {
    const apiUrl = API_SOCIAL_POSTS;

    try {
        const url = new URL(apiUrl);
        url.searchParams.append('limit', limit);
        url.searchParams.append('page', page);
        if (tag) {
            url.searchParams.append('tag', tag);
        } url.searchParams.append('_author', 'true');

        const requestHeaders = await headers();
        const response = await fetch(url, {
            method: 'GET',
            headers: requestHeaders
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        addPostsToHTML(posts.data || posts);
        return posts; 
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw error; 
    }
}


function addPostsToHTML(posts) {
    const container = document.getElementById('posts-container');
    container.innerHTML = ''; 

    posts.forEach(post => {
       
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
