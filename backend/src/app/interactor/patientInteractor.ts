import { wrapError } from '@types';
import { Patient } from 'domain/model';
import IPatientPresenter from 'app/presenter/patientPresenter';
import IPatientRepository from 'app/repository/patientRepository';
import Record from 'domain/model/record';

export default class PatientInteractor {
  patientRepository: IPatientRepository;

  patientPresenter: IPatientPresenter;

  constructor(patientRepository: IPatientRepository, patientPresenter : IPatientPresenter) {
    this.patientPresenter = patientPresenter;
    this.patientRepository = patientRepository;
  }

  async register(data: Patient[] | Patient) : Promise<Record> {
    const patients : Patient[] = (data instanceof Patient) ? [data] : data;
    const [result, error] = await wrapError(this.patientRepository.register(patients));

    if (error) {
      throw error;
    }
    return this.patientPresenter.register(result);
  }

  async getAll(): Promise<Patient[]> {
    const [patients, error] = await wrapError(this.patientRepository.findAll());

    if (error) {
      throw error;
    }

    return this.patientPresenter.findAll(patients);
  }

  async getPatientDetail(id: number) : Promise<Patient> {
    const [patient, error] = await wrapError(this.patientRepository.findPatient(id));

    if (error) {
      throw error;
    }
    return this.patientPresenter.patientDetail(patient);
  }
}
