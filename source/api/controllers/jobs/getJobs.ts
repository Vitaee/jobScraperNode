import datas from "../../../data.json";
const getJobs = async (req, res) => {
    // let dirArr = await fsPromises.readdir("../../data", "utf-8");

    // console.log(dirArr);
    //for (let i = 0; i < dirArr.length)

    return res.json({ message: "success", data: datas });
};

export default getJobs;
