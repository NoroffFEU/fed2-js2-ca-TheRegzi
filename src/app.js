import "./css/style.css";
import router from "./js/router";
import { initializeLogout } from './js/ui/global/logout';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded - Initializing application');

   
    await router(window.location.pathname);

 
    const hamburgerButton = document.getElementById('hamburger-button');
    const content = document.getElementById('hamburger-content');
    if (hamburgerButton && content) {
        hamburgerButton.addEventListener('click', () => {
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                content.classList.add('visible');
            } else {
                content.classList.remove('visible');
                content.classList.add('hidden');
            }
        });
    } else {
        console.error('Hamburger button or content not found in the DOM.');
    }

  
    initializeLogout();
});
