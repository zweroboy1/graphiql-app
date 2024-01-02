import React from 'react';

type GoBackButtonProps = {
  callback: () => void;
  prev: string;
};

export const GoBackBtn: React.FC<GoBackButtonProps> = ({ callback, prev }) => {
  return (
    <button
      className="button button_small"
      onClick={callback}
      data-testid="go-back"
    >{`back to ${prev}`}</button>
  );
};
