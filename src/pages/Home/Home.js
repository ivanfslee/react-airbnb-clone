import React, { Component } from 'react';
import './Home.css';
import SearchBox from './SearchBox';
import axios from 'axios';
import Spinner from '../../utility/Spinner/Spinner';
import Cities from '../../utility/City/Cities';

class Home extends Component {
    state = {
        cities: [],
        europeCities: {},
        asiaCities: {},
        exoticCities: {}
    }

    async componentDidMount() {
        const recommendedCities = axios.get(`${window.apiHost}/cities/recommended`);
        const europeCitiesUrl = axios.get(`${window.apiHost}/cities/europe`);
        const asiaCitiesUrl = axios.get(`${window.apiHost}/cities/asia`);
        const exoticCitiesUrl = axios.get(`${window.apiHost}/cities/exotic`);

        const citiesPromises = [recommendedCities, europeCitiesUrl, asiaCitiesUrl, exoticCitiesUrl];

        Promise.all(citiesPromises).then(data => {
            const recommendedCities = (data[0].data);
            const europeCities = (data[1].data);
            const asiaCities = (data[2].data);
            const exoticCities = (data[3].data);
            this.setState({
                cities: recommendedCities,
                europeCities,
                asiaCities,
                exoticCities
            });
        })

        // const recommendedCities = `${window.apiHost}/cities/recommended`;
        // const europeCitiesUrl = `${window.apiHost}/cities/europe`;
        // const asiaCitiesUrl = `${window.apiHost}/cities/asia`;
        // const exoticCitiesUrl = `${window.apiHost}/cities/exotic`;

        // const citiesPromises = [];

        // citiesPromises.push(axios.get(recommendedCities));
        // citiesPromises.push(axios.get(europeCitiesUrl));
        // citiesPromises.push(axios.get(asiaCitiesUrl));
        // citiesPromises.push(axios.get(exoticCitiesUrl));

        // Promise.all(citiesPromises).then(data => {
        //     console.log(data[0].data);
        //     console.log(data[1].data);
        //     console.log(data[2].data);
        //     console.log(data[3].data);
        // })


    }

    render() {
        console.log(this.state.cities);
        if (this.state.cities.length === 0) {
            return (
                <Spinner />
            );
        }

        return (
            <>
            <div className="container-fluid">
                <div className="row">
                    <div className="home col s12">
                        <div className="upper-fold">
                            <SearchBox />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid lower-fold">
                <div className="row">
                    <div className="col s12">
                        <Cities cities={this.state.cities} header="Recommended Cities For You" />    
                    </div>
                    <div className="col s12">
                        <Cities cities={this.state.europeCities.cities} header={this.state.europeCities.header} />    
                    </div>
                    <div className="col s12">
                        <Cities cities={this.state.asiaCities.cities} header={this.state.asiaCities.header} />    
                    </div>
                    <div className="col s12">
                        <Cities cities={this.state.exoticCities.cities} header={this.state.exoticCities.header} />    
                    </div>

                </div>
            </div>
            </>
        );
    }
}

export default Home;