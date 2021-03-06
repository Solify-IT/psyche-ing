export default interface Patients {
  id?: number;
  name: string;
  lastName: string;
  startDate: Date;
  type: string;
  gender: string;
  telephone: string;
  address: string;
  birthPlace: string;
  birthDate: string;
  postalCode: number;
  recordId: number,
  userId?: number,
  user?:any
}
