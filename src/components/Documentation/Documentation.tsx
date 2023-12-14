import React, { useCallback, useState } from 'react';
import '../Schema/Schema.css';
import { SchemasArgs } from './SchemasArgs';

export const Documentation: React.FC = () => {
  // const schema = useSelector((state: RootState) => state.schemas.schema);
  // const rootQuery =
  //   schema && schema.__schema.types.find((elem) => elem.name === 'Query');

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
