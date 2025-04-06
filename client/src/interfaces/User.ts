export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  likes?: string[];
}
export interface Token {
  _id: string;
  isAdmin: boolean;
}

export interface loginUser {
  email: string;
  password: string;
}
