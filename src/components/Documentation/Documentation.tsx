import React from 'react';
import { SchemasArgs } from './SchemasArgs';
import { useLocalization } from '../../contexts/locale.context';

interface DocumentationProps {
  isOpen: boolean;
}
export const Documentation: React.FC<DocumentationProps> = ({ isOpen }) => {
  const { t } = useLocalization();
  return (
    <div className="playground__docs-container">
      <div className={`docs${isOpen ? ' docs_open' : ''}`}>
        <h4 className="h4 playground__title">{t.Docs}</h4>
        <div className="docs__content">
          <SchemasArgs />
        </div>
      </div>
    </div>
  );
};
