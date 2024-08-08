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

