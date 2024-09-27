import { handleCreatePost } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard";

authGuard();

/**
 * Function to initialize the new social media post creation. 
 * It has a event listener for the submit button, which calls the 'handleCreatePost' function if submit is clicked.
 * It alerts the user if the post creation is successful and logs errors to the console if unsuccessful.
 * 
 * @returns {void} This function does not return any value.
 */

function initializePostCreate() {

    const form = document.getElementById('create-form');
    if (!form) {
        console.error("Form with ID 'create-form' not found in postCreate.js.");
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        try {
            const formData = new FormData(form);

            const isSuccess = await handleCreatePost(formData);

            if (isSuccess) {
                console.log('Post creation handled successfully');
                alert('Post created successfully!'); 
            }
        } catch (error) {
            console.error('Unexpected error during post creation:', error);
        }
    });
}


initializePostCreate();