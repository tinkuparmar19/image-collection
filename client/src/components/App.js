import React, { useEffect } from 'react'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import { Route, Switch, useHistory } from 'react-router-dom'
import UploadImage from './UploadImage'

function App() {
  const history = useHistory()

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'))
  //   if (!user) {
  //     history.push('/login')
  //   }
  // }, [])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      history.push('/login')
    }
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/upload'>
          <UploadImage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
