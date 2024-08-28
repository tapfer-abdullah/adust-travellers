
const bashedURL = 'https://adust-travllers-backend.vercel.app/api/v1';
// const bashedURL = 'http://localhost:5000/api/v1';

export const GetData = async (url, select, options = '') => {
    try {
        if (select) {
            const response = await fetch(`${bashedURL}/${url}?select=${select}${options}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        else {
            const response = await fetch(`${bashedURL}/${url}${options}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }


    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};


export const GetDataByID = async (url, id, options = '') => {
    try {
        const response = await fetch(`${bashedURL}/${url}/${id}${options}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;



    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const GetDataByRef = async (url) => {
    try {
        const response = await fetch(`${bashedURL}/${url}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log({ data })
        return data;



    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export const searchDestination = async (searchText, startDate, endDate) => {
    try {
        const response = await fetch(`${bashedURL}/activity/search`, {
            method: "PATCH",
            body: JSON.stringify({ startDate, endDate, searchText }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log({ data })
        return data;



    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

