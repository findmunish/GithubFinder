import React,  { useReducer } from 'react';
import axios from 'axios';
import GitHubContext from './githubContext';
import GitHubReducer from './githubReducer';
import { 
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types'

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GIT_HUB_API_URL = "https://api.github.com/users";
const GIT_HUB_API_SEARCH_URL = "https://api.github.com/search/users";
const GIT_HUB_AUTH_STRING = `client_id=${githubClientId}&client_secret=${githubClientSecret}`;

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

    // Search User
    const searchUsers = async text => {
        setLoading();
    
        const response = await axios.get(`${GIT_HUB_API_SEARCH_URL}?q=${text}&${GIT_HUB_AUTH_STRING}`);
    
        dispatch({ type: SEARCH_USERS, payload: response.data.items });
    }

    // Get User
    const getUser = async username => {
        setLoading();

        const response = await axios.get(`${GIT_HUB_API_URL}/${username}?${GIT_HUB_AUTH_STRING}`);

        dispatch({ type: GET_USER, payload: response.data });
    }

    // Get Repos
    const getUserRepos = async username => {
        setLoading();

        // will retrieve 10 latest repos for the given username
        const response = await axios.get(`${GIT_HUB_API_URL}/${username}/repos?per_page=10&sort=created:asc&${GIT_HUB_AUTH_STRING}`); 

        dispatch ({ type: GET_REPOS, payload: response.data })
    }

    // Clear Users
      // Clear users from the state
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return <GitHubContext.Provider
        value={{ 
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >
        {props.children}
    </GitHubContext.Provider>
}
export default GithubState;