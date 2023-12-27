import { Editor } from '@monaco-editor/react';
import React, { useState } from 'react';

export const QueryFields: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | null>('');
  const [vars, setVars] = useState<string>('');
  const [head, setHead] = useState<string>('');

  const params = inputValue === 'Variables' ? vars : head;

  const handleInputChange = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e.currentTarget.textContent);
    setInputValue(e.currentTarget.textContent);
  };

  const handleQuery = (value: string | undefined) => {
    console.log(value);
    if (value) {
      inputValue === 'Variables' ? setVars(value) : setHead(value);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleInputChange}>{'Variables'}</button>
        <button onClick={handleInputChange}>{'Headers'}</button>
        <div>
          <Editor
            height="120px"
            theme="vs"
            options={{
              minimap: { enabled: false },
              contextmenu: false,
              quickSuggestions: false,
              selectionHighlight: false,
              renderLineHighlight: 'none',
              hideCursorInOverviewRuler: true,
              overviewRulerLanes: 0,
              overviewRulerBorder: false,
            }}
            onChange={handleQuery}
            value={params}
          />
        </div>
      </div>
    </div>
  );
};
