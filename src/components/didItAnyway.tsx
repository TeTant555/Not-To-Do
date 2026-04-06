import { addTaskToDidItAnyway, deleteTaskFromDidItAnyway, editTaskInDidItAnyway } from '@/store/slice'
import TaskColumn from './taskColumn'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/store'
import { useEffect } from 'react'

export default function Tempted() {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.didItAnywayTasks)

  useEffect(() => {
    localStorage.setItem('Did It Anyway', JSON.stringify(tasks))
  }, [tasks]);

  return (
    <TaskColumn
      title="DID IT ANYWAY"
      initialTasks={tasks}
      tasks={tasks}
      cardClassName="bg-zinc-900 border-zinc-800 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(239,68,68,0.35)] hover:border-red-500/30 rounded-xl group relative overflow-hidden"
      titleClassName="text-sm font-bold tracking-wider group-hover:line-through group-hover:text-zinc-500 text-zinc-300 transition-all uppercase"
      onAddTask={(title) => {
        const nextId = tasks.length > 0 
          ? Math.max(...tasks.map((task) => task.id)) + 1
          : 1;
        dispatch(addTaskToDidItAnyway({ id: nextId, title }));
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
