const userId = 'your-user-id'; // Replace with the actual user ID

$(document).ready(() => {
    // Fetch user information
    $.get(`http://localhost:3000/user/${userId}`, (userData) => {
        $('#userInfo').html(`<h2>User Information</h2><pre>${JSON.stringify(userData, null, 2)}</pre>`);
    });

    // Fetch and display user settings
    $.get(`http://localhost:3000/user/${userId}/settings`, (userSettings) => {
        $('#userSettings').html(`<h2>User Settings</h2><pre>${JSON.stringify(userSettings, null, 2)}</pre>`);
    });

    // Fetch and display user journals
    $.get(`http://localhost:3000/user/${userId}/journals`, (userJournals) => {
        $('#userJournals').html(`<h2>User Journals</h2><pre>${JSON.stringify(userJournals, null, 2)}</pre>`);
    });
});
