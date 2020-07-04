import ScrapeRequest from "../contracts/ScrapeRequest.interface";
import HtmlProvider from "./HtmlProvider";

class Scraper {
  public async Scrape(request: ScrapeRequest): Promise<string> {
    const htmlProvider = new HtmlProvider();
    const html: string = await htmlProvider.GetHtml(request.url);

    try {
      const $ = cheerio.load(html);
      const result: string = $(request.selector).text();
      return result;
    } catch (error) {
      throw new Error(`ScrapeText, Error:, ${error}`);
    }
  }
}

export default Scraper;
