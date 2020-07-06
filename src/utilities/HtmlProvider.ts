import puppeteer from "puppeteer";

class HtmlProvider {
  public async GetHtml(url: string): Promise<string> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(url);

      const htmlHandle = await page.$("html");

      const html = await page.evaluate((html) => html.innerHTML, htmlHandle);

      await htmlHandle?.dispose();

      return html;
    } catch (error) {
      throw new Error(`HtmlProvider failed ${error}`);
    }
  }
}

export default HtmlProvider;
