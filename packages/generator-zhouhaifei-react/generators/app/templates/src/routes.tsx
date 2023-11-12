import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { DefaultLayout } from './compnents/defaultLayout';
import { NoPage } from './compnents/noPage';

const Dashboard = React.lazy(() => import('./pages/dashboard'));

export type MenuDataItem = {
  name?: string;
  children?: MenuDataItem[];
} & RouteObject;

export const routes: MenuDataItem[] = [
  {
    name: '',
    element: <DefaultLayout/>,
    children: [
      {
        name: '仪表盘',
        path: '/dashboard',
        element: <Dashboard/>,
      },
      {
        path: '/',
        element: (
          <Navigate
            replace
            to="/dashboard"
          />
        ),
      },
      {
        path: '*',
        element: <NoPage/>,
      },
    ],
  },
];

export function RenderRoutes() {
  return useRoutes(routes);
}
