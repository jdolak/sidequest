import { baseURL } from './Constants.js';

export const getBoughtBet = async (betID, buyerID) => {
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/bought_bets/${betID}/${buyerID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching bought bet with ID ${betID} for buyer ${buyerID}:`, error);
        throw error;
    }
};

export const getAcceptedBets = async () => {
    const groupID = parseInt(sessionStorage.getItem("groupID"));
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/bets/accepted/${groupID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching accepted bets:", error);
        throw error;
    }
};

export const getMyBets = async () => {
    const groupID = parseInt(sessionStorage.getItem("groupID"));
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/bets/my_bets/${groupID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching my bets:", error);
        throw error;
    }
};

export const getAllBoughtBets = async () => {
    const groupID = parseInt(sessionStorage.getItem("groupID"));
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/bought_bets/${groupID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching all bought bets:", error);
        throw error;
    }
};

// Depricaeted for getAllBets

// export const getOpenBets = async () => {
//     const groupID = parseInt(sessionStorage.getItem("groupID"));
//     const config = {
//         method: 'GET',
//         credentials: 'include',
//     };
//     try {
//         const response = await fetch(`${baseURL}/bets/open/${groupID}`, config);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching all bets:", error);
//         throw error;
//     }
// };

export const getAllBets = async () => {
    const groupID = parseInt(sessionStorage.getItem("groupID"));
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/bets/${groupID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching all bets:", error);
        throw error;
    }
};

export const getBet = async (betID) => {
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/bets/${betID}`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching bet with ID ${betID}:`, error);
        throw error;
    }
};

export const createBet = async (betData) => {
    // Expect json data input
    const groupID = parseInt(sessionStorage.getItem("groupID"));
    betData.groupID = groupID;
    const config = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(betData),
    };
    try {
        const response = await fetch(`${baseURL}/bets/create`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating bet:", error);
        throw error;
    }
};