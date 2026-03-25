import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { Plus } from 'lucide-react'

import { Button } from './ui/button'
import { Card, CardHeader, CardTitle } from './ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'

type Task = {
  id: number
  title: string
}

type TaskColumnProps = {
  title: string
  initialTasks: Task[]
  cardClassName: string
  titleClassName: string
}

export default function TaskColumn({
  title,
  initialTasks,
  cardClassName,
  titleClassName,
}: TaskColumnProps) {
  const [tasks, setTasks] = useState(initialTasks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const inputId = useId()

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open)

    if (!open) {
      setNewTaskTitle('')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTitle = newTaskTitle.trim()

    if (!trimmedTitle) {
      return
    }

    setTasks((currentTasks) => {
      const nextId = currentTasks.reduce(
        (highestId, task) => Math.max(highestId, task.id),
        0
      ) + 1

      return [...currentTasks, { id: nextId, title: trimmedTitle }]
    })
    setNewTaskTitle('')
    setIsDialogOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          onClick={() => setIsDialogOpen(true)}
          aria-label={`Add item to ${title}`}
        >
          <Plus />
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <Card key={task.id} className={cardClassName}>
            <CardHeader className="p-4">
              <CardTitle className={titleClassName}>{task.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add item</DialogTitle>
            <DialogDescription>
              Enter the item name for the {title.toLowerCase()} column.
            </DialogDescription>
          </DialogHeader>

          <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 text-left">
              <label htmlFor={inputId} className="text-sm font-medium text-slate-900">
                Item name
              </label>
              <Input
                id={inputId}
                value={newTaskTitle}
                onChange={(event) => setNewTaskTitle(event.target.value)}
                placeholder="Type a new item"
                autoFocus
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Add item</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}