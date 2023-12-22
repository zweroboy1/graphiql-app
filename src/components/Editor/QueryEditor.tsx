import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { formatter } from '../../utils/queryEditor';
import { getTabCount } from '../../utils/queryEditor';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setEditorValue } from '../../store/slices/editorSlice';
import { setViewerValue } from '../../store/slices/viewerSlice';

type QueryEditorProps = {
  mode: 'editor' | 'viewer';
};

export const QueryEditor: React.FC<QueryEditorProps> = ({ mode }) => {
  const [rowCounts, setRowCounts] = useState(1);
  const dispatch = useDispatch();
  // const [apiResult, setApiResult] = useState<string | null>(null);

  const api = useSelector((state: RootState) => state.apiEndpoint.api);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const caretRef = useRef<number | undefined>(undefined);

  const value = useSelector((state: RootState) =>
    mode === 'editor' ? state.editor.value : state.viewer.value
  );

  const currentEditorValue = useSelector(
    (state: RootState) => state.editor.value
  );

  const setValue = useCallback(
    (value: string) => {
      console.log('setValue ', {
        mode,
      });
      return mode === 'editor'
        ? dispatch(setEditorValue(value))
        : dispatch(setViewerValue(value));
    },
    [mode, dispatch]
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e?.target;
    setValue(target.value);
  };

  const onReset = () => {
    setValue('');
  };

  const onFormat = () => {
    if (value === '') {
      return;
    }
    setValue(formatter(value));
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
    const response = await fetch(api, {
      method: 'POST',
      body: JSON.stringify({ query: currentEditorValue }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    setValue(formatter(JSON.stringify(result.data)));
    console.log('res >>>', result);
  };

  if (mode === 'viewer' && !value) {
    return (
      <div>
        <button type="button" onClick={handleFetch}>
          Run
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* <div>{mode === 'viewer' ? <span>Viewer</span> : <span>Editor</span>}</div> */}
      <button type="button" onClick={onReset}>
        Reset
      </button>
      <button type="button" onClick={onFormat}>
        Format
      </button>
      <br />
      <div style={{ position: 'relative' }}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          // disabled={mode === 'viewer'}
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
        </div>
      </div>
    </div>
  );
};
