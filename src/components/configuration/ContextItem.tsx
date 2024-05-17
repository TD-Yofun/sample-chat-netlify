import { useEffect } from 'react';

import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';
import Input from '@cobalt/react-input';
import FormControl from '@cobalt-marketplace/react-form-control';

import { useResponsive, useValidate } from '@industries-packages/react-hooks';

import { Size } from '@/types';

interface Props {
  index: number;
  forwardedRef: (validator: () => Promise<void>) => void;
  value: { key: string; value: string };
  onChange: (value: { key: string; value: string }) => void;
  size: Size;
  onDelete: () => void;
  contexts: { key: string; value: string }[];
}

const ContextItem = ({ forwardedRef, contexts, value: context, onChange, size, onDelete, index }: Props) => {
  const responsive = useResponsive(size);
  size = responsive(['small', 'medium', 'medium']);

  const validator = useValidate({
    trigger: 'blur',
    validator: async (value) => {
      // name
      if (!context.key) {
        throw new Error('Name is required');
      }

      if (/^[a-zA-Z_$][a-zA-Z\d_$]*$/.test(context.key) === false) {
        throw new Error('Name只能包含字母、数字、下划线 (_) 和美元符号 ($)');
      }

      if (contexts.find((item, i) => i !== index && context.key && item.key === context.key)) {
        throw new Error('The name already exists');
      }

      // value
      if (!context.value) {
        throw new Error('Value is required');
      }
    },
  });

  useEffect(() => {
    forwardedRef(() => validator.validate(context.key));
  }, [context.key, forwardedRef, validator]);

  return (
    <Flex direction="column" width="100%" gap={1} paddingBottom={2}>
      <Flex gap={2} alignY="center" width="100%">
        <Input
          value={context.key}
          size={size}
          placeholder="Enter context name"
          onChange={(e) => {
            const value = e.target.value.replace(/\s/g, '');
            onChange({ key: value, value: context.value });
          }}
          onBlur={(e) => validator.onBlur(e.target.value)}
          variation={validator.variation}
        />
        <Input
          value={context.value}
          size={size}
          placeholder="Enter context value"
          onChange={(e) => {
            const value = e.target.value;
            onChange({ key: context.key, value });
          }}
          onBlur={(e) => validator.onBlur(e.target.value)}
          variation={validator.variation}
        />
        <Icon name="delete_outline" size={responsive(['tiny', 'small', 'small'])} onClick={onDelete} />
      </Flex>
      <FormControl label="" inputId="" {...validator.formControl}></FormControl>
    </Flex>
  );
};

export default ContextItem;
