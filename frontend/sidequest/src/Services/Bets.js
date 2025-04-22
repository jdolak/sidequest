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

export const getAllBoughtBets = async () => {
    const config = {
        method: 'GET',
        credentials: 'include',
    };
    try {
        const response = await fetch(`${baseURL}/bought_bets`, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching all bought bets:", error);
        throw error;
    }
};
