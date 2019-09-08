import { takeEvery, all, put, call } from 'redux-saga/effects'
import { START, ERROR, SUCCESS } from '../../constants';
import regeneratorRuntime from 'regenerator-runtime'
import actions from './actions'
import requestMiddleware, { request } from 'sm-redux-saga-request'
import $ from 'jquery'

const API = 'https//api.vk.com/method'
const service_key = '458eae73bdacf088258cae7ef68d69234220b3bbf4db86026bb58c30b59869b046c85dd40152cdd550c2c'//'f0f096eff0f096eff0f096ef79f0977b18ff0f0f0f096efacc4c15fa09e53dfa6a27bf4';
const accessToken = `access_token=${service_key}`;

export function* requestSaga(action) {
	const {
		payload, method, url, auth, oldType: type, token_is_active
	} = action;

	//if (auth && !token_is_active) return;

	try {
		yield put({
			...action,
			type: type + START
		});

		const body = payload ? JSON.stringify(payload) : '';

		const data = yield call(
			$.ajax,
			{
				type: method,
				url: 'https://api.vk.com/method' + url + accessToken,
				dataType: 'jsonp',
				async: true,
				data: payload,
				error: error => {
					console.error(error);
				},
				success: data => console.log(data),
			}
		);

		console.log(data)

		/*} else {
			yield put({
				...action,
				type: type + SUCCESS,
				response: {
					data: response.response,
					error: response.status === 100 || response.messages[0].type === 2
						? response.messages[0].message
						: null,
					status: response.status,
					message: response.status === 0 || response.messages[0].type === 0
						? response.messages[0].message
						: null
				}
			});
		}*/
	} catch (resp) {
		console.log(resp)
		yield put({
			...action,
			type: type + SUCCESS,
			response: { data: resp.response }
		})
	}
}

export const getError = (data, response) => {
	if(data.status === 0) return {
		message: 'Unknow error: check your authorization. ' +
			'No \'Access-Control-Allow-Origin\' header is present on the requested resource.'
	};
	if(data.status === 500) return response;
	if(response.messages) return response.messages[0];

	return ''
};

export function* checkVKSaga(action) {
	yield put(request({
		...action,
		method: 'POST',
		auth: true,
		url: `/users.search?`,
		payload: {
			//user_ids: 210700286,
			university: 1187476,
			version: '5.92',
			count: 10000,
			offset: 1000,
			//fields: 'photo_max'
		}
	}))
}

export const checkVKReducer = (state = {}, action) => {
	switch(action.type) {
		case actions.CHECK_VK + START:
			return { loading: true };
		case actions.CHECK_VK + SUCCESS:
			return action.response;
		case actions.CHECK_VK + ERROR:
			return { error: action.error };
		default:
			return state;
	}
};

export default function* rootSaga() {
	yield all([
		takeEvery('REQUEST', requestSaga),
		takeEvery(actions.CHECK_VK, checkVKSaga),
	]);
}
