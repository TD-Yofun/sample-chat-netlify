import Box from '@cobalt/react-box';
import Button from '@cobalt/react-button';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';
import { Heading, Text } from '@cobalt/react-typography';

import { useResponsive } from '@industries-packages/react-hooks';

type FlexProps = React.ComponentProps<typeof Flex>;

interface Props {
  title: string | JSX.Element;
  subtitle?: string;
  onBack?: () => void;
  onClose?: () => void;
  disabled?: boolean;
  closeDataTestId?: string;
}

const PanelHeader = ({ title, subtitle, disabled, onBack, onClose, closeDataTestId, ...props }: Props & FlexProps) => {
  const responsive = useResponsive();

  return (
    <Flex padding={[3, 5, 6]} width="100%" gap={responsive([2, 3, 3])} alignY="center" {...props}>
      {onBack && (
        <Button
          variation="transparent"
          shape="compact"
          size={responsive(['small', 'medium', 'medium'])}
          onClick={onBack}
          disabled={disabled}
        >
          <Icon name="chevron_left" size="small" color="var(--gray-800)" />
        </Button>
      )}
      <Box grow>
        {typeof title === 'string' ? (
          <Heading
            level={responsive([3, 2, 2])}
            color="var(--gray-800)"
            style={{ lineHeight: '25px', fontSize: responsive(['20px', '24px', '24px']) }}
          >
            {title}
          </Heading>
        ) : (
          title
        )}
        {subtitle && (
          <Text size={responsive(['small', 'medium', 'medium'])} color="var(--gray-600)">
            {subtitle}
          </Text>
        )}
      </Box>
      {onClose && (
        <Button
          variation="transparent"
          shape="compact"
          size={responsive(['small', 'medium', 'medium'])}
          onClick={onClose}
          disabled={disabled}
          data-testid={closeDataTestId}
        >
          <Icon name="close" size="small" color="var(--gray-800)" />
        </Button>
      )}
    </Flex>
  );
};

export default PanelHeader;
