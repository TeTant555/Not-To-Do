import './App.css'
import DidItAnyway from './components/didItAnyway'
import NotToDo from './components/notToDo'
import Tempted from './components/tempted'

function App() {
  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black px-6 py-12 font-sans overflow-hidden relative">
      {/* Neon glowing orb and grid lines for cyberpunk aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        <header className="mb-12 text-center">
          <h1 className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-5xl uppercase italic drop-shadow-[0_0_15px_rgba(192,132,252,0.3)]">
            Not To Do List
          </h1>
          <p className="mt-3 text-base font-medium tracking-wide text-zinc-400">
            Tap any item to reveal its description
          </p>
        </header>
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3 md:gap-6">
          <NotToDo />
          <Tempted />
          <DidItAnyway />
        </div>
      </div>
    </div>
  )
}

export default App
