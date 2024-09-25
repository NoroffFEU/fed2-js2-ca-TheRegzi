import { updatePost, getPost } from "../../api/post/update";

/**
 * Extracts the post ID from the URL and loads the corresponding post data by calling the 'getPost' function.
 * If the post ID is missing or the post fails to load, an error is logged and the user is alerted.
 * 
 * @returns {void} This function does not return any value.
 */

async function loadPostData() {
    const postId = new URLSearchParams(window.location.search).get('id'); 

    if (!postId) {
        alert("Post ID is missing. Cannot load the post.");
        return;
    }

    try {
        
        const post = await getPost(postId); 

        if (!post) {
            console.error("Failed to load the post.");
            return;
        }

      
    } catch (error) {
        console.error('Error fetching post:', error);
        alert('Could not fetch the post data. Please try again later.');
    }
}

loadPostData();

/**
 * Handles the update of a post with the new form values submitted by the user.
 * If the post is successfully updated, the user is alerted and redirected to the single post page.
 * If unsuccessful, an error is logged to the console and an alert is shown to the user.
 * 
 * @param {Event} event The form submission event to prevent default behavior.
 * @returns {void} This function does not return any value.
 */

export async function onUpdatePost(event) {
    event.preventDefault(); 

    const form = event.target; 
    const formData = new FormData(form); 

    const post = {
        title: formData.get('title'),     
        body: formData.get('body'),        
        tags: formData.get('tags'),        
        media: formData.get('post-image')  
    };

    const postId = new URLSearchParams(window.location.search).get('id'); 

    if (!postId) {
        alert("Missing post ID. Cannot update the post.");
        return;
    }

    try {
        await updatePost(postId, post); 
        alert('Post updated successfully!');
        window.location.href = `/post/index.html?id=${postId}`; 
    } catch (error) {
        console.error('Error updating post:', error);
        alert('Could not update the post. Please try again later.');
    }
}



    