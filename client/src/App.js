import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

class App extends Component {

  state = {
    searchResults: []
  }

  myOwnMethod = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  submitSearch = (e) => {
    e.preventDefault();
    console.log(this.state.searchTerm);
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}`)
      .then(response => {
        console.log(response);
        this.setState({
          searchResults: response.data.items
        })
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (
      <div className="App">

        <nav className="navbar navbar-dark bg-primary">
          <div className="navbar-brand">React Book Search</div>
        </nav>

        <div className="container">
          <form onSubmit={this.submitSearch}>

            <input onChange={this.myOwnMethod} placeholder="Search Term"></input> <button type="submit" class="btn btn-primary">Search</button>

          </form>
        </div>

        <div class="container">
          {this.state.searchResults.map(each =>
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{each.volumeInfo.title}</h2>
                <h6 className="card-title">
                  Author/s: {each.volumeInfo.authors}</h6>
                <p className="card-title">  Description: {each.volumeInfo.description}</p>
                
                <hr width="70%" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
//don't forget to get id of book when
export default App;
