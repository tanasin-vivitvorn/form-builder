import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
    "^.+\\.m?[jt]s?$": "jest-esm-transformer",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(dependency-name|another-dependency)/)" // Replace with the package name
  ],
  collectCoverage: true,
    collectCoverageFrom: [
      "**/*.{ts,tsx}",
      "!**/node_modules/**",
      "!**/vendor/**"
    ],
  coverageDirectory: "coverage"
}

export default createJestConfig(config)