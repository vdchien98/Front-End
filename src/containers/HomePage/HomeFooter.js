import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                &copy; 2022 Vũ Đăng Chiến More info , please visit. <a href="/"> &#8594; Click here &#8592;</a>
            </div>
        );
    }
}

// Import redux vao 2 ham naymapStateToProps mapDispatchToProps
const mapStateToProps = (state) => {
    // hàm này map state của redux vào props của component react này
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
