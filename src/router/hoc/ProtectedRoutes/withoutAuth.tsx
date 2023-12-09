import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthorized } from '../../../firebase';

interface ProtectedRouteProps {
  redirectLink: string;
  children: ReactNode;
}

export const WithoutAuth: React.FC<ProtectedRouteProps> = ({
  redirectLink,
  children,
}) => {
  if (!isAuthorized) return <Navigate to={redirectLink} />;

  return children;
};
