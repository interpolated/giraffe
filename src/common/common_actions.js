
//import 3rd party
import reduxCrud from 'redux-crud';
import axios from 'axios';
import {BASE_URL} from '../constants.js'
import {merge} from 'lodash'
import R from 'ramda'

export const sectionActionCreators = reduxCrud.actionCreatorsFor('sections')
export const sectionTypeActionCreators = reduxCrud.actionCreatorsFor('sectionTypes')

export const SET_ACTIVE_SECTION = 'SET_ACTIVE_SECTION'
export const SET_ACTIVE_SECTION_TYPE = 'SET_ACTIVE_SECTION_TYPE'


export function setActiveSection(sectionId){
    return {
      type: SET_ACTIVE_SECTION,
      payload: sectionId
    }
  }

  
export function setActiveSectionType(sectionTypeId){
    return {
      type: SET_ACTIVE_SECTION,
      payload: sectionTypeId
    }
  }

  
// fetchSuccess
// createStart - optimistic creation - need to generate unique id using cuid on key 'id'
// createSuccess
// createError
// updateStart
// updateSuccess
// updateError
// deleteStart
// deleteSuccess
// deleteError