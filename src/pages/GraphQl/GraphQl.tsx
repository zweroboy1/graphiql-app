import { Docs } from '../../components/Docs/Docs';
import { Schema } from '../../components/Schema/Schema';

export const GraphQl: React.FC = () => {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          right: '-40px',
          flexDirection: 'row',
          transform: 'rotate(-90deg)',
        }}
      >
        <Docs />
        <Schema />
      </div>
    </>
  );
};
