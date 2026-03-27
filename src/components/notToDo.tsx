import TaskColumn from './taskColumn'

const sampleTasks = [
  { id: 1, title: 'Check Social Media' },
  { id: 2, title: 'Eat Junk Food' },
  { id: 3, title: 'Hit Snooze' },
]

export default function NotToDo() {
  return (
    <TaskColumn
      title="NOT TO DO"
      initialTasks={sampleTasks}
      cardClassName="bg-zinc-900 border-zinc-800 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:border-red-500/30 rounded-xl group relative overflow-hidden"
      titleClassName="text-sm font-bold tracking-wider text-zinc-300 group-hover:text-red-400 transition-colors uppercase"
    />
  )
}
