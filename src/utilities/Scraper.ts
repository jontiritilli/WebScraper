import cheerio from "cheerio";
import HtmlProvider from "./HtmlProvider";
import ScrapeRequest from "../contracts/ScrapeRequest.interface";

class Scraper {
  public async Scrape(request: ScrapeRequest): Promise<string[]> {
    try {
      const htmlProvider = new HtmlProvider();
      const html: string = await htmlProvider.GetHtml(request.url);
      const $ = cheerio.load(html);
      const results: string[] = new Array();
      if (Array.isArray(request.selectors)) {
        request.selectors.forEach((selector) => {
          results.push(this.GetSelectedElement(selector, $));
        });
      } else if (typeof request.selectors === "string") {
        results.push(this.GetSelectedElement(request.selectors, $));
      }
      return results;
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  private GetSelectedElement(selector: string, $: CheerioStatic) {
    try {
      const result: string = $(selector).text();
      return result;
    } catch (error) {
      throw new Error(`ScrapeText, Error:, ${error}`);
    }
  }
}

export default Scraper;
