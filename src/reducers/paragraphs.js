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

const initialState = {
  fetching: false,
  paragraphs: [],
  tags: [],
  error: null
}

export default function paragraphs(state = initialState, action) {

  switch (action.type) {
    case GET_PARAGRAPHS_REQUEST:
      return { ...state, fetching: true }

    case GET_PARAGRAPHS_SUCCESS:
      return { ...state, paragraphs: generateWordArray(action.payload.paragraphs, action.payload.tags), 
              tags: action.payload.tags, 
              fetching: false,
              error: null }

    case GET_PARAGRAPHS_FAILURE:
      return {...state, fetching: false, error: 'Sorry, error of server!'}
      
    case CLICK_WORD_INPARAGRAPH:
      return {...state, paragraphs: findAllWord(action.payload, state.paragraphs), 
              fetching: false}
    
    case ADD_TAG_REQUEST:
      return {...state, fetching: true}

    case ADD_TAG_SUCCESS:
      return {...state, 
              paragraphs: generateNewParagraphsWithTag(state.paragraphs, [...state.tags, action.payload]), 
              tags: [...state.tags, action.payload], 
              fetching: false,
              error: null}

    case ADD_TAG_FAILURE:
      return {...state, fetching: false, error: 'Sorry, error of server!'}

    case DELETE_TAG_REQUEST:
      return{...state, fetching: true}

    case DELETE_TAG_SUCCESS:
      return {...state, 
              paragraphs: generateNewParagraphsWithoutTag(state.paragraphs, action.payload.value),
              tags: deleteTag(state.tags, action.payload.id),
              fetching: false,
              error: null}

    case DELETE_TAG_FAILURE:
      return {...state, fetching: false, error: 'Sorry, error of server!'}

    default:
      return state;
  }

}
function generateWordArray(data, tags){
  let textArray = [];
  data.forEach((p) => {
    let paragraph = [];
    p.value.split(' ').forEach((word) => paragraph.push({isSelected: false, word: word, isCurrent: false, isTag: false}));
    textArray.push(paragraph);
  });
  textArray.forEach((p, indexP)=>{
      p.forEach((w, indexW) => {
        tags.forEach((t) => {
          if(replaceWord(w.word) == replaceWord(t.value)){
              textArray[indexP][indexW].isTag = true;
          }
        })
    })
  });
  return textArray;
}

function findAllWord(action, paragraphs){
  const {word, indexWord, indexParagraphs} = action;
  let newArray = [...paragraphs];
  paragraphs.forEach((p, indexP) => {
    p.forEach((w, indexW) => {
      newArray[indexP][indexW].isSelected = false;
      newArray[indexP][indexW].isCurrent = false;
      if(replaceWord(w.word) == replaceWord(word)){
        newArray[indexP][indexW].isSelected = true;
      } 
    })
  });
 newArray[indexParagraphs][indexWord].isCurrent = true;
 return newArray
}
function generateNewParagraphsWithTag(paragraphs, tags){
  let textArray = [...paragraphs];
   textArray.forEach((p, indexP)=>{
      p.forEach((w, indexW) => {
        tags.forEach((t) => {
          if(replaceWord(w.word) == replaceWord(t.value)){
              textArray[indexP][indexW].isTag = true;
          }
        })
    })
  });
  return textArray
}

function generateNewParagraphsWithoutTag(paragraphs, tagToDelete){
  let textArray = [...paragraphs];
   textArray.forEach((p, indexP)=>{
      p.forEach((w, indexW) => {
          if(replaceWord(w.word) == replaceWord(tagToDelete)){
              textArray[indexP][indexW].isTag = false;
          }
    })
  });
  return textArray
}
function deleteTag(tags, idTagToDelete){
  let tagsArray = [...tags];
  let newTagsArray = tagsArray.filter(tag => tag._id != idTagToDelete);
  return newTagsArray
}

const  replaceWord = (word) =>  word.toLowerCase().replace(/[,.!?;:()]/g, '');
