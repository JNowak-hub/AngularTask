export interface ClientModel {
  email: string;
  id: number;
  clientInfo: {
    firstName: string;
    lastName: string;
    birthDay: string;
    industry: string;
    subCategory: string;
    telephoneNumber: number;
  };
}
