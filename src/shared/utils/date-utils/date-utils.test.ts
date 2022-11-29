import { timeAgo } from "./date-utils";

const currentDate = new Date().getTime();
describe("getFormattedDate", () => {
    test("Should return now date format", () => {
      const result = timeAgo(currentDate);
  
      expect(result).toEqual('now');
    });

    test("Should return seconds ago date format", () => {
      const result = timeAgo(currentDate - 16000);
  
      expect(result).toEqual('16 seconds ago');
    });

    test("Should return minute ago date format", () => {
      const result = timeAgo(currentDate - 65000);
  
      expect(result).toEqual('about a minute ago');
    });

    test("Should return minutes ago date format", () => {
      const result = timeAgo(currentDate - 160000);
  
      expect(result).toEqual('3 minutes ago');
    });

    test("Should return Today date format", () => {
      const result = timeAgo(currentDate - 16000000);

      expect(result).toContain('Today');
    });

    test("Should return yesterday date format", () => {
      const today = new Date();
      today.setDate(today.getDate() - 1);
      const result = timeAgo(today);
  
      expect(result).toContain("Yesterday");
    });

    test("Should return this year date format", () => {
      const today = new Date();
      today.setMonth(today.getMonth() - 1);
      const result = timeAgo(today);
  
      expect(result).toContain(today.getDate().toString());
    });

    test("Should return previous year date format", () => {
      const today = new Date();
      today.setFullYear(today.getFullYear() - 1);
      const result = timeAgo(today);
  
      expect(result).toContain(today.getFullYear().toString());
    });
  });
  