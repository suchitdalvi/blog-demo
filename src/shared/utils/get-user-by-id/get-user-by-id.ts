import { User } from "../../models/user.interface";

export const getUserById = (users: User[], userId: number): User | undefined => users.find((user) => user.id === userId);