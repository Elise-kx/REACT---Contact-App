import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) throw new Error('Network response error')
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
      const filteredData = data.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );


      const sortedData = filteredData
        .slice() 
        .sort((a, b) => a.name.localeCompare(b.name));

      const groupedData = sortedData.reduce((acc, contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
      }, {});

      const letters = Object.keys(groupedData).sort();

      // For contact details pop up window
      const openInfo = (contact) => setSelectedContact(contact);
      const closeInfo = () => setSelectedContact(null);

    return (
      <>
        <h1>My Contacts</h1>
        <p>Total of {data.length} contacts</p>

        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px 12px',
            marginBottom: '1em',
            width: '100%',
            maxWidth: '400px',
            fontSize: '1em',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          
          {          
            data && data.length>0 && letters.map((letter)=> 
              <tbody>
                <tr>
                  <td colSpan="2" style={{ background: "#57c1f23a", color: "black" }}>
                    <h3 style={{ margin: 0 }}>{letter}</h3>
                  </td>
                </tr>
                {groupedData[letter].map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td style={{width: "80px"}}>
                      <button onClick={() => openInfo(item)} className="btn">
                        <i className="fa-solid fa-circle-info"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )
          }  
        </table>
      
      {/* Pop up window  */}
      {selectedContact && (
        <div className="overlay">
          <div className="modal">
            <h3>{selectedContact.name}</h3>
            <hr></hr>
            <p><b>Phone:</b> {selectedContact.phone}</p>
            <p><b>Email:</b> {selectedContact.email}</p>
            <p>
              <b>Address:</b> {selectedContact.address.street}, {selectedContact.address.suite}, {selectedContact.address.city}, {selectedContact.address.zipcode}
            </p>
            <p>
              <b>Company:</b> {selectedContact.company.name}
            </p>


            <button onClick={closeInfo}>Close</button>
          </div>
        </div>
      )}



      </>
    )
  }
}

export default App