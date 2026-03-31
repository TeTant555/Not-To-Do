import { addTask } from '@/store/slice'
import TaskColumn from './taskColumn'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/store'

export default function NotToDo() {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  return (
    <TaskColumn
      title="NOT TO DO"
      initialTasks={tasks}
      tasks={tasks}
      cardClassName="bg-zinc-900 border-zinc-800 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:border-red-500/30 rounded-xl group relative overflow-hidden"
      titleClassName="text-sm font-bold tracking-wider text-zinc-300 group-hover:text-red-400 transition-colors uppercase"
      onAddTask={(title) => {
        dispatch(addTask({ id: Date.now(), title }))
      }}
    />
  )
}

