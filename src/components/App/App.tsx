import { useState, useEffect } from 'react';

import classcat from 'classcat';

import Box from '@cobalt/react-box';
import Button from '@cobalt/react-button';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';

import { useResponsive } from '@industries-packages/react-hooks';

import kirinImage from '@/assets/kirin.png?url';
// import kirinImage from '@/assets/image.png?url';
import talkdesk from '@/assets/talkdesk.svg?raw';
import { useDispatch, useSelector } from '@/store';
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
  const { background } = useSelector((state) => state.configuration.data);
  const { getConfiguration } = useConfiguration();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const configuration = getConfiguration();
    if (configuration) {
      // connect
      const chatConfigurations = formatConfiguration(configuration);
      connect(
        chatConfigurations.region,
        chatConfigurations.environment,
        chatConfigurations.touchpoint_id,
        chatConfigurations.context,
      );
      dispatch(setConfiguration(configuration));
    }
    setVisible(!configuration);
  }, [dispatch, getConfiguration]);

  return (
    <>
      <img
        className={classcat({
          [styles['bg']]: true,
          [styles['kirin']]: !background,
        })}
        src={background || kirinImage}
        alt=""
      />
      <Flex
        width="100%"
        height="100%"
        padding={[3, 5, 6]}
        direction="column"
        alignY="space-between"
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <Flex width="100%" alignX="space-between">
          {!background ? <Box dangerouslySetInnerHTML={{ __html: talkdesk }} padding={2} /> : <div />}
          <Button variation="transparent" size={size} onClick={() => setVisible(true)}>
            <Icon name="settings" size={responsive(['tiny', 'small', 'small'])} />
          </Button>
        </Flex>

        <Box width="100%">
          <Preview />
        </Box>
      </Flex>

      {visible && <ConfigurationPanel onClose={() => setVisible(false)} />}
    </>
  );
};

export default App;
