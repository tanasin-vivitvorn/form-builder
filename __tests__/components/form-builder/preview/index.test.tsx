import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { FormPreview } from '@/components/form-builder/preview'

describe('FormPreview', () => {
  const mockConfig = {
    id: 'test',
    name: 'Test Form',
    elements: [
      {
        id: '1',
        type: 'textbox',
        settings: {
          name: 'test_field',
          label: 'Test Field',
          labelPosition: 'top',
          placeholder: 'Enter test',
          cols: 12,
          validation: {
            required: true
          }
        }
      }
    ],
    settings: {
      labelPosition: 'top',
      validationMode: 'onChange'
    }
  }

  const mockSubmit = jest.fn()

  it('handles form submission', async () => {
    render(<FormPreview config={mockConfig} onSubmit={mockSubmit} />)
    
    const input = screen.getByPlaceholderText('Enter test')
    fireEvent.change(input, { target: { value: 'test value' } })
    
    
    const submitButton = screen.getByRole('button', { name: /Submit/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          test_field: 'test value'
        })
      );
    });
  })

  // it('shows validation errors for empty required fields', async () => {
  //   render(<FormPreview config={mockConfig} onSubmit={mockSubmit} />)
    
  //   const submitButton = screen.getByRole('button', { name: /Submit/i })
  //   fireEvent.click(submitButton)
    
  //   // Wait for validation message
  //   await waitFor(() => {
  //     expect(screen.getByText(/field is required/i)).toBeInTheDocument()
  //   })
  //   expect(mockSubmit).not.toHaveBeenCalled()
  // })
})