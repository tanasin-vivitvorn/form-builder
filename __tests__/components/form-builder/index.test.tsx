import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormBuilder } from '@/components/form-builder';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a mock slice
const mockFormSlice = createSlice({
  name: 'form',
  initialState: {
    currentForm: null,
    loading: false,
    error: null
  },
  reducers: {
    createForm: (state, action) => {},
    updateForm: (state, action) => {}
  }
});

// Create store with mock reducer
const store = configureStore({
  reducer: {
    form: mockFormSlice.reducer
  }
});

// Mock the nanoid function
jest.mock('nanoid', () => ({
  nanoid: () => 'test-id-123'
}));

// Mock components
jest.mock('@/components/form-builder/palette', () => ({
  FormPalette: () => <div data-testid="form-palette">Palette</div>
}));

jest.mock('@/components/form-builder/preview', () => ({
  FormPreview: () => <div data-testid="form-preview">Preview</div>
}));

jest.mock('@/components/form-builder/settings', () => ({
  SettingsPanel: () => <div data-testid="settings-panel">Settings</div>
}));

describe('FormBuilder Component', () => {
  const mockOnChange = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnPreview = jest.fn();

  const defaultProps = {
    initialConfig: {
      id: 'test-form',
      name: 'Test Form',
      elements: [],
      settings: {
        labelPosition: 'top',
        validationMode: 'onChange'
      }
    },
    onChange: mockOnChange,
    onSave: mockOnSave,
    onPreview: mockOnPreview
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form builder with initial state', () => {
    render(
      <Provider store={store}>
        <FormBuilder {...defaultProps} />
      </Provider>
    );

    expect(screen.getByText('Editor')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
    expect(screen.getByText('Save Form')).toBeInTheDocument();
  });

  test('handles drag and drop operations', async () => {
    render(
      <Provider store={store}>
        <FormBuilder {...defaultProps} />
      </Provider>
    );

    const dropZone = screen.getByText('Drag and drop elements here to build your form');
    
    // Mock drag event data
    const mockData = {
      type: 'text',
      label: 'Text Input'
    };

    // Trigger drop event with mocked dataTransfer
    fireEvent.drop(dropZone, {
      dataTransfer: {
        getData: () => JSON.stringify(mockData)
      }
    });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  test('switches between editor and preview modes', () => {
    render(
      <Provider store={store}>
        <FormBuilder {...defaultProps} />
      </Provider>
    );

    const previewButton = screen.getByText('Preview');
    fireEvent.click(previewButton);

    expect(screen.getByTestId('form-preview')).toBeInTheDocument();

    const editorButton = screen.getByText('Editor');
    fireEvent.click(editorButton);

    expect(screen.queryByTestId('form-preview')).not.toBeInTheDocument();
  });

  test('handles undo/redo operations', async () => {
    render(
      <Provider store={store}>
        <FormBuilder {...defaultProps} />
      </Provider>
    );

    const undoButton = screen.getByText('Undo');
    const redoButton = screen.getByText('Redo');

    expect(undoButton).toBeDisabled();
    expect(redoButton).toBeDisabled();

    // Simulate adding an element
    const dropZone = screen.getByText('Drag and drop elements here to build your form');
    
    // Mock drag event data
    const mockData = {
      type: 'text',
      label: 'Text Input'
    };

    // Trigger drop event with mocked dataTransfer
    fireEvent.drop(dropZone, {
      dataTransfer: {
        getData: () => JSON.stringify(mockData)
      }
    });

    await waitFor(() => {
      expect(undoButton).not.toBeDisabled();
    });
  });

  test('saves form when clicking save button', async () => {
    render(
      <Provider store={store}>
        <FormBuilder {...defaultProps} />
      </Provider>
    );

    const saveButton = screen.getByText('Save Form');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});