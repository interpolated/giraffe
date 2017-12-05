
//import 3rd party
import reduxCrud from 'redux-crud';
import axios from 'axios';
import {BASE_URL} from '../constants.js'
import {merge} from 'lodash'
import R from 'ramda'

export const sectionActionCreators = reduxCrud.actionCreatorsFor('sections')
export const sectionTypeActionCreators = reduxCrud.actionCreatorsFor('sectionTypes')
export const sectionPropsActionCreators = reduxCrud.actionCreatorsFor('sectionProps')

export const SET_ACTIVE_SECTION = 'SET_ACTIVE_SECTION'
export const SET_ACTIVE_SECTION_TYPE = 'SET_ACTIVE_SECTION_TYPE'
export const SET_CENTER = 'SET_CENTER'

// export function updateSectionType (id, data){
//   return {
//     type:UPDAT
//   }
// }


export function setCenter(obj){
  return {
    type:SET_CENTER,
    payload: obj
  }
}

export function setActiveSection(sectionId){
    return {
      type: SET_ACTIVE_SECTION,
      payload: sectionId
    }
  }

export function setActiveSectionType(sectionTypeId){
    return {
      type: SET_ACTIVE_SECTION_TYPE,
      payload: sectionTypeId
    }
  }

  
// fetchSuccess
// createStart - optimistic creation - need to generate unique id using cuid on key 'id'
// createSuccess
// createError
// updateStart - optimistic
// updateSuccess
// updateError
// deleteStart - optimistic delete
// deleteSuccess
// deleteError