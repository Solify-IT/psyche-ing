import { BehaviorSubject } from 'rxjs';
// import {API_AUTH} from '../routes/serverRoutes';

import server from '../utils/server';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() { return currentUserSubject.value; },
};

export async function login(username, password) {
  const result = await server.post('/login', { username, password });

  localStorage.setItem('currentUser', JSON.stringify(result.data));
  currentUserSubject.next(result.data);

  return result.data;
}

export function profileSet() {
  const user = { ...authenticationService.currentUserValue.user, firstTime: false };
  const newUser = { ...authenticationService.currentUserValue, user };
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  currentUserSubject.next(newUser);
}

export function profileUnset() {
  const user = { ...authenticationService.currentUserValue.user, firstTime: true };
  const newUser = { ...authenticationService.currentUserValue, user };
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  currentUserSubject.next(newUser);
}

export function setPatientAreas(areas) {
  const user = { ...authenticationService.currentUserValue.user, areas };
  const newUser = { ...authenticationService.currentUserValue, user };
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  currentUserSubject.next(newUser);
}

export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}
