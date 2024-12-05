import '@testing-library/jest-dom'
jest.mock('nanoid', () => ({
    nanoid: () => 'mocked-id', // Provide a mock implementation for `nanoid`
  }));