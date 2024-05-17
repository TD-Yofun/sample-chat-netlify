import { ENDPOINT, REGION } from '@/constant';
import { Configuration } from '@/store/configuration-slice';

import { configurationStorage } from './storage';

function isValid(config: Configuration | null) {
  return (
    config &&
    Object.keys(ENDPOINT).includes(config.environment) &&
    Object.keys(REGION).includes(config.region) &&
    config.touchpoint_id
  );
}

function getURLParams(): Configuration | null {
  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get('region');
  const environment = urlParams.get('environment');
  const touchpoint_id = urlParams.get('touchpoint_id');
  let context = urlParams.get('context') || undefined;
  if (context) {
    try {
      context = JSON.parse(context);
    } catch (e) {
      context = undefined;
    }
  }

  if (!region || !environment || !touchpoint_id) return null;
  return { region, environment, touchpoint_id, context } as Configuration;
}

export function getConfiguration(isConfigured?: boolean) {
  let configurationStack = [getURLParams, configurationStorage.get];
  if (isConfigured) {
    configurationStack = configurationStack.reverse();
  }
  let configuration: Configuration | null = null;
  for (const stack of configurationStack) {
    configuration = stack();
    if (isValid(configuration)) {
      return configuration;
    }
  }

  return configuration;
}

export * from './storage';
