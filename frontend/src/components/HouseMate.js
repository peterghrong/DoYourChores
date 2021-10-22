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

export default class CustomHouseMate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeHouseMate: this.props.activeHouseMate,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeHouseMate = { ...this.state.activeHouseMate, [name]: value };

    this.setState({ activeHouseMate });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Chore Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="housemate-title">Name</Label>
              <Input
                type="text"
                id="housemate-title"
                name="name"
                value={this.state.activeHouseMate.name}
                onChange={this.handleChange}
                placeholder="Enter HouseMate"
              />
            </FormGroup>
            <FormGroup>
              <Label for="housemate-number">Phone Number</Label>
              <Input
                type="text"
                id="housemate-phone_number"
                name="phone_number"
                value={this.state.activeHouseMate.phone_number}
                onChange={this.handleChange}
                placeholder="Enter Your Phone Number"
              />
                    </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input
                    type="checkbox"
                    name="current_chore_handler"
                    checked={this.state.activeHouseMate.current_chore_handler}
                    onChange={this.handleChange}
                            >
                    </Input>
                    Current Chore Handler
                </Label>
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input
                    type="checkbox"
                    name="available"
                    checked={this.state.activeHouseMate.available}
                    onChange={this.handleChange}
                    >
                    </Input>
                    Available?
                </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeHouseMate)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}