import TaskColumn from './taskColumn'

const sampleTasks = [
  { id: 1, title: 'Check Social Media' },
  { id: 2, title: 'Eat Junk Food' },
  { id: 3, title: 'Hit Snooze' },
]

export default function NotToDo() {
  return (
    <TaskColumn
      title="Not To Do"
      initialTasks={sampleTasks}
      cardClassName="bg-red-50 border-red-200 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-red-100"
      titleClassName="text-sm font-semibold leading-none text-red-950"
    />
  )
}
