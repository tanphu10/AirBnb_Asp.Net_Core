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
    attributes:{
      "policyName":"Permissions.Dasboard.View"
    }
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
    name: 'Quản Lí Phòng',
    url: '/content',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Danh mục',
        url: '/content/room-categories',
        attributes:{
          "policyName":"Permissions.RoomCategories.View"
        }
      },
      {
        name: 'Phòng',
        url: '/content/rooms',
        attributes:{
          "policyName":"Permissions.Rooms.View"
        }
      },
      {
        name: 'Series Phòng ',
        url: '/content/series',
        attributes:{
          "policyName":"Permissions.Series.View"
        }
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
        attributes:{
          "policyName":"Permissions.Roles.View"
        }
      },
      {
        name: 'Người Dùng',
        url: '/system/users',
        attributes:{
          "policyName":"Permissions.Users.View"
        }
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
        attributes:{
          "policyName":"Permissions.BookRooms.View"
        }
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
        attributes:{
          "policyName":"Permissions.Locations.View"
        }
      },
    ],
  },
  {
    name: 'Quản Lí Nội Dung',
    url: '/management',
    iconComponent: { name: 'cil-pen' },
    children: [
      {
        name: 'Bình Luận',
        url: '/management/comment',
        attributes:{
          "policyName":"Permissions.Comments.View"
        }
      },
      {
        name: 'Yêu Thích',
        url: '/management/like',
      },
    ],
  },
];
