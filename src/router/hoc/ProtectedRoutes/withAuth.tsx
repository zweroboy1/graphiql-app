import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthorized } from '../../../utils/consts';

interface withAuthRouteProps {
  redirectLink: string;
  children: ReactNode;
}

export const WithAuthRoute: React.FC<withAuthRouteProps> = ({
  redirectLink,
  children,
}) => {
  if (isAuthorized) return <Navigate to={redirectLink} />;

  return children;
};
