import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';

interface withAuthRouteProps {
  redirectLink: string;
  children: ReactNode;
}

export const WithAuthRoute: React.FC<withAuthRouteProps> = ({
  redirectLink,
  children,
}) => {
  const user = useSelector((state: RootState) => state.user.value);

  if (user) return <Navigate to={redirectLink} />;

  return children;
};
