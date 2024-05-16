import React from 'react';

import { styled } from 'styled-components';

import Flex from '@cobalt/react-flex';

import { useResponsive } from '@industries-packages/react-hooks';
import Scroller from '@industries-packages/react-scrollable-shadow';

type Props = React.ComponentProps<typeof Scroller> & {
  children?: React.ReactNode;
};

const Container = styled(Flex)`
  & > div {
    width: 100%;
  }
`;

const PanelBody = ({ children, paddingBottom = 3, paddingTop, paddingY, ...props }: Props) => {
  const responsiveValue = useResponsive();

  return (
    <Scroller {...props} style={{ flexGrow: 1, height: 0, ...props.style }}>
      <Container
        direction="column"
        paddingX={['3', '5', '6']}
        // @ts-ignore
        gap={responsiveValue([3, 4, 4])}
        paddingY={paddingY}
        paddingBottom={paddingBottom}
        paddingTop={paddingTop}
      >
        {children}
      </Container>
    </Scroller>
  );
};

export default PanelBody;
