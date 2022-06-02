import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'; // import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {}
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };
    handleSaveContentMarkdown = () => {
        console.log('dang chien check state:', this.state);
    };
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        // console.log(`Option selected:`, this.state.selectedOption);
    };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        });
    };
    render() {
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">Tạo thêm thông tin bác sĩ</div>
                <div className="more-infor">
                    <div className="content-left form-group">
                        <label>Chọn bác sĩ</label>
                        <Select value={this.state.selectedOption} onChange={this.handleChange} options={options} />
                    </div>
                    <div className="content-right form-group">
                        <label>Thông tin giới thiệu </label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
                            asdffsdfsdfsd
                        </textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor style={{ height: '500px' }} renderHTML={(text) => mdParser.render(text)} onChange={this.handleEditorChange} />
                </div>
                <button onClick={() => this.handleSaveContentMarkdown()} className="save-content-doctor">
                    Lưu thông tin
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        //Hứng acion từ redux để vào react ; users laays trong state của adminReducer
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
