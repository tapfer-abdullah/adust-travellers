const bashedURL = 'https://adust-travllers-backend.vercel.app/api/v1';
// const bashedURL = 'http://localhost:5000/api/v1';

const form = document.getElementById('make-payment-form');

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const existingCart = localStorage.getItem("ak-travelers-cart");
    const discountCode = localStorage.getItem("ak-travelers-code");
    let cart = [];

    if (existingCart) {
        cart = JSON.parse(existingCart);
    }

    if (cart?.length == 0) {
        return alert("empty cart!")
    }

    // Create a new FormData object from the form
    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());

    const updatedCart = [];
    cart?.forEach(sp => updatedCart.push({ id: sp?.id, person: sp?.person }))


    const jsonData = JSON.stringify({ ...data, cart: updatedCart, discountCode });

    console.log({ jsonData })


    try {
        // Send data to the server using fetch with async/await
        const response = await fetch(`${bashedURL}/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response from the server
        const result = await response.json();

        if (result?.status == false) {
            return alert(result?.message)
        }

        window.location.assign(result?.url);


    } catch (error) {
        // Handle errors (e.g., network issues, server errors, etc.)
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    }


});


