// __tests__/components/form-builder/palette/index.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { FormPalette } from '@/components/form-builder/palette'

describe('FormPalette', () => {
  const mockDragStart = jest.fn()

  it('renders all form elements', () => {
    render(<FormPalette onDragStart={mockDragStart} />)
    
    expect(screen.getByText(/Text Box/i)).toBeInTheDocument()
    expect(screen.getByText(/Multiline Text/i)).toBeInTheDocument()
    // expect(screen.getByText(/Dropdown/i)).toBeInTheDocument()
    expect(screen.getByText(/Search Dropdown/i)).toBeInTheDocument()
  })

  it('handles drag start event', () => {
    render(<FormPalette onDragStart={mockDragStart} />)
    
    const element = screen.getByText(/Text Box/i)
    fireEvent.dragStart(element)
    
    expect(mockDragStart).toHaveBeenCalled()
  })
})