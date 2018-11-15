import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import AddAuthorForm from "./AddAuthorForm"

// function ClickyButtons({numberOfButtons, onSelection}){
//     const makeButton = 
//         (v => <button key={v} id={v} onclick={event => onSelection (event.target.id)}>{v}</button>);
//     return (
//         <div >
//             <div>Author Quiz Component here</div>
//             <div>
//                 {_.range(1, numberOfButtons + 1).map(makeButton)}
//             </div>
//         </div>
//     );
// }

const authors = [
{
    name: 'Mark Twain',
    imageUrl: 'images/authors/markTwain.jpg',
    imageSource: 'wikimedia',
    books: ['MB1','MB2','MB3']
},
{
    name: 'James Bond',
    imageUrl: 'images/authors/jamesBond.jpg',
    imageSource: 'wikimedia',
    books: ['JB1','JB2']
}
];


function getTurnData(authors){
    const allBooks = authors.reduce(function(p, c){ return p.concat(c.books); }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return{
        books: fourRandomBooks,
        author: authors.find(a => 
            a.books.some(b =>
                b === answer))
    }
}

function resetState(){
    return {
        turnData: getTurnData(authors),
    highlight: ''
    }
}

let  state = resetState();

function onAnswerSelected(answer){
    const isCorrect = state.turnData.author.books.some(b => b === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

function App(){
    return <AuthorQuiz {...state} OnAnswerSelected={onAnswerSelected }
    onContinue={() => { 
        state = resetState();
        render(); 
    }} />
}

const AuthorWrapper = withRouter(({ history }) => 
    <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
    }} />
);

function render(){
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={App} />
                <Route path="/add" component={AuthorWrapper} />
            </React.Fragment>
        </BrowserRouter>
        ,document.getElementById('root'));
}

render();
registerServiceWorker();
