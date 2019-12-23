import React, { Component } from 'react';
import './Home.css';
import SearchBox from './SearchBox';
import axios from 'axios';
import Spinner from '../../utility/Spinner/Spinner';
import Cities from '../../utility/City/Cities';

class Home extends Component {
    state = {
        cities: []
    }

    async componentDidMount() {
        const recommendedCities = await axios.get(`${window.apiHost}/cities/recommended`);
        // console.log(recommendedCities.data);
        this.setState({cities: recommendedCities.data});
    }

    render() {
        // console.log(this.state.cities);
        if (this.state.cities.length === 0) {
            return (
                <Spinner />
            );
        }

        const recCities = <Cities cities={this.state.cities} />

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="home col s12">
                        <div className="upper-fold">
                            <SearchBox />
                        </div>
                    </div>
                    {recCities}
                </div>
            </div>
        );
    }
}

export default Home;