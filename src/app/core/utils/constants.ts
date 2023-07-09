import { environment } from 'src/environments/environment';

export const APP_LOADING = 'APP_LOADING';
export const SHOW_CONFIRM = 'SHOW_CONFIRM';
export const CHARACTERS='^[0-9a-zA-Z]+$';//không có dấu,và kí tự đặc biệt

export const VALIDATORS_MESSAGE: any = {
  required: 'Trường bắt buộc',
  minlength: 'Độ dài tối thiểu %d ký tự',
  maxlength: 'Độ dài tối đa %d ký tự',
  min: 'Giá trị tối thiểu là %d',
  max: 'Giá trị tối đa là %d',
  email: 'Sai định dạng email',
  phone: 'Sai định dạng SĐT',
  pattern:'Sai định dạng'
};
export const MENU = [
  {
    url: '/app/dashboard',
    title: 'Dashboard',
    constant: 'DASHBOARD',
  },

  {
    url: '/app/bonus',
    title: 'BONUS',
    constant: 'BONUS',
    children: [
      {
        url: '/app/bonus/permanent',
        title: 'Permanent bonus',
        constant: 'PERMANENT_BONUS',
      },
      {
        url: '/app/bonus/promotion',
        title: 'Promotion bonus',
        constant: 'PROMOTION_BONUS',
      },
      {
        url: '/app/bonus/manual',
        title: 'Manual bonus',
        constant: 'MANUAL_BONUS',
      },
      {
        url: '/app/bonus/promotion',
        title: 'Promotion bonus',
        constant: 'PROMOTION_BONUS',
      },
    ],
  },
 
];

// nhóm đơn vị
export const CATEGORY_GROUP_UNIT_CODE = 'GUNIT';
