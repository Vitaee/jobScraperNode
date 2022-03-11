import paginator from "../../services/jobPaginator";
import datas from "../../../../data.json";
import { query } from "express";
const getJobs = async (
    req: { query: { page: number } },
    res: { json: (arg0: { message: string; data: { page: number; per_page: number; pre_page: number; next_page: number; total: any; total_pages: number; data: any } }) => any }
) => {
    var result: any;
    if (query) {
        result = paginator(datas, req.query.page, 10);
    } else {
        result = paginator(datas, 1, 10);
    }

    return res.json({ message: "success", data: result });
};

export default getJobs;
