import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import './Login.scss';
import { handleLoginApi, forgotPasswordApi } from '../../services/useService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            type: 'login',
        };
    }
    handleOnChangeUserName = (event) => {
        this.setState({ username: event.target.value });
        // console.log(event.target.value);
    };
    handleOnChangePassword = (event) => {
        this.setState({ password: event.target.value });
        // console.log(event.target.value);
    };
    handleLogin = async () => {
        // console.log('username: ', this.state.username, 'password: ', this.state.password);
        // console.log('username: ' + this.state.username);
        // console.log('password: ' + this.state.password);
        // console.log('all state', this.state);
        this.setState({
            // đoạn này là clear mã lỗi đi
            errMessage: '',
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                // console.log('login suceeds');
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message,
                    });
                }
            }
            console.log(e.response);
        }
    };
    handleForgot = async () => {
        try {
            let data = await forgotPasswordApi({ userName: this.state.username });
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message,
                    });
                }
            }
            console.log(e.response);
        }
    };
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    handleKeyDown = (event) => {
        // console.log(event);
        if (event.key === 'Enter' || event.Code === 13) {
            this.handleLogin();
        }
    };
    render() {
        //JSX

        return (
            <div className="login-background">
                <div className="login-container">
                    {this.state.type === 'login' && (
                        <div className="login-content row">
                            <div className="col-12 text-login">Log In</div>
                            <div className="col-12 form-group login-input">
                                <label className="">Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your username"
                                    value={this.state.username}
                                    onChange={(event) => {
                                        this.handleOnChangeUserName(event);
                                    }}
                                />
                            </div>
                            <div className="col-12 form-group login-input">
                                <label className="">Password:</label>
                                <div className="custom-input-password">
                                    <input
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={this.state.password}
                                        onChange={(event) => {
                                            this.handleOnChangePassword(event);
                                        }}
                                        onKeyDown={(event) => this.handleKeyDown(event)} // Đây là sự kiện ấn enter để đăng nhập
                                    />
                                    <span
                                        onClick={() => {
                                            this.handleShowHidePassword();
                                        }}
                                    >
                                        <i className={this.state.isShowPassword ? 'far fa-eye' : 'fas fa-eye-slash'}></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12" style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className="col-12 ">
                                <button
                                    className="btn-login"
                                    onClick={() => {
                                        this.handleLogin();
                                    }}
                                >
                                    Log In
                                </button>
                            </div>

                            <div className="col-12">
                                <a
                                    className="forgot-password"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                            type: 'forgot',
                                        });
                                    }}
                                    href="/"
                                >
                                    Forgot your password ?
                                </a>
                            </div>
                            <div className="col-12 text-center mt-3">
                                <span className="text-other-login">Or Login With: </span>
                            </div>
                            <div className="col-12 social-login">
                                <i className="fab fa-google-plus-g google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>
                        </div>
                    )}
                    {this.state.type === 'forgot' && (
                        <div className="login-content row">
                            <div className="col-12 text-login">Quên mật khẩu</div>
                            <div className="col-12 form-group login-input">
                                <label className="">Email:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your username"
                                    value={this.state.username}
                                    onChange={(event) => {
                                        this.handleOnChangeUserName(event);
                                    }}
                                />
                            </div>
                            <div className="col-12 ">
                                <button
                                    className="btn-login"
                                    onClick={() => {
                                        this.handleForgot();
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
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
    return {
        navigate: (path) => dispatch(push(path)),

        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
