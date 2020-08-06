
import React, { Component } from 'react';
import { Modal, ModalHeader, FormGroup, ModalFooter, Label, Input, ModalBody, Table, Button } from 'reactstrap';
import axios from 'axios';



class App extends Component {
  state = {
    contacts: [],
    newContactData: {
      name: '',
      phone: ''
    },
    editContactData: {
      id: '',
      name: '',
      phone: ''
    },
    newContactModal: false,
    editContactModal: false
  }
  componentWillMount() {
    this._refreshList()

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

      this.setState({
        contacts, newContactModal: false, newContactData: {
          name: '',
          phone: ''
        }
      })
    })
  }
  updateContact() {
    let { name, phone } = this.state.editContactData;

    axios.put('http://localhost:3001/contacts/' + this.state.editContactData.id, {
      name, phone
    }).then((response) => {
      console.log(response.data);
      this._refreshList()
      this.setState({
        editContactModal: false, editContactData: { id: '', name: '', phone: '' }
      })
    })
  }
  editContact(id, name, phone) {
    this.setState({
      editContactData: { id, name, phone }, editContactModal: !this.state.editContactModal
    })
  }
  deleteContact(id) {
    axios.delete('http://localhost:3001/contacts/' + id).then((response) => {
    this._refreshList()
    })
  }
  _refreshList() {
    axios.get('http://localhost:3001/contacts').then((response) => {
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
          <td>{contact.name}</td>
          <td>{contact.phone}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editContact.bind(this, contact.id, contact.name, contact.phone)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteContact.bind(this, contact.id)}>Delete</Button>
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
              <Label for="name">name</Label>
              <Input id="name" value={this.state.newContactData.name} onChange={(e) => {
                let { newContactData } = this.state;
                newContactData.name = e.target.value
                this.setState({ newContactData })
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="phone">phone</Label>
              <Input id="phone" value={this.state.newContactData.phone} onChange={(e) => {
                let { newContactData } = this.state;
                newContactData.phone = e.target.value
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
              <Label for="name">name</Label>
              <Input id="name" value={this.state.editContactData.name} onChange={(e) => {
                let { editContactData } = this.state;
                editContactData.name = e.target.value
                this.setState({ editContactData })
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="phone">phone</Label>
              <Input id="phone" value={this.state.editContactData.phone} onChange={(e) => {
                let { editContactData } = this.state;
                editContactData.phone = e.target.value
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
              <th>Full name</th>
              <th>Phone number</th>
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