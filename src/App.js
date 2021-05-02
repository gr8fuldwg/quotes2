import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-scroll";
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
          <Link activeClass="active" to="chazBubble" spy={true} auto={true}>
            <button
              id="chaz"
              className="pt-1 pb-1 pl-1 pr-1 btn btn-outline-danger"
              type="button"
              onClick={this.handle}
            >
              Chaz
            </button>
          </Link>

          {/* Inspiration */}
          <Link to="quoteBubble" spy={true} auto={true}>
            <button
              id="inspiration"
              type="button"
              className="pt-1 pb-1 pl-1 pr-1 inspire ml-2 btn btn-dark "
              onClick={this.mount}
            >
              Inspire
            </button>
          </Link>

          {/* Kanye */}
          <Link to="kanye-quote" spy={true} auto={true}>
            <button
              type="button"
              id="kanye-button"
              className="pt-1 pb-1 pl-1 pr-1 kanye btn btn-outline-warning"
              onClick={this.kanye}
            >
              Kanye
            </button>
          </Link>

          <Link to="dog" spy={true} auto={true}>
            <button
              type="button"
              id="dog-button"
              className="pt-1 pb-1 pl-1 pr-1 btn btn-outline-primary"
              onClick={this.dogs}
            >
              Dogs
            </button>
          </Link>
        </section>
        {/* End Buttons */}

        {/* QUOTES!!! */}

        {/* Inspiration */}
        <section id="quoteBubble">
          <h1
            onClick={this.mount}
            className="quote d-flex pt-4"
            style={{ top: 0 }}
          >
            "{this.state.quoteText}"
          </h1>
          <h3 className="fade1 name d-flex pb-4">
            {this.state.hyphen}
            {this.state.quoteAuthor}
          </h3>
        </section>

        {/* Kanye */}
        {showContent === true ? (
          <h1
            onClick={this.kanye}
            id="kanye-quote"
            className="kanye kanye-bubble d-flex"
          >
            "{this.state.quote}"
          </h1>
        ) : (
          ""
        )}

        <div className="d-flex pb-4 justify-content-center">
          <h3
            onClick={this.toggleContent.bind(this)}
            className="d-flex kanye-name grey-after pt-2 fade2 pb-2"
          >
            {this.state.name}
          </h3>
        </div>

        {/* Chuck */}
        <section id="chazBubble" style={{ bottom: 0 }}>
          <h1 onClick={this.handle} className="chaz d-flex pt-2 pb-2">
            {this.state.value}
          </h1>
        </section>
      </div>
    );
  }
}

export default App;
