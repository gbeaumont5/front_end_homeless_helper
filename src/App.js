import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import NewMember from './components/NewMember';
import Toggle from './components/toggle';
import ShowSearchResults from './components/ShowSearchResults';
import ShowMovie from './components/ShowMovie';
import FriendsPage from './components/FriendsPage';

let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://fathomless-sierra-68956.herokuapp.com';
}

require('dotenv').config();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imdbID: '',
      movieSelected: false,
      members: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.getMembers = this.getMembers.bind(this);
    this.handleAddMember = this.handleAddMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
  }
  async getMembers() {
    const response = await axios(`${baseURL}/members`);
    console.log(response);

    const data = response.data;
    this.setState({
      members: data
    });
    console.log(this.state.members);
  }

  handleAddMember(member) {
    const copyMembers = [...this.state.members, member];
    this.setState({
      members: copyMembers
    });
    console.log(this.state.members);
  }

  handleClick(id) {
    // console.log(id);
    this.setState({
      imdbID: id
    });
    console.log(this.state.imdbID);
  }

  async deleteMember(id) {
    console.log('delete route hit');
    await axios.delete(`${baseURL}/members/${id}`);
    const filteredMembers = this.state.members.filter(member => {
      return member._id !== id;
    });
    this.setState({
      members: filteredMembers
    });
    window.location.reload();
  }

  render() {
    return (
      <div className='App'>
        <Router className='nav'>
          <div className='container'>
            <nav>
              <Link to='/'>Home | </Link>
              <Link to='/Login'>Login | My Account | </Link>
              <Link to='/NewMember'>Register | </Link>
              <Link to='/About'>About | </Link>
              <Link to='/Friends'>Friends</Link>
            </nav>
            <Route path='/' exact component={LandingPage} />
            <Route path='/Login' component={Login} />

            <Route
              path='/'
              exact
              render={props => (
                <ShowSearchResults {...props} handleClick={this.handleClick} />
              )}
            />

            <Route
              path={`/Movies/selected/${this.state.imdbID}`}
              render={props => (
                <ShowMovie {...props} imdbID={this.state.imdbID} />
              )}
            />

            <Route
              path='/NewMember'
              render={props => (
                <NewMember handleAddMember={this.handleAddMember} />
              )}
            />
            <Route
              path='/Friends'
              render={props => (
                <FriendsPage
                  friends={this.props.friends}
                  deleteMember={this.deleteMember}
                />
              )}
            />
            {/*<Route path='/About' component={About} /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
