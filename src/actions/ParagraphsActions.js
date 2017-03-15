import {
  GET_PARAGRAPHS_REQUEST,
  GET_PARAGRAPHS_SUCCESS,
  GET_PARAGRAPHS_FAILURE,
  CLICK_WORD_INPARAGRAPH,
  ADD_TAG_REQUEST,
  ADD_TAG_SUCCESS,
  ADD_TAG_FAILURE,
  DELETE_TAG_REQUEST,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_FAILURE
} from '../constants/Paragraphs'
import {getAsync, postAsync, deleteAsync} from '../api/requestFetch'

export const  getParagraphs = () => {
  return (dispatch) => {
    dispatch({
      type: GET_PARAGRAPHS_REQUEST
    })
    getAsync('paragraphs/').then(data => {
      dispatch({
      type: GET_PARAGRAPHS_SUCCESS,
      payload: {
        paragraphs: data.paragraphs,
        tags: data.tags
      }
    })
    }).catch( error => {
      dispatch({
      type: GET_PARAGRAPHS_FAILURE,
      payload: error
    })
    })
  }
}

export const clickWordInParagraph = (word, indexWord, indexParagraphs) => ({
   type: CLICK_WORD_INPARAGRAPH,
   payload: {
    word,
    indexWord,
    indexParagraphs
   }
 })

 export const addTag = (word) => {
   return (dispatch) => {
    dispatch({
      type: ADD_TAG_REQUEST
    })
   postAsync('tags/', {value: word.toLowerCase().replace(/[,.!?;:()]/g, '')}).then(data => {
      dispatch({
      type:  ADD_TAG_SUCCESS,
      payload: data
    })
   }).catch( error => {
      dispatch({
      type: ADD_TAG_FAILURE,
      payload: error
    })
    })
 }
}

export const deleteTag = (value, id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_TAG_REQUEST
    })
    deleteAsync('tags/'+id).then(() => {
      dispatch({
        type: DELETE_TAG_SUCCESS,
        payload: {
          id,
          value
        }
      })
    }).catch( error => {
      dispatch({
      type: DELETE_TAG_FAILURE,
      payload: error
    })
    })
  }
  
}