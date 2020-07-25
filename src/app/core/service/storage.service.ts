import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storage: string = environment.storageType;
    get store() {
        if (this.storage == 'session') {
            return sessionStorage;
        }
        if (this.storage == 'local') {
            return localStorage;
        }
    }

    getItem(key: string) {
        return this.store.getItem(key);
    }

    setItem(key: string, value: string) {
        return this.store.setItem(key, value);
    }

    getToken() {
        return this.store.getItem('access_token');
    }

    setToken(value: string) {
        return this.store.setItem('access_token', value);
    }
}
