import React, { Component } from 'react'
import Paragraph from '../components/Paragraph'

export default class ParagraphsList extends Component{
    render(){
        const {paragraphs, addTag, clickWordInParagraph, error} = this.props;
        return <div className='paragraphsList'>
                <h2>Your text:</h2>
                {error != null ? <p className='error'>{error}</p> : null}
                {paragraphs.map((paragraph, index) => 
                <Paragraph key={index} 
                            indexParagraphs={index}  
                            words={paragraph} 
                            addTag={addTag} 
                            clickWordInParagraph={clickWordInParagraph} />)}
            </div>    
    }
}
