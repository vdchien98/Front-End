import React, { Component } from 'react';

import { connect } from 'react-redux';
import HomeHader from './HomeHader';
class HomePage extends Component {
    render() {
        return (
            <div>
                <HomeHader />
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
