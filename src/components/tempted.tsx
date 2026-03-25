import TaskColumn from './taskColumn'

const sampleTasks = [
  { id: 1, title: 'Watch one more episode' },
  { id: 2, title: 'Buy useless gadget' },
]

export default function Tempted() {
  return (
    <TaskColumn
      title="Tempted"
      initialTasks={sampleTasks}
      cardClassName="bg-amber-50 border-amber-200 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-amber-100"
      titleClassName="text-sm font-semibold leading-none text-amber-950"
    />
  )
}
