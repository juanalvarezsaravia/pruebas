
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SearchProvider } from '../SearchContext';
import Search from "../pages/Search";
import Results from '../pages/Results';
import Details from '../pages/Details';
import Header from '../components/Header';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Footer from '../components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UnauthenticatedRoute from './UnauthenticatedRoute';
import AuthenticatedRoute from './AuthenticatedRoute';
import { AuthProvider } from '../context/AuthUser';

export const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className='AppContainer'>
              <Header />
              <Routes>
                <Route path="/" element={<AuthenticatedRoute component={Search} />} />
                <Route path="/results" element={<Results />} />
                <Route path="/details/:id" element={<Details />} />
                <Route
                  path="/register"
                  element={
                    <UnauthenticatedRoute component={SignUp} />
                  }
                />
                <Route
                  path="/login"
                  element={<UnauthenticatedRoute component={Login} />}
                />
              </Routes>
              <Footer />
            </div>
          </Router>
        </QueryClientProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;



