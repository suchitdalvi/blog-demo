import { getBase64 } from "./get-base64";

describe("getBase64", () => {
    test("Should return base 64 string", async() => {
        const testImageFile = new File(["hello"], "hello.png", { type: "image/png" });

      const result = await getBase64(testImageFile);
  
      expect(result).toContain('data:image/png;base64');
    });
  });
  