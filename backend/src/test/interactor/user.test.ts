import { wrapError } from '@types';
import UserInteractor from 'app/interactor/userInteractor';
import PatientArea from 'domain/model/user/patientArea';
import patientAreaFixture from 'fixtures/patientArea';
import Datastore from 'infraestructure/datastore/datastore';
import UserPresenter from 'interface/presenter/userPresenter';
import { UserRepository } from 'interface/repository';
import testConnection from 'test/utils/testConnection';

jest.mock('interface/repository/userRepository');
jest.mock('infraestructure/datastore/datastore');

const datastore = new Datastore();
const userRepository = new UserRepository(datastore);
const userPresenter = new UserPresenter();
const interactor = new UserInteractor(userRepository, userPresenter);

describe('User register profile', () => {
  beforeAll(async () => {
    await testConnection.create();
  });

  afterAll(async () => {
    await testConnection.close();
  });

  beforeEach(async () => {
    await testConnection.clear();
  });
  const patientAreas : PatientArea[] = patientAreaFixture;

  test('should return list of patient areas when registered', async () => {
    jest.spyOn(
      userRepository, 'registerDoctorProfile',
    ).mockImplementation(async () => patientAreaFixture);
    const [result, error] = await wrapError(interactor.registerDoctorProfile(1, patientAreaFixture, ''));

    expect(error).toBe(null);
    expect(result).toBeDefined();
    expect(result[0].name).toEqual(patientAreas[0].name);
  });

  test('should catch error from repository', async () => {
    jest.spyOn(
      userRepository, 'registerDoctorProfile',
    ).mockImplementation(async () => { throw new Error('An error occured'); });
    const [result, error] = await wrapError(interactor.registerDoctorProfile(1, patientAreaFixture, ''));

    expect(error).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });
  test('should modify profile', async () => {
    jest.spyOn(
      userRepository, 'registerDoctorProfile',
    ).mockImplementation(async () => patientAreaFixture);
    const [result, error] = await wrapError(interactor.registerDoctorProfile(1, patientAreaFixture, ''));

    expect(error).toBe(null);
    expect(result).toBeDefined();
    expect(result[0].name).toEqual(patientAreas[0].name);
  });

  test('should catch error from repository', async () => {
    jest.spyOn(
      userRepository, 'registerDoctorProfile',
    ).mockImplementation(async () => { throw new Error('An error occured'); });
    const [result, error] = await wrapError(interactor.registerDoctorProfile(1, patientAreaFixture, ''));

    expect(error).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });

  test('should catch error from change Password', async () => {
    const password = 'Luis1234$';
    jest.spyOn(
      userRepository, 'changePassword',
    ).mockImplementation(async () => { throw new Error('An error occured'); });
    const [result, error] = await wrapError(interactor.changePassword(1, password));

    expect(error).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });
});
