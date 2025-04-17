import {baseURL} from './Constants.js';

export const getAllQuests = async () => {
    const config = {
        method: 'GET',
    };
    try {
        const response = await fetch(baseURL+'/quests', config);
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
    const config = {
        method: 'GET',
    };
    try {
        const response = await fetch(baseURL+'/quests/open', config);
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
    const config = {
        method: 'GET',
    };
    try {
        const response = await fetch(baseURL+`/quests/${questID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching quest with ID ${questID}:`, error);
        throw error;
    }
};

export const getQuestSubmission = async (submissionID) => {
    const config = {
        method: 'GET',
    };
    try {
        const response = await fetch(baseURL + `/quest_submissions/${submissionID}`, config);
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
    const config = {
        method: 'GET',
    };
    try {
        const response = await fetch(baseURL + '/quest_submissions', config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching all quest submissions:", error);
        throw error;
    }
};
