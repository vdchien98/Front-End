import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserInfo.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            userEditId: '',
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        this.handleEditUserFromParent(this.props.userInfo);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
            });
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;

            this.setState({
                roleArr: arrRoles,
            });
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;

            this.setState({
                positionArr: arrPositions,
            });
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        console.log('check file ảnh ', file);
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let user = {
            id: this.state.userEditId,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
            avatar: this.state.avatar,
        };
        this.props.editAUserRedux(user);
        this.props.userLoginSuccess(user);
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phonenumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                // isValid: false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgURL: imageBase64,
            userEditId: user.id,
        });
    };

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;
        // console.log('dang chien check state from redux', this.state);

        let { email, password, firstName, lastName, phonenumber, address, gender, position, role } = this.state;
        return (
            <div className="user-redux-container">
                <div className="title">Quản lý thông tin cá nhân </div>
                <div className="text-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className="col-12">{isGetGenders === true ? 'Loading Genders' : ''}</div>
                            <div className="col-3 mt-3">
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'email');
                                    }}
                                    disabled
                                />
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'password');
                                    }}
                                />
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={firstName}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'firstName');
                                    }}
                                />
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={lastName}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'lastName');
                                    }}
                                />
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={phonenumber}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'phonenumber');
                                    }}
                                />
                            </div>
                            <div className="col-9 mt-3">
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={address}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'address');
                                    }}
                                />
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'gender');
                                    }}
                                    value={gender}
                                >
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'position');
                                    }}
                                    value={position}
                                >
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'role');
                                    }}
                                    disabled
                                    value={role}
                                >
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden onChange={(event) => this.handleOnchangeImage(event)} />
                                    <label className="label-upload" htmlFor="previewImg">
                                        Tải Ảnh <i className="fas fa-upload"></i>
                                    </label>
                                    <div
                                        className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                                        <FormattedMessage id="manage-user.edit" />
                                    ) : (
                                        <FormattedMessage id="manage-user.save" />
                                    )}
                                </button>
                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => {
                                        this.props.history.push('/home');
                                    }}
                                >
                                    Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && (
                    <Lightbox mainSrc={this.state.previewImgURL} onCloseRequest={() => this.setState({ isOpen: false })} />
                )}
                ;
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        editAUserRedux: (data) => dispatch(actions.editAUser(data)),

        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
