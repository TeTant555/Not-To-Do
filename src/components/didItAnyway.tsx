import TaskColumn from './taskColumn'

const sampleTasks = [
  { id: 1, title: 'Drank Soda' },
  { id: 2, title: 'Skipped Gym' },
]

export default function DidItAnyway() {
  return (
    <TaskColumn
      title="DID IT ANYWAY"
      initialTasks={sampleTasks}
      cardClassName="bg-zinc-900 border-zinc-800 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-emerald-500/30 rounded-xl group relative overflow-hidden opacity-70 hover:opacity-100 grayscale hover:grayscale-0"
      titleClassName="text-sm font-bold tracking-wider text-zinc-500 line-through decoration-emerald-500/50 decoration-2 transition-colors uppercase group-hover:text-emerald-400 group-hover:decoration-emerald-500"
    />
  )
}
