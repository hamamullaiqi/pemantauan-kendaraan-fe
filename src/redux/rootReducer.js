// ** Reducers Imports
import apps from './reducer/apps'
import auth from './reducer/auth'
import nav from './reducer/navigations'
const rootReducer = {
  auth,
  apps, 
  nav
}

export default rootReducer
