import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getAllSpecialty,
    getAllClinic,
} from '../../services/useService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFaided());
            }
        } catch (e) {
            dispatch(fetchGenderFaided());
            console.log('fetchGenderStart error', e);
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFaided());
            }
        } catch (e) {
            dispatch(fetchPositionFaided());
            console.log('fetchPositionFaided error', e);
        }
    };
};
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData, // truyền data qua bên reducers
});
export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFaided());
            }
        } catch (e) {
            dispatch(fetchRoleFaided());
            console.log('fetchRoleFaided error', e);
        }
    };
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData, // truyền data qua bên reducers
});
export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Create a new user succeed!!');
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', e);
        }
    };
};

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED,
});
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');

            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error('Fetch all user error!!');

                dispatch(fetchAllUsersFaided());
            }
        } catch (e) {
            toast.error('Fetch all user error!!');

            dispatch(fetchAllUsersFaided());
            console.log('fetchAllUsersFaided error', e);
        }
    };
};
export const fetchAllUsersSuccess = (data) => ({
    //data này là lấy từ lấy từ API về cũng chính là res.data ở bên trên
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data,
});
export const fetchAllUsersFaided = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDED,
});

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete the  user succeed!!');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Delete the  user error!!');

                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error('Delete the  user error!!');

            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error', e);
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED,
});

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Update the  user succeed!!');
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Update the  user error!!');
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error('Update the  user error!!');
            dispatch(editUserFailed());
            console.log('EditUserFailed error', e);
        }
    };
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED,
});

// let res1 =

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            // console.log('dang chien check res', res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
                });
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILDED', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
            });
        }
    };
};

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            // console.log('dang chien check res', res);
            // console.log(res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
                });
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILDED', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
            });
        }
    };
};

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            // console.log('dang chien check res', res);
            // console.log(res);
            if (res && res.errCode === 0) {
                toast.success('Save Infordetail the  doctor succeed!!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            } else {
                toast.error('Save Infordetail the  doctor error!!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
                });
            }
        } catch (e) {
            toast.error('Save Infordetail the  doctor error!!');
            console.log('SAVE_DETAIL_DOCTOR_FAILDED', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
            });
        }
    };
};

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
                });
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILDED', e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
            });
        }
    };
};

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
            });
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0 &&
                resSpecialty &&
                resSpecialty.errCode === 0 &&
                resClinic &&
                resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                };
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFaided());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFaided());
            console.log('fetchRequiredDoctorInforFaided error', e);
        }
    };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData,
});
export const fetchRequiredDoctorInforFaided = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED,
});
