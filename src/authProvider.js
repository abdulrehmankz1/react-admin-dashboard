// import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_CHECK } from 'react-admin';
// // import jwtDecode from 'jwt-decode';
// import * as jwtDecode from 'jwt-decode';
// import { string } from 'prop-types';

// const AuthProvider = (type, params) => {
//   if (type === AUTH_LOGIN) {
//     const { username, password } = params;
//     const request = new Request('https://dev-apis.explorebtk.com/api/v1/auth/login', {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),
//       headers: new Headers({ 'Content-Type': 'application/json' }),
//     });

//     return fetch(request)
//       .then(response => {
//         if (response.status < 200 || response.status >= 300) {
//           throw new Error(response.statusText);
//         }
//         return response.json();
//       })
//       .then(({ token }) => {
//         console.log('Token received from server:', token);

//         // // Check if the token is present and a string
//         if (!token || typeof token !== string) {
//           console.error('Invalid or missing token:', token);
//           throw new Error('Invalid or missing token');
//         }

//         try {
//           // Attempt to decode the token
//           const decodedToken = jwtDecode(token);
//           console.log('Decoded token:', decodedToken);

//           // Store the token and role in local storage
//           localStorage.setItem('token', token);
//           localStorage.setItem('role', decodedToken.role);
//         } catch (error) {
//           console.error('Failed to decode token:', error);
//           throw new Error('Failed to decode token');
//         }
//       })
//       .catch(error => {
//         console.error('Login failed:', error);
//         throw new Error('Login failed');
//       });
//   }

//   if (type === AUTH_LOGOUT) {
//     // Clear token and role from local storage on logout
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     return Promise.resolve();
//   }

//   if (type === AUTH_ERROR) {
//     // Handle authentication errors if needed
//     // For example: return Promise.reject('Authentication error');
//   }

//   if (type === AUTH_CHECK) {
//     // Check if a token is present in local storage
//     return localStorage.getItem('token') ? Promise.resolve() : Promise.reject('No token available');
//   }

//   if (type === AUTH_GET_PERMISSIONS) {
//     // Retrieve and return the role from local storage
//     const role = localStorage.getItem('role');
//     return role ? Promise.resolve(role) : Promise.reject('Role not available');
//   }

//   // Reject unknown method with an error message
//   return Promise.reject('Unknown method');
// };

// export default AuthProvider;


import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_CHECK } from 'react-admin';
import { jwtDecode } from 'jwt-decode';

const AuthProvider = (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request('https://dev-apis.explorebtk.com/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ access_token }) => {
        console.log('Token received from server:', access_token);

        // Check if the token is present and a string
        if (!access_token || typeof access_token !== 'string') {
          console.error('Invalid or missing token:', access_token);
          throw new Error('Invalid or missing token');
        }

        try {
          // Attempt to decode the token
          const decodedToken = jwtDecode(access_token);
          console.log('Decoded token:', decodedToken);

          // Check if the decoded token has the 'role' property
          if (!decodedToken.role) {
            console.error('Role not found in the token:', decodedToken);
            throw new Error('Role not found in the token');
          }

          // Store the token and role in local storage
          localStorage.setItem('token', access_token);
          localStorage.setItem('role', decodedToken.role);
        } catch (error) {
          console.error('Failed to decode token:', error);
          throw new Error('Failed to decode token');
        }
      })
      .catch(error => {
        console.error('Login failed:', error);
        throw new Error('Login failed');
      });
  }

  if (type === AUTH_LOGOUT) {
    // Clear token and role from local storage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    // Handle authentication errors if needed
    // For example: return Promise.reject('Authentication error');
  }

  if (type === AUTH_CHECK) {
    // Check if a token is present in local storage
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject('No token available');
  }

  if (type === AUTH_GET_PERMISSIONS) {
    // Retrieve and return the role from local storage
    const role = localStorage.getItem('role');
    return role ? Promise.resolve(role) : Promise.reject('Role not available');
  }

  // Reject unknown method with an error message
  return Promise.reject('Unknown method');
};

export default AuthProvider;
