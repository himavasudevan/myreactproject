import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users';
const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('accessToken');
};

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url:  'https://localhost:5001/api/Authentication/login',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url:'https://localhost:5001/api/Authentication/registeration' ,
        method: 'POST',
        body: data,
      }),
     }),
    logout: builder.mutation({
      query: () => ({
        url: 'https://localhost:5001/api/Authentication/logout',
        method: 'POST',
      }),
    }),
    
    updateUser: builder.mutation({
      query: (data) => ({
        url: 'https://localhost:5001/api/Authentication/update-profile',
        method: 'PUT',
        body: data,
        headers: (headers) => {
          // Set the Authorization header with the token
          const token = getAccessTokenFromLocalStorage();
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          headers.set('Content-Type', 'application/json');
        },
      }),
    }),
    create: builder.mutation({
      query: (data) => ({
        url:'https://localhost:5001/api/Authentication/registeration' ,
        method: 'POST',
        body: data,
      }),
     }),
     edit: builder.mutation({
      query: (data) => ({
        url:'https://localhost:5001/api/userlist/${userId}' ,
        method: 'POST',
        body: data,
      }),
     }),
     getUserById: builder.query({
      query: (userId) => `${USERS_URL}/${userId}`,
    }),
  }),
});

export const { useLoginMutation,useUpdateUserMutation, useLogoutMutation,useRegisterMutation,useCreateMutation,useEditMutation,useGetUserByIdQuery} = usersApiSlice;