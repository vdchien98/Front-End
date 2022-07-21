import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';
import { searchDoctor } from '../../services/useService';
import Select from 'react-select';
import { saveBulkScheduleDoctor } from '../../services/useService';
import * as actions from '../../store/actions';
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDoctors: [],
            selectedDoctor: {},
            listDoctors: [],
        };
    }
    // handleChange = (selectedOption) => {
    //     this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption));
    // };

    componentDidMount() {
        this.props.fetchAllDoctors();
        // this.props.fetchAllScheduleTime();
    }
    changeLanguage = (language) => {
        // alert(language)
        this.props.changeLanguageAppRedux(language);
        //fire redux event : actions
    };
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };
    changeSearch = async (event) => {
        let res = await searchDoctor({ search: event.target.value });
        if (res && res.errCode === 0) {
            this.setState({
                dataDoctors: res.data ? res.data : [],
            });
        }
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    };
    render() {
        let language = this.props.language;
        // let { dataDoctors } = this.state;
        // let { selectedOption } = this.state;
        // console.log('check dataDoctors', dataDoctors);
        // console.log('check selectedOption', selectedOption);

        // const options = [
        //     { value: 'chocolate', label: 'Chocolate' },
        //     { value: 'strawberry', label: 'Strawberry' },
        //     { value: 'vanilla', label: 'Vanilla' },
        // ];

        /* Simple example */

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img className="header-logo" src={logo} onClick={() => this.returnToHome()} />
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.speciality" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.searchdoctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.health-facility" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.doctor" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        {' '}
                                        <FormattedMessage id="homeheader.check-health" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.fee" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>Việt Nam</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>English</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className="title3">
                                <FormattedMessage id="banner.title3" />
                            </div>
                            <div className="search">
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                    className="searchDoctor"
                                />
                            </div>

                            {/* <div className="search">
                                <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="Tìm bênh viện "
                                aria-label=""
                                aria-describedby="basic-addon1"
                                onChange={this.changeSearch}
                              />
                             <div></div> */}
                        </div>
                        {/* </div> */}
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child2" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child3" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child4" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child5" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

// Import redux vao 2 ham naymapStateToProps mapDispatchToProps
const mapStateToProps = (state) => {
    // hàm này map state của redux vào props của component react này
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // cachs fire 1 event
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        // truy cap den ham changeLanguageAppRedux thong qua props
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
