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