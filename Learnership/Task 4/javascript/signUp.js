// Retrieve user credentials from localStorage, or initialize an empty array if none exist
var userCredentialsArray = JSON.parse(localStorage.getItem('userCredentials')) || [];

// Event listener for sign-up button click
document.getElementById('btnSignUp').addEventListener('click', function() {
    // Get username and password from input fields, trimming any leading or trailing whitespace
    var username = document.getElementById('SignUsername').value.trim();
    var password = document.getElementById('Signpassword').value.trim();
    
    // Check if both username and password are provided
    if (username && password) {
        // Loop through existing user credentials to check if the username is already taken
        var usernameTaken = false;
        for (var i = 0; i < userCredentialsArray.length; i++) {
            var storedUsername = userCredentialsArray[i].username;
            // If the provided username matches any stored usernames
            if (storedUsername === username) {
                usernameTaken = true;
                break; // No need to continue the loop if username is found
            }
        }
        // If username is not already taken, proceed to encryption and storage
        if (!usernameTaken) {
            encryptText(username, password);
        } else {
            // Alert user if the username is already taken
            alert("Username has been used. Please use a different username");
        }
    } else {
        // Alert user if either username or password is missing
        alert('Please enter both username and password');
    }
});

// Function to encrypt the password and store user credentials in localStorage
function encryptText(username, password) {
    // Encrypt the password using AES encryption with the username as the key
    var encryptedPassword = CryptoJS.AES.encrypt(password, username).toString();
    // Add the new user credentials to the array
    userCredentialsArray.push({ username: username, password: encryptedPassword });
    // Store the updated user credentials array in localStorage
    localStorage.setItem('userCredentials', JSON.stringify(userCredentialsArray));
    // Redirect to loading page after a short delay
    setTimeout(function() {
        window.location.href = "/Html/loading.html";
    }, 100);
}
