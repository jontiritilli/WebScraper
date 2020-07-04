import puppeteer from "puppeteer";

class HtmlProvider {
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
}

export default HtmlProvider;
