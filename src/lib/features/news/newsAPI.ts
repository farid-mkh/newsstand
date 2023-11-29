import axios from "axios";

interface NYCQuery {
    q?: string;
    fq?: any; // Filter Query Fields
    page?: number | string;
    sort?: "oldest";
    begin_date?: number;
    end_date?: number;
}

export const fetchNYCHome = async (params: NYCQuery = {}) => {
    try {
        return await axios.get(`${process.env.nyt_api_url}/topstories/v2`, {
            params: {
                "api-key": process.env.nyt_api_key,
                ...params,
            },
        });
    } catch (e) {
        throw e;
    }
};

export const fetchNewsorgHome = async (params: Record<string, any> = {}) => {
    try {
        return await axios.get(`${process.env.newsorg_api_url}`, {
            params: {
                "api-key": process.env.newsorg_api_key,
                ...params,
            },
        });
    } catch (e) {
        throw e;
    }
};

export const fetchGuardianHome = async (params: Record<string, any> = {}) => {
    try {
        return await axios.get(`${process.env.guardian_api_url}`, {
            params: {
                "api-key": process.env.guardian_api_key,
                ...params,
            },
        });
    } catch (e) {
        throw e;
    }
};
