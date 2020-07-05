import App from "./app";
import ScrapeController from "./controllers/Scrape.controller";
import HomeController from "./controllers/Home.controller";

const PORT = 9001;

const app = new App([new ScrapeController(), new HomeController()], PORT);

app.listen();
