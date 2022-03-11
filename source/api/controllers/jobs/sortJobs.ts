import paginator from "../../services/jobPaginator";
import jobSort from "../../services/jobSort";
const sortJob = async (req, res) => {
    let query = req.query;
    let sortedData = [];

    sortedData = await jobSort(query);

    if (sortedData.length > 5) {
        const paginatedData = paginator(sortedData, query.page ? query.page : 1, 5);
        return res.json({ message: "success", sorted: paginatedData });
    }

    return res.json({ message: "success", sorted: sortedData });
};

export default sortJob;
