"use server";

import { pool } from "../../db/postgres";

export const clearStaleTokens = async () => {
    try {
        await pool.query("DELETE FROM verification_token WHERE expires < NOW();");
    } catch (error) {
        throw error;
    }
};