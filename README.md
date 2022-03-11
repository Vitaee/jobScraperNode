# Job List Scraper Node & TypeScript

This project includes Beekin's "Web Scraper Task" project developed by me according to requirements

## Run project

-   npm install
-   npm run dev

## Resource components / urls

Major resource components supported by the JobScraper API are:

-   jobs

| resource | description                                                  |
| :------- | :----------------------------------------------------------- |
| `/jobs`  | handle with jobs data which api have return list 10 per page |

## Jobs components and identifiers

Resource components can be used in conjunction with identifiers to retrieve the metadata for that identifier.

| resource        | description                                                                                                               |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `/jobs/`        | this endpoint handle with all jobs which api have, accept get request and return all data with pagination support.        |
| `/jobs/search/` | this endpoint handle with searching through to all data. Accept get request return searched data with pagination support. |
| `/jobs/sort/`   | this endpoint handle with sorting. Accept get request and datas sorted by `postedDate`                                    |
| `/jobs/scrape/` | this endpoint handle with scraping data from target website and it saves scraped data to json file.                       |

# Example query using URI parameters **all jobs**

-   Get jobs with simple get request and if you use page param you can check other pages. 10 data per page listed.

| resource                      | description                               |
| :---------------------------- | :---------------------------------------- |
| `/jobs/?{page}={page_number}` | example url `localhost:3000/jobs/?page=1` |

### Example output

```
{
    "message": "success",
    "data": {
        "page": 1,
        "per_page": 10,
        "pre_page": null,
        "next_page": 2,
        "total": 60,
        "total_pages": 6,
        "data": [
            {
                "title": "Software Engineer - Simulation",
                "location": "Chesterfield, MO",
                "description": "Looking to hire Software Engineer two to ten+ year...",
                "postedDate": "February 13, 2022",
                "compName": "CompuScienceIT"
            },
            .
            .
            .
        ]
    }
```

# Example query using URI parameters **search**

| resource       | description                                                 |
| :------------- | :---------------------------------------------------------- |
| `jobs/search/` | example url `localhost:3000/jobs/search/?technology=python` |

Example output

```
{
    "message": "success",
    "filtered": {
        "page": 1,
        "per_page": 5,
        "pre_page": null,
        "next_page": 2,
        "total": 18,
        "total_pages": 4,
        "data": [
            {
                "title": "Software Engineer",
                "location": "London, UK",
                "description": "We are looking to hire Software Engineers...",
                "postedDate": "February 13, 2022",
                "compName": "CompuScienceIT"
            },
            .
            .
            .
    }
        ]
```

# Example query using URI parameters **sort**

| resource       | description                                             |
| :------------- | :------------------------------------------------------ |
| `jobs/search/` | example url `localhost:3000/jobs/sort/?location=Zurich` |

Example output

```
{
    "message": "success",
    "sorted": [
        {
            "title": "IT Cloud DevOps Engineer",
            "location": "Altstetten, Zurich, 8048, Switzerland",
            "description": "Requisition Number your role..",
            "postedDate": "March 02, 2022",
            "compName": "UBS"
        },
            .
            .
            .
            }
        ]
}

```

-   If the result length is more than 5 pagination suppor will work so you can also add `page` query param to the request url.

# Example query using URI parameters **scrape**

| resource       | description                                                     |
| :------------- | :-------------------------------------------------------------- |
| `jobs/scrape/` | example url `localhost:3000/jobs/scrape/?startPage=1&endPage=2` |

Example output

```
{
    "message": "We save data to json file succesfully."
}
```
