export const getAllQuests = async (axiosClient) => {
    const config = {
        method: 'GET',
        url: '/api/quests',
    };
    try {
        const response = await axiosClient(config);
        return response.data;
    } catch (error) {
        console.error("Error fetching all quests:", error);
        throw error;
    }
};

export const getOpenQuests = async (axiosClient) => {
    const config = {
        method: 'GET',
        url: '/api/quests/open',
    };
    try {
        const response = await axiosClient(config);
        return response.data;
    } catch (error) {
        console.error("Error fetching open quests:", error);
        throw error;
    }
};

export const getQuest = async (axiosClient, questID) => {
    const config = {
        method: 'GET',
        url: `/api/quests/${questID}`,
    };
    try {
        const response = await axiosClient(config);
        return response.data;
    } catch (error) {
        console.error(`Error fetching quest with ID ${questID}:`, error);
        throw error;
    }
};
