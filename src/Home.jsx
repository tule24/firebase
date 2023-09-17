import { Link } from "react-router-dom";
import { getDeviceToken } from './firebase/'
import './App.css'
import { useState } from 'react'
import { deleteDeviceToken } from './firebase'

function Home() {
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
        <h1>This is the home page</h1>
        <Link to="about">Click to view our about page</Link>
        <Link to="contact">Click to view our contact page</Link>
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

export default Home
