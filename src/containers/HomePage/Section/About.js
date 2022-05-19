import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">Truyền Thông nói về Đăng Chiến</div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/rgDssjm51i4"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullscreen
                        ></iframe>
                    </div>
                    <div className="content-right">
                        <p>
                            Thế là hết! Anh Bé đi tù tháng 6 năm 1975, sau đó tôi chỉ nhận được ba lá thư của anh. Lá cuối cùng đề tháng 2, 1976, gởi
                            từ trại Suối Máu, Biên Hòa. Sau đó, anh bặt tin. Tôi chờ đợi mòn mỏi, lên xuống trạm công an cả chục lần, hỏi gì họ cũng
                            trả lời không biết. Cuối cùng, tôi nhất quyết làm đơn khiếu nại. Lúc đó, tôi và sáu đứa con - đứa lớn nhất mười một tuổi,
                            đứa nhỏ nhất mới lên hai - đang nương náu trong một mảnh vườn hẻo lánh
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
