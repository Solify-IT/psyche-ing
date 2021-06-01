import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  makeStyles,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TableContainer,
  Paper,
  Fab,
} from '@material-ui/core';
import {
  Edit,
  Delete,
  Add,
}
  from '@material-ui/icons';
import Users from 'src/interfaces/Users';
import Swal from 'sweetalert2';
import { authenticationService } from 'src/api/authenticationService';
import { Link } from 'react-router-dom';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';
import { deactivateAccount } from 'src/api/user';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 3),
  },
  table: {
    marginTop: '30px',
  },
}));

type UsersTableProps = {
  initialUsers: Users[];
};

function UsersTable(props: UsersTableProps) {
  const { initialUsers } = props;
  const [, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const currentUser = authenticationService.currentUserValue;
  const handleSubmit = async (id: number) => {
    setLoading(true);
    try {
      await deactivateAccount(id);
      Swal.fire(
        '¡Cuenta desactivada!',
        'El usuario no tiene acceso al sistema a partir de este momento.',
        'success',
      );
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Ocurrió un error interno!',
      });
      console.log(error);
    } finally {
      console.log('finally');
      setLoading(false);
      history.replace('/view-users');
    }
  };

  function handleDelete(id:number) {
    Swal.fire({
      title: '¿Desactivar usuario?',
      text: 'Al confirmar, el usuario no tendrá acceso al sistema.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#6EA84F',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(id);
      }
    });
  }

  const classes = useStyles();
  const [users] = useState<Users[]>(initialUsers);

  const updateProfile = (event: React.ChangeEvent<any>) => {
    const { userid } = event.currentTarget.dataset;
    history.push(`/user-update/${userid}`);
  };

  const createUser = (user:Users) => (
    <TableRow key={user.id}>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.zipCode}</TableCell>
      <TableCell>{user.address}</TableCell>
      <TableCell>
        <IconButton
          disabled={!user.active || !(user.id !== currentUser.user.id)}
          data-userid={user.username}
          onClick={updateProfile}
        >
          <Edit color={(user.active && (user.id !== currentUser.user.id)) ? 'secondary' : 'disabled'} />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton
          disabled={!user.active || (user.id === currentUser.user.id)}
          onClick={() => handleDelete(user.id!)}
        >
          <Delete style={{ color: (user.active && (user.id !== currentUser.user.id)) ? '#FF0000' : '#A7A7A7' }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <MainContent>
      <ContentTitle text="Consultar Usuarios" />
      <Grid container justify="flex-end">
        <Fab color="primary" aria-label="add" component={Link} to="/register-user">
          <Add />
        </Fab>
      </Grid>
      <Grid container>
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> Nombre</TableCell>
                <TableCell> Rol</TableCell>
                <TableCell> Correo</TableCell>
                <TableCell> Código Postal</TableCell>
                <TableCell> Dirección</TableCell>
                <TableCell> Modificar</TableCell>
                <TableCell> Desactivar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(createUser)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </MainContent>
  );
}

export default UsersTable;
