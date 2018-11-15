import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import './bootstrap.min.css';
import { Link } from 'react-router-dom';

function Hero(){
  return (
    <div className="row" >
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

function Book({title, onBookClicked}){
  return (
    <div className="answer" onClick={() => {onBookClicked(title);}} > 
    <h4>{title}</h4>
    </div>
  );
}

function Turn({author, books, highlight, OnAnswerSelected }) {

  function colorMap(highlight){
    const mapping = {
      'none' : '',
      'correct' : 'green',
      'wrong' : 'red'
    }
    return mapping[highlight];
  }
  return(
  <div className="row turn" style={{backgroundColor: colorMap(highlight)}}>
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="authorImage" alt="Author Was Here" /> 
    </div>
    <div className="col-6">
      {books.map((title) => <Book title={title} key={title} onBookClicked={OnAnswerSelected} />)}
    </div>
  </div>);
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  OnAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
}

function Continue({show, onContinue}) {
  return (<div className="row continue">
    {show ? <div className="col-11">
              <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
              </div>
              : null}
  </div>);
}

function Footer(){
  return (
    <div id="footer" className="row">
    <div className="col-12">
    <p className="text-muted credit">All images are from x</p> 
    <p className="text-muted credit">Made by Anthony</p> 
    </div>
    </div>
  );
}

function AuthorQuiz({turnData, highlight, OnAnswerSelected, onContinue}) {
  
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} OnAnswerSelected={OnAnswerSelected} />
        <Continue show={highlight === 'correct'} onContinue={onContinue} />
        <p> 
          <Link to="/add">Add an Author</Link>
        </p>
        <Footer />
      </div>
    );
  
}

export default AuthorQuiz;
