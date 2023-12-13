import React from 'react';

export const Docs: React.FC = () => {
  // const [open, setOpen] = useState(false)

  // const toggleMenu = () => {
  //   setOpen(!open)
  // }

  return (
    <button
      style={{
        position: 'fixed',
        right: '-10px',
        bottom: '40vh',
        transform: 'rotate(-90deg)',
      }}
    >
      Docs
    </button>
  );
};
