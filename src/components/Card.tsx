import styled from '@emotion/styled';
import { CSSProperties } from 'react';

interface CardProps {
  borderRadius?: CSSProperties['borderRadius'];
}

export const Card = styled.div(
  {
    backgroundColor: 'white',
    padding: '16px',
  },
  (props: CardProps) => ({
    borderRadius: props.borderRadius || '8px',
  })
);
