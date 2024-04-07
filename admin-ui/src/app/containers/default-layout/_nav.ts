import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Trang Chủ',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Auth',
    url: '/login',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'Login',
        url: '/login',
      },
      {
        name: 'Register',
        url: '/register',
      },
      {
        name: 'Error 404',
        url: '/404',
      },
      {
        name: 'Error 500',
        url: '/500',
      },
    ],
  },
  {
    name: 'Nội Dung',
    url: '/content',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Danh mục',
        url: '/content/room-categories',
      },
      {
        name: 'Phòng',
        url: '/content/rooms',
      },
      {
        name: 'Series Phòng ',
        url: '/content/series',
      },
    ],
  },
  {
    name: 'Hệ Thống',
    url: '/system',
    iconComponent: { name: 'cil-task' },
    children: [
      {
        name: 'Quyền',
        url: '/system/roles',
      },
      {
        name: 'Người Dùng',
        url: '/system/users',
      },
    ],
  },
  {
    name: 'Đặt Phòng',
    url: '/order',
    iconComponent: { name: 'cil-pen' },
    children: [
      {
        name: 'Đặt Phòng',
        url: '/order/bookroom',
      },
      {
        name: 'Thanh Toán',
        url: '/order/',
      },
    ],
  },
  {
    name: 'Vị Trí',
    url: '/location',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Vị Trí',
        url: '/location/locals',
      },
    ],
  },
];
