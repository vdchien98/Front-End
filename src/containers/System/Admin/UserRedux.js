import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // this.props.dispatch(actions.fetchGenderStart());
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         });
        //     }
        //     console.log('DANG CHIEN', res);
        // } catch (e) {
        //     console.log(e);
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // đc goi khi hàm render chạy xong
        // nó so sánh hiện tại ( this) vs quá khứ (previous)
        // so sánh quá khứ là mảng rỗng và hiện tại là 3 phần tử
        // so sánh xong sẽ render lần nữa và tiếp tục so sánh khi đó qk vs ht đều là 3 phần tử nên dừng
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
            });
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
            });
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
            });
        }
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        console.log('check file ảnh ', file);
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
            });
            console.log('check file ảnh ssssssss', objectUrl);
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };
    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;

        let positions = this.state.positionArr;

        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;
        console.log('dang chien check state from redux', this.state);
        return (
            <div className="user-redux-container">
                <div className="title">Learn React-Redux Đăng Chiến </div>
                <div className="text-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {' '}
                                <FormattedMessage id="manage-user.add" />{' '}
                            </div>
                            <div className="col-12">{isGetGenders === true ? 'Loading Genders' : ''}</div>
                            <div className="col-3 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input className="form-control" type="email" />
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.password" />{' '}
                                </label>
                                <input className="form-control" type="password" />
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-9 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select className="form-control">
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>;
                                        })}
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select className="form-control">
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>;
                                        })}
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select className="form-control">
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>;
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
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary">
                                    {' '}
                                    <FormattedMessage id="manage-user.save" />
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        //processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
