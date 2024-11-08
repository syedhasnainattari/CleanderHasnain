// Load existing users from localStorage or initialize an empty object
let users = JSON.parse(localStorage.getItem("users")) || {};

// Show the Signup form
function showSignup() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("signup-section").style.display = "block";
}

function showLogin() {
    document.getElementById("signup-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}

function signup() {
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (username && password) {
        if (users[username]) {
            alert("User already exists. Please choose a different username.");
        } else {
            users[username] = { password, profilePicture: "default-avatar.png" };
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! Please log in.");
            showLogin();
        }
    } else {
        alert("Please fill out all fields.");
    }
}

function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username].password === password) {
        localStorage.setItem("loggedInUser", username);
        displayDashboard(username);
    } else {
        alert("Invalid username or password.");
    }
}

function displayDashboard(username) {
    document.getElementById("user-name").innerText = username;
    const profilePicture = users[username].profilePicture || "default-avatar.png";
    document.getElementById("profile-picture").src = profilePicture;

    document.getElementById("login-section").style.display = "none";
    document.getElementById("signup-section").style.display = "none";
    document.getElementById("dashboard-section").style.display = "block";
}

function showEditProfile() {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
        document.getElementById("edit-username").value = username;
        document.getElementById("preview-picture").src = users[username].profilePicture || "default-avatar.png";
        document.getElementById("dashboard-section").style.display = "none";
        document.getElementById("edit-profile-section").style.display = "block";
    }
}

function saveProfile() {
    const username = localStorage.getItem("loggedInUser");
    const newPassword = document.getElementById("edit-password").value.trim();
    const profilePicture = document.getElementById("preview-picture").src;

    if (newPassword) {
        users[username].password = newPassword;
    }
    users[username].profilePicture = profilePicture;

    localStorage.setItem("users", JSON.stringify(users));
    alert("Profile updated successfully!");
    displayDashboard(username);
    document.getElementById("edit-profile-section").style.display = "none";
}

function cancelEdit() {
    document.getElementById("edit-profile-section").style.display = "none";
    document.getElementById("dashboard-section").style.display = "block";
}

function previewProfilePicture(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById("preview-picture").src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

window.onload = function() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        displayDashboard(loggedInUser);
    }
};
