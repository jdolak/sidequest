import { baseURL } from './Constants.js';

export const getAllQuests = async () => {
    const groupID = parseInt(sessionStorage.getItem("groupID")); // Correctly access currGroupID
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(baseURL + '/quests/all/' + groupID, config);
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
    const groupID = parseInt(sessionStorage.getItem("groupID")); // Correctly access currGroupID
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
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(baseURL + `/quests/${questID}`, config);
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
    const groupID = parseInt(sessionStorage.getItem("groupID")); // Correctly access currGroupID
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
    const groupID = parseInt(sessionStorage.getItem("groupID")); // Access currGroupID
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

export const getAcceptedQuestsByUser = async () => {
    const groupID = parseInt(sessionStorage.getItem("groupID"));
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
        console.error(`Error fetching accepted quests: `, error);
        throw error;
    }
};

export const getQuestSubmission = async (questID) => {
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(baseURL + `/quests/submissions/${questID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else if (response.status === 204) {
            return null; // No content, return null
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching quest submission with ID ${questID}:`, error);
        throw error;
    }
};

// export const getQuestSubmission = async (submissionID) => {
//     // const groupID = parseInt(sessionStorage.getItem("groupID"));
//     const config = {
//         method: 'GET',
//         credentials: 'include',
//     };
//     try {
//         const response = await fetch(baseURL + `/quest_submissions/${submissionID}`, config);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         else if (response.status === 204) {
//             return null; // No content, return null
//         }
//         return await response.json();
//     } catch (error) {
//         console.error(`Error fetching quest submission with ID ${submissionID}:`, error);
//         throw error;
//     }
// };

export const getAllQuestSubmissions = async () => {
    const groupID = parseInt(sessionStorage.getItem("groupID")); // Access currGroupID
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

export const submitQuest = async (questID, submissionData) => {
    for (let [key, value] of submissionData.entries()) {
        console.log(`${key}: ${value}`);
    }
    const config = {
        method: 'POST',
        credentials: 'include',
        body: submissionData,
    };
    try {
        const response = await fetch(baseURL + `/quest_submit/${questID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error submitting quest with ID ${questID}:`, error);
        throw error;
    }
};

export const createQuest = async (questData) => {
    // expect json data
    const groupID = parseInt(sessionStorage.getItem("groupID"));
    const config = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...questData, groupID }),
    };
    try {
        const response = await fetch(baseURL + '/quests/create', config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating quest:", error);
        throw error;
    }
};

export const acceptQuest = async (questID) => {
    const config = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await fetch(baseURL + `/quests/accept/${questID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error accepting quest with ID ${questID}:`, error);
        throw error;
    }
};

export const deleteQuest = async (questID) => {
    const config = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await fetch(baseURL + `/quests/delete/${questID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error deleting quest with ID ${questID}:`, error);
        throw error;
    }
};