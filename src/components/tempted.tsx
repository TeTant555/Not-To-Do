import { addTaskToTempted } from '@/store/slice'
import TaskColumn from './taskColumn'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/store'
import { useEffect } from 'react'

export default function Tempted() {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.temptedTasks)

  useEffect(() => {
    localStorage.setItem('Tempted', JSON.stringify(tasks))
  }, [tasks]);

  return (
    <TaskColumn
      title="TEMPTED"
      initialTasks={tasks}
      tasks={tasks}
      cardClassName="bg-zinc-900 border-zinc-800 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:border-red-500/30 rounded-xl group relative overflow-hidden"
      titleClassName="text-sm font-bold tracking-wider text-zinc-300 group-hover:text-red-400 transition-colors uppercase"
      onAddTask={(title) => {
        const nextId = tasks.length > 0 
          ? Math.max(...tasks.map((task) => task.id)) + 1
          : 1;
        dispatch(addTaskToTempted({ id: nextId, title }));
      }}
    />
  )
}
