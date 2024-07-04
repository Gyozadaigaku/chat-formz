'use client'

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '../form-elements'
import { Label } from '../ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import useDesigner from '../hooks/use-designer'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { MessageCircle } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Input } from '../ui/input'

const type: ElementsType = 'BalloonField'

const extraAttributes = {
  text: 'Hello! How can I help you?',
  position: 'left' as 'left' | 'right',
  imageUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Jack&flip',
}

const propertiesSchema = z.object({
  text: z.string().min(2).max(500),
  position: z.enum(['left', 'right']),
  imageUrl: z.string().url().or(z.literal('')),
})

export const BalloonFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MessageCircle,
    label: 'Balloon field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) {
  const element = elementInstance as CustomInstance
  const { text, position, imageUrl } = element.extraAttributes
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground">Balloon field</Label>
      <p className="truncate">{text}</p>
    </div>
  )
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) {
  const element = elementInstance as CustomInstance

  const { text, position, imageUrl } = element.extraAttributes
  return (
    <div className="flex items-center">
      {position === 'left' && (
        <Avatar className="bg-muted">
          <AvatarImage src={imageUrl} alt="avatar" className="size-10" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'ml-3 flex w-full flex-col gap-1',
          position === 'left' ? 'items-start' : 'items-end'
        )}
      >
        <p className="max-w-[70%] rounded-3xl border border-input bg-background px-4 py-2 text-sm">
          {text}
        </p>
      </div>
    </div>
  )
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) {
  const element = elementInstance as CustomInstance
  const { updateElement } = useDesigner()
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      text: element.extraAttributes.text,
      position: element.extraAttributes.position,
      imageUrl: element.extraAttributes.imageUrl,
    },
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  function applyChanges(values: propertiesFormSchemaType) {
    const { text, position, imageUrl } = values
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        text,
        position,
        imageUrl,
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <RadioGroup
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={extraAttributes.position}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="left" id="left" />
                    <Label htmlFor="left">left</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="right" id="right" />
                    <Label htmlFor="right">right</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch('position') === 'left' && (
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') e.currentTarget.blur()
                    }}
                    defaultValue={extraAttributes.imageUrl}
                  />
                </FormControl>
                <FormDescription>
                  The URL of the image to be displayed in the avatar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  )
}
