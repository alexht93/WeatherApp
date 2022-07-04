import { useEffect, useState } from 'react'
import './App.css'
import Weather from './components/Weather'
import SyncLoader from "react-spinners/SyncLoader";


function App() {
  
  const [ loading, setLoading] = useState(false);

  useEffect(() =>{
    setLoading(true);
    setTimeout(() =>{
            setLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="App">
    {
      loading ?
<SyncLoader color={"#4666FF"} loading={loading} size={30} />
       :
       <Weather/>
    } 
    </div>
 

  )
      
}

export default App
