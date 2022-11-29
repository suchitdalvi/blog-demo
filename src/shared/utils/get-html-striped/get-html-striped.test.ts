import { getHtmlStripedString } from "./get-html-striped";

describe("getHtmlStripedString", () => {
    test("Should return selected user by id", () => {
      const MOCK_HTML = "<span>content</span>";
      const result = getHtmlStripedString(MOCK_HTML);
  
      expect(result).toEqual('content');
    });
  });
  