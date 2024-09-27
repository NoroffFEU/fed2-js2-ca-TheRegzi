import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/update";

authGuard();

document.querySelector('form').addEventListener('submit', (event) => {
    onUpdatePost(event); 
});
