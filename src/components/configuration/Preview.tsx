import Flex from '@cobalt/react-flex';
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

  const rows: Row[] = Object.entries(configuration)
    .filter(([_, value]) => !!value)
    .map(([label, value]) => {
      return {
        label,
        value: typeof value === 'object' ? JSON.stringify(value, null, 2) : value,
        direction,
      };
    });

  return (
    <Flex direction="column" width="100%" gap={3}>
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
