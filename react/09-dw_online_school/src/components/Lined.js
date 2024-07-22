import React from 'react';

const styleObject = {
  paddingBottom: '4px',
  boxShadow: 'inset 0 -14px #ebebeb',
};

function Lined({ children }) {
  return <span style={styleObject}>{children}</span>;
}

export default Lined;
