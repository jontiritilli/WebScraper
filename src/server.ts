import App from "./app";
import ScrapeController from "./controllers/Scrape.controller";

const PORT = 9001;

const app = new App([new ScrapeController()], PORT);

app.listen();
