import styled from 'styled-components';

const Input = styled.input.attrs({ required: true })`
  background-color: orange;
  border-radius: 5px;
  width: 100px;
  height: 50px;
  padding: 10px;
`;

export default Input;
