import ScrapeRequest from "./ScrapeRequest.interface";

interface ScrapeResponse {
  date: Date;
  message: string;
  result: string;
  selector: string;
  status: number;
  url: string;
}

export default ScrapeResponse;
