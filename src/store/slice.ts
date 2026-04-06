import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type Task = {
    id: number
    title: string
}

type TaskState = {
    notToDoTasks: Task[]
    temptedTasks: Task[]
    didItAnywayTasks: Task[]
}

const initialState: TaskState = {
    notToDoTasks: localStorage.getItem('Not To Do')
        ? JSON.parse(localStorage.getItem('Not To Do')!)
        : [],
    temptedTasks: localStorage.getItem('Tempted')
        ? JSON.parse(localStorage.getItem('Tempted')!)
        : [],
    didItAnywayTasks: localStorage.getItem('Did It Anyway')
        ? JSON.parse(localStorage.getItem('Did It Anyway')!)
        : [],
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        // ADD
        addTaskToNotToDo: (state, action: PayloadAction<Task>) => {
            state.notToDoTasks.push(action.payload)
        },
        addTaskToTempted: (state, action: PayloadAction<Task>) => {
            state.temptedTasks.push(action.payload)
        },
        addTaskToDidItAnyway: (state, action: PayloadAction<Task>) => {
            state.didItAnywayTasks.push(action.payload)
        },

        // DELETE
        deleteTaskFromNotToDo: (state, action: PayloadAction<number>) => {
            state.notToDoTasks = state.notToDoTasks.filter(task => task.id !== action.payload)
        },
        deleteTaskFromTempted: (state, action: PayloadAction<number>) => {
            state.temptedTasks = state.temptedTasks.filter(task => task.id !== action.payload)
        },
        deleteTaskFromDidItAnyway: (state, action: PayloadAction<number>) => {
            state.didItAnywayTasks = state.didItAnywayTasks.filter(task => task.id !== action.payload)
        },

        // EDIT
        editTaskInNotToDo: (state, action: PayloadAction<Task>) => {
            const index = state.notToDoTasks.findIndex(task => task.id === action.payload.id)
            if (index !== -1) {
                state.notToDoTasks[index] = action.payload
            }
        },
        editTaskInTempted: (state, action: PayloadAction<Task>) => {
            const index = state.temptedTasks.findIndex(task => task.id === action.payload.id)
            if (index !== -1) {
                state.temptedTasks[index] = action.payload
            }
        },
        editTaskInDidItAnyway: (state, action: PayloadAction<Task>) => {
            const index = state.didItAnywayTasks.findIndex(task => task.id === action.payload.id)
            if (index !== -1) {
                state.didItAnywayTasks[index] = action.payload
            }
        },

        // REORDER
        reorderNotToDo: (state, action: PayloadAction<Task[]>) => {
            state.notToDoTasks = action.payload
        },
        reorderTempted: (state, action: PayloadAction<Task[]>) => {
            state.temptedTasks = action.payload
        },
        reorderDidItAnyway: (state, action: PayloadAction<Task[]>) => {
            state.didItAnywayTasks = action.payload
        },
    }
})

export const { 
    addTaskToNotToDo, 
    addTaskToTempted, 
    addTaskToDidItAnyway, 
    deleteTaskFromNotToDo, 
    deleteTaskFromTempted, 
    deleteTaskFromDidItAnyway,
    editTaskInNotToDo,
    editTaskInTempted,
    editTaskInDidItAnyway,
    reorderNotToDo,
    reorderTempted,
    reorderDidItAnyway
} = taskSlice.actions
export default taskSlice.reducer