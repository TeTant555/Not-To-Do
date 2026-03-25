import TaskColumn from './taskColumn'

const sampleTasks = [
  { id: 1, title: 'Drank Soda' },
  { id: 2, title: 'Skipped Gym' },
]

export default function DidItAnyway() {
  return (
    <TaskColumn
      title="Did It Anyway"
      initialTasks={sampleTasks}
      cardClassName="bg-green-50 border-green-200 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-green-100"
      titleClassName="text-sm font-semibold leading-none text-green-500 line-through"
    />
  )
}
