import formReducer, { createForm, updateForm } from '@/store/slices/formSlice'

describe('Form Slice', () => {
  const initialState = {
    currentForm: null,
    loading: false,
    error: null
  }

  it('should handle initial state', () => {
    expect(formReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle createForm.pending', () => {
    const action = { type: createForm.pending.type }
    const state = formReducer(initialState, action)
    expect(state.loading).toBe(true)
  })

  it('should handle createForm.fulfilled', () => {
    const mockForm = { id: '1', name: 'Test Form' }
    const action = { type: createForm.fulfilled.type, payload: mockForm }
    const state = formReducer(initialState, action)
    expect(state.currentForm).toEqual(mockForm)
    expect(state.loading).toBe(false)
  })
})