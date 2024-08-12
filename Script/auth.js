const bashedURL = 'https://adust-travllers-backend.vercel.app/api/v1';
// const bashedURL = 'http://localhost:5000/api/v1';


window.addEventListener("load", () => {
    const pathname = window.location.pathname;

    function isValidEmail(email) {
        // Define a regular expression for validating email addresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Test the email against the regex and return the result
        return emailRegex.test(email);
    }

    function isValidBDNumber(number) {
        const length = number?.length;
        if (length !== 11) {
            return false;
        }
        else {
            const thirdIndex = number[2];
            if (thirdIndex == '0' || thirdIndex == '1' || thirdIndex == '2' || thirdIndex == '6') {
                return false;
            }
            return true;
        }
    }

    function isPasswordSame(pass, confirm) {
        console.log({ pass, confirm })
        if (pass != confirm) {
            return false;
        }
        return true;
    }

    if (pathname == "/auth/register.html") {
        const registerForm = document.getElementById("register-form");

        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formData = new FormData(event.target);

            const data = Object.fromEntries(formData.entries());

            if (!isValidEmail(data?.email)) {
                return alert("Invalid email address");
            }



            if (!isValidBDNumber(data?.phone)) {
                return alert("Invalid number!");
            }
            if (!isPasswordSame(data?.password, data?.confirmPassword)) {
                return alert("Password doesn't match!");
            }

            delete data.confirmPassword;

            try {
                // Send data to the server using fetch with async/await
                const response = await fetch(`${bashedURL}/user/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.success}`);
                }

                // Parse the JSON response from the server
                const result = await response.json();

                if (result?.success == false) {
                    return alert(result?.message)
                }
                else {
                    alert("Registration successful, please login");
                    window.location.assign('/auth/login.html');
                }


            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while submitting the form.');
            }
        })
    }
    else if (pathname == "/auth/login.html") {
        const loginForm = document.getElementById("login-form");

        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            try {
                // Send data to the server using fetch with async/await
                const response = await fetch(`${bashedURL}/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                // Parse the JSON response from the server
                const result = await response.json();

                if (result?.success == false) {
                    localStorage.removeItem("ak-secret");
                    return alert(result?.message);
                }
                else {
                    localStorage.setItem("ak-secret", result?.data);
                    window.location.assign("/dashboard/index.html");
                    alert("Login successfully");
                }

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while submitting the form.');
            }
        })
    }
})


