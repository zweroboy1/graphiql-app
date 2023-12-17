import { useEffect, useRef, useState } from 'react';
import { formatter } from '../../utils/formatter';
// import { setCaret } from '../../utils/queryEditor';

export const QueryEditor = () => {
  const [modifiedAt, setModifiedAt] = useState(new Date());
  const [isEditor] = useState(true);
  const [rowCounts, setRowCounts] = useState<number[]>([1]);
  const valueRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!valueRef || !valueRef.current) {
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        // valueRef.current.innerText += '\t';
        // setCaret(valueRef.current, 1);
      }
      if (e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Delete') {
        updateRowCounts();
      }
      // if (
      //   !valueRef.current.innerText ||
      //   !valueRef.current.innerText.includes('{')
      // ) {
      //   return;
      // }
      // if (e.code === 'Enter') {
      //   const checkValue = valueRef.current.innerText;
      //   let tabCount =
      //     [...checkValue.matchAll(/{/g)].length -
      //     [...checkValue.matchAll(/}/g)].length;
      //   tabCount = tabCount < 0 ? 0 : tabCount;
      //   if (tabCount > 0) {
      //     valueRef.current.innerText += '\t'.repeat(tabCount);
      //   }
      //   valueRef.current.innerText = valueRef.current.innerText.replace(
      //     /\n+/g,
      //     '\n'
      //   );
      //   setCaret(valueRef.current, tabCount);
      //  }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const onReset = () => {
    if (!valueRef.current) {
      return;
    }
    valueRef.current.innerText = '';
    setRowCounts([1]);
    setModifiedAt(new Date());
  };

  const onFormat = () => {
    if (!valueRef || !valueRef.current || !valueRef.current.innerText) {
      return;
    }
    valueRef.current.innerText = formatter(valueRef.current.innerText);
    updateRowCounts();
    setModifiedAt(new Date());
  };

  const updateRowCounts = () => {
    if (!valueRef || !valueRef.current) {
      setRowCounts([1]);
      return;
    }
    const length = [...valueRef.current.childNodes].length + 1;
    let first = 0;
    const arr = Array.from({ length }, () => {
      first += 1;
      return first;
    });
    return setRowCounts(arr);
  };

  return (
    <div>
      <button type="button" onClick={onReset}>
        Reset
      </button>
      <button type="button" onClick={onFormat}>
        Format
      </button>
      <br />
      <div style={{ position: 'relative' }}>
        <pre
          title={`Last Modified At ${modifiedAt}`}
          ref={valueRef}
          style={{
            width: '45vw',
            height: '50vh',
            padding: '10px 10px 10px 30px',
            border: '2px solid #000',
            overflowX: 'auto',
          }}
          contentEditable={isEditor}
        />
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            top: '10px',
            left: '5px',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {rowCounts.map((item) => (
            <div>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
