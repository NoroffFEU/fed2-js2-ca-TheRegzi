import { handleCreatePost } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard";

console.log('postCreate.js has been loaded');

authGuard();

function initializePostCreate() {
    console.log('Initializing post creation');

    const form = document.getElementById('create-form');
    if (!form) {
        console.error("Form with ID 'create-form' not found in postCreate.js.");
        return;
    }

    console.log('Form found in postCreate.js');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        console.log('Form submitted');

        try {
            const formData = new FormData(form);
            console.log('Form Data:', Object.fromEntries(formData)); 

    
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