import './App.css';
import FolderTree from './components/FolderTree.jsx'
function App () {
  return (
    <div className='flex justify-center items-center bg-gradient-to-r from-slate-800 to-slate-950 w-full'>
      <div className='bg-black shadow-2xl p-5 rounded-2xl w-[700px]'>
        <h1 className='mb-6 font-bold font-mono text-5xl text-center'>
          Folder Hierarchy
        </h1>
        <FolderTree />
      </div>
    </div>
  )
}

export default App
