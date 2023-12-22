import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { setEditorValue } from '../../store/slices/editorSlice';
import { setViewerValue } from '../../store/slices/viewerSlice';

import { formatter } from '../../utils/queryEditor';
import { getTabCount } from '../../utils/queryEditor';

type QueryEditorProps = {
  mode: 'editor' | 'viewer';
};

export const QueryEditor: React.FC<QueryEditorProps> = ({ mode }) => {
  const [rowCounts, setRowCounts] = useState(1);
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
    try {
      setLoading(true);
      setPrevEditorValue(currentEditorValue);
      const response = await fetch(api, {
        method: 'POST',
        body: JSON.stringify({ query: currentEditorValue }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setValue(formatter(JSON.stringify(result.data)));
      } else {
        console.log('something went wrong');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {mode === 'editor' ? (
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
      )}

      <div style={{ position: 'relative' }}>
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
        </div>
      </div>
    </div>
  );
};
