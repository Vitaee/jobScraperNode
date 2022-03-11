import server from "../server";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
let should = chai.should();

//scrape all jobs
describe("/GET scrape jobs", () => {
    it("it should scrape jobs", (done) => {
        chai.request(server)
            .get("/jobs/scrape/?startPage=1&endPage=2")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                done();
            });
    }).timeout(25000);
});

//get all jobs
describe("/GET all jobs", () => {
    it("it should fetch all jobs", (done) => {
        chai.request(server)
            .get("/jobs")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                done();
            });
    });
});

//sort all jobs
describe("/GET sort job", () => {
    it("it should show sorted jobs by date", (done) => {
        chai.request(server)
            .get("/jobs/sort")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                done();
            });
    });
});

//search all jobs
describe("/GET search jobs", () => {
    it("it should fetch searched jobs", (done) => {
        chai.request(server)
            .get("/jobs/search/?location=Zurich")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                done();
            });
    });
});
