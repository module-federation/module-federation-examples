
import React, { lazy } from "react";

import { Routes, Route } from 'react-router-dom';

const Nav = lazy(() => import("Nav/Nav"));
const FAQ = lazy(() => import('FAQ/FAQ'));
const Dashboard = lazy(() => import('Dashboard/Dashboard'));
const Team = lazy(() => import('Team/team'));


export default function () {
  
  return (
      <section>
        <Nav routes={
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
              <Route path="team" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Team />
              </React.Suspense>
                } />
              <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>          
        } />
            
          
      </section>

  );
}