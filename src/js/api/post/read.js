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
    const apiUrl = `${API_SOCIAL_POSTS}/${postId}?_author=true&_comments=true`;

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
 * This function takes the post object returned from the API, including its title, body, media, and author.
 * It creates the structure for the post and appends it to the 'container'. If the logged-in user is the author
 * of the post, the 'Edit' and 'Delete' buttons are added with the respective functionalities.
 * 
 * The function also displays the comment section and a form to add new comments. If the comment section
 * fails to generate properly, an error message is logged.
 * 
 * @param {object} post The post object that contains the details of the post, including:
 * @param {object} post.data - The data object inside the post.
 * @param {string} post.data.title - The title of the post.
 * @param {string} post.data.body - The body/content of the post.
 * @param {object} [post.data.media] - The media object for the post, including url and optional alt.
 * @param {string} [post.data.media.url] - The URL of the media associated with the post (if any).
 * @param {string} [post.data.media.alt] - The alt text for the media (optional).
 * @param {object} post.data.author - The author object containing details about the post creator.
 * @param {string} post.data.author.name - The username of the author.
 * @returns {Promise<void>} Resolves when the post and its comment section are displayed.
 * Logs an error if the post or comment section could not be created.
 */
 

export async function displaySinglePost(post) {
    if (!post || !post.data) {
        console.error('Invalid post data:', post);
        return;
    }

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

    const commentSection = await displayCommentSection(post, post.data.id);
    if (commentSection instanceof Node) {
        postElement.appendChild(commentSection);
    } else {
        console.error('Failed to create comment section');
    }

    container.appendChild(postElement);
}

export async function displayCommentSection(post, postId) {
    const commentSection = document.createElement('div');
    commentSection.classList.add('comments-section');

    const commentTitle = document.createElement('h3');
    commentTitle.textContent = 'Comments';
    commentSection.appendChild(commentTitle);

    if (Array.isArray(post.data.comments) && post.data.comments.length > 0) {
        post.data.comments.forEach(comment => {
            const commentElement = document.createElement('p');
            commentElement.textContent = `${comment.author.name}: ${comment.body}`;
            commentSection.appendChild(commentElement);
        });
    } else {
        const noComments = document.createElement('p');
        noComments.textContent = 'No comments yet.';
        commentSection.appendChild(noComments);
    }

    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form');
    
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Write a comment...';
    commentInput.classList.add('comment-input');
    commentInput.required = true;
    
    const commentButton = document.createElement('button');
    commentButton.type = 'submit';
    commentButton.textContent = 'Post Comment';
    commentButton.classList.add('comment-button');

    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentButton);
    commentSection.appendChild(commentForm);

    commentForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const commentText = commentInput.value.trim();

        if (commentText === '') {
            alert('Comment cannot be empty.');
            return;
        }

        try {
            await addCommentToPost(postId, commentText); 
            alert('Comment added successfully!');
            commentInput.value = ''; 

            fetchSinglePost(); 
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to add comment. Please try again.');
        }
    });

    return commentSection;  
}


async function addCommentToPost(id, commentText, replyToId = null) {
    const apiUrl = `${API_SOCIAL_POSTS}/${id}/comment`;

    try {
        const requestHeaders = await headers();
        const requestBody = {
            body: commentText
        };

        if (replyToId) {
            requestBody.replyToId = replyToId;
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(requestBody) 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const commentData = await response.json();
        return commentData; 
    } catch (error) {
        console.error('Failed to add comment:', error);
        throw error; 
    }
}

/**
 * Fetches multiple posts by sending a 'GET' request to the 'API_SOCIAL_POSTS' endpoint. 
 * This function fetches posts from the API with pagination and an optional tag filter.
 * Takes the limit and page parameters to limit the amount of posts per page and which page to retrieve.
 * If successful, it calls the function 'addPostsToHTML' to display the posts on the page.
 * If it fails, it throws error based on the response from the API or a default message. 
 * 
 * @async
 * @param {number} limit The limit of posts per page.
 * @param {number} page The number of pages.
 * @param {string} [tag] - (Optional) A tag to filter the posts.
 * @returns {Promise<object>} A promise that resolves to the fetched posts data.
 * @throws {Error} Throws an error if the request fails.
 */

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

/**
 * Displays multiple posts on a page. 
 * 
 * This function takes an array of `post` objects returned from the API, including details like 
 * `title`, `body`, `media`, and `author`. For each post, it creates a clickable link that wraps the post, 
 * directing the user to a single post page when clicked. The function then appends the posts to the 'container'.
 * 
 * @param {Array<object>} posts An array of post objects, each containing the details of a post, including:
 * @param {string} posts[].title - The title of the post.
 * @param {string} posts[].body - The body/content of the post.
 * @param {object} [posts[].media] - The media object for the post.
 * @param {string} [posts[].media.url] - The URL of the media associated with the post (optional).
 * @param {string} [posts[].media.alt] - The alt text for the media (optional).
 * @param {object} posts[].author - The author object containing details about the post creator.
 * @param {string} posts[].author.name - The username of the author.
 */

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


