import React, { Component } from 'react';
import * as firebase from "firebase";

export class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = { username: "", content: "", sentAt: "", roomId: "", messages: []}
      this.messagesRef = this.props.firebase.database().ref("messages");
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    console.log(e.target.value);
   this.setState({
     content: e.target.value
   });
 }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.props.activeRoom
    });
    this.setState({ username: "", content: "", sentAt: "", roomId: "" });
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });}
  render() {
    const activeRoom = this.props.activeRoom;

    const messageBar = (
      <form onSubmit={this.createMessage}>
        <input type="text" value={this.state.content} placeholder="Enter Message" onChange={this.handleChange}/>
        <input type="submit" value="Send" />
      </form>
    );

    const messageLine =
      this.state.messages.map((message, index) => {
        if (message.roomId === activeRoom) {
          return(
            <table key={index}>
         <tr>
           <td className="message-username">{message.user}</td>
           <td className="message-content">{message.content}</td>
           <td className="message-sentAt">{message.sentAt}</td>
         </tr>
       </table>
     );
  }
});

    return(
      <div>
        <div>{messageBar}</div>
        <ul>{messageLine}</ul>
      </div>
    );
  }
}
