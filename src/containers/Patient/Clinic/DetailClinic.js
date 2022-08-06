import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import HomeHader from '../../HomePage/HomeHader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtrainfor from '../Doctor/DoctorExtrainfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailClinicById } from '../../../services/useService';
import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailClinicById({
                id: id,
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.forEach((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    }

    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
        }
    }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        return (
            <div className="detail-specialty-container">
                <HomeHader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                            <>
                                <div>{dataDetailClinic.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                            </>
                        )}
                    </div>
                    {/* <div className="search-sp-doctor">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvince.map((item, index) => {
                                return (
                                    <option value={item.keyMap} key={index}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </option>
                                );
                            })}
                        </select>
                    </div> */}
                    {arrDoctorId &&
                        arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                                // dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schdule">
                                            <DoctorSchedule doctorIdFromParent={item} />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtrainfor doctorIdFromParent={item} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                ;
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
