import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchOutbox (action){
    try{
        console.log('outbox');
        
        const response = yield axios.get(`/api/contracts/outbox/${action.payload.id}`);
        console.log(action.payload.id);

        yield put ({ type: 'SET_OUTBOX', payload: response.data});
    } catch (error) {
        console.log(error);
    }
}

function* fetchInbox (action){
    try{
        console.log('inbox');
        
        const response = yield axios.get(`/api/contracts/inbox/${action.payload.id}`);
        console.log(action.payload.id);

        yield put ({ type: 'SET_INBOX', payload: response.data});
    } catch (error) {
        console.log(error);
    }
}

function* deleteProject (action){
    try{
        console.log('deleteProject in delete saga project')
        yield axios.delete(`/api/contracts/${action.payload.id}`)
        yield put({
            type: "FETCH_OUTBOX",
            payload: {id:action.payload.managerId}
        })
    }catch (error){
        console.log(error);
    }
}

function* contractSaga() {
    yield takeLatest('FETCH_OUTBOX', fetchOutbox);
    yield takeLatest('FETCH_INBOX', fetchInbox);
    yield takeLatest ('DELETE_PROJECT', deleteProject)
}

export default contractSaga;