

window.addEventListener("load", () => {
    const allSearchParams = window.location.search.split("?")?.[1]?.split("&");
    const pathname = window.location.pathname;
    // console.log({ pathname })

    let searchObj = {};
    allSearchParams?.forEach(s => {
        const arr = s.split("=");
        searchObj[`${arr[0]}`] = arr[1];
    })

    //destination
    if (pathname == "/destination/index.html") {
        console.log({ title: "Destination page", id: searchObj?.id })


    }
    //details
    else if (pathname == "/destination/details.html") {
        console.log({ title: "Details page", id: searchObj?.id })

        document.getElementById('dest-name').innerText = searchObj?.id || "AK";
    }


    console.log({ searchObj });
})