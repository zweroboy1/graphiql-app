import { useRef, useState } from 'react';
import { formatter } from './formatter';
// import { setCaret } from '../../utils/queryEditor';

export const QueryEditor = () => {
  const [modifiedAt, setModifiedAt] = useState(new Date());
  const [isEditor] = useState(true);
  const valueRef = useRef<HTMLPreElement>(null);

  // useEffect(() => {
  //   const handleKeyUp = (e: KeyboardEvent) => {
  //     e.preventDefault();
  //     if (!valueRef || !valueRef.current) {
  //       return;
  //     }
  //     if (
  //       !valueRef.current.innerText ||
  //       !valueRef.current.innerText.includes('{')
  //     ) {
  //       return;
  //     }
  //     if (e.code === 'Enter') {
  //       const checkValue = valueRef.current.innerText;
  //       let tabCount =
  //         [...checkValue.matchAll(/{/g)].length -
  //         [...checkValue.matchAll(/}/g)].length;
  //       tabCount = tabCount < 0 ? 0 : tabCount;
  //       if (tabCount > 0) {
  //         valueRef.current.innerText += '\t'.repeat(tabCount);
  //       }
  //       valueRef.current.innerText = valueRef.current.innerText.replace(
  //         /\n+/g,
  //         '\n'
  //       );
  //       setCaret(valueRef.current, tabCount);
  //     }
  //   };
  //   document.addEventListener('keyup', handleKeyUp);
  //   return () => {
  //     document.removeEventListener('keyup', handleKeyUp);
  //   };
  // }, []);

  const onReset = () => {
    if (!valueRef.current) {
      return;
    }
    valueRef.current.innerText = '';
    setModifiedAt(new Date());
  };

  const onFormat = () => {
    if (!valueRef || !valueRef.current || !valueRef.current.innerText) {
      return;
    }
    valueRef.current.innerText = formatter(valueRef.current.innerText);
    setModifiedAt(new Date());
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
      <pre
        title={`Last Modified At ${modifiedAt}`}
        ref={valueRef}
        style={{
          width: '45vw',
          height: '50vh',
          padding: '10px',
          border: '2px solid #000',
          overflowX: 'auto',
        }}
        contentEditable={isEditor}
      />
    </div>
  );
};
