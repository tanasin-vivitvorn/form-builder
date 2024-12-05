import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SettingsPanel } from '@/components/form-builder/settings'

describe('SettingsPanel', () => {
  const mockElement = {
    id: '1',
    type: 'textbox',
    settings: {
      name: 'test',
      label: 'Test Label',
      labelPosition: 'top',
      placeholder: 'Test placeholder',
      cols: 6,
      validation: {
        required: false
      }
    }
  }

  const mockUpdate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  });

  it('renders element settings', () => {
    render(<SettingsPanel element={mockElement} onUpdate={mockUpdate} />)
    
    // Use more specific queries
    expect(screen.getByRole('textbox', { name: /Field Name/i })).toHaveValue('test')
    expect(screen.getByRole('textbox', { name: /^Label$/i })).toHaveValue('Test Label')
  })
})