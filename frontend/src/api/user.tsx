import PatientArea from 'src/interfaces/patientArea';
import User from '../interfaces/user';
import server from '../utils/server';
import handleResponse from '../utils/handleResponse';

export default async function CreateUser(user:User) {
  const result = await server.post('/users', { ...user }).then(handleResponse).catch(handleResponse);
  return result.data;
}

export async function createProfile(areas: Array<PatientArea>) {
  const result = await server.post('/profile', areas).then(handleResponse).catch(handleResponse);
  return result.data;
}
