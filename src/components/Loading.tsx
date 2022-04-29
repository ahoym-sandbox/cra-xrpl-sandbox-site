import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const spin = keyframes`
		0%,
    100% {
      box-shadow: 0.2em 0px 0 0px currentcolor;
    }
    12% {
      box-shadow: 0.2em 0.2em 0 0 currentcolor;
    }
    25% {
      box-shadow: 0 0.2em 0 0px currentcolor;
    }
    37% {
      box-shadow: -0.2em 0.2em 0 0 currentcolor;
    }
    50% {
      box-shadow: -0.2em 0 0 0 currentcolor;
    }
    62% {
      box-shadow: -0.2em -0.2em 0 0 currentcolor;
    }
    75% {
      box-shadow: 0px -0.2em 0 0 currentcolor;
    }
    87% {
      box-shadow: 0.2em -0.2em 0 0 currentcolor;
    }
`;

const LoadingContainer = styled.span`
  transform: rotate(45deg);
`;

const LoadingSpinner = styled.span`
  transform: rotateZ(45deg);
  perspective: 1000px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: #000;

  :before,
  :after {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 1s ${spin} linear infinite;
  }
  :after {
    color: #005bcc;
    transform: rotateY(70deg);
    animation-delay: 0.4s;
  }
`;

export const Loading = () => (
  <LoadingContainer>
    <LoadingSpinner />
  </LoadingContainer>
);
