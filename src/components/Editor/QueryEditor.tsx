import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setEditorValue } from '../../store/slices/editorSlice';
import { setViewerValue } from '../../store/slices/viewerSlice';
import Editor from '@monaco-editor/react';

type QueryEditorProps = {
  mode: 'editor' | 'viewer';
};

export const QueryEditor: React.FC<QueryEditorProps> = ({ mode }) => {
  const dispatch = useDispatch();

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
    <div className="playground__monaco">
      <h4 className="h4 playground__title">
        {mode === 'editor' ? 'Request' : 'Response'}
      </h4>
      <Editor
        className="playground__part"
        height="420px"
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
          readOnly: mode !== 'editor',
        }}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};
