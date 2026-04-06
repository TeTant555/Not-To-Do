import { addTaskToTempted, deleteTaskFromTempted, editTaskInTempted } from '@/store/slice'
import TaskColumn from './taskColumn'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/store'
import { useEffect } from 'react'

export default function Tempted() {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.temptedTasks)

  useEffect(() => {
    const timeout = setTimeout(() => {
    localStorage.setItem('Tempted', JSON.stringify(tasks));
    }, 0);

    return () => clearTimeout(timeout);
  }, [tasks]);

  return (
    <TaskColumn
      title="TEMPTED"
      initialTasks={tasks}
      tasks={tasks}
      cardClassName="bg-zinc-900 border-zinc-800 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(250,204,21,0.15)] hover:border-yellow-500/30 rounded-xl group relative overflow-hidden"
      titleClassName="text-sm font-bold tracking-wider text-zinc-300 group-hover:text-yellow-400 transition-colors uppercase"
      onAddTask={(title) => {
        dispatch(addTaskToTempted({ id: Date.now(), title }));
      }}
      onDeleteTask={(id) => {
        dispatch(deleteTaskFromTempted(id))
      }}
      onEditTask={(id, title) => {
        dispatch(editTaskInTempted({ id, title }))
      }}
    />
  )
}
