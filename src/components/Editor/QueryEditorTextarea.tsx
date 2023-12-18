import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { formatter } from '../../utils/formatter';

export const QueryEditorTextarea = () => {
  const [value, setValue] = useState('');
  const [isViewer, setIsViewer] = useState(false);
  const [rowCounts, setRowCounts] = useState(1);

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

  const toggleViewer = () => {
    setIsViewer((prevState) => !prevState);
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

        setValue((prevValue) => {
          return (
            prevValue.slice(0, position) + '\t' + prevValue.slice(position)
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
        let tabCount =
          [...value.slice(0, position).matchAll(/{/g)].length -
          [...value.slice(0, position).matchAll(/}/g)].length;
        tabCount = tabCount < 0 ? 0 : tabCount;
        setValue((prevValue) => {
          console.log(prevValue);
          return (
            prevValue.slice(0, position) +
            '\n' +
            '\t'.repeat(tabCount) +
            prevValue.slice(position)
          );
        });
        console.log(value);
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

  return (
    <div>
      <button type="button" onClick={onReset}>
        Reset
      </button>
      <button type="button" onClick={onFormat}>
        Format
      </button>
      <button type="button" onClick={toggleViewer}>
        {isViewer ? <span>Viewer</span> : <span>Editor</span>}
      </button>
      <br />
      <div style={{ position: 'relative' }}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          disabled={isViewer}
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
