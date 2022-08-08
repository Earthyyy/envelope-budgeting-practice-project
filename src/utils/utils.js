// Import Section
let {envelopes} = require('../database/data');



/** 
 * @returns a list of all envelopes
 */
const getAllEnvelopes = () => {
    return envelopes;
}

/**
 * Adding a new envelope to the database
 * @param {string} category The envelope's category
 * @param {number} amount The envelope's budget
 * @returns the newly created envelope
 */
const addNewEnvelope = (category,amount) => {
    const id = envelopes[envelopes.length - 1].id + 1;
    const newEnvelope = {
        id,
        category,
        amount
    }

    envelopes.push(newEnvelope);

    return newEnvelope;
}

/**
 * Get a specific envelope by its id
 * @param {number} id The envelope's id to retreive
 * @returns the envelope object if found else an empty array
 */
const getEnvelopeById = (id) => {
    return envelopes.filter(env => env.id === id);
}

/**
 * Update a specific envelope by its id
 * @param {number} id The envelope's id to update
 * @param {string} category The new envelope's category
 * @param {number} amount The amount to subtract from the current budget
 * @returns the updated envelope
 */

const updateEnvelopeById = (id,category,amount) => {
    const envIndex = envelopes.findIndex(env => env.id === id);
    if (envIndex === -1) return false;
    else {
        if (category) envelopes[envIndex].category = category;
        if (amount) envelopes[envIndex].amount -= amount;
        return envelopes[envIndex];
    }
}

/**
 * Delete a specific envelope by its id
 * @param {number} id The envelope's id to delete
 * @returns true if deletion is complete else false
 */

const deleteEnvelopeById = (id) => {
    const envIndex = envelopes.findIndex(env => env.id === id);
    if (envIndex === -1) return false;
    else {
        envelopes = envelopes.filter(env => env.id !== id);
        return true;
    }
}




module.exports = {
    getAllEnvelopes,
    addNewEnvelope,
    getEnvelopeById,
    updateEnvelopeById,
    deleteEnvelopeById
}