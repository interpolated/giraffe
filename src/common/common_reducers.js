import {merge} from 'lodash'
import {SET_ACTIVE_SECTION,SET_ACTIVE_SECTION_TYPE} from './common_actions'


// reduxCrud reducers set up in reducers_index

//set active reducers
export function setActiveSection(state='', action){
  switch(action.type){
    case SET_ACTIVE_SECTION:
      return action.payload 
    default:
     return state
  }
}

export function setActiveSectionType(state='', action){
  switch(action.type){
    case SET_ACTIVE_SECTION_TYPE:
      return action.payload 
    default:
     return state
  }
}