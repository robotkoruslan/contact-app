
import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';



class App extends Component {
  state = {
    contacts: []
  }
  componentWillMount() {
    axios.get('http://localhost:3000/contacts').then((response) => {
      this.setState({
        contacts: response.data
      })
    })
  }
  render() {
    let contacts = this.state.contacts.map((contact) => {
      return (
        <tr key={contact.id}>
          <td>{contact.id}</td>
          <td>{contact.title}</td>
          <td>{contact.rating}</td>
          <td>
            <Button color="success" size="sm" className="mr-2">Edit</Button>
            <Button color="danger" size="sm">Delete</Button> */
          </td>
        </tr>
      )
    })
    return (
      <div className="App container">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts}
          </tbody>
        </Table>
      </div>
    );
  }
}
  export default App;
