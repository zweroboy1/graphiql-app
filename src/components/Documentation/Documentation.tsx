import React, { useCallback, useState, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { SchemasArgs } from './SchemasArgs';
import { useLocalization } from '../../cantexts/locale.context';
import './Schema.css';

export const Documentation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLocalization();
  const nodeRef = useRef(null);

  const toggleMenu = useCallback(async () => {
    setOpen(!open);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="btn" onClick={toggleMenu}>
        Docs
      </button>

      <Transition in={open} timeout={300} nodeRef={nodeRef}>
        {(state) => (
          <div
            ref={nodeRef}
            className={`menu ${state === 'entered' ? 'open' : ''}`}
          >
            <button onClick={closeMenu}>X</button>
            <div>{t.Docs}</div>
            <SchemasArgs />
          </div>
        )}
      </Transition>
    </div>
  );
};
