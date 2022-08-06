import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };

        this.listenToEmiiter();
    }
    listenToEmiiter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            // console.log('listen emitter', data);
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            });
        });
    }
    componentDidMount() {
        console.log('mouting Modal');
    }
    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeInput = (event, id) => {
        // bad code
        // this.state[id] = event.target.value;
        // this.setState(
        //     {
        //         ...this.state,
        //     },
        //     () => {
        //         console.log('check bad state', this.state);
        //     }
        // );
        //good code
        let copyState = { ...this.state };
        // console.log(copyState)
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
        // console.log(event.target.value, id);
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

    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            // Goi API
            this.props.createNewuser(this.state);
            // console.log('data modal', this.state);
        }
    };
    render() {
        // console.log('Check child props', this.props);
        // console.log('Check child open modal', this.props.isOpen);
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
                    Create a new User
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
                            this.handleAddNewUser();
                        }}
                        className="px-3"
                    >
                        Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
