export default class Client {
  clientName: string;
  phone: string;
  email: string;
  site: string;
  CNPJ: number;
  logo: string;

  static message(): string {
    return 'Hello World'
  }
}
