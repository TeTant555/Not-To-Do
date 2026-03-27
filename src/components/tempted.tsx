import TaskColumn from './taskColumn'

const sampleTasks = [
  { id: 1, title: 'Watch one more episode' },
  { id: 2, title: 'Buy useless gadget' },
]

export default function Tempted() {
  return (
    <TaskColumn
      title="TEMPTED"
      initialTasks={sampleTasks}
      cardClassName="bg-zinc-900 border-zinc-800 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-amber-500/30 rounded-xl group relative overflow-hidden"
      titleClassName="text-sm font-bold tracking-wider text-zinc-300 group-hover:text-amber-400 transition-colors uppercase"
    />
  )
}
