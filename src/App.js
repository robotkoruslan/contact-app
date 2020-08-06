
import React, { Component } from 'react';
import { Modal, ModalHeader, FormGroup, ModalFooter, Label, Input, ModalBody, Table, Button } from 'reactstrap';
import axios from 'axios';



class App extends Component {
  state = {
    contacts: [],
    newContactData: {
      title: '',
      rating: ''
    },
    editContactData: {
      id: '',
      title: '',
      rating: ''
    },
    newContactModal: false,
    editContactModal: false
  }
  componentWillMount() {
    axios.get('http://localhost:3001/contacts').then((response) => {
      this.setState({
        contacts: response.data
      })
    })
  }

  toggleNewContactModal() {
    this.setState({
      newContactModal: !this.state.newContactModal
    })
  }
  toggleEditContactModal() {
    this.setState({
      editContactModal: !this.state.editContactModal
    })
  }

  addContact() {
    axios.post('http://localhost:3001/contacts', this.state.newContactData).then((response) => {
      let { contacts } = this.state;
      contacts.push(response.data);
      this.setState({contacts, newContactModal: false, newContactData: {
          title: '',
          rating: ''
        }})
    })
  }
  updateContact(){
    
  }
    editContact(id, title, rating){
    this.setState({
      editContact: {id, title, rating}
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
            <Button color="success" size="sm" className="mr-2" onClick={this.editContact.bind(this, contact.id, contact.title, contact.rating)}>Edit</Button>
            <Button color="danger" size="sm">Delete</Button>
          </td>
        </tr>
      )
    })
    return (
      <div className="App container">
        <h1>Contacts App</h1>

        <Button className='my-3' color="primary" onClick={this.toggleNewContactModal.bind(this)}>Add Contact</Button>
        <Modal isOpen={this.state.newContactModal} toggle={this.toggleNewContactModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewContactModal.bind(this)}>Add a new contact</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input id="title" value={this.state.newContactData.title} onChange={(e) => {
                let { newContactData } = this.state;
                newContactData.title = e.target.value
                this.setState({ newContactData })
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input id="rating" value={this.state.newContactData.rating} onChange={(e) => {
                let { newContactData } = this.state;
                newContactData.rating = e.target.value
                this.setState({ newContactData })
              }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addContact.bind(this)}>Add contact</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewContactModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

<Modal isOpen={this.state.editContactModal} toggle={this.toggleEditContactModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditContactModal.bind(this)}>Edit a new contact</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input id="title" value={this.state.editContactData.title} onChange={(e) => {
                let { editContactData } = this.state;
                editContactData.title = e.target.value
                this.setState({ editContactData })
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input id="rating" value={this.state.editContactData.rating} onChange={(e) => {
                let { editContactData } = this.state;
                editContactData.rating = e.target.value
                this.setState({ editContactData })
              }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateContact.bind(this)}>Update contact</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditContactModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

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


//41.03