import express from "express";
import bodyParser from "body-parser";
import Handlebars from "express-handlebars";
import Logger from "./logger";
import path from "path";

class App {
  public app: express.Application;
  public port: number;
  public router: express.Router;

  constructor(controllers: any, port: number = 9001) {
    this.app = express();
    this.port = port;
    this.router = express.Router();

    this.prepareStatic();
    this.setViewEngine();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares(): void {
    this.app.use(Logger);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private initializeControllers(controllers: any): void {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  private prepareStatic(): void {
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  private setViewEngine(): void {
    this.app.engine(
      "hbs",
      Handlebars({
        extname: "hbs",
        defaultLayout: "base",
        layoutsDir: path.join(__dirname, "../views/layouts"),
        partialsDir: [
          //  path to your partials
          path.join(__dirname, "../views/partials"),
        ],
      })
    );
    this.app.set("view engine", "hbs");
    this.app.set("views", path.join(__dirname, "../views"));
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
