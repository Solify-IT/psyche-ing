import { wrapError } from '@types';
import { Form } from 'domain/model';
import IFormRepository from 'app/repository/formRepository';
import NotFoundError from 'utils/errors/NotFoundError';
import PatientForm from 'domain/model/patientForm';
import Record from 'domain/model/record';
import IDatastore from './datastore';

export default class FormRepository implements IFormRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  async getFormsWithReportId(id: number): Promise<Form[]> {
    const [record, recordError] = await wrapError(this.datastore.fetchOne<Record>('Record', id));
    if (recordError) {
      throw recordError;
    }

    if (record) {
    // TODO: Find way to improve this
      const typeValue = record.patients[0].type;
      const [result, error] = await wrapError(this.datastore.fetchAllWhere<Form>('Form', { type: typeValue }));
      if (error) {
        throw error;
      }
      return result;
    }
    throw new NotFoundError('No se encontró el expediente');
  }

  async registerPatientForm(form: PatientForm): Promise<PatientForm> {
    const [result, error] = await wrapError(
      this.datastore.save<PatientForm>('PatientForm', form),
    );
    if (error) {
      throw error;
    }
    return result;
  }

  async detail(id: number): Promise<Form> {
    const [result, error] = await wrapError(
      this.datastore.fetchOne<Form>('Form', {
        id,
      }),
    );

    if (error) {
      throw error;
    }
    if (result) {
      return result;
    }
    throw new NotFoundError('No se encontró el form');
  }

  async register(form: Form): Promise<Form> {
    const [result, error] = await wrapError(
      this.datastore.save<Form>('Form', form),
    );
    if (error) {
      throw error;
    }
    return result;
  }
}
