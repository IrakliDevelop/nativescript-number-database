import { Injectable } from "@angular/core";

import { Item } from "./item";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ItemService {
    constructor(private http: HttpClient) {
    }

    getNumberInfo(number: string) {
        const formData = new FormData();
        formData.append('number', number);
        const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
        console.log('getNumberInfo', number);
        return this.http.post('http://simpleapi.info/apps/numbers-info/info.php', formData, { headers });
    }
}
