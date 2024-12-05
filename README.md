# React Dynamic Form Builder

A powerful, flexible form builder that allows users to create, customize, and manage dynamic forms through a drag-and-drop interface.

## Features

- Drag-and-drop form building interface
- Multiple input types:
  - Text input
  - Textarea
  - Radio buttons
  - Checkboxes
  - Select dropdowns
  - Searchable dropdowns
  - Email input
  - Password input
  - Number input
  - Date picker
  - Time picker
  - File upload
  - Camera input
  - Currency input
  - Phone input
  - Rating
  - Slider
- Form validation
- Form preview mode
- Version control
- Form activation/deactivation
- Responsive design
- Custom styling support
- Form submission handling
- Real-time preview

## Installation

```bash
# Using npm
npm install @your-scope/react-form-builder

# Using yarn
yarn add @your-scope/react-form-builder
```

## Usage

```typescript
import { FormBuilder } from '@your-scope/react-form-builder';

function App() {
  const handleSubmit = (data: any) => {
    console.log('Form data:', data);
  };

  return (
    <FormBuilder
      initialConfig={{
        id: 'my-form',
        name: 'My Form',
        elements: [],
        settings: {
          labelPosition: 'top',
          validationMode: 'onChange'
        }
      }}
      onSubmit={handleSubmit}
    />
  );
}
```

## Components

### FormBuilder

The main component for building forms.

```typescript
interface FormBuilderProps {
  initialConfig?: FormConfig;
  onSave?: (form: FormConfig) => void;
  onPreview?: (data: any) => void;
  onChange?: (config: FormConfig) => void;
}
```

### FormPreview

Component for displaying the form to end users.

```typescript
interface FormPreviewProps {
  config: FormConfig;
  onSubmit?: (data: any) => void;
}
```

### FormLoader

Component for loading saved forms from API.

```typescript
interface FormLoaderProps {
  formId: string;
  onSubmit?: (data: any) => void;
}
```

## Form Elements

### Text Input
```typescript
{
  type: 'textbox',
  settings: {
    name: 'full_name',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    validation: {
      required: true,
      minLength: 2
    }
  }
}
```

### Email Input
```typescript
{
  type: 'email',
  settings: {
    name: 'email',
    label: 'Email Address',
    validation: {
      required: true,
      pattern: /\S+@\S+\.\S+/
    }
  }
}
```

[More element examples in documentation]

## Styling

The form builder uses Tailwind CSS for styling and can be customized through:
- Custom CSS classes
- Style props
- Theme configuration

## API Integration

Example of saving form to backend:

```typescript
<FormBuilder
  onSave={async (form) => {
    const response = await fetch('/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    console.log('Form saved:', data);
  }}
/>
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Architecture

```
src/
├── components/
│   └── form-builder/
│       ├── elements/     # Form elements
│       ├── preview/      # Form preview
│       ├── settings/     # Element settings
│       └── index.ts      # Main component
├── types/               # TypeScript types
├── utils/              # Utility functions
└── index.ts            # Package entry
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License. See [LICENSE](LICENSE) for more information.

## Acknowledgments

- Built with React
- Uses shadcn/ui components
- Tailwind CSS for styling
- React Hook Form for form handling