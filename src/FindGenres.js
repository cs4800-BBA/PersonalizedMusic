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
    const genres =   ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", 
  "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", 
  "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", 
  "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", 
  "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", 
  "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", 
  "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", 
  "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", 
  "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance",
   "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", 
   "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"];

    if (userInput && selectedGenres.length < 5 && genres.includes(userInput)) {
      const updatedGenres = [...selectedGenres, userInput];
      this.setState(
        {
          selectedGenres: updatedGenres,
          userInput: "",
        },
        () => {
          // Invoke the callback passed from App.js to update selected genres in App.js
          this.props.onSelectedGenresChange(updatedGenres);
        }
      );
    }
  };

  handleRemoveGenre = (genreIndex) => {
    const { selectedGenres } = this.state;
    const updatedGenres = selectedGenres.filter((_, index) => index !== genreIndex);
    this.setState(
      {
        selectedGenres: updatedGenres,
      },
      () => {
          // Invoke the callback passed from App.js to update selected genres in App.js
          this.props.onSelectedGenresChange(updatedGenres);
        }
    );
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
        selectedGenres
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