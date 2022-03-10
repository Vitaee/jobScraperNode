const axios = require("axios");
const cheerio = require("cheerio");

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

        let $ = await cheerio.load(html.data);
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
const scrapeDetails = async (sourceLinks) => {
    let loop_datas = { datas: [] };

    for (let index = 0; index < sourceLinks.length; index++) {
        let html = await axios.get(sourceLinks[index]);

        let $ = await cheerio.load(html.data);

        let title = $("#titleH1").text();
        let location = $(".colorLocation").text();
        let description = $(".normalText").text();
        let postedDate = $("#PostedDate").text();
        let compName = $(".colorCompany").text();

        js_data = {
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

const saveDatas = async (data) => {
    const fs = require("fs");

    fs.writeFile("../../../data.json", JSON.stringify(data), "utf8", function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
};

module.exports = async (req, res) => {
    console.log("scrape details");
};

async function test() {
    let data = await scrapePages(1, 2);
    let details = await scrapeDetails(data);
    let save = await saveDatas(details);
}

test();
