import styled from '@emotion/styled';
import { Card as MuiCard } from '@mui/material';
import { CSSProperties } from 'react';

interface CardProps {
  borderRadius?: CSSProperties['borderRadius'];
}

export const Card = styled(MuiCard)(
  {
    backgroundColor: 'white',
    padding: '16px',
  },
  (props: CardProps) => ({
    borderRadius: props.borderRadius || '8px',
  })
);
