import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) throw new Error('Network response was not ok')
        const json = await response.json()
        setData(json)
      } catch (err) {
        setError(err.message)
        console.error('Fetch error:', err)
      } 
    }

    getData()
  }, [])

  if (error == null){
    return (
      <>
        <h1>My Contacts</h1>
        <p>Total of {data.length} contacts</p>
        <table>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
          
        {          
          data && data.length>0 && data.map((item)=> 
          <tr>
            <td>{item.name}</td>
            <td><button class="btn"><i class="fa-solid fa-circle-info"></i></button></td>
          </tr>
        
        )
        }  
        </table>   
      </>
    )
  }
}

export default App