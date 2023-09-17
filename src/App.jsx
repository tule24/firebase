import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getDeviceToken } from './firebase/'
import './App.css'
import { useState } from 'react'
import { deleteDeviceToken } from './firebase'

function App() {
  const [msg, setMsg] = useState('');
  const handleSubcribeToken = async () => {
    const token = await getDeviceToken();
    setMsg(token)
  }
  const handleUnsubscribeToken = async () => {
    await deleteDeviceToken(msg)
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={async () => await handleSubcribeToken()}>
          Request FCM token
        </button>
        <button onClick={async () => await handleUnsubscribeToken()}>
          Delete FCM token
        </button>
      </div >
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
