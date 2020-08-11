import async from '../components/Async';

const Login = async(() => import('../containers/Login'));

const Register = async(() => import('../containers/Register'));
const Home = async(() => import('../containers/Home'));

export const publicRoutes = [
  {
    path: '/login',
    name: 'Log In',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
  },
];

export const privateRoutes = [
  {
    path: '/home',
    component: Home,
  },
];
