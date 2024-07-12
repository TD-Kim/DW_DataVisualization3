import styled from 'styled-components';

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const Input = styled.input`
  font-size: 16px;
  border: none;
  border-bottom: 2px solid ${({ $error }) => $error ? '#f44336' : '#eeeeee'};
  padding: 8px 0;
  outline: none;
  display: block;
  width: 100%;

  &:focus {
    border-color: ${({ $error }) => $error ? '#f44336' : '#7760b4'};
  }

  &::placeholder {
    color: #c4c5cd;
  }
`;

export default Input;
