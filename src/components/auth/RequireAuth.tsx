import React, { JSX, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import SignInModal from './SignInModal';
import { isLoggedIn } from '../../utils/auth';

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (!loggedIn) {
      message.warning('You need to login to access this page');
      setShowLogin(true);
    }
  }, [loggedIn]);

  // Not logged in → stay on home + show modal
  if (!loggedIn) {
    return (
      <>
        <Navigate to="/" state={{ from: location }} replace />
        {showLogin && <SignInModal onClose={() => setShowLogin(false)} />}
      </>
    );
  }

  // Logged in → allow page
  return children;
};

export default RequireAuth;
