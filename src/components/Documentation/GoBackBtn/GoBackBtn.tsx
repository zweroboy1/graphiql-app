import React from 'react';

type GoBackButtonProps = {
  callback: () => void;
  prev: string;
};

export const GoBackBtn: React.FC<GoBackButtonProps> = ({ callback, prev }) => {
  return <button onClick={callback}>{`<-- ${prev}`}</button>;
};
