import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')
// const socket = io.connect('http://10.68.0.141:3001')


export function getRestaurants(searchObj) {
	console.log(searchObj.price)
	if(searchObj.price !== ''){
		axios.get('http://localhost:3001/yelpstuff?term=tasty&location=89105&price=' + searchObj.price).then(function(resp){
			store.dispatch({
				type: 'ADD_RESTAURANTS',
				restaurants: resp.data.businesses
			})
		})
	} else {
		axios.get(`http://localhost:3001/yelpstuff?term=tasty&location=89105&price=1,2,3,4`).then(function(resp){	
			store.dispatch({
				type: 'ADD_RESTAURANTS',
				restaurants: resp.data.businesses
			})
		})
	}
}

export function getRestaurant(id) {
	console.log(id)
	axios.get(`http://localhost:3001/yelprest?bussinessId=${id.restId}`).then(function(response){
		store.dispatch({
			type: 'SINGLE_RESTAURANT',
			restaurant: response.data
		})
	})
}

export function getActivities(searchObj) {
	console.log(searchObj.price)
	if(searchObj.price !== ''){
		axios.get('http://localhost:3001/yelpstuff?term=fun&location=89105&price=' + searchObj.price).then(function(resp){
			store.dispatch({
				type: 'ADD_ACTIVITIES',
				activities: resp.data.businesses
			})
		})
	} else {
		axios.get(`/yelpstuff?term=fun&location=89105&price=1,2,3,4`).then(function(resp){	
			store.dispatch({
				type: 'ADD_ACTIVITIES',
				activities: resp.data.businesses
			})
		})
	}
}

export function addLocations(stops) {
	store.dispatch({
		type: 'ADD_LOCATIONS',
		stops
	})
}

export function updateRadius(radius) {
	store.dispatch({
		type: 'UPDATE_RADIUS',
		radius
	})
}

export function updateRating(rating) {
	store.dispatch({
		type: 'UPDATE_RATING',
		rating
	})
}

export function updateFoodTypes(types) {
	store.dispatch({
		type: 'UPDATE_FOODTYPES',
		types
	})
}

export function updateActTypes(types) {
	store.dispatch({
		type: 'UPDATE_ACTTYPES',
		types
	})
}

export function updateDelivery(delivery) {
	store.dispatch({
		type: 'UPDATE_DELIVERY',
		delivery
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
	console.log(favorites)
	return favorites
})
