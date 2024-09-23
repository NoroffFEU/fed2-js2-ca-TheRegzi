import { updatePost, getPost } from "../../api/post/update";

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



    