import { useState, useEffect } from 'react';

import Box from '@cobalt/react-box';
import Button from '@cobalt/react-button';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';

import { useResponsive } from '@industries-packages/react-hooks';

import kirinImage from '@/assets/kirin.png?url';
import { useDispatch } from '@/store';
import { setConfiguration } from '@/store/configuration-slice';
import { Size } from '@/types';
import { connect } from '@/utils/chat.sdk';

import styles from './styles.module.scss';
import Preview, { formatConfiguration } from '../configuration/Preview';
import { useConfiguration } from '../configuration/useConfiguration';
import ConfigurationPanel from '../Panels/ConfigurationPanel';

const App = () => {
  const responsive = useResponsive();
  const size: Size = responsive(['small', 'medium', 'medium']);
  const dispatch = useDispatch();
  const { getConfiguration } = useConfiguration();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const configuration = getConfiguration();
    if (configuration) {
      // connect
      const chatConfigurations = formatConfiguration(configuration);
      connect(chatConfigurations.region, chatConfigurations.environment, chatConfigurations.touchpoint_id);
      dispatch(setConfiguration(configuration));
    }
    setVisible(!configuration);
  }, [dispatch, getConfiguration]);

  return (
    <>
      <Box height="100%" padding={[3, 5, 6]}>
        <img className={styles['kirin']} src={kirinImage} alt="" />
        <Flex alignX="space-between">
          <Preview />
          <Button variation="transparent" size={size} onClick={() => setVisible(true)}>
            <Icon name="settings" size={responsive(['tiny', 'small', 'small'])} />
          </Button>
        </Flex>
      </Box>

      {visible && <ConfigurationPanel onClose={() => setVisible(false)} />}
    </>
  );
};

export default App;
