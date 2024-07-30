import { activityByID } from "./HomeContents/Activities.js";
import { destinationByID } from "./HomeContents/Destinations.js";


window.addEventListener("load", async () => {
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
        await destinationByID("destination", searchObj?.id);


    }
    //details
    else if (pathname == "/destination/details.html") {
        // console.log({ title: "Details page", id: searchObj?.id })

        // document.getElementById('dest-name').innerText = searchObj?.id || "AK";
        // activityByID

        await activityByID("activity", searchObj?.id);
    }


    // console.log({ searchObj });
})


