import { authGuard } from "../../utilities/authGuard";
import { displayLoggedInUserProfile } from "../../api/profile/read";

authGuard();
displayLoggedInUserProfile();


