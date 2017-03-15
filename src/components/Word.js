import React, {PropTypes, Component } from 'react';

 export default class Word extends Component{
    render(){
        const {word, isSelected, isCurrent, isTag, clickWordInParagraph, addTag, indexWord, indexParagraphs} = this.props;
        return <span  className={`word ${isSelected ? 'selected-word' : ''}
                                       ${isCurrent ? 'currentWord' : ''}
                                       ${isTag ? 'tagWord':''}`} 
                      onClick={() => clickWordInParagraph(word, indexWord, indexParagraphs)} >
                      {word}
                      {isCurrent && !isTag && <i onClick={() => addTag(word)} className='add-button'>+</i>}
                </span>
    } 
}
Word.propTypes = {
  word: PropTypes.string.isRequired,
  indexWord: PropTypes.number.isRequired,
  indexParagraphs: PropTypes.number.isRequired
}
