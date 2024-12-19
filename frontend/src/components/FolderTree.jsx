import React, { useState } from 'react'

const FolderTree = () => {
  const [openFolders, setOpenFolders] = useState({})
  const [data, setData] = useState([
    {
      name: 'Intelligence',
      id: 1,
      // toggled: true,
      child: [
        {
          name: 'Reports',
          id: 2,
          child: [
            { name: 'DailyBriefing.pdf', id: 3, child: [], type: 'file' },
            { name: 'ThreatAssessment.docx', id: 4, child: [], type: 'file' },
            { name: 'ForeignIntel.xlsx', id: 5, child: [], type: 'file' }
          ]
        },
        {
          name: 'Intercepts',
          id: 6,
          child: [
            { name: 'EncryptedMessages.txt', id: 7, child: [], type: 'file' },
            { name: 'PhoneTranscripts.docx', id: 8, child: [], type: 'file' },
            { name: 'EmailLogs.csv', id: 9, child: [], type: 'file' }
          ]
        }
      ]
    }
  ])

  const toggleFolder = folderName => {
    setOpenFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }))
  }

  const getIconForFile = fileName => {
    if (fileName.endsWith('.pdf')) return '📜'
    if (fileName.endsWith('.docx')) return '📄'
    if (fileName.endsWith('.csv')) return '📊'
    return '📁'
  }

  const saveFolderStructure = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/save-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      alert(result.message || result.error)
    } catch (error) {
      console.error('Error saving folder structure:', error)
      alert('Failed to save folder structure')
    }
  }

  const addFolder = parentFolderId => {
    const newFolder = {
      name: 'New Folder',
      id: Date.now(),
      child: [],
      type: 'folder'
    }

    const updateData = folders =>
      folders.map(folder => {
        if (folder.id === parentFolderId) {
          return { ...folder, child: [...folder.child, newFolder] }
        }
        if (folder.child) {
          return { ...folder, child: updateData(folder.child) }
        }
        return folder
      })

    setData(updateData(data))
  }

  const deleteItem = itemId => {
    const removeItem = folders =>
      folders.filter(folder => {
        if (folder.id === itemId) return false
        if (folder.child) folder.child = removeItem(folder.child)
        return true
      })

    setData(removeItem(data))
  }

  const renameItem = (itemId, newName) => {
    const updateName = folders =>
      folders.map(folder => {
        if (folder.id === itemId) {
          return { ...folder, name: newName }
        }
        if (folder.child) {
          folder.child = updateName(folder.child)
        }
        return folder
      })

    setData(updateName(data))
  }

  const renderItem = (item, level = 0) => {
    const paddingLeft = `${level * 20}px`

    if (item.type === 'file') {
      return (
        <div
          key={item.id}
          className='flex items-center hover:bg-gray-100 px-2 py-1 rounded text-lg'
          style={{ paddingLeft }}
        >
          <span>{getIconForFile(item.name)}</span>
          <span className='ml-2' style={{fontSize: '20px'}}>{item.name}</span>
          <button
            onClick={() => renameItem(item.id, prompt('Enter new name'))}
            className='ml-2 text-blue-500'
          >
            Rename
          </button>
          <button
            onClick={() => deleteItem(item.id)}
            className='ml-2 text-red-500'
          >
            Delete
          </button>
        </div>
      )
    }

    return (
      <div key={item.id}>
        <div
          className='flex items-center bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded cursor-pointer'
          style={{ paddingLeft}}
          onClick={() => toggleFolder(item.name)}
        >
          <span>{openFolders[item.name] ? '▼' : '▶'}</span>
          <span className='ml-2 font-medium text-lg'>{item.name}</span>
          <button
            onClick={() => addFolder(item.id)}
            className='ml-2 text-green-500'
          >
            Add Folder
          </button>
          <button
            onClick={() => renameItem(item.id, prompt('Enter new name'))}
            className='ml-2 text-blue-500'
          >
            Rename
          </button>
          <button
            onClick={() => deleteItem(item.id)}
            className='ml-2 text-red-500'
          >
            Delete
          </button>
        </div>

        {openFolders[item.name] && item.child && (
          <div>{item.child.map(child => renderItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className='border-4 border-white p-4 rounded-l text-center'>
      {data.map(folder => renderItem(folder))}
      <button
        onClick={saveFolderStructure}
        className='bg-blue-500 mt-4 px-4 py-2 rounded text-white'
      >
        Save Folder Structure
      </button>
    </div>
  )
}

export default FolderTree
