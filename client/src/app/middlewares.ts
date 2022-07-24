import { RootState } from './store'; 
import { Action, AnyAction } from '@reduxjs/toolkit';

export const authMiddleware = (store: any) => (next: Function) => (action: AnyAction) => {
    console.log(localStorage.getItem('userToken'));
    next();
}