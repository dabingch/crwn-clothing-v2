import { createAction } from '../../utils/reducer/reducer'

import USER_ACTION_TYPES from './user.types.js'

export const setCurrentUser = (user) => {
	// Must have return statement otherwise will throw a null error from redux logger
	return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
}
