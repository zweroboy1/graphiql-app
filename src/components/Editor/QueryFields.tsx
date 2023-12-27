import { Editor } from '@monaco-editor/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaders, setVariables } from '../../store/slices/queryFields.slice';
import { RootState } from '../../store/store';

export const QueryFields: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | null>('');
  const headers = useSelector((state: RootState) => state.queryFields.headers);
  const vars = useSelector((state: RootState) => state.queryFields.variables);
  const dispatch = useDispatch();

  const queryParams = inputValue === 'Variables' ? vars : headers;

  const handleInputChange = (e: React.MouseEvent<HTMLElement>) => {
    setInputValue(e.currentTarget.textContent);
  };

  const handleQueryFields = (value: string | undefined) => {
    if (value) {
      inputValue === 'Variables'
        ? dispatch(setVariables(value))
        : dispatch(setHeaders(value));
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleInputChange}>Variables</button>
        <button onClick={handleInputChange}>Headers</button>
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
            onChange={handleQueryFields}
            value={queryParams}
          />
        </div>
      </div>
    </div>
  );
};
