import React from 'react';

export const QueryFields: React.FC<{ type: 'vars' | 'headers' }> = ({
  type,
}) => {
  console.log(type);

  return (
    <div>
      <div>
        {type === 'headers' ? (
          <div>
            <h5>HTTP Headers</h5>
          </div>
        ) : (
          <div>
            <h5>Variables</h5>
          </div>
        )}
      </div>
    </div>
  );
};
