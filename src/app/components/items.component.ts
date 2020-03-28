import {Component, OnInit} from "@angular/core";
import { FormControl, Validators} from "@angular/forms";
import {first, takeUntil} from "rxjs/internal/operators";
import {Subject} from "rxjs";

import {ApiService} from "~/app/core/services";
import {ApiResponse} from "~/app/models";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    unsubscribe$: Subject<void>;
    numberControl: FormControl;
    number: string;

    constructor(
        private apiService: ApiService,
    ) {
    }

    ngOnInit(): void {
        this.unsubscribe$ = new Subject<void>();
        this.numberControl = new FormControl('', [Validators.required]);
        this._initSubscribes();
    }

    onSubmit() {
        const number = this.number;
        console.log(number, number.length);
        if (number.length !== 9) {
            return;
        }
        this.apiService.getNumberInfo(number).pipe(
            first()
        ).subscribe((data: string) => {
            const response: ApiResponse = JSON.parse(
                JSON.parse(
                    JSON.stringify(data))
                    .replace(/\s/g, '')
            );
            if (response.res === 'no') {
                console.log('number not found');
            } else {
                console.log(response)
            }
        }, error => {
        });
    }

    private _initSubscribes(): void {
        this.numberControl.valueChanges.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(res => {
            console.log(res);
            this.number = res;
        });
    }
}
