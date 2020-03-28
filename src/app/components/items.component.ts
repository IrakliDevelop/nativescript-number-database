import {Component, OnInit} from "@angular/core";
import { FormControl, Validators} from "@angular/forms";
import {finalize, first, takeUntil} from "rxjs/internal/operators";
import {Subject} from "rxjs";

import {ApiService, LoadingService} from "~/app/core/services";
import {ApiResponse, NumberInfo} from "~/app/core/models";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    unsubscribe$: Subject<void>;
    numberControl: FormControl;
    number: string;
    response: ApiResponse;
    info: NumberInfo;
    ownerName: string ='';

    constructor(
        private apiService: ApiService,
        public loadingService: LoadingService,
    ) {
    }

    ngOnInit(): void {
        this.unsubscribe$ = new Subject<void>();
        this.numberControl = new FormControl('', [Validators.required]);
        this._initSubscribes();
    }

    onSubmit() {
        const number = this.number;
        if (number.length !== 9) {
            return;
        }
        this.loadingService.show('Searching in database');
        this.apiService.getNumberInfo(number).pipe(
            first(),
            finalize(() => this.loadingService.hide())
        ).subscribe((data: string) => {
            const response: ApiResponse = JSON.parse(
                JSON.parse(
                    JSON.stringify(data))
                    .replace(/\s/, '')
            );
            this.response = response;
            if (response.res === 'no') {
                this.ownerName = 'Number not found';
            } else {
                this.info = this.response.info;
                this.ownerName = this.info.name;
                console.log(this.ownerName);
            }
        }, error => {
        });
    }

    private _initSubscribes(): void {
        this.numberControl.valueChanges.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(res => {
            this.number = res;
        });
    }
}
