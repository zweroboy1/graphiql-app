import {
  /*ChangeEvent, useCallback, useEffect, useRef,*/ useState,
} from 'react';
/*
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setEditorValue } from '../../store/slices/editorSlice';
import { setViewerValue } from '../../store/slices/viewerSlice';
import { formatter } from '../../utils/queryEditor';
import { getTabCount } from '../../utils/queryEditor';
*/

import Editor from '@monaco-editor/react';

type QueryEditorProps = {
  mode: 'editor' | 'viewer';
};

export const QueryEditor: React.FC<QueryEditorProps> = ({ mode }) => {
  // const [rowCounts, setRowCounts] = useState(1);
  const [value, setValue] = useState('');
  /*
 const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const api = useSelector((state: RootState) => state.apiEndpoint.api);

  const currentEditorValue = useSelector(
    (state: RootState) => state.editor.value
  );
  const [prevEditorValue, setPrevEditorValue] = useState(currentEditorValue);


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

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const caretRef = useRef<number | undefined>(undefined);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e?.target;
    setValue(target.value);
  };
*/

  const handleChange = (inputValue: string | undefined) => {
    if (inputValue) {
      setValue(inputValue);
    }
  };

  /*
  const onReset = () => {
    setValue('');
  };

  const onFormat = () => {
    if (value === '') {
      return;
    }
    // setValue(formatter(value));
    setValue((prevState) => formatter(prevState));
  };

  useEffect(() => {
    if (textareaRef.current && caretRef.current) {
      textareaRef.current.selectionStart = caretRef.current;
      textareaRef.current.selectionEnd = caretRef.current;
      caretRef.current = undefined;
    }
  }, [value]);

  useEffect(() => {
    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const position = textareaRef.current?.selectionStart || value.length;

        setValue(value.slice(0, position) + '\t' + value.slice(position));

        caretRef.current = position + 1;
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [setValue, value]);

  useEffect(() => {
    if (mode !== 'editor') return;

    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const position = textareaRef.current?.selectionStart || value.length;
        const tabCount = getTabCount(value.slice(0, position));
        setValue(
          value.slice(0, position) +
            '\n' +
            '\t'.repeat(tabCount) +
            value.slice(position)
        );
        caretRef.current = position + tabCount + 1;
      }
    };
    document.addEventListener('keydown', handleEnter);
    return () => {
      document.removeEventListener('keydown', handleEnter);
    };
  }, [value, setValue, mode]);

  useEffect(() => {
    setRowCounts([...value.matchAll(/\n/g)].length + 1);
  }, [value]);

  const handleFetch = async () => {
    setPrevEditorValue(currentEditorValue);

    const result = await fetchData({
      query: currentEditorValue,
      url: api,
    }).unwrap();

    setValue(formatter(JSON.stringify(result)));
  };
*/
  return (
    <div>
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
          //readOnly: true
        }}
        onChange={handleChange}
        value={value}
      />
      {/*
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          disabled={mode === 'viewer'}
          style={{
            width: '420px',
            height: '520px',
            tabSize: '10px',
            fontFamily: 'inherit',
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            top: '5px',
            left: '-20px',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: rowCounts }, (_, i) => i + 1).map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>*/}
    </div>
  );
};

/* mode === 'editor' ? (
        <div>
          <button type="button" onClick={onReset}>
            Reset
          </button>
          <button type="button" onClick={onFormat}>
            Format
          </button>
          <br />
        </div>
      ) : (
        <div>
          <button
            disabled={
              currentEditorValue === '' ||
              currentEditorValue === prevEditorValue ||
              loading
            }
            type="button"
            onClick={handleFetch}
          >
            {loading ? 'loading....' : 'Run'}
          </button>
        </div>
          ) */
