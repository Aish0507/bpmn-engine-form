import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-input-password',
    templateUrl: './input-password.component.html',
    styleUrls: ['../bpmn-engine-form.component.scss']
})
export class InputPasswordComponent implements OnInit {

    @Input() FormGroup: FormGroup;
    @Input() field: any = {};
    @Input() lang: string;
    @Input() translations: any;
    @Output() changed = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
    }

    changedEvent() {
        try {
            this.changed.emit(this.field);
        } catch (e) {
            console.error("Error", e);
        };
    }

}