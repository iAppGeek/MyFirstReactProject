import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({adaptor: new Adapter()});

const state = {
  turnData: {
    books: ['ab1','ab2'],
    author: {
      name: 'name',
      imageUrl: 'img',
      imageSource: 'source',
      books: ['b1','b2','b3']
    } 
  },
  highlight: 'none'
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthorQuiz {...state} OnAnswerSelected={()=>{}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
