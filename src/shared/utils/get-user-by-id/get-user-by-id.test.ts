import { MOCK_USERS } from "../../../mocks/users.mock";
import { getUserById } from "./get-user-by-id";

describe("getUserById", () => {
    test("Should return selected user by id", () => {
      const selectedUser = getUserById(MOCK_USERS, 1);
  
      expect(selectedUser?.id).toEqual(MOCK_USERS[0].id);
    });
  });
  