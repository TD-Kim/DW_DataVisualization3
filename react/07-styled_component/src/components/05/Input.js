import styled from 'styled-components';

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const Input = styled.input`
  font-size: ${({ size }) => SIZES[size] ?? SIZES['medium']}px;
  border-radius: ${({ $round }) => ($round ? '9999px' : '4px')};
  border: 2px solid ${({ $error }) => $error ? '#f44336' : '#eeeeee'};
  padding: 16px;
  outline: none;

  &:focus {
    border-color: ${({ $error }) => $error ? '#f44336' : '#7760b4'};
  }
`;

export default Input;
