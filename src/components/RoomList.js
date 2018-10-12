import React, { Component } from 'react';

export class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this);
    this.nameChange = this.nameChange.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) })
    });
  }
  createRoom(e) {
    e.preventDefault()
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({ newRoomName: ""});
  }
  nameChange(e) {
    this.setState({newRoomName : e.target.value});
  }

    render() {
        let room = (
        <form onSubmit={this.createRoom}>
          <input type="text" value={this.state.newRoomName} placeholder="New Room Name" onChange={this.nameChange}/>
          <input type="submit" value="New Chat" />
        </form>
      );

       let roomList = this.state.rooms.map((room) =>
        <li key={room.key}>{room.name}</li>
       );

      return(
        <div>
          <div>{room}</div>
          <ul>{roomList}</ul>
        </div>
      )
  }
}



export default RoomList;
