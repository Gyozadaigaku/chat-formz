import React from 'react'
import useDesigner from './hooks/use-designer'
import { FormElements } from './form-elements'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export default function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner()
  if (!selectedElement) return null

  const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => {
            setSelectedElement(null)
          }}
        >
          <X />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  )
}
