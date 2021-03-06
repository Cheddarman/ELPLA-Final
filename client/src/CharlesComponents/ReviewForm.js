import React from 'react'
import {saveReview} from '../api/UserAPI'
import {connect} from 'react-redux'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

class ReviewForm extends React.Component {
  constructor() {
    super()
    this.state = {
    	review: ''
    }
  }
  handleChange = (e) => {
  	this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    var name = this.props.username
    e.preventDefault()
    saveReview(this.state.review, name)
    this.setState({
      review: ''
    })
  }
  render() {
    return (
      <div style={{
            background: 'url(https://upload.wikimedia.org/wikipedia/commons/3/3d/Jumbo_Floating_Restaurant_-_Outside.jpg)',
      }}>
        <section style={{background: 'rgba(43,26,0,0.8)', padding: '100px 40px'}}>
        <p style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '14px',
          margin: '0px'
        }}>We really appreciate constructive criticism.</p>
        <p style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '35px',
          margin: '0px 0px 50px 0px'
        }}>Tell us how we're doing!</p>

        <form 
          style={{
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          onSubmit={this.handleSubmit}>
          
          <TextField
              hintText="Write your review here..."
              onChange={this.handleChange}
              name="review"
              underlineFocusStyle={{borderColor: '#FF6E00'}}
              value={this.state.review}
              type="text"
              multiLine={true}
              rowsMax = {6}
              style={{
                  backgroundColor: 'white',
                  height: '40px',
                  width: '600px'
              }}
              hintStyle={{
                  position: 'absolute',
                  top: '22px',
                  left: '15px',
                  color: 'black'
              }}
              inputStyle={{
                  lineHeight: '40px',
                  fontSize: '17px',
                  padding: '0px 15px'
              }}
              underlineStyle={{
                  position: 'relative',
                  top: '0px'
              }}
          />

          <FlatButton
            rippleColor="rgba(255,255,255,0.5)"
            style={{
              backgroundColor: '#FF6E00',
              cursor: 'pointer',
              padding: '0px 10px',
              marginTop: '20px',
            }}
          >
            <button
              type="submit"
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                textTransform: 'uppercase',
                color: '#0B3954',
              }}>
                Submit Review!
              </button>
          </FlatButton>

      	</form>
        </section>
      </div>
    )
  }
}

function mapStateToProps(appState){
  return {username: appState.username}
}

export default connect(mapStateToProps)(ReviewForm)

// <input onChange={this.handleChange} type='text' placeholder='Enter your name' name='name' value={this.state.name} />