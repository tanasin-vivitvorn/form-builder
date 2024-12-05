// config/api.config.ts
export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://your-api-url',
    ENDPOINTS: {
      FORMS: {
        CREATE: '/api/forms',
        UPDATE: (formId: string) => `/api/forms/${formId}`,
        GET_VERSION: (formId: string, version: number) => `/api/forms/${formId}/versions/${version}`,
        GET_VERSIONS: (formId: string) => `/api/forms/${formId}/versions`
      }
    }
  };
  