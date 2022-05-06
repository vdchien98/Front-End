import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/useService';
import ModalUser from './ModalUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // this này chính là class UserManage
            arrUsers: [],
            isOpenModalUser: false,
        };
    }

    // Viết Api kết nối với backend
    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
        console.log(response);
    }

    handleAddNewsUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    render() {
        console.log('Check render', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser isOpen={this.state.isOpenModalUser} toggleFromParent={this.toggleUserModal} test={'abc'} />
                <div className="title text-center"> Manage users with Đăng Chiến</div>
                <div className="mx-4">
                    <button className="btn btn-primary px-2" onClick={() => this.handleAddNewsUser()}>
                        <i className="fas fa-plus px-1"></i>Add New User
                    </button>
                </div>
                <div className="users-table mt-3 mx-4">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {arrUsers &&
                            arrUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit" type="button">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </button>
                                                <button className="btn-delete" type="button">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
