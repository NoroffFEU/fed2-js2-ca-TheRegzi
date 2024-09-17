import "./css/style.css";

import router from "./js/router";

await router(window.location.pathname);

import { initializeLogout } from './js/ui/global/logout';

document.getElementById('hamburger-button').addEventListener('click', function() {
    var content = document.getElementById('hamburger-content');
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        content.classList.add('visible');
    } else {
        content.classList.remove('visible');
        content.classList.add('hidden');
    }
});

initializeLogout(); 