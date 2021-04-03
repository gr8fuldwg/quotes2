import React, { Component } from "react";
import "./App.css";
import axios from "axios";
// import Quote from "./helpers.js/quote.js";

// API URL variables
const CHUCK_API = "https://api.chucknorris.io/jokes/random";
const QUOTE_API = "https://quote-garden.herokuapp.com/api/v3/quotes/random";
const KANYE_API = "https://api.kanye.rest";
const DOGS_API = "https://dog.ceo/api/breeds/image/random";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false,
      imageURL: "",
      showContent: true,
      error: null,
    };

    // Binding methods
    this.handle = this.handle.bind(this);
    this.quote = this.quote.bind(this);
    this.kanye = this.kanye.bind(this);
    this.dogs = this.dogs.bind(this);
    this.toggleContent = this.toggleContent.bind(this);
    this.mount = this.componentWillMount.bind(this);
  }

  makeGray() {
    var k = document.getElementById("kGray");
    var color = k.style.color;
    k.addEventListener("click", function () {
      // this function executes whenever the user clicks the button
      color = k.style.color = color === "grey";
    });
  }

  toggleContent(event) {
    event.preventDefault();
    this.setState({
      showContent: !this.state.showContent,
    });
  }

  // Dog Photo Axios GET request
  async componentDidMount() {
    await axios
      .get(DOGS_API)
      .then((response) => {
        this.setState({ imageURL: response.data.message });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  dogs() {
    axios
      .get(DOGS_API)
      .then((response) => {
        const { message } = response.data;
        this.setState({
          message: message,
          imageURL: response.data.message,
          error: null,
        });
      })

      .catch((err) => {
        this.setState({
          error: err,
        });
        console.log("error");
      });
  }

  // 'Inspirational Quotes' Axios GET method

  quote() {
    axios
      .get(QUOTE_API)
      .then((response) => {
        const { quoteText } = response.data.data[0].quoteText;
        const { quoteAuthor } = response.data.data[0].quoteAuthor;
        this.setState({
          quoteText: quoteText,
          quoteAuthor: quoteAuthor,
          hyphen: " -",
          error: null,
        });
      })

      .catch((err) => {
        this.setState({
          error: err,
        });
        console.log("error");
      });
  }

  async componentWillMount() {
    await axios
      .get(QUOTE_API)
      .then((response) => {
        this.setState({
          quoteText: response.data.data[0].quoteText,
          quoteAuthor: response.data.data[0].quoteAuthor,
          hyphen: "- ",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Kanye Quotes Axios GET method
  kanye() {
    axios
      .get(KANYE_API)
      .then((response) => {
        const { quote } = response.data;
        this.setState({
          quote: quote,
          name: " - Kanye West",
          error: null,
        });
      })

      .catch((err) => {
        this.setState({
          error: err,
        });
        console.log("error");
      });
  }

  // Chuck Joke Axios GET method
  handle() {
    axios
      .get(CHUCK_API)
      .then((response) => {
        const { value } = response.data;
        this.setState({
          value: value,
          error: null,
        });
        console.log(this.state.value);
      })

      .catch((err) => {
        this.setState({
          error: err,
        });
        console.log("error");
      });
  }

  // Render API's to DOM via buttons
  render() {
    const { imageURL } = this.state;
    const { showContent } = this.state;

    return (
      <div className="body">
        <h1 className="head">A wise dog once said...</h1>

        <img id="dog" src={imageURL} alt="dog" />

        {/* *** BUTTONS *** */}
        <section className="d-flex ml-2 mt-2 mr-2 mb-2" id="buttons">
          {/* Chuck */}
          <button
            id="chaz"
            type="button"
            className="chux chuckbutton btn btn-outline-danger"
            onClick={this.handle}
          >
            Chaz
          </button>

          {/* Inspiration */}
          <button
            id="inspiration"
            type="button"
            className="inspire ml-2 btn btn-dark "
            onClick={this.mount}
          >
            Inspire
          </button>

          {/* Kanye */}
          <button
            type="button"
            className="kanye btn btn-outline-warning"
            onClick={this.kanye}
          >
            Kanye
          </button>

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={this.dogs}
          >
            Dogs
          </button>
        </section>
        {/* End Buttons */}

        {/* QUOTES */}

        {/* Inspiration */}
        <h1 className="quote d-flex pt-4">"{this.state.quoteText}"</h1>
        <h3 className="fade1 name d-flex pb-4">
          {this.state.hyphen}
          {this.state.quoteAuthor}
        </h3>

        {/* Kanye */}
        {showContent === true ? (
          <h1 onClick={this.toggleContent} className="kanye d-flex pt-4">
            "{this.state.quote}"
          </h1>
        ) : (
          ""
        )}

        <div className="d-flex col justify-content-center">
          <button
            type="button"
            id="kGray"
            className="btn btn-outline-danger btn-xs "
            onClick={() => this.makeGray()}
          >
            <h3
              onClick={this.toggleContent.bind(this)}
              className="grey-after pt-2 fade2 kanye d-flex pb-2"
            >
              {this.state.name}
            </h3>
          </button>
        </div>

        {/* Chuck */}
        <h1 className="fade3 chaz d-flex pt-4 pb-4">{this.state.value}</h1>
      </div>
    );
  }
}

export default App;
