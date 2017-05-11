import React, { Component } from 'react'
import { connect } from 'react-redux'

const styles = {
	resImage: {

	}
}

var resId = 1
var actId = 1

class Results extends Component {
	constructor(props) {
		super()
		this.state = {
			restaurants: [],
			res: {},
			activities: [],
			act: {}
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			restaurants: props.restaurants,
			res: props.restaurants[resId],
			activities: props.activities,
			act: props.activities[actId]
		})
	}

	newAct = (e) => {
		e.preventDefault()
		actId += 1

		this.setState({
			act: this.state.activities[actId]
		})

		console.log(this.state)
	}

	newRes = (e) => {
		e.preventDefault()
		resId += 1

		this.setState({
			res: this.state.restaurants[resId]
		})

		console.log(this.state)
	}

	render() {
		console.log(this.state.act)
		return (
			<div>
				<div>
					<button type="button" onClick={this.newRes}>New Restaurant</button>
					<p>{this.state.res.name}</p>
					<img src={this.state.res.image_url} />
					<ul>
						<li>
							<p>{this.state.res.display_phone}</p>
						</li>
						<li>
							<p>{this.state.res.url}</p>
						</li>
					</ul>
				</div>

				<div>
					<button type="button" onClick={this.newAct}>New Activity</button>
					<p>{this.state.act.name}</p>
					<img src={this.state.act.image_url} />
					<ul>
						<li>
							<p>{this.state.act.display_phone}</p>
						</li>
						<li>
							<p>{this.state.act.url}</p>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = function(appState) {
	return {
		restaurants: appState.restaurants,
		activities: appState.activities
	}
}

export default connect(mapStateToProps)(Results)

