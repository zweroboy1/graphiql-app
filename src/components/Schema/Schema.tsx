import React, { useCallback, useState } from 'react';
import './Schema.css';

interface ISchemaProps {
  schema: string;
}

export const Schema: React.FC<ISchemaProps> = ({ schema }) => {
  const [open, setOpen] = useState(false);
  const toggleMenu = useCallback(async () => {
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
