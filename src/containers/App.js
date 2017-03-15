import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ParagraphsList from '../components/ParagraphsList'
import Loader from '../components/Loader'
import TagsList from '../components/TagsList'
import * as paragraphsActions from '../actions/ParagraphsActions'

class App extends Component {
  render() {
    const { paragraphs, fetching, tags, error } = this.props.paragraphs
    const {clickWordInParagraph, addTag, deleteTag} = this.props.paragraphsActions
   
    return <div className='app'>
              { fetching ? <Loader /> :  <div><TagsList  tags={tags} deleteTag={deleteTag} />
                                                <ParagraphsList error={error} paragraphs={paragraphs} clickWordInParagraph={clickWordInParagraph} addTag={addTag}/> 
                                          </div>}
          </div>
  }
  componentDidMount(){
    this.props.paragraphsActions.getParagraphs();
  }
}

function mapStateToProps(state) {
  return {
    paragraphs: state.paragraphs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    paragraphsActions: bindActionCreators(paragraphsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
