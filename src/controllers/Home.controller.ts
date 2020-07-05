import express from "express";

class HomeController {
  public name: string;
  public path = "/";
  public router = express.Router();

  constructor() {
    this.name = "home";
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, this.getHome);
  }
  public getHome(request: express.Request, response: express.Response) {
    response.render("main");
  }
}

export default HomeController;
