import { Configuration } from '@/store/configuration-slice';

const KEY_OF_CONFIGURATION = '__industries_kirin__v1__';

export const configurationStorage = {
  get: (): Configuration | null => {
    const data = localStorage.getItem(KEY_OF_CONFIGURATION) || '';
    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  },
  save: (data: Configuration) => {
    localStorage.setItem(KEY_OF_CONFIGURATION, JSON.stringify(data));
  },
};
