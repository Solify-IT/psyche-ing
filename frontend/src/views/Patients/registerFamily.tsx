import React, { useState } from 'react';
import {
  makeStyles,
  Grid,
  Paper,
  TextField,
  Button,
  Card,
  IconButton,
  CardContent,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import {
  Edit,
  Delete,
}
  from '@material-ui/icons';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { createCouple } from '../../api/patient';
import Patient from '../../interfaces/patient';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: '20px',
    padding: '30px',
  },
  formControl: {
    marginTop: '16px',
    marginLeft: '20px',
    textAlign: 'left',
    minWidth: 285,
  },
  group: {
    margin: theme.spacing(1, 0, 3),
    textAlign: 'left',
    minWidth: 320,
  },
  inputLabel: {
    paddingLeft: '10px',
  },
  date: {
    marginTop: '28px',
    marginLeft: '10px',
  },
  place: {
    marginLeft: '20px',
  },
  submit: {
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    textAlign: 'right',
  },
  root: {
    minWidth: 275,
  },
  cards: {
    padding: theme.spacing(2, 0, 5),
  },
}));

function RegisterFamily() {
  const classes = useStyles();
  const history = useHistory();
  const today = new Date();
  const [family, setFamily] = useState<Patient[]>([]);
  const [formFields, setFormFields] = useState<Patient>({
    name: '',
    lastName: '',
    startDate: today,
    type: 'Psicología Familia',
    gender: '',
    telephone: '',
    address: '',
    birthPlace: '',
    birthDate: '',
    postalCode: NaN,
  });

  const {
    name, lastName, gender,
    telephone, address, birthPlace, birthDate, postalCode,
  } = { ...formFields };

  const handleChange = (event: React.ChangeEvent<any>) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  function addField() {
    if (name === '' || lastName === '' || gender === ''
      || telephone === '' || address === '' || birthPlace === '' || birthDate === '' || !Number.isNaN(Number(postalCode))) {
      toast.warning('¡Completar todos los campos!');
    } else {
      setFamily((prevFields) => [...prevFields, formFields]);
      setFormFields({
        name: '',
        lastName: '',
        startDate: today,
        type: 'Psicología Familia',
        gender: '',
        telephone: '',
        address: '',
        birthPlace: '',
        birthDate: '',
        postalCode: NaN,
      });
    }
  }

  function updateMember(event: React.ChangeEvent<any>) {
    const id = event.currentTarget.value;
    setFormFields(family[id]);
    family.splice(id, 1);
  }

  function deleteMessage(event: React.ChangeEvent<any>) {
    const id = event.currentTarget.value;
    const auxArray = [...family];
    auxArray.splice(id, 1);
    setFamily(auxArray);
  }

  const submitPatients = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    createCouple(family)
      .then((response:any) => {
        console.log(response);
        toast.success('¡Se han registrado los pacientes! 😃');
        history.replace('/home');
      })
      .catch((error:any) => {
        toast.warning('Algo ha salido mal!');
        console.log(error);
      });
  };

  const createCard = (patient:Patient, index:any) => (
    <Grid item xs={12} sm={6}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Información mimebro familiar
          </Typography>
          <Typography variant="h5" component="h2">
            {patient.name}
            {' '}
            {patient.lastName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Género:
            {' '}
            {patient.gender}
          </Typography>
          <Typography variant="body2" component="p">
            <strong> Lugar de Nacimiento: </strong>
            {' '}
            {patient.birthPlace}
            <br />
            <strong> Fecha de Nacimiento: </strong>
            {' '}
            {patient.birthDate}
            <br />
            <strong> Domicilio: </strong>
            {' '}
            {patient.address}
            {' '}
            <br />
            <strong> Codigo Postal: </strong>
            {' '}
            {patient.postalCode}
            <br />
            <strong> Teléfono:</strong>
            {' '}
            {patient.telephone}
          </Typography>
          <div className={classes.icon}>
            <IconButton title="Editar" value={index} onClick={updateMember}>
              <Edit fontSize="large" style={{ color: '#C94B72' }} />
            </IconButton>
            <IconButton title="Eliminar" value={index} onClick={deleteMessage}>
              <Delete fontSize="large" style={{ color: '#FF0000' }} />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Grid container justify="center">
      <Grid
        item
        xs={10}
        component={Paper}
        className={classes.paper}
        elevation={6}
        justify="center"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Apellido(s)"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <TextField
              variant="outlined"
              margin="normal"
              type="date"
              required
              fullWidth
              id="birthDate"
              label="Fecha de Nacimiento"
              name="birthDate"
              className={classes.date}
              value={birthDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              className={classes.place}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="birthPlace"
              label="Lugar de Nacimiento"
              name="birthPlace"
              value={birthPlace}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel>Género</InputLabel>
              <Select
                required
                fullWidth
                label="Género"
                name="gender"
                value={gender}
                onChange={handleChange}
              >
                <MenuItem value="Masculino"> Masculino </MenuItem>
                <MenuItem value="Femenino"> Femenino </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Domicilio"
              name="address"
              value={address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="postalCode"
              label="Código Postal"
              name="postalCode"
              type="number"
              value={postalCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="telephone"
              label="Teléfono"
              name="telephone"
              value={telephone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className={classes.submit}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={addField}
            >
              Agregar miembro
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.cards}>
        {family.map(createCard)}
      </Grid>
      {family.length !== 0

        ? (
          <Grid item xs={12} className={classes.submit}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={submitPatients}
            >
              Registrar Pacientes
            </Button>
          </Grid>
        )
        : (
          <>
          </>
        )}
    </Grid>
  );
}

export default RegisterFamily;