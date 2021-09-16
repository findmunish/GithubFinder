import React, { Fragment, Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
// import Navbar from './components/layout/NavbarClassComponent';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const GIT_HUB_API_URL = "https://api.github.com/users";
const GIT_HUB_API_SEARCH_URL = "https://api.github.com/search/users";
const GIT_HUB_AUTH_STRING = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;


// Class based component
class App extends Component {

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  // // // call to axios using promises.
  // // componentDidMount() {
  // //   axios.get(`${GIT_HUB_API_URL}`)
  // //   .then(res=>console.log(res.data))
  // //   .catch(error=>console.error('Error happened: ', error));
  // // }
  // // // async / await call to axios.
  // async componentDidMount() {
  //   this.setState ( { loading: true } );

  //   const response = await axios.get(`${GIT_HUB_API_URL}?${GIT_HUB_AUTH_STRING}`);

  //   this.setState ( { users: response.data, loading: false } )
  // }

  // Search Github users
  searchUsers = async text => {
    this.setState ( { loading: true } );

    const response = await axios.get(`${GIT_HUB_API_SEARCH_URL}?q=${text}&${GIT_HUB_AUTH_STRING}`);

    this.setState ( { users: response.data.items, loading: false } )
  }

  // Get single Github user
  getUser = async username => {
    this.setState ( { loading: true } );

    const response = await axios.get(`${GIT_HUB_API_URL}/${username}?${GIT_HUB_AUTH_STRING}`);
  
    this.setState ( { user: response.data, loading: false } )
  }

  // Get users repos
  getUserRepos = async username => {
    this.setState ( { loading: true } );

  // will retrieve 10 latest repos for the given username
  const response = await axios.get(`${GIT_HUB_API_URL}/${username}/repos?per_page=10&sort=created:asc&${GIT_HUB_AUTH_STRING}`); 

    this.setState ( { repos: response.data, loading: false } )
  }

  // Clear users from the state
  clearUsers = () => this.setState ( { users: [], loading: false } );

  // Set Alert
  setAlert = (msg, type) => {
    // this.setState({ alert: {msg: msg, type: type} });
    this.setState({ alert: {msg: msg, type: type} }); // parameter destructuring....

    setTimeout( () => this.setState({ alert: null }), 5000)
  }

  render() {
    const { users, user, repos, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert}/>
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User
                  { ...props }
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user= {user}
                  loading={loading}
                  repos={repos}
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

// conditions and expressions in jsx
// class App extends Component {
//   fooClassMethod = () => "BAR as class method";

//   render() {
//     const name = "John Doe";
//     const foo = () => "Bar in function";
//     const loading = false;
//     const loadingWithTernary = false;
//     const showName = true;
  
//     if (loading) {
//       return <h4>Loading....</h4>
//     } else {
//       return (
//         <div className="App">
//           {loadingWithTernary ? <h4>Loading....</h4> : <h1>Hello {name}</h1>}
//           <hr />
//           <p>
//             Demonstrate showName with ternary:
//             {loadingWithTernary ? <h4>Loading....</h4> : <h1>Hello {showName ? name : null}</h1>}
//           </p>
//           <hr />
//           <hr />
//           <p>
//             Demonstrate showName with inline condition:
//             {loadingWithTernary ? <h4>Loading....</h4> : <h1>Hello {showName && name}</h1>}
//           </p>
//           <hr />
//           <h3>Sum: {1+4}</h3>
//           <h4>Uppercase name: {name.toUpperCase()}</h4>
//           <h6>function call: {foo()}</h6>
//           <h6>class method call: {this.fooClassMethod()}</h6>
//         </div>
//       )
//     }
//   }
// }

// // Class based component
// class App extends Component {
//   // // using javascript syntax
//   // render() {
//   //   return React.createElement('div', {className: "App"}, React.createElement("h1", null, 'Hello from React'));
//   // }

//   render() {
//     return (
//       <div className="App">
//         <h1>Hello from React</h1>
//       </div>
//     )
//   }

//   // // htmlFor and className usage
//   // render() {
//   //   return (
//   //     <div className="App">
//   //       <h1>Hello from React</h1>
//   //       <label htmlFor="name">My label</label>
//   //     </div>
//   //   )
//   // }

//   // // react must have atleast one surrounding div
//   // render() {
//   //   return (
//   //     <div>
//   //       <div className="App">
//   //        <h1>Hello from React</h1>
//   //       </div>
//   //       <h2>Goodbye</h2>
//   //     </div>
//   //   )
//   // }

//   // // instead surrounding html elemnet (div in this case) we can use a React.Fragment element i.e. a ghost element
//   // render() {
//   //   return (
//   //     <React.Fragment>
//   //       <div className="App">
//   //         <h1>Hello from React</h1>
//   //       </div>
//   //       <h2>Goodbye</h2>
//   //     </React.Fragment>
//   //   )
//   // }

//   // // instead surrounding <React.Fragment></React.Fragment> we can else use empty elements <></>
//   // render() {
//   //   return (
//   //     <>
//   //       <div className="App">
//   //         <h1>Hello from React</h1>
//   //       </div>
//   //       <h2>Goodbye</h2>
//   //     </>
//   //   )
//   // }
// }

// // Function based component
// function App() {
//   return (
//     <div className="App">
//       <h1>Hello from React</h1>
//     </div>
//   )
// }

export default App