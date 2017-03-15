import React, {PropTypes, Component } from 'react';
import Tag from './Tag.js'

export default class TagsList extends Component {
  render() {
    const { tags, deleteTag} = this.props
    return <div className='tagsList'>
              <h2>Your tags:</h2>
              <ul>
                {tags.map((tag, index) => 
                            <Tag key={index} tag={tag} deleteTag={deleteTag} />
                  )}
            </ul>
           </div>

  }
}

TagsList.propTypes = {
  tags: PropTypes.array.isRequired
}