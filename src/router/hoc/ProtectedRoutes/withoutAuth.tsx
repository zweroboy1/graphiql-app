import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '../../../store/store';

interface ProtectedRouteProps {
  redirectLink: string;
  children: ReactNode;
}

export const WithoutAuth: React.FC<ProtectedRouteProps> = ({
  redirectLink,
  children,
}) => {
  const user = useSelector((state: RootState) => state.user.value);
  if (!user) return <Navigate to={redirectLink} />;

  return children;
};
