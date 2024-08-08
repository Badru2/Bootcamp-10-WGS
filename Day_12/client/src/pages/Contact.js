import React, { Component } from "react";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", phone: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    alert(`
      A name was submitted: ${this.state.name}
      An email was submitted: ${this.state.email}
      A phone number was submitted: ${this.state.phone}
      `);
    event.preventDefault();
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="flex flex-col w-1/6 ms-4 mt-5 bg-slate-200 shadow-md p-5"
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            className="w-full "
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            className="w-full "
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="number"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            className="w-full "
          />
        </div>

        <div>
          <input
            type="submit"
            value="Submit"
            className="px-3 py-1 bg-blue-500 font-bold text-white mt-3 rounded-sm"
          />
        </div>
      </form>
    );
  }
}

export default Contact;
