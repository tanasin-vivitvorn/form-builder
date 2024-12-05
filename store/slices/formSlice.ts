import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/config/axios.config';
import { API_CONFIG } from '@/config/api.config';
import { FormConfig } from '@/types/form-builder';

interface FormState {
  currentForm: FormConfig | null;
  loading: boolean;
  error: string | null;
}

const initialState: FormState = {
  currentForm: null,
  loading: false,
  error: null
};

export const createForm = createAsyncThunk(
  'form/create',
  async (formData: Omit<FormConfig, 'id' | 'version'>, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_CONFIG.ENDPOINTS.FORMS.CREATE, formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create form');
    }
  }
);

export const updateForm = createAsyncThunk(
  'form/update',
  async ({ formId, formData }: { formId: string; formData: Partial<FormConfig> }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(API_CONFIG.ENDPOINTS.FORMS.UPDATE(formId), formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update form');
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    clearForm: (state) => {
      state.currentForm = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Form
      .addCase(createForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createForm.fulfilled, (state, action) => {
        state.loading = false;
        state.currentForm = action.payload;
        state.error = null;
      })
      .addCase(createForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Form
      .addCase(updateForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        state.loading = false;
        state.currentForm = action.payload;
        state.error = null;
      })
      .addCase(updateForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearForm, setError } = formSlice.actions;
export default formSlice.reducer;