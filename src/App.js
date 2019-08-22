import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import NewMember from './components/NewMember';
import Toggle from './components/toggle';
import showSearchResults from './components/ShowSearchResults';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
}

require('dotenv').config();

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: []
    }
    this.getMembers = this.getMembers.bind(this)
    this.handleAddMember = this.handleAddMember.bind(this)
  }

  async getMembers () {
    const response = await axios(`${baseURL}/members`)
    console.log(response);
    
    const data = response.data
    this.setState({
      members: data
    })
    console.log(this.state.members);
  }

  handleAddMember (member) {
    const copyMembers = [...this.state.members, member]
    this.setState({
      members: copyMembers
    })
    console.log(this.state.members)
  }

  render() {
    return (
      <div className='App'>
        <Router className='nav'>
          <div className='container'>
            <nav>
              <Link to='/'>Home</Link>
              <Link to='/Login'>Login | My Account</Link>
              <Link to='/NewMember'>Register</Link>
              <Link to='/About'>About</Link>
            </nav>
            <Route path='/' exact component={LandingPage} />
            <Route path='/Login' component={Login} />
            <Route path="/NewMember" render={props => <NewMember handleAddMember = {this.handleAddMember} />} />
            {/*<Route path='/About' component={About} /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
