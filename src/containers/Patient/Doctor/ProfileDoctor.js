import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import NumberFormat from 'react-number-format';
import { getProfileDoctorById } from '../../../services/useService';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    render() {
        let { dataProfile } = this.state;
        let { language } = this.props;
        console.log('Dang chien check 9498 state', this.state);
        let nameVi = '',
            nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.ValueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    ></div>
                    <div className="content-right">
                        <div className="up">
                            {/* djkjdksl */}
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                                <span>{dataProfile.Markdown.description}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    Giá Khám :
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI && (
                        <NumberFormat
                            className="currency"
                            value={dataProfile.Doctor_Infor.priceTypeData.ValueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                    )}
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN && (
                        <NumberFormat
                            className="currency"
                            value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
