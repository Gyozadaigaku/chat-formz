import React from 'react'
import { Button } from './ui/button'
import { View } from 'lucide-react'
import useDesigner from './hooks/use-designer'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { FormElements } from './form-elements'

export default function PreviewDialogBtn() {
  const { elements } = useDesigner()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="gap-2">
          <View className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-screen max-h-screen w-screen max-w-full flex-grow flex-col gap-0 p-0">
        <div className="border-b px-4 py-2">
          <p className="text-lg font-bold text-muted-foreground">
            Form preview
          </p>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to your users.
          </p>
        </div>
        <div className="flex flex-grow flex-col items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] p-4 dark:bg-[url(/paper-dark.svg)]">
          <div className="flex h-full w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded-2xl bg-background p-8">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent
              return (
                <FormComponent key={element.id} elementInstance={element} />
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
