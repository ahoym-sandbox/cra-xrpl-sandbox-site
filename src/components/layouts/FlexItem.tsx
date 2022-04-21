import styled from '@emotion/styled';
import { CSSProperties } from 'react';

interface FlexItemProps {
  alignSelf?: CSSProperties['alignSelf'];
  flexGrow?: CSSProperties['flexGrow'];
}

export const FlexItem = styled.div(
  {
    justifyContent: 'center',
  },
  (props: FlexItemProps) => ({
    alignSelf: props.alignSelf || 'center',
    flexGrow: props.flexGrow || 1,
  })
);
