import Patient from 'src/interfaces';
import Record from 'src/interfaces/record';
/* eslint-disable react/jsx-props-no-spreading */
import patientFixture from './patientFixture';

const patients : Patient[] = [patientFixture, {
  id: 2,
  startDate: new Date(),
  name: 'Carlos',
  lastName: 'Del Rio',
  type: 'Joven',
  gender: 'Hombre',
  telephone: '2126427',
  address: 'Temp',
  birthPlace: 'test',
  birthDate: '',
  postalCode: 832032,
  motive: 'Abuso',
  legalProceeding: true,
  status: true,
  abuseType: 'Sexual',
  abuseFirstTime: '10',
  abuseAttempts: '5',
  abuseMotive: 'Nomal',
  recordId: 1,
  users: [],
}];

const recordFixture : Record = {
  id: 1,
  patients,
  active: true,
  startDate: new Date(),
  forms: [
    {
      id: 1,
      name: 'Encuesta socioeconomica',
      createdDate: new Date(),
    },
    {
      id: 2,
      name: 'Relatoria',
      createdDate: new Date(),
    },
    {
      id: 3,
      name: 'Encuesta socioeconomica',
      createdDate: new Date(),
    },
  ],
};
export default recordFixture;
