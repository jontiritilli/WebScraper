import ScrapeRequest from "../contracts/ScrapeRequest.interface";

class RequestValidator {
  Validate(request: ScrapeRequest) {
    if (!request.selectors) {
      throw new Error("Selectors must be provided");
    }
    if (!request.url) {
      throw new Error("Url must be provided");
    }
    return true;
  }
}

export default RequestValidator;
