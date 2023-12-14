import React, { useCallback, useState } from 'react';
import '../Schema/Schema.css';
import { SchemasArgs } from './SchemasArgs';

export const Documentation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = useCallback(async () => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      <button className="btn" onClick={toggleMenu}>
        Docs
      </button>
      {open && (
        <div className={`menu ${open ? 'open' : ''}`}>
          <SchemasArgs />
        </div>
      )}
    </>
  );
};
