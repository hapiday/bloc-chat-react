import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

// Initialize Firebase
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
   constructor(props){
     super(props);
     this.state = {
       rooms: []
     };

   }
  render() {
    return (
      <div>
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
