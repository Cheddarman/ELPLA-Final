import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')
// const socket = io.connect('http://10.68.0.141:3001')


export function getRestaurants(searchObj) {
	console.log(searchObj)
	var url = `http://localhost:3001/yelpstuff?term=${searchObj.delivery}&location=89105&radius=${searchObj.searchRadius}`

	if(searchObj.price !== ''){
		url = url + '&price=' + searchObj.price
	} else {
		url = url + '&price=1,2,3,4'
	}

	if(searchObj.foodTypes !== '') {
		url = url + '&categories=' + searchObj.foodTypes
	}
	
	console.log(url)
	axios.get(url).then(function(resp){
		console.log(resp.data)
		store.dispatch({
			type: 'ADD_RESTAURANTS',
			restaurants: resp.data.businesses
		})
	})
}

export function getRestaurant(id) {
	// console.log(id)
	axios.get(`http://localhost:3001/yelprest?bussinessId=${id.restId}`).then(function(response){
		store.dispatch({
			type: 'SINGLE_RESTAURANT',
			restaurant: response.data
		})
	})
}

export function getActivities(searchObj) {
	console.log(searchObj)
	var url = `http://localhost:3001/yelpstuff?term=fun&location=89105&radius_filter=${searchObj.searchRadius}&price=1,2,3,4`

	if(searchObj.price !== '') {
		url = url + '&price=' + searchObj.price
	}
	
	console.log(url)
	axios.get(url).then(function(resp){
		console.log(resp.data)
		store.dispatch({
			type: 'ADD_ACTIVITIES',
			activities: resp.data.businesses
		})
	})
}

export function addLocations(stops) {
	store.dispatch({
		type: 'ADD_LOCATIONS',
		stops
	})
}

export function addToFavorites(date) {
	socket.emit('add favorite', date)
}

socket.on('new fav', function(favorites){
	store.dispatch({
		type: 'UPDATE_FAVORITES',
		favorites
	})
})

export function getFavorites() {
	socket.emit('get favorites')
}

socket.on('get favorites', function(favorites){
	console.log(favorites, 'api')
	store.dispatch({
		type: 'GET_FAVORITES',
		favorites
	})
})