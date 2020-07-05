import express from "express";
import Scraper from "../utilities/Scraper";
import ScrapeRequest from "../contracts/ScrapeRequest.interface";
import ScrapeResponse from "../contracts/ScrapeResponse.interface";
import RequestValidator from "../utilities/RequestValidator";

class ScrapeController {
  public name: string;
  public path = "/scrape";
  public router = express.Router();

  constructor() {
    this.name = "scraper";
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.postScrape);
  }

  // route work happens here
  private async postScrape(
    request: express.Request,
    response: express.Response
  ) {
    const url = request.body.url;
    const selectors = request.body["selectors[]"];

    const scrapeRequest: ScrapeRequest = <ScrapeRequest>{
      url,
      selectors,
    };

    const requestValidator = new RequestValidator();

    const isValidRequest: boolean = requestValidator.Validate(scrapeRequest);

    if (!isValidRequest) {
      response.status(400).send(<ScrapeResponse>{
        date: new Date(),
        error: `selector and url params must be provided in your request`,
      });
    }

    try {
      const scraper = new Scraper();
      const results: string[] = await scraper.Scrape(scrapeRequest);
      response.send(<ScrapeResponse>{
        date: new Date(),
        success: true,
        status: 200,
        results,
        selectors,
        url,
      });
    } catch (error) {
      response.send(<ScrapeResponse>{
        date: new Date(),
        success: false,
        status: 500,
        error,
      });
    }
  }
}

export default ScrapeController;
