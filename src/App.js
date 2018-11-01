
import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList.js';
import { MessageList } from './components/MessageList.js';

var config = {
    apiKey: "AIzaSyAkUx01__RRp0RZW-Ml5AkYILsXnTdmgdY",
    authDomain: "bloc-chat-de04f.firebaseapp.com",
    databaseURL: "https://bloc-chat-de04f.firebaseio.com",
    projectId: "bloc-chat-de04f",
    storageBucket: "bloc-chat-de04f.appspot.com",
    messagingSenderId: "593644873907"
  };
  firebase.initializeApp(config);

  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {activeRoom: ""};
      this.activeRoom = this.activeRoom.bind(this);
    }
   activeRoom(room) {
    this.setState({ activeRoom: room })
  }
     render() {
      const showMessages = this.state.activeRoom;
      return (
        <div>
          <h1>{this.state.activeRoom.title || "ROOMS"}</h1>
          <RoomList firebase={firebase} activeRoom={this.activeRoom} />
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} />
        </div>
      );
    }
  }

  export default App;
