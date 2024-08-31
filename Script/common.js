const bashedURL = 'https://adust-travllers-backend.vercel.app/api/v1';
// const bashedURL = 'http://localhost:5000/api/v1';

const toast = (title) => {
    Toastify({
        text: `${title}   `,
        duration: 1200,
        close: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}


export const basicAlert = (title, type) => {
    // question info warning error success
    Swal.fire({
        icon: type || "info",
        title: title,
    });
}

export const autoCloseAlert = (title, type) => {
    Swal.fire({
        // position: "top-center",
        icon: type || "info",
        title: title,
        showConfirmButton: false,
        timer: 1500
    });
}

export const loginAlert = (title, type) => {
    Swal.fire({
        icon: type || "info",
        title: title,
        confirmButtonText: "Log In",
    }).then((result) => {
        window.location.assign('/auth/login.html');
    });
}


export function toggleDropdown() {
    const optionsList = document.getElementById('optionsList');
    optionsList.style.display = optionsList.style.display === 'block' ? 'none' : 'block';
}

// Filter options based on input
export function filterOptions() {
    const input = document.getElementById('searchInput').value.toUpperCase();
    const options = document.getElementsByClassName('option');

    for (let i = 0; i < options.length; i++) {
        const optionText = options[i].textContent || options[i].innerText;
        if (optionText.toUpperCase().indexOf(input) > -1) {
            options[i].style.display = '';
        } else {
            options[i].style.display = 'none';
        }
    }
}

// Select an option and close dropdown
export function selectOption(element) {
    const input = document.getElementById('searchInput');
    input.value = element.target.innerText; // Set input value to selected option
    toggleDropdown(); // Close dropdown
}

export const loadSearchFunction = async () => {
    const suggestionsContainer = document.getElementById('optionsList');
    const res = await fetch(`${bashedURL}/activity?page=1&limit=500&select=location0name`)
    const data = await res.json();

    const optionSet = new Set();
    data?.data?.data?.map((singleData, index) => {
        const loc = singleData?.location?.split(',');
        optionSet.add(singleData?.name)
        loc?.map(item => {

            optionSet.add(item)
        })
    })

    suggestionsContainer.innerHTML = ''
    for (let item of optionSet) {
        const div = document.createElement('div');
        div.classList.add('option')
        div.innerText = item;
        div.addEventListener('click', selectOption);
        suggestionsContainer.appendChild(div);
    }

    const cusInput = document.getElementById('searchInput');
    cusInput.addEventListener('keyup', filterOptions)
    cusInput.addEventListener('click', toggleDropdown)
}