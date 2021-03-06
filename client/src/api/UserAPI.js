import store from '../store'
// import axios from 'axios'
import axios from 'axios'

// api.new('http://localhost:3000')
// api.setTokenPath('/login')

// export function login(username, password) {
// 	api.login(username, password, function(){
// 		store.dispatch({
// 			type: 'LOGIN',
// 			username
// 		})
// 	})
// }

// export function addUser(username, password){
// 	api.post('/register').then(function(response){
// 		store.dispatch({
// 			type: 'REGISTER',
// 			username,
// 			password
// 		})
// 	})
// }

export function saveName(username) {
	store.dispatch({
		type: 'SAVE_USERNAME',
		username: username
	})
}

// export function saveReview(review) {
// 	store.dispatch({
// 		type: 'SAVE_REVIEW',
// 		review
// 	})
// }

export function saveReview(review, name){
	axios.post('/review', {review:review, name:name}).then(function(response){
		console.log(response)
		store.dispatch({
			type: 'SAVE_REVIEW',
				review,
				name
		})
	})
}