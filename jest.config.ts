// jest.config.ts
import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

export default {
  ...createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '^@orders/(.*)$': '<rootDir>/src/app/features/orders/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@auth/(.*)$': '<rootDir>/src/app/features/auth/$1',
    '^@dashboard/(.*)$': '<rootDir>/src/app/features/dashboard/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
  },
} satisfies Config;
