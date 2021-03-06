import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import {
  makeStyles,
  List, ListItem, ListItemText, SwipeableDrawer, Divider, ListItemIcon, Container, Paper, Grid,
} from '@material-ui/core';
import { authenticationService, logout } from 'src/api/authenticationService';
import {
  AccountCircle, AddCircle, Create, Equalizer, Group, Home, ListAltOutlined, PersonAdd, VpnKey,
} from '@material-ui/icons';
import withRole from 'src/utils/withRole';
import UserRole from 'src/fixtures/roles';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../utils/authContext';

type NavigationItem = {
  label: string;
  icon: JSX.Element;
  link: string;
  rolesAllowed: string[];
};

type NavigationGroup = {
  name?: string;
  group: NavigationItem[];
};

function Navbar() {
  const { currUser, removeUser } = useContext(AuthContext);
  const history = useHistory();
  const [state, setState] = useState<boolean>(false);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab'
    || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const isDrawerEnabled : boolean = (
    authenticationService.currentUserValue && authenticationService.currentUserValue.user);

  const navigationGroups : NavigationGroup[] = isDrawerEnabled ? [
    {
      group: [
        {
          label: 'Menú Principal',
          icon: <Home />,
          link: '/',
          rolesAllowed: [
            UserRole.Administrador,
            UserRole.Psicólogo,
            UserRole.Becario,
          ],
        },
      ],
    },
    {
      name: 'Pacientes',
      group: [
        {
          label: 'Registrar Paciente',
          icon: <AddCircle />,
          link: '/dashboard-as-psic',
          rolesAllowed: [
            UserRole.Administrador,
            UserRole.Psicólogo,
          ],
        },
        {
          label: 'Consultar Pacientes',
          icon: <ListAltOutlined />,
          link: '/view-patients',
          rolesAllowed: [
            UserRole.Administrador,
            UserRole.Psicólogo,
          ],
        },
      ],
    },
    {
      name: 'Usuarios',
      group: [
        {
          label: 'Registrar Usuario',
          icon: <PersonAdd />,
          link: '/register-user',
          rolesAllowed: [
            UserRole.Administrador,
          ],
        },
        {
          label: 'Consultar Usuarios',
          icon: <Group />,
          link: '/view-users',
          rolesAllowed: [
            UserRole.Administrador,
          ],
        },
      ],
    },
    {
      name: 'Formularios',
      group: [
        {
          label: 'Crear Formulario',
          icon: <Create />,
          link: '/new-form',
          rolesAllowed: [
            UserRole.Administrador,
            UserRole.Psicólogo,
            UserRole.Becario,
          ],
        },
        {
          label: 'Consultar Formularios',
          icon: <ListAltOutlined />,
          link: '/view-forms',
          rolesAllowed: [
            UserRole.Administrador,
            UserRole.Becario,
            UserRole.Psicólogo,
          ],
        },
      ],
    },
    {
      name: 'Reportes',
      group: [
        {
          label: 'Estadísticas',
          icon: <Equalizer />,
          link: '/reporte',
          rolesAllowed: [
            UserRole.Administrador,
            UserRole.Psicólogo,
            UserRole.Becario,
          ],
        },
      ],
    },
    {
      name: 'Cuenta Personal',
      group: [
        {
          label: 'Mi Perfil',
          icon: <AccountCircle />,
          link: `/user-profile/${authenticationService.currentUserValue.user.id}`,
          rolesAllowed: [
            UserRole.Administrador,
            UserRole.Psicólogo,
            UserRole.Becario,
          ],
        },
        {
          label: 'Cambiar Contraseña',
          icon: <VpnKey />,
          link: '/change-password',
          rolesAllowed: [
            UserRole.Administrador,
            UserRole.Becario,
            UserRole.Psicólogo,
          ],
        },
      ],
    },
  ] : [];
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    navBar: {
      background: '#C94B72',
    },
    button: {
      color: '#FFFFFF',
      textDecoration: 'none',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    showBar: {
      color: '#432918',
      textDecoration: 'none',
    },
    logo: {
      width: '120px',
      height: 'auto',
      paddingTop: theme.spacing(1),
    },
    list: {
      width: 'auto',
    },
    fullList: {
      width: 'auto',
    },
    selected: {
      color: 'white',
      backgroundColor: `${theme.palette.primary.main} !important`,
      borderRadius: '15px',
    },
    navigationHeader: {
      padding: theme.spacing(2, 0, 2, 0),
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: 'white',
    },
    navigationGroupTitle: {
      margin: theme.spacing(3, 0, 0, 2),
    },
    navigationItem: {
      margin: theme.spacing(1, 0, 1, 0),
      paddingRight: 20,
      paddingLeft: 10,
    },
    navigationHeaderIcon: {
      alignItems: 'center',
      verticalAlign: 'middle',
      fontSize: 45,
    },
    dataUser: {
      paddingLeft: 15,
    },
  }));
  const classes = useStyles();

  const logOut = () => {
    logout();
    removeUser();
    history.go(0);
  };

  function handleNavigation(link: string) {
    history.push(link);
  }

  function hasOptions(items: NavigationItem[]) : boolean {
    const { role } = authenticationService.currentUserValue.user;

    for (let i = 0; i < items.length; i += 1) {
      if (items[i].rolesAllowed.includes(role)) {
        return true;
      }
    }

    return false;
  }

  return (
    <nav>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {
           isDrawerEnabled ? (
             <div>
               <SwipeableDrawer
                 open={state}
                 onClose={toggleDrawer(false)}
                 onOpen={toggleDrawer(true)}
               >
                 <div
                   className={classes.list}
                   onClick={toggleDrawer(false)}
                   onKeyDown={toggleDrawer(false)}
                   role="presentation"
                   key="drawer"
                 >
                   <Paper className={classes.navigationHeader} key="user-info" elevation={3} square>
                     <Grid container alignItems="center">
                       <Grid item xs={2}>
                         <Container key="nav-username">
                           <AccountCircle fontSize="large" className={classes.navigationHeaderIcon} />
                         </Container>
                       </Grid>
                       <Grid item xs={10} className={classes.dataUser}>
                         <Container key="nav-username">
                           <Typography variant="h6">
                             { authenticationService.currentUserValue.user.username }
                           </Typography>
                         </Container>
                         <Container key="nav-email">
                           <Typography variant="subtitle1">
                             { authenticationService.currentUserValue.user.email }
                           </Typography>
                         </Container>
                         <Container key="nav-role">
                           <Typography variant="subtitle1">
                             { authenticationService.currentUserValue.user.role }
                           </Typography>
                         </Container>
                       </Grid>
                     </Grid>

                   </Paper>
                   <List>
                     {
                    navigationGroups.map((group: NavigationGroup) => (
                      <div key={uuidv4()}>
                        {group.name && hasOptions(group.group)
                          ? (
                            <div>
                              <Typography variant="h6" color="primary" className={classes.navigationGroupTitle}>
                                {group.name}
                              </Typography>
                            </div>
                          )
                          : false}

                        <div className={classes.navigationItem}>
                          {
                          group.group.map((child: NavigationItem) => (
                            withRole(child.rolesAllowed)(
                              <ListItem
                                button
                                onClick={() => handleNavigation(child.link)}
                                key={child.label}
                                classes={{ selected: classes.selected }}
                                selected={child.link === history.location.pathname}
                              >
                                <ListItemIcon className={
                                  child.link === history.location.pathname ? classes.selected : ''
  }
                                >
                                  {child.icon}
                                </ListItemIcon>
                                <ListItemText>
                                  {child.label}
                                </ListItemText>
                              </ListItem>,
                            )
                          ))
  }
                        </div>
                        { hasOptions(group.group) ? <Divider /> : false }
                      </div>
                    ))
                  }
                   </List>
                 </div>
               </SwipeableDrawer>
               <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                 <MenuIcon />
               </IconButton>
             </div>
           )
             : false
}
            <Typography variant="h6" className={classes.title}>
              <Link to="/">
                <img src="/images/logo.png" alt="logo of Psyque" className={classes.logo} />
              </Link>
            </Typography>
            {currUser === undefined
              ? (
                <>
                </>
              )
              : (
                <>
                  <Link to="/" className={classes.button}>
                    <Button className={classes.button}>
                      Menú Principal
                    </Button>
                  </Link>
                  <Link to="/login" className={classes.button}>
                    <Button className={classes.button} onClick={logOut}>
                      Cerrar sesión
                    </Button>
                  </Link>
                </>
              )}
          </Toolbar>
        </AppBar>
      </div>
    </nav>
  );
}

export default Navbar;
