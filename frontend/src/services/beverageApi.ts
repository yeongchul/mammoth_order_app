// import axios from 'axios';
// import { Menu } from './types';

// const API = axios.create({
//   baseURL: 'http://localhost:8080/api',
// });

// // 메뉴 목록 불러오기
// export const fetchMenus = async (): Promise<Menu[]> => {
//   const res = await API.get<Menu[]>('/menus');
//   return res.data;
// };

// // 메뉴 등록
// export const addMenu = (menu: Menu): Promise<Menu> => {
//   return API.post<Menu>('/menus', menu).then(res => res.data);
// };
