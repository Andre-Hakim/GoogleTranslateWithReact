import React, { Component } from 'react';
import axios from 'axios';
import './Translate.css';

const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
const googleTranslate = require("google-translate")(API_KEY);


class Translate extends Component {
  state = {
    languageCodes: [],
    TranslateFrom: "",
    TranslateTo: "",
    TranslateFromLanguage: "en", //Default language
    TranslateToLanguage: "en", //Default language
  };
  //Populate drop downs with available Languages
  componentDidMount() {
    //API doing the work here getting the supported languages from Google Api
    googleTranslate.getSupportedLanguages("en", function (err, languageCodes) {
      getLanguageCodes(languageCodes);
    });

    const getLanguageCodes = (languageCodes) => {
      this.setState({ languageCodes });
    };
  }

  //Module That will be rendered.
  TranslateModule() {
    //Getting the values of my class
    const { languageCodes, TranslateFromLanguage, TranslateToLanguage } = this.state;

    //rendering below
    return (
      <div className="translateform">

        <h1 className="translateTitle"> Google Translate API with ReactJS</h1>
        <select
          className="dropDown"
          value={TranslateFromLanguage}
          onChange={(e) => this.changeFromHandler(e.target.value)}>
          
          {languageCodes.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}

        </select>

        <textarea
          className="textBoxes"
          type="text"
          placeholder="Enter Words Here..."
          value={this.state.TranslateFrom}
          onChange={(e) => this.changeTranslateFromTextHandler(e.target.value)}>
        </textarea>

        <img className="switchLanguage" src='logo192.png' alt='TO' onClick={this.switchLangHandler}></img>

        <select
          className="dropDown"
          value={TranslateToLanguage}
          onChange={(e) => this.changeToHandler(e.target.value)}>

          {languageCodes.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}

        </select>

        <textarea
          className="textBoxes"
          type="text"
          placeholder="Translation"
          value={this.state.TranslateTo}
          onChange={(e) => this.changeTranslateToTextHandler(e.target.value)}>
        </textarea>
        
        <button className="button" type="button" onClick={this.TranslateWords}>
          Translate
        </button>
        
      </div>
    );
  }
  //Handlers Start so that we can change the state of our module.
  changeToHandler = (language) => {
    this.setState({ TranslateToLanguage: language });
  };
  changeFromHandler = (language) => {
    this.setState({ TranslateFromLanguage: language });
  };
  changeTranslateFromTextHandler = (text) => {
    this.setState({ TranslateFrom: text });
  };
  changeTranslateToTextHandler = (text) => {
    this.setState({ TranslateTo: text });
  };
  switchLangHandler = (languages) => {
    const currentFromLang = this.state.TranslateFromLanguage;
    const currentToLang = this.state.TranslateToLanguage;
    const currentFromTrans = this.state.TranslateFrom;
    const currentToTrans = this.state.TranslateTo;
    this.setState({ TranslateToLanguage: currentFromLang, TranslateFromLanguage: currentToLang, TranslateTo: currentFromTrans, TranslateFrom: currentToTrans});
  }

  //Executing translation in TranslateWords
  TranslateWords = () => {
    
    let translateFrom = this.state.TranslateFrom;
    let translateFromLanguage = this.state.TranslateFromLanguage;
    let translateToLanguage = this.state.TranslateToLanguage;

    //Building the URL to hit Google with correct parameters
    let url = "https://translation.googleapis.com/language/translate/v2?key=" + API_KEY;
    url += "&q=" + encodeURI(translateFrom);
    url += "&source=" + translateFromLanguage;
    url += "&target=" + translateToLanguage;

    //Using axios to actually send the get request then setting our Text to the result.
    axios.get(url).then(res => {
    this.setState({TranslateTo: res.data.data.translations[0].translatedText});
    });
}

//actually passing our module to render here.
  render() {
    return (
      <div className="translateModule">
        {this.TranslateModule()}
      </div>
    );
  }
}
 

export default Translate;