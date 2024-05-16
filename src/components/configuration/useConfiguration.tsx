import { useCallback, useEffect, useRef } from 'react';

import { useSelector } from '@/store';
import { getConfiguration as get } from '@/utils';

export function useConfiguration() {
  const { isConfigured } = useSelector((state) => state.configuration);
  const isConfiguredRef = useRef(isConfigured);

  const getConfiguration = useCallback(() => get(isConfiguredRef.current), []);

  useEffect(() => {
    isConfiguredRef.current = isConfigured;
  }, [isConfigured]);

  return { getConfiguration };
}
