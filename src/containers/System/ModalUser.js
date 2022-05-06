import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    toggle = () => {
        this.props.toggleFromParent();
    };

    render() {
        console.log('Check child props', this.props);
        console.log('Check child open modal', this.props.isOpen);

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                size="lg"
                // centered
                className={'modal-user-container'}
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    Create a new User
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row ">
                            <div className="col-6 form-group mb-2">
                                <label>Email</label>
                                <input type="text" className="form-control mt-2" />
                            </div>
                            <div className="col-6 form-group mb-2">
                                <label>Password</label>
                                <input type="password" className="form-control mt-2" />
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-6 form-group mb-2">
                                <label>First Name</label>
                                <input type="text" className="form-control mt-2" />
                            </div>
                            <div className="col-6 form-group mb-2">
                                <label>Last Name</label>
                                <input type="text" className="form-control mt-2" />
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-12 form-group mb-2">
                                <label>Address</label>
                                <input type="text" className="form-control mt-2" />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.toggle();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
