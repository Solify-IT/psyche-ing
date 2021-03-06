import { PasswordConfirm, wrapError } from '@types';
import UserInteractor from 'app/interactor/userInteractor';
import PatientArea from 'domain/model/user/patientArea';
import UserLoginResult from 'domain/model/user/userLoginResult';
import { IContext } from 'utils/context';
import getRequestUser from 'utils/getRequestUser';

export default class UserController {
  userInteractor: UserInteractor;

  constructor(userInteractor: UserInteractor) {
    this.userInteractor = userInteractor;
  }

  async registerUser(context: IContext): Promise<void> {
    const [user, error] = await wrapError(this.userInteractor.register(context.request.body));

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(user);
  }

  async registerDoctorProfile(context: IContext): Promise<void> {
    const token = context.request.headers.authorization.split(' ')[1];
    const user : UserLoginResult = getRequestUser(token);
    const { areas } = context.request.body;

    const finalAreas : PatientArea[] = [];
    areas.forEach((area : PatientArea) => {
      finalAreas.push({
        name: area.name,
        userId: user.id,
        checked: area.checked,
      });
    });
    const { workSchedule } = context.request.body;

    const [, error] = await wrapError(
      this.userInteractor.registerDoctorProfile(user.id, finalAreas, workSchedule),
    );
    if (error) {
      context.next(error);
      return;
    }

    const [userProfileSet, userError] = await wrapError(
      this.userInteractor.userProfileSet(user.id),
    );
    if (userError) {
      context.next(userError);
      return;
    }
    context.response.status(200).json(userProfileSet);
  }

  async getUsers(context: IContext): Promise<void> {
    const token = context.request.headers.authorization.split(' ')[1];
    const user : UserLoginResult = getRequestUser(token);
    const [users, error] = await wrapError(this.userInteractor.getOne(user.id));
    if (error) {
      context.next(error);
      return;
    }

    context.response.status(200).json(users);
  }

  async modifyDoctorProfile(context: IContext): Promise<void> {
    const token = context.request.headers.authorization.split(' ')[1];
    const user : UserLoginResult = getRequestUser(token);

    const { areas } = context.request.body;

    const finalAreas : PatientArea[] = [];
    areas.forEach((area : PatientArea) => {
      finalAreas.push({
        name: area.name,
        userId: user.id,
        checked: area.checked,
        id: area.id,
      });
    });
    const { workSchedule } = context.request.body;

    const [patientAreas, error] = await wrapError(
      this.userInteractor.registerDoctorProfile(user.id, finalAreas, workSchedule),
    );
    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(patientAreas);
  }

  async getUserPatientAreas(context: IContext): Promise<void> {
    const token = context.request.headers.authorization.split(' ')[1];
    const user : UserLoginResult = getRequestUser(token);
    const request : PatientArea[] = Object.values(context.request.body);
    const areas : PatientArea[] = [];
    request.forEach((area) => {
      areas.push({
        name: area.name,
        userId: user.id,
        checked: area.checked,
      });
    });
    const [patientAreas, error] = await wrapError(
      this.userInteractor.getUserAreas(user.id),
    );
    if (error) {
      context.next(error);
      return;
    }
    const [resultUser, err] = await wrapError(
      this.userInteractor.getOne(user.id),
    );
    if (err) {
      context.next(err);
      return;
    }
    context.response.status(200).json({ patientAreas, workSchedule: resultUser.workSchedule });
  }

  async login(context: IContext): Promise<void> {
    const { username, password } = context.request.body;
    const [loginResult, error] = await wrapError(this.userInteractor.login(username, password));

    if (error) {
      context.next(error);
      return;
    }

    context.response.status(200).json(loginResult);
  }

  async updateProfile(context: IContext): Promise<void> {
    const id = parseInt(context.request.params.id, 10);
    const [userProfile, error] = await
    wrapError(this.userInteractor.updateProfile({ id, ...context.request.body }));
    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(userProfile);
  }

  async getUser(context: IContext): Promise<void> {
    const { username } = context.request.params;
    const [userExist, error] = await wrapError(this.userInteractor.getUser(username));
    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(userExist);
  }

  async getAllUsers(context: IContext): Promise<void> {
    const [users, error] = await wrapError(this.userInteractor.getAll());
    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(users);
  }

  async deactivateAccount(context: IContext): Promise<void> {
    const token = context.request.headers.authorization.split(' ')[1];
    const user : UserLoginResult = getRequestUser(token);
    if (user.role !== 'administrador') {
      context.response.status(400);
    }
    const [result, error] = await
    wrapError(this.userInteractor.deactivateAccount(parseInt(context.request.params.id, 10)));
    if (error) {
      throw error;
    }
    context.response.status(200).json(result);
  }

  async changePassword(context: IContext): Promise<void> {
    const token = context.request.headers.authorization.split(' ')[1];
    const user : UserLoginResult = getRequestUser(token);
    const { oldPassword, password } : PasswordConfirm = context.request.body;

    const [, oldPasswordError] = await wrapError(this.userInteractor.passwordValid(
      user.username, oldPassword,
    ));

    if (oldPasswordError) {
      context.next(oldPasswordError);
      return;
    }

    const [, error] = await wrapError(this.userInteractor.changePassword(user.id, password));
    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(user);
  }

  async getUserByEmail(context: IContext): Promise<void> {
    const { email } = context.request.params;
    console.log(email);
    const [userExist, error] = await wrapError(this.userInteractor.getUserByEmail(email));
    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(userExist);
  }

  async changePasswordAdmin(context: IContext): Promise<void> {
    const token = context.request.headers.authorization.split(' ')[1];
    const user : UserLoginResult = getRequestUser(token);
    const { id } = context.request.params;
    const { password } : PasswordConfirm = context.request.body;

    if (user.role !== 'administador') {
      context.response.status(400);
    }

    const [userChanged, error] = await wrapError(
      this.userInteractor.changePassword(parseInt(id, 10), password),
    );

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(userChanged);
  }
}
