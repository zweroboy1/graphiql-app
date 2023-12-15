import { useRef } from 'react';

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
  // const [value, setValue] = useState('');
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

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          // valueRef.current?.innerText = '';
          // setValue('');
          // valuePresenter.reset();
        }}
      >
        Reset
      </button>
      <button
        type="button"
        onClick={() => {
          console.log('format >>>', { valueRef });
          if (!valueRef || !valueRef.current) {
            return;
          }
          valueRef.current.innerText = valueRef.current.innerText.replace(
            /\n+/g,
            '\n'
          );
          // setValue('');
          // valuePresenter.format();
        }}
      >
        Format
      </button>
      <br />
      <pre
        ref={valueRef}
        style={{
          width: '85vw',
          height: '50vh',
        }}
        contentEditable
        // dangerouslySetInnerHTML={{ __html: valuePresenter.rowValue }}
      />
    </div>
  );
};

// .queryEditor {
//   & div {
//     padding-left: 4px;
//   }
// }
