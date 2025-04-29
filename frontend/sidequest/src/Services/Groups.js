import { baseURL } from './Constants.js';
import { useGlobalStore } from '../stores/globalStore.js';

export const getGroup = async (groupID) => {
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/groups/${groupID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching group with ID ${groupID}:`, error);
        throw error;
    }
};

export const getAllGroups = async () => {
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/groups`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching all groups:", error);
        throw error;
    }
};

export const getGroupUser = async (groupID, userID) => {
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/groups_user/${groupID}/${userID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching user ${userID} in group ${groupID}:`, error);
        throw error;
    }
};

export const getAllGroupUsers = async () => {
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/groups_user`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching all group users:", error);
        throw error;
    }
};

export const joinGroup = async (joinCode) => {
    const config = {
        method: 'POST',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/invite/${joinCode}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching all group users:", error);
        throw error;
    }
};

export const searchGroups = async (query) => {
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        // const response = await fetch(`${baseURL}/groups/search/${encodeURIComponent(query)}`, config);
        const response = await fetch(`${baseURL}/groups/search/${query}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error searching groups with query "${query}":`, error);
        throw error;
    }
};

export const createGroup = async (groupData) => {
    const config = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
    };
    try {
        const response = await fetch(`${baseURL}/groups/create`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating group:", error);
        throw error;
    }
};