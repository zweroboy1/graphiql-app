import React, { useCallback, useState } from 'react';
import { fetchGraphQlSchema } from '../../utils/api';
import './Schema.css';

export const Schema: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [schema, setSchema] = useState('');

  const toggleMenu = useCallback(async () => {
    if (!open) {
      const res = await fetchGraphQlSchema();
      setSchema(res);
    }
    setOpen(!open);
  }, [open]);

  return (
    <>
      <button className="btn" onClick={toggleMenu}>
        Schema
      </button>
      {open && <div className={`menu ${open ? 'open' : ''}`}>{schema}</div>}
    </>
  );
};
