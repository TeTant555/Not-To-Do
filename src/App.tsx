import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import DidItAnyway from './components/didItAnyway';
import NotToDo from './components/notToDo';
import Tempted from './components/tempted';
import {
  closestCorners, // ✅ swapped from closestCenter
  DndContext,
  DragOverlay,   // ✅ new import
  type DragEndEvent,
  type DragStartEvent, // ✅ new import
} from "@dnd-kit/core";
import type { AppDispatch, RootState } from './store/store';
import { arrayMove } from '@dnd-kit/sortable';
import {
  addTaskToDidItAnyway, addTaskToNotToDo, addTaskToTempted,
  deleteTaskFromDidItAnyway, deleteTaskFromNotToDo, deleteTaskFromTempted,
  reorderDidItAnyway, reorderNotToDo, reorderTempted,
} from './store/slice';
import { DraggableTask } from './components/taskColumn'; // ✅ import the exported component

type Task = { id: number; title: string };
type Column = "NOT TO DO" | "TEMPTED" | "DID IT ANYWAY";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const notToDoTasks = useSelector((state: RootState) => state.tasks.notToDoTasks);
  const temptedTasks = useSelector((state: RootState) => state.tasks.temptedTasks);
  const didItAnywayTasks = useSelector((state: RootState) => state.tasks.didItAnywayTasks);

  // ✅ Track which task is actively being dragged
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const isColumnId = (id: unknown): id is Column =>
    id === "NOT TO DO" || id === "TEMPTED" || id === "DID IT ANYWAY";

  const findColumn = (id: number | string): Column | null => {
    const numericId = Number(id);
    if (notToDoTasks.some(t => t.id === numericId)) return "NOT TO DO";
    if (temptedTasks.some(t => t.id === numericId)) return "TEMPTED";
    if (didItAnywayTasks.some(t => t.id === numericId)) return "DID IT ANYWAY";
    return null;
  };

  const getList = (column: Column): Task[] => {
    switch (column) {
      case "NOT TO DO": return notToDoTasks;
      case "TEMPTED": return temptedTasks;
      case "DID IT ANYWAY": return didItAnywayTasks;
    }
  };

  // ✅ When drag starts, find and store the task being dragged
  const handleDragStart = (event: DragStartEvent) => {
    const id = Number(event.active.id);
    const allTasks = [...notToDoTasks, ...temptedTasks, ...didItAnywayTasks];
    const found = allTasks.find(t => t.id === id) ?? null;
    setActiveTask(found);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null); // ✅ Always clear on drop
    const { active, over } = event;
    if (!over) return;

    const activeId = Number(active.id);
    const overId = over.id;
    const sourceColumn = findColumn(activeId);
    const targetColumn = isColumnId(overId) ? overId : findColumn(overId);

    if (!sourceColumn || !targetColumn) return;

    if (sourceColumn === targetColumn) {
      const list = getList(sourceColumn);
      const oldIndex = list.findIndex(t => t.id === activeId);
      let newIndex = list.findIndex(t => t.id === Number(overId));
      if (newIndex === -1) newIndex = list.length - 1;
      const newTasks = arrayMove(list, oldIndex, newIndex);

      if (sourceColumn === "NOT TO DO") dispatch(reorderNotToDo(newTasks));
      else if (sourceColumn === "TEMPTED") dispatch(reorderTempted(newTasks));
      else dispatch(reorderDidItAnyway(newTasks));
    } else {
      const movingTask = getList(sourceColumn).find(t => t.id === activeId);
      if (!movingTask) return;

      if (sourceColumn === "NOT TO DO") dispatch(deleteTaskFromNotToDo(activeId));
      else if (sourceColumn === "TEMPTED") dispatch(deleteTaskFromTempted(activeId));
      else dispatch(deleteTaskFromDidItAnyway(activeId));

      if (targetColumn === "NOT TO DO") dispatch(addTaskToNotToDo(movingTask));
      else if (targetColumn === "TEMPTED") dispatch(addTaskToTempted(movingTask));
      else dispatch(addTaskToDidItAnyway(movingTask));
    }
  };

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black px-6 py-12 font-sans overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <header className="mb-12 text-center">
          <h1 className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-5xl uppercase italic drop-shadow-[0_0_15px_rgba(192,132,252,0.3)]">
            Not To Do List
          </h1>
        </header>

        <DndContext
          collisionDetection={closestCorners} // ✅ more precise than closestCenter
          onDragStart={handleDragStart}        // ✅ capture what's being dragged
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3 md:gap-6">
            <NotToDo />
            <Tempted />
            <DidItAnyway />
          </div>

          {/* ✅ DragOverlay renders a floating copy of the card above everything else.
              No layout shifts because the real card just shows as a ghost. */}
          <DragOverlay>
            {activeTask ? (
              <DraggableTask
                task={activeTask}
                cardClassName="bg-zinc-800 border-zinc-600 shadow-2xl shadow-fuchsia-500/20 border-fuchsia-500/40 rounded-xl"
                titleClassName="text-sm font-bold tracking-wider text-zinc-100 uppercase"
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default App;