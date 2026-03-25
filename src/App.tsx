import './App.css'
import DidItAnyway from './components/didItAnyway'
import NotToDo from './components/notToDo'
import Tempted from './components/tempted'

function App() {
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Not To Do List</h1>
          <p className="mt-2 text-sm text-state-500">Tap any item to reveal its description</p>
        </header>
        <div className="grid grid-cols-3 gap-5">
          <NotToDo />
          <Tempted />
          <DidItAnyway />
        </div>
      </div>
    </div>
  )
}

export default App
