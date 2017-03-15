import React, { PropTypes, Component } from 'react'
import Word from './Word.js'

export default class Paragraph extends Component {
  render() {
    const { words, indexParagraphs, clickWordInParagraph, addTag } = this.props
    return <div className='paragraph'>
        {words.map((word, index) => 
                    <Word key={index} 
                          indexWord={index} 
                          isCurrent={word.isCurrent} 
                          indexParagraphs={indexParagraphs} 
                          isSelected={word.isSelected}
                          isTag={word.isTag} 
                          word={word.word} 
                          clickWordInParagraph={clickWordInParagraph} 
                          addTag={addTag} />
          )}
    </div>
  }
}

Paragraph.propTypes = {
  indexParagraphs: PropTypes.number.isRequired,
  words: PropTypes.array.isRequired
  
}
