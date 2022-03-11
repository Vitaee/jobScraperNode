import datas from "../../../data.json";

const jobSort = async (query) => {
    const sortedData = datas.datas.filter((data) => {
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

    sortedData.sort(function (a, b) {
        var c = new Date(a.postedDate);
        var d = new Date(b.postedDate);
        return c > d ? 1 : -1;
    });

    return sortedData;
};

export default jobSort;
