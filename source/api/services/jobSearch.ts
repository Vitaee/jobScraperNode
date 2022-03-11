import datas from "../../../data.json";

const jobSearch = async (query) => {
    const filteredData = datas.datas.filter((data) => {
        let isValid = true;
        for (const key in query) {
            try {
                isValid = isValid && data[key].includes(query[key].charAt(0).toUpperCase() + query[key].slice(1));
            } catch {
                isValid = isValid && data["description"].includes(query[key].charAt(0).toUpperCase() + query[key].slice(1));
            }
        }

        return isValid;
    });

    return filteredData;
};

export default jobSearch;
