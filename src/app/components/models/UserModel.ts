export interface UserModel {
  email: string;
  password: string;
  clientInfo: {
    firstName: string;
    lastName: string;
    birthDay: string;
    industry: string;
    subCategory: string;
    telephoneNumber: number;
  };
}
