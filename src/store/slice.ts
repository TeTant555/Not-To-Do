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
        addTaskToNotToDo: (state, action: PayloadAction<Task>) => {
            state.notToDoTasks.push(action.payload)
        },
        addTaskToTempted: (state, action: PayloadAction<Task>) => {
            state.temptedTasks.push(action.payload)
        },
        addTaskToDidItAnyway: (state, action: PayloadAction<Task>) => {
            state.didItAnywayTasks.push(action.payload)
        }
    }
})

export const { addTaskToNotToDo, addTaskToTempted, addTaskToDidItAnyway } = taskSlice.actions
export default taskSlice.reducer