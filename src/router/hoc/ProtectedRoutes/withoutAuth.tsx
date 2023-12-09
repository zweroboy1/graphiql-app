import React, { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../../components/App/App';

interface ProtectedRouteProps {
  redirectLink: string;
  children: ReactNode;
}

export const WithoutAuth: React.FC<ProtectedRouteProps> = ({
  redirectLink,
  children,
}) => {
  const user = useContext(UserContext);
  if (!user) return <Navigate to={redirectLink} />;

  return children;
};
