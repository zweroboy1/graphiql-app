import React, { useCallback, useState } from 'react';
import { SchemasArgs } from './SchemasArgs';
import { useLocalization } from '../../contexts/locale.context';
import { ImBook } from 'react-icons/im';
import './Schema.css';

export const Documentation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLocalization();

  const toggleMenu = useCallback(async () => {
    setOpen(!open);
  }, [open]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '40px', display: 'flex', justifyContent: 'center' }}>
        <ImBook className="btn" onClick={toggleMenu} />
      </div>
      <div className={`menu ${open ? 'open' : ''}`}>
        <div>{t.Docs}</div>
        <SchemasArgs />
      </div>
    </div>
  );
};
