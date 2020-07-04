import cheerio from "cheerio";
import HtmlProvider from "./HtmlProvider";
import ScrapeRequest from "../contracts/ScrapeRequest.interface";

class Scraper {
  public async Scrape(request: ScrapeRequest): Promise<string[]> {
    const htmlProvider = new HtmlProvider();
    const html: string = await htmlProvider.GetHtml(request.url);
    const $ = cheerio.load(html);
    const results: string[] = new Array();
    request.selectors.forEach((selector) => {
      results.push(this.GetSelectedElement(selector, $));
    });
    return results;
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
