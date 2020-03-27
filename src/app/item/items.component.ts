import {Component, OnInit} from "@angular/core";

import {Item} from "./item";
import {ItemService} from "./item.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first, takeUntil} from "rxjs/internal/operators";
import {Subject} from "rxjs";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    unsubscribe$: Subject<void>;
    numberControl: FormControl;
    number: string;

    constructor(
        private itemService: ItemService,
        public fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.unsubscribe$ = new Subject<void>();
        console.log('ngOnInit of items component');
        this.numberControl = new FormControl('', [Validators.required]);
        this._initSubscribes();
    }

    onSubmit() {
        const number = this.number;
        console.log(number, number.length);
        if (number.length !== 9) {
            return;
        }

        this.itemService.getNumberInfo(number).pipe(
            first()
        ).subscribe(data => console.log(data));
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
