import { Editor } from '@monaco-editor/react';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalization } from '../../contexts/locale.context';
import { setHeaders, setVariables } from '../../store/slices/queryFields.slice';
import { RootState } from '../../store/store';

enum InputType {
  Variables = 'Variables',
  Headers = 'Headers',
}

export const QueryFields: React.FC = () => {
  const [openedTab, setOpenedTab] = useState<boolean>(false);
  const [inputType, setInputType] = useState<InputType>(InputType.Variables);
  const headers = useSelector((state: RootState) => state.queryFields.headers);
  const vars = useSelector((state: RootState) => state.queryFields.variables);
  const { t } = useLocalization();
  const dispatch = useDispatch();

  const queryParams = inputType === 'Variables' ? vars : headers;

  const handleQueryFields = (value: string | undefined) => {
    if (value !== undefined) {
      inputType === 'Variables'
        ? dispatch(setVariables(value))
        : dispatch(setHeaders(value));
    }
  };

  const changeTab = (type: InputType) => {
    setInputType(type);
    if (!openedTab) {
      toggleTab();
    }
  };

  const toggleTab = useCallback(async () => {
    setOpenedTab(!openedTab);
  }, [openedTab]);

  return (
    <div
      className={`playground__variables-container${openedTab ? ' open' : ''}`}
    >
      <div className="playground__variables-buttons">
        <div className="playground__variables-left">
          <button
            className={`button button_micro${
              inputType === InputType.Variables ? ' button_micro_active' : ''
            }`}
            onClick={() => changeTab(InputType.Variables)}
          >
            {t.Variables}
          </button>
          <button
            className={`button button_micro ${
              inputType !== InputType.Variables ? ' button_micro_active' : ''
            }`}
            onClick={() => changeTab(InputType.Headers)}
          >
            {t.Headers}
          </button>
        </div>
        <div>
          <button
            className="button button_tool button_tool-arrow"
            onClick={toggleTab}
          ></button>
        </div>
      </div>
      <div className="playground__variables-editor">
        <Editor
          className="playground__variables-monaco"
          height="0"
          theme="vs"
          language="json"
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
          value={queryParams ?? ''}
        />
      </div>
    </div>
  );
};
