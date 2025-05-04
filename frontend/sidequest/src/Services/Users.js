import { baseURL } from './Constants.js';

export const getUser = async () => {
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/users/my_user`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching user`, error);
        throw error;
    }
};

// export const getAllUsers = async () => {
//     const config = {
//         method: 'GET',
//         credentials: 'include',
//     };
//     try {
//         const response = await fetch(`${baseURL}/users`, config);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching all users:", error);
//         throw error;
//     }
// };

export const getLoggedInUser = async () => {
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/whoami`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching logged-in user:", error);
        throw error;
    }
};

export const logout = async () => {
    const config = {
        method: 'POST',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/logout`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

export const getUsersGroupProfile = async () => {
    const groupID = parseInt(sessionStorage.getItem("groupID"));
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/groups_user/${groupID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching users for group with ID ${groupID}:`, error);
        throw error;
    }
};