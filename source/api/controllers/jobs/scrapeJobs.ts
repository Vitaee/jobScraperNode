import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
/**
 * Scrape job source links from home page end return them in the list.
 *
 * @param {int} startPage - the start page number
 * @param {int} endPage - the last page number
 */
const scrapePages = async (startPage = 1, endPage = 2) => {
    let sourceLinks = [];
    let url;

    for (startPage; startPage <= endPage; startPage++) {
        startPage > 1
            ? (url = "https://www.postjobfree.com/jobs?q=software+engineer&l=&radius=25&p=" + startPage.toString())
            : (url = "https://www.postjobfree.com/jobs?q=software+engineer&l=&radius=25&p=1");

        let html = await axios.get(url);

        let $ = cheerio.load(html.data);
        $(".snippetPadding").each((i, elem) => {
            sourceLinks.push("https://www.postjobfree.com" + $(elem).find("h3").find("a").attr("href"));
        });
    }

    return sourceLinks;
};

/**
 * Scrape job details from source link and append to dict.
 *
 * @param {Array} sourceLinks - Contains source links
 */
interface Idata {
    datas: {
        title: string;
        location: string;
        description: string;
        postedDate: string;
        compName: string;
    }[];
}

const scrapeDetails = async (sourceLinks) => {
    let loop_datas = { datas: [] };

    for (let index = 0; index < sourceLinks.length; index++) {
        const html = await axios.get(sourceLinks[index]);

        const $ = await cheerio.load(html.data);

        const title = $("#titleH1").text();
        const location = $(".colorLocation").text();
        const description = $(".normalText").text();
        const postedDate = $("#PostedDate").text();
        const compName = $(".colorCompany").text();

        const js_data = {
            title: title,
            location: location,
            description: description,
            postedDate: postedDate,
            compName: compName
        };

        loop_datas["datas"].push(js_data);
    }
    return loop_datas;
};

const saveDatas = async (data: Idata) => {
    fs.writeFile("./data.json", JSON.stringify(data), "utf8", function (err) {
        if (err) throw err;

        console.log("The file was saved!");
    });
};

const scrapeJobs = async (req, res) => {
    let sourceLinks;
    req.query.startPage ? (sourceLinks = await scrapePages(req.query.startPage, req.query.endPage)) : (sourceLinks = await scrapePages(1, 1));

    let jobDetails = await scrapeDetails(sourceLinks);

    let saveData = await saveDatas(jobDetails);

    return res.status(200).send({ message: "We save data to json file succesfully." });
};

export default scrapeJobs;
