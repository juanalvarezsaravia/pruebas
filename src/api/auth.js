import { STORAGE } from '../helpers/storage';
import { USER_STORAGE_KEY } from '../constants/storage-keys';
import { API_URL } from './config';

export function login({ email, password }) {
    return new Promise(async (resolve, reject) => {
        try {
            const path = `${API_URL}/user/login`;

            const urlencoded = JSON.stringify({email, password})

            const response = await fetch(path, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: urlencoded,
                redirect: 'follow',
            });

            const { result } = await response.json();

            const oneDay = 24 * 60 * 60 * 1000;

            const body = {
                ...result,
                expiration_date: new Date().getTime() + oneDay,
            };

            window.dispatchEvent(new CustomEvent('login', { detail: body }));

            STORAGE.set(USER_STORAGE_KEY, body);

            resolve(result);
        } catch (error) {
            console.log(error);
            reject('Error en la petición.');
        }
    });
}

export function register({ email, password, name }) {
    return new Promise(async (resolve, reject) => {
        try {
            const path = `${API_URL}/user`;

            const urlencoded = JSON.stringify({ email, password, name })
            const response = await fetch(path, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: urlencoded,
                redirect: 'follow',
            });

            const { status } = await response.json();

            if (status !== 'SUCCESS') throw 'Error en la petición.';

            const result = await login({ email, password });

            resolve(result);
        } catch (error) {
            console.log(error);
            reject('Error en la petición.');
        }
    });
}
