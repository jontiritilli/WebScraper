import ScrapeRequest from "./ScrapeRequest.interface";

interface ScrapeResponse {
  date: Date;
  success: boolean;
  result?: string;
  selector?: string;
  status: number;
  url?: string;
  error?: string;
}

export default ScrapeResponse;
