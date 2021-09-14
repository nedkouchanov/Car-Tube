import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllListings(page = 1) {
    return await api.get(host + `/data/cars?sortBy=_createdOn%20desc&offset=${(page - 1) * 3}&pageSize=3`);
}

export async function getListingsCount() {
    return await api.get(host + '/data/cars?count');
}

export async function createCar(brand, model, description, year, imageUrl, price) {
    return await api.post(host + '/data/cars', { brand, model, description, year, imageUrl, price });
}

export async function getCar(id) {
    return await api.get(host + '/data/cars/' + id);
}

export async function deleteCar(id) {
    return await api.del(host + '/data/cars/' + id);
}

export async function editCar(id, brand, model, description, year, imageUrl, price) {
    return await api.put(host + '/data/cars/' + id, { brand, model, description, year, imageUrl, price });
}

export async function getMyListings(userId) {
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function searchByYear(query) {
    return await api.get(host + `/data/cars?where=year%3D${query}`);
}