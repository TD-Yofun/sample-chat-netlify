export type Size = 'small' | 'medium';

export interface ValidatorRef {
  validate: () => Promise<void[]>;
}
