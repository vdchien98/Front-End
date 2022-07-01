import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';
class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            });
        }
        console.log('didmout edit modal', this.props.currentUser);
    }
    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing paramerter' + arrInput[i]);
                break;
            }
        }
        return isValid;
    };

    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            // Goi API edit user
            this.props.editUser(this.state);
        }
    };
    render() {
        // console.log('check props from parent', this.props);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                size="lg"
                // // centered
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                    className={'modal-user-container'}
                >
                    Edit a new User
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row ">
                            <div className="col-6 form-group mb-2">
                                <label>Email</label>
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event, 'email');
                                    }}
                                    value={this.state.email}
                                    disabled
                                />
                            </div>
                            <div className="col-6 form-group mb-2">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-2"
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event, 'password');
                                    }}
                                    value={this.state.password}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-6 form-group mb-2">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event, 'firstName');
                                    }}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className="col-6 form-group mb-2">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event, 'lastName');
                                    }}
                                    value={this.state.lastName}
                                />
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-12 form-group mb-2">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event, 'address');
                                    }}
                                    value={this.state.address}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.handleSaveUser();
                        }}
                        className="px-3"
                    >
                        Save changes
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => {
                            this.toggle();
                        }}
                        className="px-3"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
