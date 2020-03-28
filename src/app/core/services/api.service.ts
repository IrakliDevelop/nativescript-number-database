import { Injectable } from "@angular/core";

import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    private readonly ApiURL: string = 'http://simpleapi.info/apps/numbers-info/info.php';
    constructor(private http: HttpClient) {
    }

    getNumberInfo(number: string) {
        const formData = new FormData();
        formData.append('number', number);
        const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
        console.log('getNumberInfo', number);
        return this.http.post(this.ApiURL, formData, { headers, responseType: 'text'  });
    }
}
