import Panel from '@cobalt/react-panel';
import { Portal } from '@cobalt/react-portal-provider';

interface Props {
  children: React.ReactNode;
}

const PanelRender = ({ children }: Props) => {
  return (
    <Portal>
      <Panel visible overlay>
        {children}
      </Panel>
    </Portal>
  );
};

export default PanelRender;
