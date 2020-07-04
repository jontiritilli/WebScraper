import ScrapeRequest from "../contracts/ScrapeRequest.interface";

class RequestValidator {
  Validate(request: ScrapeRequest) {
    if (!request.selectors || !request.url) {
      return false;
    } else {
      return true;
    }
  }
}

export default RequestValidator;
