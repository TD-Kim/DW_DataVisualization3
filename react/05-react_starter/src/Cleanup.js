import React, { useEffect, useState } from 'react';

function Hello() {
  function effectFn() {
    console.log(' created :) ');
    return destroyedFn;
  }
  function destroyedFn() {
    console.log(' destroyed :( ');
  }
  //   useEffect(() => {
  //     console.log(' created :) ');
  //     return () => console.log(" destroyed :( ");
  //   }, []);
  useEffect(effectFn, []);

  return <h1>Hello</h1>;
}

function Cleanup(props) {
  const [showing, setShowing] = useState(false);
  const onClick = () => {
    setShowing(!showing);
  };
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? 'Hide' : 'Show'}</button>
    </div>
  );
}

export default Cleanup;
