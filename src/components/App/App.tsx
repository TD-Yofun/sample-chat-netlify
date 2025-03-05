import { useState, useEffect } from 'react';

import classcat from 'classcat';

import Box from '@cobalt/react-box';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';

import kirinImage from '@/assets/kirin.png?url';
// import kirinImage from '@/assets/image.png?url';
import talkdesk from '@/assets/talkdesk.svg?raw';
import { PADDING_SPACING } from '@/constant';
import { useDispatch, useSelector } from '@/store';
import { setConfiguration } from '@/store/configuration-slice';
import { connect } from '@/utils/chat.sdk';

import styles from './styles.module.scss';
import Preview, { formatConfiguration } from '../configuration/Preview';
import { useConfiguration } from '../configuration/useConfiguration';
import ConfigurationPanel from '../Panels/ConfigurationPanel';

const App = () => {
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
      <Box width="100%" height="100%">
        <Flex padding={PADDING_SPACING} width="100%" height="100%" direction="column" alignY="space-between">
          <Flex width="100%" alignX="space-between">
            {!background ? <Box dangerouslySetInnerHTML={{ __html: talkdesk }} padding={2} /> : <div />}
          </Flex>

          <Box width="100%">
            <Preview allowClose />
          </Box>
        </Flex>

        {/* open side panel */}
        <Flex className={styles['side_panel_button']} alignX="center" alignY="center" onClick={() => setVisible(true)}>
          <Icon name={visible ? 'chevron_right' : 'chevron_left'} size="tiny" color="#fff" />
        </Flex>
      </Box>

      {visible && <ConfigurationPanel onClose={() => setVisible(false)} />}
    </>
  );
};

export default App;
