import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const githubContext =  useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState('')

    // onChange = event => {
    //     // this.setState( { text: event.target.value });
    //     this.setState( { [event.target.name]: event.target.value } );
    // }
    const onChange = event => setText( event.target.value);

    const onSubmit = (event) => {
        event.preventDefault();
        if (text === '') {
            alertContext.setAlert('Please enter something', 'light');
        } else {
            githubContext.searchUsers(text);
            setText('');    
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name="text" placeholder="Search Users...." value={text} onChange={onChange}/>
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {githubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button> }
        </div>
    )
}

export default Search;

// // verison 2
// import React, { useState } from 'react'
// import PropTypes from 'prop-types'

// const Search = ({ searchUsers, clearUsers, showClear, setAlert }) => {
//     const [text, setText] = useState('')

//     // onChange = event => {
//     //     // this.setState( { text: event.target.value });
//     //     this.setState( { [event.target.name]: event.target.value } );
//     // }
//     const onChange = event => setText( event.target.value);

//     const onSubmit = (event) => {
//         event.preventDefault();
//         if (text === '') {
//             setAlert('Please enter something', 'light');
//         } else {
//             searchUsers(text);
//             setText('');    
//         }
//     }

//     return (
//         <div>
//             <form onSubmit={onSubmit} className="form">
//                 <input type="text" name="text" placeholder="Search Users...." value={text} onChange={onChange}/>
//                 <input type="submit" value="Search" className="btn btn-dark btn-block" />
//             </form>
//             {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> }
//         </div>
//     )
// }

// Search.propTypes = {
//     searchUsers: PropTypes.func.isRequired,
//     clearUsers: PropTypes.func.isRequired,
//     showClear: PropTypes.bool.isRequired,
//     setAlert: PropTypes.func.isRequired,
// }
// export default Search;

// // verison 1
// // class Search extends Component {
// //     state = {
// //         text: ''
// //     }

// //     static propTypes = {
// //         searchUsers: PropTypes.func.isRequired,
// //         clearUsers: PropTypes.func.isRequired,
// //         showClear: PropTypes.bool.isRequired,
// //         setAlert: PropTypes.func.isRequired,
// //     }

// //     // onChange = event => {
// //     //     // this.setState( { text: event.target.value });
// //     //     this.setState( { [event.target.name]: event.target.value } );
// //     // }
// //     onChange = event => this.setState( { [event.target.name]: event.target.value } );

// //     onSubmit = (event) => {
// //         event.preventDefault();
// //         if (this.state.text === '') {
// //             this.props.setAlert('Please enter something', 'light');
// //         } else {
// //             this.props.searchUsers(this.state.text);
// //             this.setState( {text: ''} );    
// //         }
// //     }

// //     // use the function call as << this.onSubmit.bind(this) >>
// //     // onSubmit(event) {
// //     //     event.preventDefault();
// //     //     console.log(this.state.text);
// //     // }

// //     render() {
// //         const {clearUsers, showClear } = this.props;
// //         return (
// //             <div>
// //                 <form onSubmit={this.onSubmit} className="form">
// //                     <input type="text" name="text" placeholder="Search Users...." value={this.state.text} onChange={this.onChange}/>
// //                     <input type="submit" value="Search" className="btn btn-dark btn-block" />
// //                 </form>
// //                 {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> }
// //             </div>
// //         )
// //     }
// // }
// // export default Search;
