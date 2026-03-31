import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type Task = {
    id: number
    title: string
}

type TaskState = {
    tasks: Task[]
}

const initialState: TaskState = {
    tasks: [
        { id: 1, title: 'Check Social Media' },
        { id: 2, title: 'Eat Junk Food' },
        { id: 3, title: 'Hit Snooze' },
    ]
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload)
        }
    }
})

export const { addTask } = taskSlice.actions
export default taskSlice.reducer