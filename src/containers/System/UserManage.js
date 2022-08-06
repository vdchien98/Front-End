import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/useService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // this này chính là class UserManage
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }

    // Viết Api kết nối với backend
    async componentDidMount() {
        await this.getAllUsersFromReact();
        // console.log(response);
    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };
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
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    };
    createNewuser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                // muốn tắt modal',
                this.setState({
                    isOpenModalUser: false,
                });
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    handleDeleteUser = async (user) => {
        // console.log(user);
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(response.errMessage);
            }
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    handleEditUser = (user) => {
        console.log(user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        });
    };
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                });
                await this.getAllUsersFromReact();
            } else {
                alert(res.errCode);
            }
        } catch (e) {
            console.log(e);
        }
    };
    render() {
        // console.log('Check render', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser isOpen={this.state.isOpenModalUser} toggleFromParent={this.toggleUserModal} createNewuser={this.createNewuser} />
                {this.state.isOpenModalEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    ></ModalEditUser>
                )}

                <div className="title text-center"> Manage users with Đăng Chiến</div>
                <div className="mx-4">
                    <button className="btn btn-primary px-2" onClick={() => this.handleAddNewsUser()}>
                        <i className="fas fa-plus px-1"></i>Add New User
                    </button>
                </div>
                <div className="users-table mt-3 mx-4">
                    <table id="customers">
                        <tbody>
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
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit" onClick={() => this.handleEditUser(item)} type="button">
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button className="btn-delete" onClick={() => this.handleDeleteUser(item)} type="button">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
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
