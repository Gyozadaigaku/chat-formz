'use client'

import { useCallback, useRef, useState, useTransition } from 'react'
import { FormElementInstance, FormElements } from './form-elements'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'
import { LoaderCircle, MousePointerClick } from 'lucide-react'
import { SubmitForm } from '@/actions/form'

export default function FormSubmitComponent({
  formUrl,
  content,
}: {
  content: FormElementInstance[]
  formUrl: string
}) {
  const formValues = useRef<{ [key: string]: string }>({})
  const formErrors = useRef<{ [key: string]: boolean }>({})
  const [renderKey, setRenderKey] = useState(new Date().getTime())

  const [submitted, setSubmitted] = useState(false)
  const [pending, startTransition] = useTransition()

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || ''
      const valid = FormElements[field.type].validate(field, actualValue)

      if (!valid) {
        formErrors.current[field.id] = true
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false
    }

    return true
  }, [content])

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value
  }, [])

  const submitForm = async () => {
    formErrors.current = {}
    const validForm = validateForm()
    if (!validForm) {
      setRenderKey(new Date().getTime())
      toast({
        title: 'Error',
        description: 'please check the form for errors',
        variant: 'destructive',
      })
      return
    }

    try {
      const jsonContent = JSON.stringify(formValues.current)
      await SubmitForm(formUrl, jsonContent)
      setSubmitted(true)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  if (submitted) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="flex w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded border bg-background p-8 shadow-xl">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div
        key={renderKey}
        className="flex w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded border bg-background p-8 shadow-xl"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          )
        })}
        <Button
          className="mt-8"
          onClick={() => {
            startTransition(submitForm)
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              <MousePointerClick className="mr-2" />
              Submit
            </>
          )}
          {pending && <LoaderCircle className="animate-spin" />}
        </Button>
      </div>
    </div>
  )
}
