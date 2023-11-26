import React, { Component, Fragment } from "react";
import './Genre.css'
import PlusIcon from "./plus.svg"


class FindGenres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      selectedGenres: [] // Array to store selected genres
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  handlePlusIconClick = () => {
    const { userInput, selectedGenres } = this.state;
    if (userInput && selectedGenres.length < 5) {
      this.setState({
        selectedGenres: [...selectedGenres, userInput], // Add userInput to selectedGenres array
        userInput: "" // Clear the userInput
      });
    }
  };

  handleRemoveGenre = (genreIndex) => {
    const { selectedGenres } = this.state;
    const updatedGenres = selectedGenres.filter((_, index) => index !== genreIndex);
    this.setState({ selectedGenres: updatedGenres });
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
        selectedGenres // Include selectedGenres in state
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <ul class="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                let className;
  
                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }
                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          suggestionsListComponent = (
            <div class="no-suggestions">
              <em>No suggestions available.</em>
            </div>
          );
        }
      }

      return (
        <Fragment>
        <div class="container1">
          <div class="searchGenre">
          <input
              type="text"
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
              placeholder="Add up to 5 genres .  .  ."
          />
            <img
            src={PlusIcon}
            alt="add"
            onClick={this.handlePlusIconClick} 
            />
          </div>

            {selectedGenres.map((genre, index) => (
              <div key={index} className="selectedGenre">
                <span>{genre}</span>
                <img
                src={PlusIcon}
                alt="Remove"
                onClick={() => this.handleRemoveGenre(index)}
                className="remove-icon"/>
              </div>
            ))}
          </div>

          <div>
          {suggestionsListComponent}
        </div>
        </Fragment>
      );
    }
  }
  
  export default FindGenres;