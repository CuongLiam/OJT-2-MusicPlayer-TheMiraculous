import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserStatus } from '../../types/auth.types';
import { adminApi, updateUserStatusApi } from '../../api/core/admin.api';

interface AdminUserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminUserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
  const response = await adminApi.getUsers();
  return response;
});

export const updateUserStatusAsync = createAsyncThunk('admin/updateUserStatus', async ({ userId, status }: { userId: number; status: UserStatus }) => {
  const response = await updateUserStatusApi(userId, status);
  return response;
});

const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {
    updateUserStatus: (state, action: PayloadAction<{ userId: number; status: UserStatus }>) => {
      const user = state.users.find(u => u.id === action.payload.userId);
      if (user) {
        user.status = action.payload.status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });

    builder.addCase(updateUserStatusAsync.fulfilled, (state, action: PayloadAction<User>) => {
      const user = state.users.find(u => u.id === action.payload.id);
      if (user) {
        user.status = action.payload.status;
      }
    });
  },
});

export const { updateUserStatus } = adminUserSlice.actions;
export default adminUserSlice.reducer;
