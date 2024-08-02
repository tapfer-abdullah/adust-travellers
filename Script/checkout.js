const bashedURL = 'https://adust-travllers-backend.vercel.app/api/v1';
// const bashedURL = 'http://localhost:5000/api/v1';

const form = document.getElementById('make-payment-form');

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const existingCart = localStorage.getItem("ak-travelers-cart");
    const existingDiscountCode = localStorage.getItem("ak-traveler-dis");
    let discountCode = null;

    if (existingDiscountCode) {
        const disArray = existingDiscountCode?.split('$');
        discountCode = disArray?.[0];
    }

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

    // console.log({ jsonData })


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

const discountForm = document.getElementById("discount-code-form");

discountForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const discountCode = event.target.cartDiscount.value;

    try {
        // Send data to the server using fetch with async/await
        const response = await fetch(`${bashedURL}/discount-code?code=${discountCode}&select=name0status0type0amount`);

        // Parse the JSON response from the server
        const result = await response.json();

        const invalidP = document.getElementById("discount-invalid");
        if (result?.status == false) {
            return alert(result?.message)
        }

        // document.getElementById("discount-invalid").innerText = ''

        const existingCart = localStorage.getItem('ak-travelers-cart');
        const cart = JSON.parse(existingCart);

        const checkoutPageSubtotal = document.getElementById("checkout-page-subtotal");
        const checkoutPageTotal = document.getElementById("checkout-page-total");
        const checkoutPageDiscount = document.getElementById("checkout-page-discount");
        const checkoutPageDiscountD = document.getElementById("discountCode-div");


        if (result?.data == null) {
            if (cart?.length > 0) {
                const subTotal = cart?.reduce((accumulator, currentValue) => {
                    return accumulator + (currentValue?.person * currentValue?.price);
                }, 0);

                checkoutPageSubtotal.innerText = subTotal.toFixed(1) || 0.0;
                checkoutPageTotal.innerText = subTotal.toFixed(1) || 0.0;
                checkoutPageDiscount.innerText = `$0.0`;
                checkoutPageDiscountD.innerHTML = ``;

                localStorage.removeItem("ak-traveler-dis");
            }

            invalidP.innerText = `Invalid discount code: '${discountCode}'`;
            return alert("Invalid discount code!")
        }
        else {
            invalidP.innerText = ``;



            if (cart?.length > 0) {
                const subTotal = cart?.reduce((accumulator, currentValue) => {
                    return accumulator + (currentValue?.person * currentValue?.price);
                }, 0);

                document.getElementById("cart-discount-field").value = '';

                if (result.data?.type == "percentage") {
                    const reducedMoney = subTotal * (result.data?.amount / 100);

                    checkoutPageTotal.innerText = (subTotal - reducedMoney).toFixed(1) || 0.0;
                    checkoutPageDiscount.innerText = `- $ ${reducedMoney.toFixed(1) || 0.0}`;
                    checkoutPageDiscountD.innerHTML = `<img src="/public/assets/icon/tag.svg" alt="" class="icon">
                                    <p id="discountCode-p">${discountCode}</p>`;

                    localStorage.setItem("ak-traveler-dis", `${discountCode}$p$${result.data?.amount}`);
                }
                else if (result.data?.type == "fixed") {
                    const reducedMoney = result.data?.amount;

                    checkoutPageTotal.innerText = (subTotal - reducedMoney).toFixed(1) || 0.0;
                    checkoutPageDiscount.innerText = `- $ ${reducedMoney.toFixed(1) || 0.0}`;
                    checkoutPageDiscountD.innerHTML = `<img src="/public/assets/icon/tag.svg" alt="" class="icon">
                                    <p id="discountCode-p">${discountCode}</p>`;

                    localStorage.setItem("ak-traveler-dis", `${discountCode}$f$${result.data?.amount}`);
                }


            }
        }




        console.log({ result })


    } catch (error) {
        // Handle errors (e.g., network issues, server errors, etc.)
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    }
})


