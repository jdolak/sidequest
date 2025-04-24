import {baseURL} from './Constants.js';
import { useGlobalStore } from '../stores/globalStore.js';

export const getAllQuests = async () => {
    const { groupID } = useGlobalStore.getState();
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(baseURL + '/quests/' + groupID, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching all quests:", error);
        throw error;
    }
};

export const getOpenQuests = async () => {
    const { groupID } = useGlobalStore.getState();
    console.log("group id: " + groupID);
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(baseURL + '/quests/open/' + groupID, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching open quests:", error);
        throw error;
    }
};

export const getQuest = async (questID) => {
    const { groupID } = useGlobalStore.getState();
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(baseURL + `/quests/${questID}/${groupID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching quest with ID ${questID}:`, error);
        throw error;
    }
};

export const getMyQuests = async (authorID) => {
    const { groupID } = useGlobalStore.getState();
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(baseURL + `/quests/my_quests/${groupID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching quests by author with ID ${authorID}:`, error);
        throw error;
    }
};

export const getAcceptedQuests = async () => {
    const { groupID } = useGlobalStore.getState();
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(baseURL + `/quests/accepted/${groupID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching accepted quests:", error);
        throw error;
    }
};

export const getAcceptedQuestsByUser = async (userID) => {
    const { groupID } = useGlobalStore.getState();
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(baseURL + `/quests/accepted/${userID}/${groupID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching accepted quests for user with ID ${userID}:`, error);
        throw error;
    }
};

export const getQuestSubmission = async (submissionID) => {
    const { groupID } = useGlobalStore.getState();
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(baseURL + `/quest_submissions/${submissionID}/${groupID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching quest submission with ID ${submissionID}:`, error);
        throw error;
    }
};

export const getAllQuestSubmissions = async () => {
    const { groupID } = useGlobalStore.getState();
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(baseURL + `/quest_submissions/${groupID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching all quest submissions:", error);
        throw error;
    }
};
