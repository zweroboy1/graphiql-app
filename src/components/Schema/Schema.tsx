import React, { useCallback, useState } from 'react';
import { fetchGraphQlSchema } from '../../utils/api';

export const Schema: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    if (!open) {
      fetchGraphQlSchema();
    }
    setOpen(!open);
  }, [open]);

  return (
    <>
      <button onClick={toggleMenu}>Schema</button>
    </>
  );
};
