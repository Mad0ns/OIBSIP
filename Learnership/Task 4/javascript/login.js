// Execute when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {

    // Retrieve user credentials from localStorage, or initialize an empty array if none exist
    var userCredentialsArray = JSON.parse(localStorage.getItem('userCredentials')) || [];

    // Get reference to the login button
    const loginbtn = document.getElementById('login');

    // Event listener for login button click
    loginbtn.addEventListener('click', function() {
        // Get username and password from input fields
        var username = document.getElementById('login-username').value;
        var password = document.getElementById('login-password').value;
       
        // Check if both username and password are provided
        if(username && password){
            // Decrypt stored password using username and compare with input password
            var decryptedPassword = decryptText(username, password);
            if(decryptedPassword !== null){
                // Redirect to welcome page if login successful
                window.location.href = '/Html/welcomePage.html';
            }
            else{
                alert("We're sorry, but it seems that your account does not exist. Please sign up to create a new account before logging in.");
            }
        }
        else{
            // Alert user if either username or password is missing
            alert('Please enter both username and password')
        }
    });

    // Function to decrypt stored password using username
    function decryptText(username, password) {
        // Iterate through user credentials array
        for (var i = 0; i < userCredentialsArray.length; i++) {
            // Retrieve stored username and encrypted password
            var storedUsername = userCredentialsArray[i].username;
            var storedEncryptedPassword = userCredentialsArray[i].password;
            // If input username matches stored username
            if (username === storedUsername) {
                // Decrypt stored password
                var decryptedPassword = CryptoJS.AES.decrypt(storedEncryptedPassword, username).toString(CryptoJS.enc.Utf8);
                // If input password matches decrypted password
                if (password === decryptedPassword ) {
                    return decryptedPassword; // Return decrypted password
                }
                else{
                    alert("Incorrect password or username"); // Alert user if password is incorrect
                }
            }
        }
        return null; // Return null if username is not found
    }
});

