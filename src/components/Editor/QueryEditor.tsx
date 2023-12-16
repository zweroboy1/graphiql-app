import { useRef, useState } from 'react';
import { formatter } from './formatter';

// class ValuePresentation {
//   rowValue = '';
//   formattedValue = '';

//   setRowValue(rowString) {
//     this.rowValue = rowString;
//   }
// addSymbol(e) {
//   this.rowValue += e.key;

//   if (e.key !== 'Enter') {
//     this.htmlValue += e.key;
//   } else {
//     this.htmlValue += `<div> </div>`;
//   }
// }

// removeSymbol() {}

//   _format() {
//     return `<div>${this.rowValue}</div>`;
//   }

//   format() {
//     this.formattedValue = this._format();
//   }

//   reset() {
//     this.rowValue = '';
//     this.formattedValue = '';
//   }
// }

// const valuePresenter = new ValuePresentation();

export const QueryEditor = () => {
  const [modifiedAt, setModifiedAt] = useState(new Date());
  const [isEditor] = useState(true);
  const valueRef = useRef<HTMLPreElement>(null);

  // useEffect(() => {
  //   const handleKeyUp = (e) => {
  //     // valuePresenter.addSymbol(e);
  //     setValue((prevValue) => {
  //       let symbolToAdd = e.code === 'Enter' ? '\n' : e.key;
  //       const newValue = `${prevValue}${symbolToAdd}`;
  //       console.log('>>', { newValue });
  //       valuePresenter.setRowValue(newValue);
  //       return newValue;
  //     });
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
        // dangerouslySetInnerHTML={{ __html: valuePresenter.rowValue }}
      />
    </div>
  );
};
