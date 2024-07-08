import { config } from '@eliduty/eslint-config';

export default config([
  {
    rules: {
      'no-restricted-syntax': 'off'
    }
  },
  {
    rules: {
      // '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/ban-ts-comment': 'off',
      // '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
]);
