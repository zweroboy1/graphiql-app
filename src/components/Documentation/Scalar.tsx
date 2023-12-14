import React from 'react';
import { Type } from '../../types/types';

type Scalar = {
  rootQuery: Type;
};

export const Scalar: React.FC<Scalar> = ({ rootQuery }) => {
  return <div>{rootQuery?.description}</div>;
};
