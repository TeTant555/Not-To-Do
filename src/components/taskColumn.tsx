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
  tasks?: Task[]
  cardClassName: string
  titleClassName: string
  onAddTask?: (title: string) => void
}

export default function TaskColumn({
  title,
  initialTasks,
  tasks,
  cardClassName,
  titleClassName,
  onAddTask,
}: TaskColumnProps) {
  const [localTasks, setLocalTasks] = useState(initialTasks)
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

    if (onAddTask) {
      onAddTask(trimmedTitle)
    } else {
      setLocalTasks((currentTasks) => {
        const nextId = currentTasks.reduce(
          (highestId, task) => Math.max(highestId, task.id),
          0,
        ) + 1

        return [...currentTasks, { id: nextId, title: trimmedTitle }]
      })
    }

    setNewTaskTitle('')
    setIsDialogOpen(false)
  }

  const displayedTasks = tasks ?? localTasks

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-zinc-950/50 backdrop-blur-xl p-5 shadow-2xl border border-zinc-800/50 relative overflow-hidden">
      {/* Subtle top glare */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-600/50 to-transparent" />
      
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <h2 className="text-xl font-black text-zinc-100 uppercase tracking-widest">{title}</h2>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="h-8 w-8 rounded-full border-zinc-700 bg-zinc-900 text-zinc-400 shadow-md transition-all hover:scale-110 hover:bg-zinc-800 hover:text-fuchsia-400 hover:border-fuchsia-500/50 hover:shadow-[0_0_15px_rgba(192,132,252,0.3)]"
          onClick={() => setIsDialogOpen(true)}
          aria-label={`Add item to ${title}`}
        >
          <Plus />
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {displayedTasks.map((task) => (
          <Card key={task.id} className={cardClassName}>
            <CardHeader className="p-4">
              <CardTitle className={titleClassName}>{task.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-0 shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:max-w-md">
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 px-6 py-5 border-b border-zinc-800/80 relative">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-fuchsia-500/20 via-cyan-400/50 to-fuchsia-500/20" />
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-zinc-100 uppercase tracking-wide">Add new item</DialogTitle>
              <DialogDescription className="text-zinc-400">
                What are you trying to avoid in the <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 uppercase tracking-wider">{title}</span> column?
              </DialogDescription>
            </DialogHeader>
          </div>

          <form className="flex flex-col gap-5 px-6 py-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 text-left">
              <label htmlFor={inputId} className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Item name
              </label>
              <Input
                id={inputId}
                value={newTaskTitle}
                onChange={(event) => setNewTaskTitle(event.target.value)}
                placeholder="e.g., Target locked..."
                className="rounded-xl border-zinc-800 bg-zinc-900 px-4 py-6 text-base text-zinc-200 transition-all focus-visible:bg-zinc-800/50 focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500 placeholder:text-zinc-600"
                autoFocus
              />
            </div>

            <DialogFooter className="mt-2 text-right">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="rounded-xl border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="rounded-xl bg-zinc-100 text-zinc-950 font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-all uppercase tracking-wide text-xs">
                Add item
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}