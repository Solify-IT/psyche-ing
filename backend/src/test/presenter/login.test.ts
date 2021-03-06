import { User } from 'domain/model';
import jwt from 'jsonwebtoken';
import UserPresenter from 'interface/presenter/userPresenter';

describe('User presenter', () => {
  const userPresenter : UserPresenter = new UserPresenter();
  const user : User = {
    id: 1, username: 'test', password: 'test', email: 'test@mail.com', role: 'role', address: 'Av Luz 93', name: 'carlos', lastName: 'carlos', zipCode: '66777', professionalLicense: '1111', active: true, patients: null,
  };
  test('should return token and user data', () => {
    const result = userPresenter.login(user);
    expect(result.token).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.user.username).toEqual(user.username);
  });
  test('decoded token should have user data and expiration', () => {
    const result = userPresenter.login(user);
    const token : any = jwt.decode(result.token);
    expect(token).toBeDefined();
    expect(token.user.username).toEqual(user.username);
    expect(token.exp).toBeDefined();
  });
});
