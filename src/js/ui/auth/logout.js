export function onLogout() {
    const logOutButton = document.querySelector('#logOut');
    console.log('logOutButton:', logOutButton); 

    if (logOutButton) {
        logOutButton.addEventListener('click', () => {
            localStorage.removeItem('userToken');
            localStorage.removeItem('name');
            window.location.href = '/auth/login';
        });
    } else {
        console.error('Log out button not found');
    }
}