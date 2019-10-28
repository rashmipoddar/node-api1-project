import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        // console.log(response);
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Bio: {user.bio}</h1>
          </div>
        )
      })}
    </div>
  );
}

export default App;
