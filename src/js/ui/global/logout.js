import { onLogout } from "../auth/logout";

export function initializeLogout() {
    console.log('initializeLogout called');
        onLogout();
}

