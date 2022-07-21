import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RequestStatus } from "../shared/enums/request-status"
import clientReq from "../utils/api"

export interface IAuthState {
    email: string,
    password: string,
    user: any | null,
    status: RequestStatus
}

const initialState: IAuthState = {
    email: '',
    password: '',
    user: null,
    status: RequestStatus.fulfilled
}

export const loginAsync = createAsyncThunk('auth/authLogin', async (data: { email: string, password: string }) => {
    const response = await clientReq.post('/user/login', data, );
    console.log(response)
    return response.data;
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        logout: (state) => {
            localStorage.removeItem('userToken');
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = RequestStatus.pending;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = RequestStatus.fulfilled;
                state.user = action.payload;

                localStorage.setItem('userToken', action.payload.token)
                console.log(localStorage.getItem('userToken'))
            })
            .addCase(loginAsync.rejected, (state) => {
                state.status = RequestStatus.rejected;
            })
    }
})

export const { setEmail, setPassword, logout } = authSlice.actions;

export default authSlice.reducer;