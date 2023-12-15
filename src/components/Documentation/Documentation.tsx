import React, { useCallback, useState } from 'react';
import '../Schema/Schema.css';
import { SchemasArgs } from './SchemasArgs';
import { useLocalization } from '../../cantexts/locale.context';
import { Transition } from 'react-transition-group';

export const Documentation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLocalization();
  const toggleMenu = useCallback(async () => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      <button className="btn" onClick={toggleMenu}>
        Docs
      </button>

      <Transition in={open} timeout={300}>
        {(state) => (
          <div className={`menu ${state === 'entered' ? 'open' : ''}`}>
            <div>{t.Docs}</div>
            <SchemasArgs />
          </div>
        )}
      </Transition>
    </>
  );
};
