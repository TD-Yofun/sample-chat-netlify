import { useState } from 'react';

import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';
import { Text } from '@cobalt/react-typography';

import { ENDPOINT, REGION } from '@/constant';
import { useSelector } from '@/store';
import { Configuration } from '@/store/configuration-slice';

export function formatConfiguration(data: Configuration) {
  return {
    ...data,
    region: REGION[data.region as keyof typeof REGION],
    environment: ENDPOINT[data.environment as keyof typeof ENDPOINT],
  };
}

interface Props {
  format?: boolean;
}

interface Row {
  label: string;
  value: string;
  direction: 'row' | 'column';
}

const Preview = ({ format }: Props) => {
  const { data } = useSelector((state) => state.configuration);

  const configuration = format ? formatConfiguration(data) : data;
  const direction = format ? 'column' : 'row';

  const [show, setShow] = useState(true);

  const rows: Row[] = Object.entries(configuration)
    .filter(([_, value]) => !!value)
    .map(([label, value]) => {
      return {
        label,
        value: typeof value === 'object' ? JSON.stringify(value, null, 2) : value,
        direction,
      };
    });

  if (!show) {
    return <></>;
  }

  return (
    <Flex
      direction="column"
      width="100%"
      gap={3}
      style={{
        padding: 10,
        width: 'fit-content',
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Flex
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          cursor: 'pointer',
          background: 'var(--red-700)',
        }}
        onClick={() => setShow(false)}
      >
        <Icon name="close" color="white" size="tiny" />
      </Flex>

      {rows.map((row) => (
        <Flex key={row.label} direction={row.direction} gap={2}>
          <Text color="var(--gray-600)">{row.label}:</Text>
          <Text style={{ wordBreak: 'break-all' }}>{row.value}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default Preview;
