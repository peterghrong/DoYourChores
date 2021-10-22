import React, { Component } from "react";
import Chore from "./components/Chore";
import HouseMate from "./components/HouseMate";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseMates: [],
      chores: [],
      modal_chore: false,
      modal_housemate: false,
      activeChore: {
        name: "",
        day: "",
      },
      activeHouseMate: {
        name: "",
        phone_number: "",
        current_chore_handler: false,
        available: true,
      }
    };
  }

  componentDidMount() {
    this.refreshLists();
  }

  refreshLists = () => {
    axios.get("/api/chores/")
      .then((res) => this.setState({ chores: res.data }))
      .catch((err) => console.log(err));
    axios.get("/api/housemates/")
      .then((res) => this.setState({ houseMates: res.data }))
      .catch((err) => console.log(err));
  }

  toggle = () => {
    this.setState({ modal_chore: false });
    this.setState({ modal_housemate: false });
  }

  handleSubmitChore = (chore) => {
    this.toggle();
    if (chore.id) {
      axios.put(`/api/chores/${chore.id}/`, chore)
        .then((res) => this.refreshLists());
      return;
    }
    axios.post("/api/chores/", chore)
      .then((res) => this.refreshLists());
  }

  handleSubmitHouseMate = (houseMate) => {
    this.toggle();
    if (houseMate.id) {
      console.log(houseMate);
      axios.put(`/api/housemates/${houseMate.id}/`, houseMate)
        .then((res) => this.refreshLists());
        return;
    }
    axios.post("/api/housemates/", houseMate)
      .then((res) => this.refreshLists());
  }

  handleDeleteChore = (chore) => {
    axios.delete(`/api/chores/${chore.id}/`)
      .then((res) => this.refreshLists());
  }
  
  handleDeleteHouseMate = (houseMate) => {
    axios.delete(`/api/housemates/${houseMate.id}/`)
      .then((res) => this.refreshLists());
  }

  createChore = () => {
    const chore = { name: "", day: "" };
    this.setState({ activeChore: chore, modal_chore: true });
  }

  createHouseMate = () => {
    const houseMate = { name: "", phone_number: "", current_chore_handler: false, available: true };
    this.setState({activeHouseMate: houseMate, modal_housemate: true})
  }

  editChore = (chore) => {
    this.setState({ activeChore: chore, modal_chore: true });
  }

  editHouseMate = (houseMate) => {
    this.setState({ activeHouseMate: houseMate, modal_housemate: true });
  }

  get_date = (day) => {
    switch (day) {
      case "0":
        return "Monday";
      case "1":
        return "Tuesday";
      case "2":
        return "Wednesday";
      case "3":
        return "Thursday";
      case "4":
        return "Friday";
      case "5":
        return "Saturday";
      case "6":
        return "Sunday";
    }
  }

  renderHouseMates = () => {
    return this.state.houseMates.map((person) => (
      <li
        key={person.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`person mr-2`}
          title={person.name}
        >
          {person.name}
        </span>
        <span
          className={`person mr-2`}
          title={person.phone_number}
        >
          {person.phone_number}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editHouseMate(person)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDeleteHouseMate(person)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  renderChores = () => {
    return this.state.chores.map((chore) => (
      <li
        key={chore.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`chore mr-2`}
          title={chore.name}
        >
          {chore.name}
        </span>
        <span
          className={`chore mr-2`}
          title={chore.day}
        >
          {this.get_date(chore.day)}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editChore(chore)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDeleteChore(chore)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container" >
        <h1 className="text-black text-uppercase text-center my-4">Do Your Chores</h1>
        <div className="row">
          <div className="col-md-6 col-md-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createHouseMate}
                >
                  Add HouseMate
                </button>
              </div>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderHouseMates()}
              </ul>
            </div>
          </div>
        </div>

        {this.state.modal_housemate ? (
            <HouseMate
              activeHouseMate={this.state.activeHouseMate}
              toggle={this.toggle}
              onSave={this.handleSubmitHouseMate}
            />
          ) : null}


        <div className="row">
          <div className="col-md-6 col-md-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createChore}
                >
                  Add Chores
                </button>
              </div>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderChores()}
              </ul>
            </div>
          </div>
        </div>
          {this.state.modal_chore ? (
            <Chore
              activeChore={this.state.activeChore}
              toggle={this.toggle}
              onSave={this.handleSubmitChore}
            />
          ) : null}
      </main>
    );
  }
}

export default App;