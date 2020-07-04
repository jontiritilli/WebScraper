# Web Scraper API

# Description

## Built on Node with Typescript using Puppeteer and Cheerio to scrape live data from websites

# Instructions

1. Clone this repository
1. Using a Bash terminal, navigate to the project root
1. Use `npm i` to perform installation of packages
1. Use `npm run start:dev` to run the server
1. Example request

- Example Request:
  ```
  {
    "url": "https://www.coindesk.com/price/bitcoin",
    "selectors": [
        "#__next > main > section > div.price-page > div.coin-detail-module > div > section > div > div > section.coin-info > div > dl:nth-child(1) > dd"
    ]
  }
  ```
- Example Response:
  ```
    {
    "date": "2020-07-04T13:07:40.179Z",
    "success": true,
    "status": 200,
    "results": [
    "$9,074.94"
    ],
    "selectors": [
    "#__next > main > section > div.price-page > div.coin-detail-module > div > section > div > div > section.coin-info > div > dl:nth-child(1) > dd"
    ],
    "url": "https://www.coindesk.com/price/bitcoin"
    }
  ```
