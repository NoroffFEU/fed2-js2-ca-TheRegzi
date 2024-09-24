import { authGuard } from "../../utilities/authGuard";
import { readProfile, displayLoggedInUserProfile } from "../../api/profile/read";

authGuard();
displayLoggedInUserProfile();


