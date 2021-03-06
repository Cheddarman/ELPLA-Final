import React, { Component } from 'react'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField'
// import SelectField from 'material-ui/SelectField'
// import MenuItem from 'material-ui/MenuItem'
import FilterDrop from '../Filters/FilterDropdown/FilterDrop.js'
import {getRestaurants, getActivities} from '../api/yelpapi'

const styles = {
    container: {
        width: '100%',
        padding: '190px 0px',
        backgroundColor: 'rgba(0,0,0,0.9)',
        backgroundImage: 'url("http://howtofindluv.com/wp-content/uploads/2015/06/bigstock-restaurant-couple-and-holiday-65420062.jpg")',
        backgroundSize: '100% auto'
    },
    title: {
        fontSize: '50px',
        color: '#F7F7F7',
        textAlign: 'center',
        margin: '0px',
        fontFamily: 'Montserrat, sans-serif'
    },
    form: {
        width: '40%',
        padding: '10px 25px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0px auto'
    },
    party: {
        borderRadius: '0',
        height: '25px'
    },
    typeButton: {
        borderRadius: '0px',
        height: '40px',
        width: '100%',
        border: 'none',
        outline: 'none',
        backgroundColor: '#F7F7F7',
        color: '#0B3954',
        margin: '10px 0px',
        fontSize: '16px'
    },
    dateSelect: {
        height: '40px',
        border: 'none',
        outline: 'none',
        borderRadius: '0px',
        marginBottom: '10px'
    },
    partyInput: {
        borderRadius: '0px',
        height: '40px',
        width: '50%',
        border: 'none',
        outline: 'none',
        backgroundColor: '#F7F7F7',
        color: '#0B3954',
        fontSize: '17px',
        padding: '0px 0px 0px 10px'
    },
    maxPrice: {
        height: '40px',
        width: '50%',
        color: '#0B3954',
        backgroundColor: 'white',
        fontSize: '17px',
        padding: '0px',
        margin: '0px 0px 0px 10px',
        outline: 'none',
        border: 'none',
        paddingLeft: '10px'
    },
    lowerForm: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
    },
    moreFiltersButton: {
        width: '100%',
        backgroundColor: '#0B3954',
        textAlign: 'center',
        height: '40px',
        border: 'none',
        outline: 'none',
        marginTop: '10px',
        color: 'white',
        fontSize: '17px'
    },
    generateButton: {
        width: '100%',
        height: '40px',
        backgroundColor: '#FF6E00',
        border: 'none',
        outline: 'none',
        marginTop: '10px',
        fontSize: '20px',
        cursor: 'pointer'
        
    }
}

class DateForm extends Component {
    constructor() {
        super()
        this.state = {
            dateType: '',
            partySize: '',
            maxPrice: '',
            searchRadius: 12.5,
            delivery: false,
            foodTypes: [],
            actTypes: []
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDropChange = (event, index, value) => {
        this.setState({
            dateType: value
        })
    }

    dropDataCallback = (data) => {
        if(data.searchRadius !== this.state.searchRadius) {this.setState({searchRadius: data.searchRadius})}
        if(data.delivery !== this.state.delivery) {this.setState({delivery: data.delivery})}
        if(data.foodTypes !== this.state.foodTypes) {this.setState({foodTypes: data.foodTypes})}
        if(data.actTypes !== this.state.foodTypes) {this.setState({actTypes: data.actTypes})}
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.props)
        var priceRange = ''
        var foodTypes = ''
        var delivery = 'tasty'
        // addFilters(this.state)
        if(this.state.maxPrice !== ''){
            if(this.state.maxPrice <= 10){
                priceRange = '1'
            }
            if(this.state.maxPrice > 10 && this.state.maxPrice <= 30){
                priceRange = '1,2'
            }
            if(this.state.maxPrice > 30 && this.state.maxPrice <=  60){
                priceRange = '1,2,3'
            }
            if(this.state.maxPrice > 60){
                priceRange = '1,2,3,4'
            }
        }

        for(var i=0; i<this.state.foodTypes.length; i++) {
            var foodTypes = foodTypes + this.state.foodTypes[i] + ','
        }

        foodTypes = foodTypes.substring(0, foodTypes.length-1)

        console.log(foodTypes)

        if(this.state.delivery === true) {delivery = 'delivery'}

        if(this.state.dateType === 'meal'){
            getRestaurants({
                price: priceRange,
                delivery: delivery,
                searchRadius: this.state.searchRadius * 1000,
                foodTypes: foodTypes
            })
        }

        if(this.state.dateType === 'entertainment') {
            getActivities({
                price: priceRange,
                searchRadius: this.state.searchRadius * 1000,
                actTypes: this.state.actTypes
            })     
        }

        if(this.state.dateType === 'both' || this.state.dateType === '') {
            getRestaurants({
                price: priceRange,
                delivery: delivery,
                searchRadius: this.state.searchRadius * 1000,
                foodTypes: foodTypes
            })

            getActivities({
                price: priceRange,
                searchRadius: this.state.searchRadius * 1000,
                actTypes: this.state.actTypes
            }) 
        }

        

        if(this.state.dateType === ''){this.props.history.push('/results/meal+act')}
        if(this.state.dateType === 'meal'){this.props.history.push('/results/meal')}
        if(this.state.dateType === 'entertainment'){this.props.history.push('/results/activity')}
        if(this.state.dateType === 'both'){this.props.history.push('/results/meal+act')}
    }

    render() {
        return (
            <div style={styles.container}>
                <p style={styles.title}>Date Generator</p>
                <form style={styles.form} onSubmit={this.handleSubmit}>
                    <DropDownMenu
                        value={this.state.dateType}
                        onChange={this.handleDropChange}
                        autoWidth={false}
                        style={{
                            width: '100%',
                            backgroundColor: 'white',
                            height: '40px',
                            margin: '0px 0px 10px 0px'
                        }}
                        labelStyle={{
                            lineHeight: '40px',
                            padding: '0px 15px',
                        }}
                        selectedMenuItemStyle={{
                            color: '#FF6E00',
                        }}
                        underlineStyle={{
                            margin: '-1px 0px'
                        }}
                        menuItemStyle={{
                            width: '100%'
                        }}
                        iconStyle={{
                            border: '10px',
                            boxSizing: 'border-box',
                            display: 'inline-block',
                            fontFamily: 'Roboto, sans-serif',
                            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            margin: '0px',
                            padding: '12px',
                            outline: 'none',
                            fontSize: '0px',
                            fontWeight: 'inherit',
                            position: 'absolute',
                            zIndex: '1',
                            overflow: 'visible',
                            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                            width: '48px',
                            height: '48px',
                            fill: 'rgb(224, 224, 224)',
                            right: '16px',
                            top: '-2px',
                            background: 'none'
                        }}
                    >
                        <MenuItem
                            value=''
                            disabled={true}
                            primaryText="Date Type"
                        />
                        <MenuItem value='meal' primaryText="Meal Only" />
                        <MenuItem value='entertainment' primaryText="Activity Only" />
                        <MenuItem value='both' primaryText="Meal and Activity" />
                    </DropDownMenu>

                    <div style={styles.lowerForm}>
                        <TextField
                            hintText="Party Size"
                            onChange={this.handleChange}
                            name="partySize"
                            underlineFocusStyle={{borderColor: '#FF6E00'}}
                            value={this.state.partySize}
                            type="number"
                            style={{
                                backgroundColor: 'white',
                                height: '40px',
                            }}
                            hintStyle={{
                                position: 'absolute',
                                top: '8px',
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
                        
                        <TextField
                            hintText="Max. Price (per person)"
                            onChange={this.handleChange}
                            name="maxPrice"
                            underlineFocusStyle={{borderColor: '#FF6E00'}}
                            value={this.state.maxPrice}
                            type="number"
                            style={{
                                backgroundColor: 'white',
                                height: '40px',
                            }}
                            hintStyle={{
                                position: 'absolute',
                                top: '8px',
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
                    </div>

                    <FilterDrop callback={this.dropDataCallback}/>
                    {/*<FilterPanel />*/}
                    
                    <button style={styles.generateButton} type="submit">Generate</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = function(appState) {
    return {
        delivery: appState.delivery,
        searchRadius: appState.searchRadius,
        foodTypes: appState.foodTypes,
        actTypes: appState.actTypes
    }
}

export default DateForm