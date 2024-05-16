import styled from 'styled-components';

import Flex from '@cobalt/react-flex';
import { Text } from '@cobalt/react-typography';

import { ENDPOINT, REGION } from '@/constant';
import { useSelector } from '@/store';
import { Configuration } from '@/store/configuration-slice';

const Label = styled(Text)`
  color: var(--gray-600);
  width: 90px;
  flex-shrink: 0;
`;

const Value = styled(Text)`
  flex-grow: 1;
  word-break: break-all;
`;

export function formatConfiguration(data: Configuration) {
  return {
    ...data,
    region: REGION[data.region as keyof typeof REGION],
    environment: ENDPOINT[data.environment as keyof typeof ENDPOINT],
  };
}

const Preview = () => {
  const { data } = useSelector((state) => state.configuration);

  const { region, environment, touchpoint_id } = formatConfiguration(data);

  return (
    <Flex direction="column" width="100%" gap={3}>
      {!!region && (
        <Flex width="100%" gap={1} direction="column">
          <Label>Region</Label>
          <Value>{region}</Value>
        </Flex>
      )}

      {!!environment && (
        <Flex width="100%" gap={1} direction="column">
          <Label>Url</Label>
          <Value>{environment}</Value>
        </Flex>
      )}

      {!!touchpoint_id && (
        <Flex width="100%" gap={1} direction="column">
          <Label>Touchpoint ID</Label>
          <Value>{touchpoint_id}</Value>
        </Flex>
      )}
    </Flex>
  );
};

export default Preview;
