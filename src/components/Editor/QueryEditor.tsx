import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import { RootState } from '../../store/store';
import { setEditorValue } from '../../store/slices/editorSlice';
import { setViewerValue } from '../../store/slices/viewerSlice';
import { useLocalization } from '../../contexts/locale.context';
import { TAB_TO_SPACES } from '../../constants';

type QueryEditorProps = {
  mode: 'editor' | 'viewer';
};

export const QueryEditor: React.FC<QueryEditorProps> = ({ mode }) => {
  const dispatch = useDispatch();
  const { t } = useLocalization();

  const value = useSelector((state: RootState) =>
    mode === 'editor' ? state.editor.value : state.viewer.value
  );
  const setValue = useCallback(
    (value: string) => {
      return mode === 'editor'
        ? dispatch(setEditorValue(value))
        : dispatch(setViewerValue(value));
    },
    [mode, dispatch]
  );

  const handleChange = (inputValue: string | undefined) => {
    if (inputValue !== undefined) {
      setValue(inputValue);
    }
  };

  return (
    <>
      <div className="playground__monaco">
        <h4 className="h4 playground__title">
          {mode === 'editor' ? t.Request : t.Response}
        </h4>
        <Editor
          className="playground__part"
          height={mode === 'editor' ? 'calc(50vh - 44px)' : '50vh'}
          theme="vs"
          language={mode === 'editor' ? 'graphql' : 'json'}
          options={{
            minimap: { enabled: false },
            contextmenu: false,
            quickSuggestions: false,
            selectionHighlight: false,
            renderLineHighlight: 'none',
            hideCursorInOverviewRuler: true,
            overviewRulerLanes: 0,
            overviewRulerBorder: false,
            tabSize: TAB_TO_SPACES,
            readOnly: mode !== 'editor',
          }}
          onChange={handleChange}
          value={value}
        />
      </div>
    </>
  );
};
