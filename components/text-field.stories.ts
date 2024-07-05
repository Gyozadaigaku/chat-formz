import { Meta, StoryObj } from '@storybook/react'
import { DesignerComponent } from './fields/text-field'

const meta: Meta<typeof DesignerComponent> = {
  title: 'Form Elements/DesignerComponent',
  component: DesignerComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DesignerComponent>

export const Default: Story = {
  args: {
    elementInstance: {
      id: '1',
      type: 'TextField',
      extraAttributes: {
        label: 'Default Text Field',
        helperText: 'This is a helper text',
        required: false,
        placeHolder: 'Enter text here',
      },
    },
  },
}

export const Required: Story = {
  args: {
    elementInstance: {
      id: '2',
      type: 'TextField',
      extraAttributes: {
        label: 'Required Text Field',
        helperText: 'This field is required',
        required: true,
        placeHolder: 'Required field',
      },
    },
  },
}

export const LongLabel: Story = {
  args: {
    elementInstance: {
      id: '3',
      type: 'TextField',
      extraAttributes: {
        label: 'This is a very long label for the text field to test wrapping',
        helperText: 'Helper text for long label',
        required: false,
        placeHolder: 'Long label field',
      },
    },
  },
}

export const NoHelperText: Story = {
  args: {
    elementInstance: {
      id: '4',
      type: 'TextField',
      extraAttributes: {
        label: 'No Helper Text',
        helperText: '',
        required: false,
        placeHolder: 'No helper text here',
      },
    },
  },
}
