import Home from './Home';
import TransactionInfo from './TransactionInfo';
import SearchMid from './SearchMid';
const routes = [
  {
    path: '/',
    name: 'home',
    exact: true,
    component: Home
  },
  {
    path: '/txinfo/:txHash',
    name: 'TransactionInfo',
    component: TransactionInfo
  },
  {
    path: '/search/:wd',
    name: 'SearchMid',
    component: SearchMid
  }
];

export default routes;
