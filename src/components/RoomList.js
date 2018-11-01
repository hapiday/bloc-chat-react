import React, { Component } from 'react';
import '../App.css';
//
// export class RoomList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       rooms: [],
//       newRoomName: ""
//     };
//
//     this.roomsRef = this.props.firebase.database().ref('rooms');
//     this.createRoom = this.createRoom.bind(this);
//     this.nameChange = this.nameChange.bind(this);
//     //
//   }
//   // this is doing this
//   componentDidMount() {
//     this.roomsRef.on('child_added', snapshot => {
//     const room = snapshot.val();
//     room.key = snapshot.key;
//     this.setState({ rooms: this.state.rooms.concat(room) })
//     });
//   }
//   //this is doin this
//   createRoom(e) {
//     e.preventDefault()
//     this.roomsRef.push({ name: this.state.newRoomName });
//     this.setState({ newRoomName: ""});
//   }
//   nameChange(e) {
//     this.setState({newRoomName : e.target.value});
//   }
//
//   selectRoom(room) {
//     this.props.activeRoom(room);
// }
//     render() {
//     let room = (
//       <form onSubmit={this.createRoom}>
//         <input type="text" value={this.state.newRoomName} placeholder="New Room Name" onChange={this.nameChange}/>
//         <input type="submit" value="New Chat" />
//       </form>
//       );
// //
//
// let roomList = this.state.rooms.map((room) =>
//     <li key={room.key} onClick={(e) => this.selectRoom(room, e)}>{room.title} </li>
// );
//
//     return(
//       <div>
//         <div>{room}</div>
//         <ul>{roomList}</ul>
//       </div>
//     );
//    }
// }

// setting a variable called roomList that will iterate through room by using a method called ".map"
// and it will grab a room's key and name value and return them as lists

// export default RoomList;
//
// import React, { Component } from 'react';

export class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {title: "", rooms: []};
    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) })
    }
  );
}
handleChange(e) {
  this.setState({ title: e.target.value });
}

createRoom(e) {
  e.preventDefault();
  this.roomsRef.push({ title: this.state.title });
  this.setState({ title: "" });
}

selectRoom(room) {
  this.props.activeRoom(room);
}

render() {
  const roomForm = (
    <form onSubmit={this.createRoom}>
    <input type="text" value={this.state.title} placeholder="Enter Room Name" onChange={this.handleChange}/>
    <input type="submit" value="Create" />
    </form>
  );

  const roomList = this.state.rooms.map((room) =>
  <li key={room.key} onClick={(e) => this.selectRoom(room, e)}>{room.title}</li>
);

return(
  <div>
  <div>{roomForm}</div>
  <ul>{roomList}</ul>
  </div>
  
    );
  }
}
export default RoomList;
