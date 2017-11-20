// combines and exports combined reducers

// third party
import {combineReducers} from 'redux';
import reduxCrud from 'redux-crud';

// set active - for UI and CRUD
import {setActiveSection} from './common/common_reducers';
import {setActiveSectionType} from './common/common_reducers';


import {setRedirectUrl, toggleLoggedIn, setUserToken} from './authentication/authentication_reducers'

const rootReducer = combineReducers(
      {
        // sections and section types
        sections:reduxCrud.Map.reducersFor('sections'),
        sectionTypes:reduxCrud.Map.reducersFor('sectionTypes'),
        
        // active section and section type
        activeSection:setActiveSection,
        activeSectionType:setActiveSectionType,
        
        // auth management
        isLoggedIn:toggleLoggedIn,
        redirectUrl:setRedirectUrl,
        userToken:setUserToken
      }
  );


export default rootReducer;



  








// initialState = {
//     staffUp:
//     activeStaffMember: id,
//     staffInfo: {staffId:{deskId,name},staffId,deskId}
// }

// computed
//     unassignedDesks:
//     unassignedStaff:


