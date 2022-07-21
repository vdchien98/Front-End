import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Slider from 'react-slick';

class HandBook extends Component {
    render() {
        return (
            <div className="section-share section-handbook">
                <div className="section-container ">
                    <div className="section-header">
                        <span className="title-section">Cẩm Nang </span>
                        {/* <button className=" btn-section">Xem Thêm </button> */}
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-handbook" />
                                <div>Co Xuong Khop 1</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handbook" />
                                <div>Co Xuong Khop 2</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handbook" />
                                <div>Co Xuong Khop 3</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handbook" />
                                <div>Co Xuong Khop 4</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handbook" />
                                <div>Co Xuong Khop 5</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handbook" />
                                <div>Co Xuong Khop 6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
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

// export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
