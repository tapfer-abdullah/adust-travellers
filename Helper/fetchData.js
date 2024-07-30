
const bashedURL = 'https://adust-travllers-backend.vercel.app/api/v1';
// const bashedURL = 'http://localhost:5000/api/v1';

export const GetData = async (url, select) => {
    try {
        if (select) {
            const response = await fetch(`${bashedURL}/${url}?select=${select}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        else {
            const response = await fetch(`${bashedURL}/${url}`);

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


export const GetDataByID = async (url, id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/${url}/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log({ data })
        return data;



    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

