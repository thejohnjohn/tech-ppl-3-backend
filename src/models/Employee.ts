export default class Employee {
  
  name: string;
  email: string;
  phone: string;
  position: any[];
  photo?: string;
  payment: string;

  static message(): string {
    return 'Hello World'
  }
}
