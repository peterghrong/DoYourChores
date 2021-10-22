import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomChore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChore: this.props.activeChore,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeChore = { ...this.state.activeChore, [name]: value };

    this.setState({ activeChore });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Chore Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="chore-title">Name</Label>
              <Input
                type="text"
                id="chore-title"
                name="name"
                value={this.state.activeChore.name}
                onChange={this.handleChange}
                placeholder="Enter Chore"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Chore-Day">Day</Label>
              <Input
                type="text"
                id="chore-day"
                name="day"
                value={this.state.activeChore.day}
                onChange={this.handleChange}
                placeholder="Enter Chore Day"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeChore)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}