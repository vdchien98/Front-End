import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/useService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
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
    }
    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        console.log('dang chien check props from redux', this.props.genderRedux);
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
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    {' '}
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <input type="text" className="form-control" />
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
                ;
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        //processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
