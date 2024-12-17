import './App.css'
import FolderTree from './components/FolderTree.jsx'
function App () {
  return (
    <main className='w-full h-screen dark:text-white'>
      <div className='flex justify-center items-center border-green bg-black my-[10vw] w-auto'>
        <div className='border-4 border-indigo-600 bg-grey shadow-2xl p-5 rounded-2xl w-[700px] cypiu'>
          <h1 className='mb-6 font-bold font-mono text-5xl text-center text-white'>
            Folder Hierarchy
          </h1>
          <FolderTree className='bg-black text-white' />
        </div>
      </div>
    </main>
  )
}

export default App
