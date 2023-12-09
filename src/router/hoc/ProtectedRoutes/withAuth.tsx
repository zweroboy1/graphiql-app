import React, { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../../components/App/App';

interface withAuthRouteProps {
  redirectLink: string;
  children: ReactNode;
}

export const WithAuthRoute: React.FC<withAuthRouteProps> = ({
  redirectLink,
  children,
}) => {
  const user = useContext(UserContext);

  if (user) return <Navigate to={redirectLink} />;

  return children;
};
