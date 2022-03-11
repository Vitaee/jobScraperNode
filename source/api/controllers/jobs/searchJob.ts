import paginator from "../../services/jobPaginator";
import jobSearch from "../../services/jobSearch";
const searchJob = async (
    req: { query: any },
    res: {
        json: (arg0: {
            message: string;
            filtered:
                | { page: number; per_page: number; pre_page: number; next_page: number; total: any; total_pages: number; data: any }
                | { title: string; location: string; description: string; postedDate: string; compName: string }[];
        }) => any;
    }
) => {
    let query = req.query;

    let finalData = await jobSearch(query);

    if (finalData.length > 5) {
        const paginatedData = paginator(finalData, query.page ? query.page : 1, 5);
        return res.json({ message: "success", filtered: paginatedData });
    }

    return res.json({ message: "success", filtered: finalData });
};

export default searchJob;
