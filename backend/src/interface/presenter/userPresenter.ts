import { User } from 'domain/model';
import IUserPresenter from 'app/presenter/userPresenter';
import LoginResult from 'domain/model/user/loginResult';
import jwt from 'jsonwebtoken';
import jwtConfig from 'utils/jwtConfig';
import PatientArea from 'domain/model/user/patientArea';
import bcrypt from 'bcrypt';

export default class UserPresenter implements IUserPresenter {
  findOne(user: User): User {
    return user;
  }

  expiresIn: string = '30 days';

  patientAreas(areas: PatientArea[]): PatientArea[] {
    return areas;
  }

  getUser(user: User): User {
    return user;
  }

  login(user: User): LoginResult {
    const userLoginResult = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      firstTime: user.firstTime,
      areas: user.patientAreas,
      workSchedule: user.workSchedule,
    };
    const token = jwt.sign({ user: userLoginResult },
      jwtConfig.secret, { expiresIn: this.expiresIn });

    return { user: userLoginResult, token };
  }

  register(user: User): User {
    return user;
  }

  findAll(users: User[]): User[] {
    return users;
  }

  updateProfile(user: User): User {
    return user;
  }

  deactiveAccount(user:User) : User {
    return user;
  }

  getUserByEmail(user: User): User {
    return user;
  }

  async encryptedPassword(password: string) : Promise<string> {
    const encryptedPassword = await bcrypt.hash(password, 8);
    return encryptedPassword;
  }
}
