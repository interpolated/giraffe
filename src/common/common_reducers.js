import {merge} from 'lodash'
import {SET_ACTIVE_SECTION,SET_ACTIVE_SECTION_TYPE, SET_CENTER} from './common_actions'


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

export function setCenter(state=[ 151.21013774806318, -33.84333797354172],action){
  switch(action.type){
    case SET_CENTER:
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