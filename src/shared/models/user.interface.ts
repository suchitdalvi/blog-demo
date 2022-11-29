export type User = {
    id: number;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string;
    password: string;
    profilePhoto?:string;
  };