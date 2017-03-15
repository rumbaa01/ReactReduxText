import React, {PropTypes, Component } from 'react';

export default class Tag extends Component {
  render() {
    const { tag, deleteTag} = this.props
    return <li className='item-tag'>
              {tag.value} 
              <button className='bntDeleteTag' onClick={()=>deleteTag(tag.value, tag._id)}>Delete</button>
           </li>
  }
}

Tag.propTypes = {
  tag: PropTypes.object.isRequired
}