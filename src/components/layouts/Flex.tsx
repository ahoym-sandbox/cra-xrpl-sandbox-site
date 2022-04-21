import styled from '@emotion/styled';
import { CSSProperties } from 'react';

interface FlexProps {
  flexDirection?: CSSProperties['flexDirection'];
  height?: CSSProperties['height'];
  justifyContent?: CSSProperties['justifyContent'];
}

export const Flex = styled.div(
  {
    display: 'flex',
    alignItems: 'center',
  },
  (props: FlexProps) => ({
    flexDirection: props.flexDirection || 'row',
    height: props.height || 'auto',
    justifyContent: props.justifyContent || 'center',
  })
);
