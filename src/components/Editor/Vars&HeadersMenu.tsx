import { useState } from 'react';
import { QueryFields } from './QueryFields';

export const VarsHeadersMenu = () => {
  const [variablesOpen, setVariablesOpen] = useState(false);
  const [headersOpen, setHeadersOpen] = useState(false);

  const toggleVariables = () => {
    setVariablesOpen(true);
    setHeadersOpen(false);
  };

  const toggleHeaders = () => {
    setHeadersOpen(true);
    setVariablesOpen(false);
  };

  return (
    <div>
                <div>
      <button onClick={toggleVariables}>{'Variables'}</button>
      <button onClick={toggleHeaders}>{'Headers'}</button>
          {variablesOpen && <QueryFields type="vars" />}
          {headersOpen && <QueryFields type="headers" />}
        </div>
    </div>
  )
}
