import React, { Component } from 'react';

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }
  handleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  handleSignOut() {
    this.props.firebase.auth().signOut();
  }


  componentDidMount() {
    console.log("component mounted")
    this.props.firebase.auth().onAuthStateChanged( user => {
      console.log(user);
      this.props.setUser(user);
    }
  );
}
render() {
  return (
    <div className='person'>
    <button className="sign-in" value="sign-in" onClick={() =>this.handleSignIn()}>Sign In</button>
    <button className="sign-out" value="sign-out" onClick={() =>this.handleSignOut()}>Sign out</button>
    <p>Signed in as: {this.props.user ? this.props.user.displayName : "Guest"}</p>
    </div>
    );
  }
}

export default User;
