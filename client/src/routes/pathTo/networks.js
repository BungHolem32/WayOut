import Index from '../../components/network';
import Edit from '../../components/network/edit';

export const networks = [
  {
    path: '/networks',
    name: 'NetworksIndex',
    props: true,
    component: Index,
  },
  {
    path: '/networks/:networkId/edit',
    name: 'NetworkEdit',
    props: true,
    component: Edit,
  },
  {
    path: '/networks/create',
    name: 'NetworksCreate',
    props: true,
    component: Edit,
  },
];
