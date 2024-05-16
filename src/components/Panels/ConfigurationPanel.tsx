import { useEffect, useMemo } from 'react';

import Box from '@cobalt/react-box';
import Button from '@cobalt/react-button';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';
import Input from '@cobalt/react-input';
import Message from '@cobalt/react-message';
import { Heading, Text } from '@cobalt/react-typography';
import CopyToClipboard from '@cobalt-marketplace/react-copy-to-clipboard';
import FormControl from '@cobalt-marketplace/react-form-control';

import { useResponsive, useValidate } from '@industries-packages/react-hooks';
import Select, { Option } from '@industries-packages/react-select';

import { ENDPOINT, REGION } from '@/constant';
import { useDispatch, useSelector } from '@/store';
import { setConfiguration, setIsConfigured } from '@/store/configuration-slice';
import { Size } from '@/types';
import { configurationStorage } from '@/utils';
import { connect } from '@/utils/chat.sdk';

import PanelBody from './PanelBody';
import PanelHeader from './PanelHeader';
import PanelRender from './PanelRender';
import Preview, { formatConfiguration } from '../configuration/Preview';
import { useConfiguration } from '../configuration/useConfiguration';

interface Props {
  onClose: () => void;
}

const regionOptions: Option[] = Object.keys(REGION).map((key) => {
  return {
    label: `${key} (${REGION[key as keyof typeof REGION]})`,
    value: key,
  };
});

const environmentOptions: Option[] = Object.keys(ENDPOINT).map((key) => {
  return {
    label: `${key}`,
    value: key,
  };
});

const ConfigurationPanel = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.configuration);
  const responsive = useResponsive();
  const { getConfiguration } = useConfiguration();

  const size: Size = responsive(['small', 'medium', 'medium']);

  const regionValidator = useValidate({ trigger: 'change', required: true });
  const environmentValidator = useValidate({ trigger: 'change', required: true });
  const touchpointIdValidator = useValidate({ trigger: 'blur', required: true });

  const paramsURL =
    window.location.href.split('?')[0] +
    '?' +
    new URLSearchParams(data as unknown as Record<string, string>).toString();

  const showParams = useMemo(() => {
    const paramsConfigurations = formatConfiguration(data);
    return paramsConfigurations.region || paramsConfigurations.environment || paramsConfigurations.touchpoint_id;
  }, [data]);

  const validate = async () => {
    try {
      await Promise.all([
        regionValidator.validate(data.region),
        environmentValidator.validate(data.environment),
        touchpointIdValidator.validate(data.touchpoint_id),
      ]);

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleConfirm = async () => {
    const isValid = await validate();
    if (!isValid) return;
    // connect
    const chatConfigurations = formatConfiguration(data);
    connect(chatConfigurations.region, chatConfigurations.environment, chatConfigurations.touchpoint_id);
    // save configuration
    configurationStorage.save(data);
    dispatch(setIsConfigured(true));
    onClose();
  };

  /**
   * When component unmounts, should restore the configuration
   */
  useEffect(() => {
    return () => {
      const configuration = getConfiguration();
      if (configuration) {
        dispatch(setConfiguration(configuration));
      }
    };
  }, [dispatch, getConfiguration]);

  return (
    <PanelRender>
      <Flex direction="column" width="100%" height="100%">
        <PanelHeader title="Configuration Settings" onClose={onClose} />
        <PanelBody divider paddingY={3}>
          <Message variation="info">
            <Flex gap={2} padding={2}>
              <Box grow>
                <Text style={{ wordBreak: 'break-all' }}>{paramsURL}</Text>
              </Box>

              <CopyToClipboard text={paramsURL}>
                <Icon name="copy" size={responsive(['tiny', 'small', 'small'])} />
              </CopyToClipboard>
            </Flex>
          </Message>

          <Heading level={responsive([4, 3, 3])}>Configuration</Heading>

          <FormControl label="Region" inputId="" {...regionValidator.formControl}>
            <Select
              options={regionOptions}
              allowClear
              value={data.region}
              onChange={(value) => {
                regionValidator.onChange(value);
                dispatch(setConfiguration({ ...data, region: value as keyof typeof REGION }));
              }}
              variation={regionValidator.variation}
              placeholder="Select region"
            />
          </FormControl>

          <FormControl label="Environment" inputId="" {...environmentValidator.formControl}>
            <Select
              options={environmentOptions}
              allowClear
              value={data.environment}
              onChange={(value) => {
                environmentValidator.onChange(value);
                dispatch(setConfiguration({ ...data, environment: value as keyof typeof ENDPOINT }));
              }}
              variation={environmentValidator.variation}
              placeholder="Select environment"
            />
          </FormControl>

          <FormControl label="Touchpoint ID" inputId="" {...touchpointIdValidator.formControl}>
            <Input
              value={data.touchpoint_id}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, '');
                dispatch(setConfiguration({ ...data, touchpoint_id: value }));
              }}
              onBlur={(e) => touchpointIdValidator.onBlur(e.target.value)}
              variation={touchpointIdValidator.variation}
              placeholder="Enter touchpoint ID"
              size={size}
            />
          </FormControl>

          {showParams && (
            <>
              <Heading level={responsive([4, 3, 3])}>Chat Widget Parameters</Heading>
              <Box backgroundColor="var(--gray-200)" style={{ borderRadius: '4px' }} padding={3}>
                <Preview format />
              </Box>
            </>
          )}
        </PanelBody>
        <Flex width="100%" gap={[1, 2, 2]} alignX="end" alignY="center" padding={[3, 5, 6]}>
          <Button onClick={onClose} type="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </Flex>
      </Flex>
    </PanelRender>
  );
};

export default ConfigurationPanel;
