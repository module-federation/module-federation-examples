import React from 'react'; // Must be imported for webpack to work
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MyProSidebarProvider } from "./pages/sidebar";
import Topbar from "./pages/topbar";  
const Dashboard = React.lazy(() => import('Dashboard/Dashboard'));
import { Routes, Route } from 'react-router-dom';

const FAQ = React.lazy(() => import('FAQ/FAQ'));

const Sidebar = ({routes}) => {
  routes ? routes : routes = (
    <Routes>
      <Route exact index element={
        <React.Suspense fallback={<div>Loading...</div>}>
          <Dashboard />
        </React.Suspense> 
      } />
        <Route path="faq" element={
        <React.Suspense fallback={<div>Loading...</div>}>
          <FAQ />
        </React.Suspense>
          } />
        <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>);
  const [theme, colorMode] = useMode();

  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <Topbar />
          {routes}
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Sidebar;