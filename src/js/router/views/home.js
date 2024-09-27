import { authGuard } from "../../utilities/authGuard";
import { readPosts } from "../../api/post/read";

authGuard();
readPosts();