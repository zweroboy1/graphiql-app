import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { formatter } from '../../utils/queryEditor';
import { getTabCount } from '../../utils/queryEditor';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type QueryEditorProps = {
  mode: 'editor' | 'viewer';
};

export const QueryEditor: React.FC<QueryEditorProps> = ({ mode }) => {
  const [value, setValue] = useState('');
  const [rowCounts, setRowCounts] = useState(1);
  // const [apiResult, setApiResult] = useState<string | null>(null);

  const api = useSelector((state: RootState) => state.apiEndpoint.api);

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

        setValue((prevState) => {
          return (
            prevState.slice(0, position) + '\t' + prevState.slice(position)
          );
        });
        caretRef.current = position + 1;
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [value.length]);

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const position = textareaRef.current?.selectionStart || value.length;
        const tabCount = getTabCount(value.slice(0, position));
        setValue((prevState) => {
          return (
            prevState.slice(0, position) +
            '\n' +
            '\t'.repeat(tabCount) +
            prevState.slice(position)
          );
        });
        caretRef.current = position + tabCount + 1;
      }
    };
    document.addEventListener('keydown', handleEnter);
    return () => {
      document.removeEventListener('keydown', handleEnter);
    };
  }, [value]);

  useEffect(() => {
    setRowCounts([...value.matchAll(/\n/g)].length + 1);
  }, [value]);

  const handleFetch = () => {
    console.log('fetch', api);
  };

  if (mode === 'viewer') {
    return (
      <div>
        <button onClick={handleFetch}>Run</button>
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
