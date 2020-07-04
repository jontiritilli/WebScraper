import ScrapeRequest from "./ScrapeRequest.interface";

interface ScrapeResponse {
  date: Date;
  success: boolean;
  result?: string[];
  selectors?: string[];
  status: number;
  url?: string;
  error?: string;
}

export default ScrapeResponse;
