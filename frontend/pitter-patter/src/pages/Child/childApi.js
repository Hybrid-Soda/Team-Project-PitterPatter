import { childApi } from "/src/apiService.js";

export const childPhysicalInfoListGet = async (childId, token) => {
    const response = await childApi.get(`/${childId}/physical/list`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
};

export const childPhysicalInfoRegist = async (childId, token, data) => {
    const response = await childApi.post(`/${childId}/physical`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response;
};

export const childPhysicalInfoUpdate = async (childId, token, data) => {
    const response = await childApi.patch(`/${childId}/physical`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response;
};

export const childPlaytimeGet = async (childId, startDate, endDate, token) => {
    const response = await childApi.get(`/${childId}/playtime/${startDate}/${endDate}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
};

export const childBMIHistory = async (childId, startDate, endDate, token) => {
    const response = await childApi.get(`/${childId}/bmi/${startDate}/${endDate}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
};

export const rankingListGet = async (childId, token) => {
    const response = await childApi.get(`/${childId}/play-record/ranking`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
};