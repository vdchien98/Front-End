import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">Truyền Thông nói về Sức Khỏe</div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://youtu.be/tvHEfX0rU2c"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullscreen
                        ></iframe>
                    </div>
                    <div className="content-right">
                        <h4> Thói quen sống lành mạnh cần có hằng ngày </h4>
                        <p>
                            Lối sống lành mạnh không đơn giản chỉ là thỉnh thoảng ăn vài món salad hay đi bộ một đoạn ngắn vài tuần một lần. Mặt khác,
                            tuy cần nhiều nỗ lực hơn để có lối sống lành mạnh, nhưng điều đó rất xứng đáng nếu bạn muốn duy trì sức khỏe. Để duy trì
                            lối sống lành mạnh, bạn cần kiên trì chọn thực phẩm tốt cho sức khỏe, kết hợp thêm nhiều bài tập thể dục và hoạt động thể
                            chất vào sinh hoạt hàng ngày, đồng thời giữ vệ sinh sạch sẽ. Ngoài ra, bạn cần tránh các thói quen không lành mạnh như ăn
                            kiêng cấp tốc và ngủ không đủ giấc. Để cải thiện lối sống, bạn cần thay đổi một cách từ từ và một khi đã thực hiện được,
                            sức khỏe của bạn sẽ tốt hơn
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
