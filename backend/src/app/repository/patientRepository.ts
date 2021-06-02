import { Graph } from '@types';
import { Patient } from 'domain/model';
import Record from 'domain/model/record';

export default interface IPatientRepository {
  findAll(): Promise<Patient[]>;
  findRecord(id: number) : Promise<Record>;
  register(patient: Patient[]): Promise<Record>;
  canalize(patient: Patient[]): Promise<Patient>;
  updateDateAt(recordId: number): Promise<Record>;
  archiveRecord(id: number): Promise <Record>;
  getAgeGraph(motive: string, startDate: Date, endDate: Date): Promise<Graph>;
  getGenderGraph(motive: string, startDate: Date, endDate: Date): Promise<Graph>
}
