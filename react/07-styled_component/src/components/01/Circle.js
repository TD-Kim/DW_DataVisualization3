import styled from 'styled-components';
import Box from './Box';
import { keyframes } from 'styled-components';

const CircleAnimation = keyframes`
    0% {
        background-color: red;
    }
    33% {
        background-color: green;
    }
    66% {
        background-color: blue;
    }
    100% {
        background-color: red;
    }
`;

const Circle = styled(Box)`
  border-radius: 50%;
  animation: ${CircleAnimation} 3s linear infinite;
`;

export default Circle;
