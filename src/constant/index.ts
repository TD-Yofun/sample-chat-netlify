import Box from '@cobalt/react-box';

export const REGION = {
  US: 'td-us-1',
  EU: 'td-eu-1',
  CA: 'td-ca-1',
};

export const ENDPOINT = {
  STG: 'https://talkdeskchatsdk.svc.talkdeskstg.com/v2/talkdeskchatsdk.js',
  QA: 'https://talkdeskchatsdk.svc.talkdeskqa.com/v2/talkdeskchatsdk.js',
  PROD: 'https://talkdeskchatsdk.talkdeskapp.com/v2/talkdeskchatsdk.js',
};

type BoxProps = React.ComponentProps<typeof Box>;

export const PADDING_SPACING: BoxProps['padding'] = [3, 5, 6];
