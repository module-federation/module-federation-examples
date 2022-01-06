import React from 'react';
import { Box } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppDrawer from './AppDrawer';
import AppBar from './AppBar';
import Viewport from './Viewport';
import { useLocalStorageSync } from './useLocalStorageSync';
import { ServiceProvider } from './Service';

const DashboardService = React.lazy(() => import('dashboard/DashboardService'));
const OrderService = React.lazy(() => import('order/OrderService'));
const ProfilePage = React.lazy(() => import('profile/ProfilePage'));

function useDrawer() {
  const { value, setItem } = useLocalStorageSync('@shared-routing/appdrawer/open');

  return {
    open: value,
    closeDrawer() {
      setItem(false);
    },
    openDrawer() {
      setItem(true);
    },
  };
}

export default function Shell() {
  const drawer = useDrawer();

  return (
    <ServiceProvider>
      <BrowserRouter>
        <Viewport>
          <Box display="flex" flex={1}>
            <AppBar drawer={drawer} />
            <AppDrawer drawer={drawer} />
            <React.Suspense fallback={'Loading'}>
              <Routes>
                <Route path="dashboard/*" element={<DashboardService />} />
                <Route path="orders/*" element={<OrderService />} />
                <Route path="profile/*" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </React.Suspense>
          </Box>
        </Viewport>
      </BrowserRouter>
    </ServiceProvider>
  );
}
