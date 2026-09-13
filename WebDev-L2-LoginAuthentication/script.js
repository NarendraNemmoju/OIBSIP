/* =========================================================
   SECUREAUTH
   Login & Registration Authentication System
   ========================================================= */


/* =========================================================
   STORAGE KEYS
   ========================================================= */

const USERS_KEY = "secureAuthUsers";
const CURRENT_USER_KEY = "secureAuthCurrentUser";


/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

/**
 * Get registered users from localStorage
 */
function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(USERS_KEY)
        ) || [];

    } catch (error) {

        console.error("Unable to read users:", error);

        return [];

    }

}


/**
 * Save users to localStorage
 */
function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


/**
 * Get current logged-in user
 */
function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem(CURRENT_USER_KEY)
        );

    } catch (error) {

        return null;

    }

}


/**
 * Set current user
 */
function setCurrentUser(user) {

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(user)
    );

}


/**
 * Remove current user
 */
function clearCurrentUser() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

}


/**
 * Show form message
 */
function showMessage(
    element,
    message,
    type = "error"
) {

    if (!element) return;

    element.textContent = message;

    element.className =
        `form-message ${type}`;

}


/**
 * Clear error message
 */
function clearErrors() {

    document
        .querySelectorAll(".error-message")
        .forEach(element => {

            element.textContent = "";

        });

}


/**
 * Display field error
 */
function showError(id, message) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent = message;

    }

}


/**
 * Validate email
 */
function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/**
 * Get initials
 */
function getInitials(name) {

    if (!name) return "U";

    const words =
        name.trim().split(/\s+/);

    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }

    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();

}


/* =========================================================
   PASSWORD VISIBILITY
   ========================================================= */

function setupPasswordToggles() {

    const toggles =
        document.querySelectorAll(
            ".password-toggle"
        );


    toggles.forEach(toggle => {

        toggle.addEventListener(
            "click",
            () => {

                const targetId =
                    toggle.dataset.target;

                const input =
                    document.getElementById(
                        targetId
                    );

                if (!input) return;


                if (
                    input.type ===
                    "password"
                ) {

                    input.type = "text";

                    toggle.textContent = "🙈";

                    toggle.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                } else {

                    input.type = "password";

                    toggle.textContent = "👁";

                    toggle.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                }

            }
        );

    });

}


/* =========================================================
   PASSWORD STRENGTH
   ========================================================= */

function calculatePasswordStrength(password) {

    let score = 0;


    if (password.length >= 8) {
        score++;
    }


    if (/[A-Z]/.test(password)) {
        score++;
    }


    if (/[a-z]/.test(password)) {
        score++;
    }


    if (/[0-9]/.test(password)) {
        score++;
    }


    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }


    return score;

}


function updatePasswordStrength() {

    const passwordInput =
        document.getElementById(
            "registerPassword"
        );

    const strengthBar =
        document.getElementById(
            "strengthBar"
        );

    const strengthText =
        document.getElementById(
            "strengthText"
        );


    if (
        !passwordInput ||
        !strengthBar ||
        !strengthText
    ) {

        return;

    }


    const password =
        passwordInput.value;

    const score =
        calculatePasswordStrength(
            password
        );


    const percentages = [
        "0%",
        "20%",
        "40%",
        "60%",
        "80%",
        "100%"
    ];


    const labels = [
        "Password strength",
        "Very weak",
        "Weak",
        "Medium",
        "Strong",
        "Very strong"
    ];


    strengthBar.style.width =
        percentages[score];

    strengthText.textContent =
        labels[score];

}


/* =========================================================
   LOGIN
   ========================================================= */

function setupLogin() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (!loginForm) return;


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            clearErrors();


            const email =
                document
                    .getElementById(
                        "loginEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            let valid = true;


            /* Email validation */

            if (!email) {

                showError(
                    "loginEmailError",
                    "Email address is required."
                );

                valid = false;

            } else if (
                !isValidEmail(email)
            ) {

                showError(
                    "loginEmailError",
                    "Please enter a valid email address."
                );

                valid = false;

            }


            /* Password validation */

            if (!password) {

                showError(
                    "loginPasswordError",
                    "Password is required."
                );

                valid = false;

            }


            if (!valid) {

                showMessage(
                    message,
                    "Please correct the errors above."
                );

                return;

            }


            /* Find user */

            const users = getUsers();

            const user =
                users.find(
                    registeredUser =>
                        registeredUser.email === email
                );


            if (!user) {

                showMessage(
                    message,
                    "No account found with this email."
                );

                return;

            }


            /* Check password */

            if (
                user.password !== password
            ) {

                showMessage(
                    message,
                    "Incorrect password. Please try again."
                );

                return;

            }


            /* Successful login */

            const sessionUser = {

                id: user.id,

                name: user.name,

                email: user.email,

                registeredAt:
                    user.registeredAt

            };


            setCurrentUser(
                sessionUser
            );


            showMessage(
                message,
                "Login successful! Redirecting...",
                "success"
            );


            setTimeout(
                () => {

                    window.location.href =
                        "dashboard.html";

                },
                700
            );

        }
    );


    /* Forgot password */

    const forgotPassword =
        document.getElementById(
            "forgotPassword"
        );


    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                alert(
                    "Password recovery would normally be handled by a secure backend service."
                );

            }
        );

    }

}


/* =========================================================
   REGISTRATION
   ========================================================= */

function setupRegistration() {

    const registerForm =
        document.getElementById(
            "registerForm"
        );


    if (!registerForm) return;


    const passwordInput =
        document.getElementById(
            "registerPassword"
        );


    if (passwordInput) {

        passwordInput.addEventListener(
            "input",
            updatePasswordStrength
        );

    }


    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            clearErrors();


            const name =
                document
                    .getElementById(
                        "registerName"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "registerEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "registerPassword"
                    )
                    .value;


            const confirmPassword =
                document
                    .getElementById(
                        "confirmPassword"
                    )
                    .value;


            const terms =
                document.getElementById(
                    "terms"
                ).checked;


            const message =
                document.getElementById(
                    "registerMessage"
                );


            let valid = true;


            /* Name */

            if (!name) {

                showError(
                    "registerNameError",
                    "Full name is required."
                );

                valid = false;

            } else if (name.length < 2) {

                showError(
                    "registerNameError",
                    "Name must contain at least 2 characters."
                );

                valid = false;

            }


            /* Email */

            if (!email) {

                showError(
                    "registerEmailError",
                    "Email address is required."
                );

                valid = false;

            } else if (
                !isValidEmail(email)
            ) {

                showError(
                    "registerEmailError",
                    "Please enter a valid email address."
                );

                valid = false;

            }


            /* Password */

            if (!password) {

                showError(
                    "registerPasswordError",
                    "Password is required."
                );

                valid = false;

            } else if (password.length < 8) {

                showError(
                    "registerPasswordError",
                    "Password must contain at least 8 characters."
                );

                valid = false;

            }


            /* Confirm password */

            if (!confirmPassword) {

                showError(
                    "confirmPasswordError",
                    "Please confirm your password."
                );

                valid = false;

            } else if (
                password !== confirmPassword
            ) {

                showError(
                    "confirmPasswordError",
                    "Passwords do not match."
                );

                valid = false;

            }


            /* Terms */

            if (!terms) {

                showError(
                    "termsError",
                    "You must accept the terms and conditions."
                );

                valid = false;

            }


            if (!valid) {

                showMessage(
                    message,
                    "Please correct the errors above."
                );

                return;

            }


            /* Check existing users */

            const users = getUsers();


            const existingUser =
                users.find(
                    user =>
                        user.email === email
                );


            if (existingUser) {

                showError(
                    "registerEmailError",
                    "An account with this email already exists."
                );

                showMessage(
                    message,
                    "Registration failed. Email already exists."
                );

                return;

            }


            /* Create user */

            const newUser = {

                id:
                    Date.now()
                    .toString(),

                name,

                email,

                password,

                registeredAt:
                    new Date()
                    .toISOString()

            };


            users.push(newUser);

            saveUsers(users);


            /* Automatically log user in */

            setCurrentUser({

                id: newUser.id,

                name: newUser.name,

                email: newUser.email,

                registeredAt:
                    newUser.registeredAt

            });


            showMessage(
                message,
                "Account created successfully! Redirecting...",
                "success"
            );


            registerForm.reset();

            updatePasswordStrength();


            setTimeout(
                () => {

                    window.location.href =
                        "dashboard.html";

                },
                800
            );

        }
    );

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function setupDashboard() {

    const dashboardPage =
        document.querySelector(
            ".dashboard-page"
        );


    if (!dashboardPage) return;


    const currentUser =
        getCurrentUser();


    /* Protect dashboard */

    if (!currentUser) {

        window.location.href =
            "index.html";

        return;

    }


    /* User information */

    const name =
        currentUser.name || "User";

    const email =
        currentUser.email || "user@example.com";

    const initials =
        getInitials(name);


    const elements = {

        welcomeUser:
            document.getElementById(
                "welcomeUser"
            ),

        navUserName:
            document.getElementById(
                "navUserName"
            ),

        navUserEmail:
            document.getElementById(
                "navUserEmail"
            ),

        profileName:
            document.getElementById(
                "profileName"
            ),

        profileEmail:
            document.getElementById(
                "profileEmail"
            ),

        userAvatar:
            document.getElementById(
                "userAvatar"
            ),

        largeAvatar:
            document.getElementById(
                "largeAvatar"
            )

    };


    if (elements.welcomeUser) {

        elements.welcomeUser.textContent =
            name.split(" ")[0];

    }


    if (elements.navUserName) {

        elements.navUserName.textContent =
            name;

    }


    if (elements.navUserEmail) {

        elements.navUserEmail.textContent =
            email;

    }


    if (elements.profileName) {

        elements.profileName.textContent =
            name;

    }


    if (elements.profileEmail) {

        elements.profileEmail.textContent =
            email;

    }


    if (elements.userAvatar) {

        elements.userAvatar.textContent =
            initials;

    }


    if (elements.largeAvatar) {

        elements.largeAvatar.textContent =
            initials;

    }


    /* Member date */

    const memberSince =
        document.getElementById(
            "memberSince"
        );


    if (
        memberSince &&
        currentUser.registeredAt
    ) {

        const date =
            new Date(
                currentUser.registeredAt
            );


        memberSince.textContent =
            date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    }


    /* Logout */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                clearCurrentUser();

                window.location.href =
                    "index.html";

            }
        );

    }


    /* Quick action buttons */

    const profileAction =
        document.getElementById(
            "profileAction"
        );


    if (profileAction) {

        profileAction.addEventListener(
            "click",
            () => {

                alert(
                    `Profile\n\nName: ${name}\nEmail: ${email}`
                );

            }
        );

    }


    const securityAction =
        document.getElementById(
            "securityAction"
        );


    if (securityAction) {

        securityAction.addEventListener(
            "click",
            () => {

                alert(
                    "Your account is currently protected with password authentication."
                );

            }
        );

    }

}


/* =========================================================
   INITIALIZE APPLICATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupPasswordToggles();

        setupLogin();

        setupRegistration();

        setupDashboard();

    }
);