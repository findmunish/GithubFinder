import React, { Component } from 'react';

class UserItem extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //       "login": "mojombo",
    //       "id": 1,
    //       "html_url": "https://github.com/mojombo",
    //       "avatar_url": "https://avatars.githubusercontent.com/u/1?v=4",
    //     }
    // }
    // state = {
    //     "login": "mojombo",
    //     "id": 1,
    //     "html_url": "https://github.com/mojombo",
    //     "avatar_url": "https://avatars.githubusercontent.com/u/1?v=4",
    // }

    // // without destructuring
    // render() {
    //     return (
    //         <div className="card text-center">
    //             <img src={this.state.avatar_url} alt="user_pic" className="round-img" style={{width: "60px"}}/>
    //             <h3>{this.state.login}</h3>
    //             <div>
    //                 <a href={this.state.html_url} className="btn btn-dark btn-sm my-1">More</a>
    //             </div>
    //         </div>
    //     )
    // }

    // with destructuring
    render() {
        // const {login, avatar_url, html_url} = this.state;
        const {login, avatar_url, html_url} = this.props.user;

        return (
            <div className="card text-center">
                <img src={avatar_url} alt="user_pic" className="round-img" style={{width: "60px"}}/>
                <h3>{login}</h3>
                <div>
                    <a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
                </div>
            </div>
        )
    }
}

export default UserItem
