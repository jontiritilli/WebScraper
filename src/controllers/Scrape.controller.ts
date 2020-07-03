import express from "express";
import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";

class ScrapeController {
  public name: string;
  public path = "/scrape";
  public router = express.Router();

  constructor() {
    this.name = "scraper";
    this.intializeRoutes();
  }

  public async GetHtml(url: string): Promise<string> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(url);

      const bodyHandle = await page.$("body");

      const html = await page.evaluate((body) => body.innerHTML, bodyHandle);

      await bodyHandle?.dispose();

      return html;
    } catch (error) {
      throw new Error(`Axios failed ${error}`);
    }
  }
  private WriteHtml(html: string) {
    const fileName = "../../tmp/html";
    fs.writeFileSync(path.join(__dirname, fileName), html);
  }
  public async ScrapeText(selector: string, url: string): Promise<string> {
    const html: string = await this.GetHtml(url);
    this.WriteHtml(html);
    try {
      const $ = cheerio.load(html);
      const result: string = $(selector).text();
      console.log(result);
      return result;
    } catch (error) {
      throw new Error(`something went wrong:, ${error}`);
    }
  }

  public intializeRoutes() {
    this.router.post(this.path, this.getScrape);
  }

  public ValidateRequest(request: express.Request): boolean {
    const url = request.body.url,
      selector = request.body.selector;
    if (!selector || !url) {
      return false;
    } else {
      return true;
    }
  }

  getScrape = async (request: express.Request, response: express.Response) => {
    const isValidRequest: boolean = this.ValidateRequest(request);
    const url = request.body.url,
      selector = request.body.selector;
    let result: string;

    if (!isValidRequest) {
      response.status(400).send({
        message: `selector and url params must be provided in your request`,
      });
    }
    try {
      result = await this.ScrapeText(selector, url);
      response.send({
        message: "success",
        status: 200,
        result: result,
      });
    } catch (error) {
      response.send({ message: "Error", status: 500, error });
    }
  };
}

export default ScrapeController;
