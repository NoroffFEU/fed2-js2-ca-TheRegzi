/**
 * Attaches a 'click' event listener to the logout button that logs out the user.
 * The user's 'userToken' and 'name' are removed from localStorage upon logout.
 * After clearing the data, the user is redirected to the login page.
 * 
 * @returns {void} This function does not return any value.
 */

export function onLogout() {
    const logOutButton = document.querySelector('#logOut');

    if (logOutButton) {
        logOutButton.addEventListener('click', () => {
            localStorage.removeItem('userToken');
            localStorage.removeItem('name');
            window.location.href = '/auth/login/';
        });
    } 
}