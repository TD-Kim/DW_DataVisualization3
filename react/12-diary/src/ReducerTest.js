import { useReducer, useState } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'PLUS':
      return { count: state.count + 1 };
    case 'MINUS':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const initialState = { count: 0 };

// 예측 가능: 상태 변경이 예측 가능하고 일관성 있게 이루어진다.
// 중앙 집중화된 관리: 여러 상태를 하나의 리듀서에서 관리를 하거나, 여러 리듀서를 조합하여
//                   관리를 할 수 있다. 모든 상태 변경이 하나의 통로(dispatch를 통한 액션 전달)
//                   상태 관리의 복잡성이 줄어들고, 상태 변경이 어디에서 이루어 지는지를
//                   쉽게 추적할 수 있다.

function ReducerTest() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className='App'>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'PLUS' })}>plus</button>
      <button onClick={() => dispatch({ type: 'MINUS' })}>minus</button>
    </div>
  );
}

export default ReducerTest;