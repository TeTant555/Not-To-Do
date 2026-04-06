import { addTaskToDidItAnyway, deleteTaskFromDidItAnyway, editTaskInDidItAnyway } from '@/store/slice'
import TaskColumn from './taskColumn'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/store'
import { useEffect } from 'react'

export default function Tempted() {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.didItAnywayTasks)

  useEffect(() => {
    const timeout = setTimeout(() => {
    localStorage.setItem('Did It Anyway', JSON.stringify(tasks));
    }, 0);

    return () => clearTimeout(timeout);
  }, [tasks]);

  return (
    <TaskColumn
      title="DID IT ANYWAY"
      initialTasks={tasks}
      tasks={tasks}
      cardClassName="bg-zinc-900 border-zinc-800 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(239,68,68,0.35)] hover:border-red-500/30 rounded-xl group relative overflow-hidden"
      titleClassName="text-sm font-bold tracking-wider group-hover:line-through group-hover:text-zinc-500 text-zinc-300 transition-all uppercase"
      onAddTask={(title) => {
        dispatch(addTaskToDidItAnyway({ id: Date.now(), title }));
      }}
      onDeleteTask={(id) => {
        dispatch(deleteTaskFromDidItAnyway(id))
      }}
      onEditTask={(id, title) => {
        dispatch(editTaskInDidItAnyway({ id, title }))
      }}
    />
  )
}
