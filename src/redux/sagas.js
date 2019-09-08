import api, {requestSaga} from './api/saga'
import { all } from 'redux-saga/effects'

export default function* () {
	yield all([
		api()
	]);
}
