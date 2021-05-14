import React from 'react';
import { Route } from 'react-router-dom';
import ConsultPatient from './views/consultPatient';
import PrivateRoute from './components/PrivateRoute';
import PatientsList from './views/patients';
import Home from './views/Dashboard/home';
import NewPatientForm from './views/Forms/newPatientForm';
import RecordDetail from './views/Patients/recordDetail';

// User Views
import RegisterUser from './views/Users/registerUser';
import Login from './views/login';
import ModifyProfile from './views/Users/modifyProfile';
import RegisterProfile from './views/Users/registerProfile';

// Dashboard Views
import DashboardArea from './views/Dashboard/dashboardArea';
import DashboardAtPsic from './views/Dashboard/dashboardAtPsic';
import DashboardAtPsiq from './views/Dashboard/dashboardAtPsiq';
import DashboardEvaluacion from './views/Dashboard/dashboardEvaluacion';
import DashboardAsesoria from './views/Dashboard/dashboardAsesoria';
// Patient Views
import RegisterPatient from './views/Patients/registerPatient';
import DashboardPsic from './views/Dashboard/dashboardAsPsic';
import PatientAvailableForms from './views/Forms/patientAvailableForms';
// Form views
import GenerateForm from './components/Forms/NewPatientForm/generateForm';
import NewForm from './views/Forms/newForm';
import RegisterProfile from './views/Users/registerProfile';
import UpdatePatientForm from './views/Forms/updatePatientForm';
import ConsultPatientForm from './views/Forms/consultPatientForm';
// Users
import ConsultProfile from './views/Users/consultProfiles';

const AppRouter = () => (
  <div>
    <Route path="/login" exact component={Login} />
    <PrivateRoute path="/registerUser" exact component={RegisterUser} />
    <PrivateRoute path="/new-form" exact component={NewForm} />
    <PrivateRoute path="/update-patient-form/:formId(\d+)" exact component={UpdatePatientForm} />
    <PrivateRoute path="/expediente/:id(\d+)/encuestas/:formId(\d+)" exact component={NewPatientForm} />
    <PrivateRoute path="/expediente/:id(\d+)/encuestas" exact component={PatientAvailableForms} />
    <PrivateRoute path="/" exact component={Home} />
    <PrivateRoute path="/read-form" exact component={GenerateForm} />
    <PrivateRoute path="/consult-patient" exact component={ConsultPatient} />
    <PrivateRoute path="/pacientes" exact component={PatientsList} />
    <PrivateRoute path="/expediente/:id(\d+)" exact component={RecordDetail} />
    <PrivateRoute path="/register-patient/:area/:group" exact component={RegisterPatient} />
    <PrivateRoute path="/home" exact component={Home} />
    <PrivateRoute path="/dashboard-area" exact component={DashboardArea} />
    <PrivateRoute path="/dashboard-atencion-psicologica" exact component={DashboardAtPsic} />
    <PrivateRoute path="/dashboard-psiquiatrica" exact component={DashboardAtPsiq} />
    <PrivateRoute path="/dashboard-evaluacion" exact component={DashboardEvaluacion} />
    <PrivateRoute path="/dashboard-asesoria" exact component={DashboardAsesoria} />
    <PrivateRoute path="/dashboard-as-psic" exact component={DashboardPsic} />
    <PrivateRoute path="/register-profile" exact component={RegisterProfile} />
    <PrivateRoute path="/modify-profile" exact component={ModifyProfile} />
    <PrivateRoute path="/patient-form/:id" exact component={ConsultPatientForm} />
    <PrivateRoute path="/patient-profile/:id" exact component={ConsultProfile} />
  </div>
);

export default AppRouter;
