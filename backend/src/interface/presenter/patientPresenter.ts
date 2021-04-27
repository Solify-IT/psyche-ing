import { Patient } from 'domain/model';
import IPatientPresenter from 'app/presenter/patientPresenter';
import Record from 'domain/model/record';

export default class PatientPresenter implements IPatientPresenter {
  patientDetail(patient: Patient): Patient {
    return patient;
  }

  findAll(patients: Patient[]): Patient[] {
    return patients;
  }

  register(record: Record): Record {
    return record;
  }
}
