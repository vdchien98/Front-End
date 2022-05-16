import React, { Component } from 'react';

import { connect } from 'react-redux';
import HomeHader from './HomeHader';
import Specialty from './Section/Specialty';
class HomePage extends Component {
    render() {
        return (
            <div>
                <HomeHader />
                <Specialty />
                <div style={{ height: '300px' }}></div>
            </div>
        );
    }
}

// Import redux vao 2 ham naymapStateToProps mapDispatchToProps
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
