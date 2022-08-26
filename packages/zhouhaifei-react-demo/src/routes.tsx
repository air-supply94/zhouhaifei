import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { BasicLayout } from './compnents/basicLayout';
import { NoPage } from './compnents/noPage';

const Dashboard = React.lazy(() => import('./pages/dashboard'));

export interface MenuDataItem extends RouteObject {
  name?: string;
  children?: MenuDataItem[];
}

export const routes: MenuDataItem[] = [
  {
    name: 'app',
    element: <BasicLayout/>,
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
