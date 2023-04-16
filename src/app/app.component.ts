import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    customFormObj: any = []
    finalFormObj: any
    compactLayoutActive: boolean = false
    jsonFormCloneObj: any
    constructor() {
        this.adjustdefaultValue()
        this.jsonFormCloneObj = { ...this.jsonForm }
        this.formMapperFn(this.jsonFormCloneObj?.components)
    }
    jsonForm = {
        "components": [
            {
                "label": "Number of Customers Retail",
                "type": "number",
                "id": "Field_0lhy7zy",
                "key": "retailCust",
                "validate": {
                    "required": true
                },
                "properties": {},
                "defaultValue": 0
            },
            {
                "label": "Number of Customers Custody",
                "type": "number",
                "id": "Field_0teh8jf",
                "key": "custodyCust",
                "defaultValue": 0,
                "validate": {
                    "required": true
                }
            },
            {
                "values": [
                    {
                        "label": "Standard",
                        "value": "STANDARD"
                    },
                    {
                        "label": "Free Format",
                        "value": "FREE_FORMAT"
                    }
                ],
                "label": "Letter Format",
                "type": "radio",
                "id": "Field_1naazau",
                "key": "letterFormat",
                "validate": {
                    "required": true
                },
                "defaultValue": "FREE_FORMAT",
            },
            {
                "values": [
                    {
                        "label": "23 - Change of Name",
                        "value": "NAME_CHANGE"
                    },
                    {
                        "label": "67 - Publication",
                        "value": "PUBLICATION"
                    }
                ],
                "label": "Letter Number",
                "type": "select",
                "id": "Field_1j31i8d",
                "key": "letterNumber",
                "defaultValue": "NAME_CHANGE",
                "validate": {
                    "required": true
                }
            },
            {
                "values": [
                    {
                        "label": "23 - Change of Name",
                        "value": "NAME_CHANGE"
                    },
                    {
                        "label": "67 - Publication",
                        "value": "PUBLICATION"
                    }
                ],
                "label": "Letter Number checklist",
                "type": "checklist",
                "id": "Field_1j31i8d",
                "key": "letterNumber-checklist",
                "defaultValue": "NAME_CHANGE",
                "validate": {
                    "required": true
                }
            },
            {
                "label": "English",
                "type": "checkbox",
                "id": "Field_0xiko9h",
                "key": "ENGLISH",
                "defaultValue": true,
                "disabled": true
            },
            {
                "label": "German",
                "type": "checkbox",
                "id": "Field_0doxvp5",
                "key": "GERMAN",
                "defaultValue": false,
                "disabled": false
            },
            {
                "label": "Event Inactivation",
                "type": "checkbox",
                "id": "Field_10x5r4p",
                "key": "eventInactivation",
                "defaultValue": false
            },
            {
                "label": "Enter Comment",
                "type": "textfield",
                "id": "Field_0b4fjrs",
                "key": "text",
                "properties": {}
            },
            {
                "label": "Enter Comment1",
                "type": "textfield",
                "id": "Field_0b4fjrs",
                "key": "text1",
                "properties": {}
            },
            {
                "label": "Enter Comment2",
                "type": "textfield",
                "id": "Field_0b4fjrs",
                "key": "text-2",
                "properties": {}
            },
            {
                "action": "submit",
                "label": "Submit",
                "type": "button",
                "id": "Field_0xlr1py",
                "key": "field_1w8hyyk"
            },
            {
                "action": "reset",
                "label": "Reset",
                "type": "button",
                "id": "Field_0kv44kx",
                "key": "field_09dn463"
            }
        ]
    }

    buttons = []


    formSubmitHandler(data) {
        console.log(data);
    }

    otherEventHandler(data) {
        console.log(data);
    }
    adjustdefaultValue() {
        this.jsonForm.components = this.jsonForm.components.filter((data: any) => {
            if (data?.type === 'select' || data?.type === 'radio') {
                if (data?.defaultValue) {
                    data.defaultValue = data?.values.filter(val => val?.value === data.defaultValue)?.[0]
                }
            } else if (data?.type === 'checklist') {
                if (data?.defaultValue) {
                    data.defaultValue = data?.values.filter(val => val?.value === data.defaultValue)
                }
            }
            return data
        })
        //console.log(this.jsonForm.components)
    }
    formMapperFn(jsonForm: any) {
        var checkboxPushed: any = {}
        this.customFormObj = []
        jsonForm.map((fObj: any, i) => {
            // console.log(fObj)
            if (fObj.type) {
                // console.log(fObj)
                switch (fObj.type) {
                    case 'textfield':
                        this.customFormObj.push({
                            fields: [
                                {
                                    name: `${fObj?.key}`,
                                    value: fObj?.defaultValue,
                                    type: "text",
                                    label: `${fObj?.label}`,
                                    required: `${fObj?.validate?.required}`,
                                    maxlength: `${fObj?.validate?.maxLength}`,
                                    minlength: `${fObj?.validate?.minLength}`
                                },
                            ],
                        })
                        break;
                    case 'number':
                        this.customFormObj.push({
                            fields: [
                                {
                                    name: `${fObj?.key}`,
                                    value: fObj?.defaultValue,
                                    type: "number",
                                    label: `${fObj?.label}`,
                                    required: `${fObj?.validate?.required}`,
                                    max: `${fObj?.validate?.max}`,
                                    min: `${fObj?.validate?.min}`
                                }
                            ],
                        })
                        break;
                    case 'checkbox':
                        if (this.compactLayoutActive) {
                            if (checkboxPushed?.type && checkboxPushed?.index) {
                                this.customFormObj[checkboxPushed?.index]?.fields?.push({
                                    name: `${fObj?.key}`,
                                    type: "checkbox",
                                    label: `${fObj?.label}`,
                                    text: `${fObj?.label}`,
                                    checked: fObj.defaultValue,
                                    disabled: fObj.disabled
                                })
                            } else {
                                this.customFormObj.push({
                                    fields: [
                                        {
                                            name: `${fObj?.key}`,
                                            type: "checkbox",
                                            label: `${fObj?.label}`,
                                            text: `${fObj?.label}`,
                                            checked: fObj.defaultValue,
                                            disabled: fObj.disabled
                                        },
                                    ],
                                })
                                checkboxPushed = {
                                    type: 'checkbox',
                                    index: i
                                }
                            }
                        } else {
                            this.customFormObj.push({
                                fields: [
                                    {
                                        name: `${fObj?.key}`,
                                        type: "checkbox",
                                        label: `${fObj?.label}`,
                                        text: `${fObj?.label}`,
                                        checked: fObj.defaultValue,
                                        disabled: fObj.disabled
                                    },
                                ],
                            })
                        }

                        // console.log('ooo', checkboxPushed)
                        break;
                    case 'checklist':
                        this.customFormObj.push({
                            fields: [
                                {
                                    name: `${fObj?.key}`,
                                    type: "select",
                                    label: `${fObj?.label}`,
                                    options: fObj?.values,
                                    multiple: true,
                                    value: fObj?.values,
                                    defaultValue: fObj?.defaultValue
                                },
                            ],
                        })
                        break;
                    case 'select':
                        this.customFormObj.push({
                            fields: [
                                {
                                    name: `${fObj?.key}`,
                                    type: "select",
                                    label: `${fObj?.label}`,
                                    options: fObj?.values,
                                    value: fObj?.values,
                                    defaultValue: fObj?.defaultValue
                                },
                            ],
                        })
                        break;
                    case 'radio':
                        this.customFormObj.push({
                            fields: [
                                {
                                    name: `${fObj?.key}`,
                                    type: "radio",
                                    label: `${fObj?.label}`,
                                    options: fObj?.values,
                                    value: fObj?.defaultValue,
                                    disabled: fObj.disabled,
                                    defaultValue: fObj?.defaultValue
                                },
                            ],
                        })
                        break;
                    case 'taglist':
                        this.customFormObj.push({
                            fields: [
                                {
                                    name: `${fObj?.key}`,
                                    type: "list",
                                    label: `${fObj?.label}`,
                                    options: fObj?.values,
                                },
                            ],
                        })
                        break;
                    case 'text':
                        this.customFormObj.push({
                            fields: [
                                {
                                    name: `${fObj?.key}`,
                                    value: fObj?.defaultValue,
                                    type: "text",
                                    label: `${fObj?.label}`,
                                    required: `${fObj?.validate?.required}`,
                                    maxlength: `${fObj?.validate?.maxLength}`,
                                    minlength: `${fObj?.validate?.minLength}`
                                },
                            ],
                        })
                        break;
                    case 'button':
                        // console.log(fObj, fObj.action)
                        this.buttons.push({
                            text: fObj?.label, submit: (fObj.action === 'submit') ? true : false,
                            primary: true,
                            action: fObj.action,
                            event: (fObj.action === 'submit') ? null : (fObj?.properties?.action ? fObj?.properties?.action : fObj?.action)
                        })
                        break;

                }
            }
        })
        this.finalFormObj = {}
        this.finalFormObj.groups = [...this.customFormObj]
        this.finalFormObj.buttons = [...this.buttons]
        this.finalFormObj.format = {
            expand: true,
            full: true,
            background: "whitesmoke",
            primary: "coral",
            secondary: "pink",
            focus: "darkgrey",
            center: true,
        },
            this.finalFormObj.lang = "es-ES"
        this.finalFormObj.translations = {
            "en-US": {
                "NAME": "Name",
                "LASTNAME": "Lastname",
                "JOB": "Job",
                "OK": "Ok",
                "DEVELOPMENT": "Development",
                "DESIGNER": "Designer",
            },
            "es-ES": {
                "NAME": "Nombre",
                "LASTNAME": "Apellido",
                "JOB": "Profesión",
                "OK": "Listo",
                "DEVELOPMENT": "Desarrollador",
                "DESIGNER": "Diseñador",
                "English": "Aish"
            },
        }
    }

    compactLayout() {
        this.compactLayoutActive = !this.compactLayoutActive
        this.formMapperFn(this.jsonFormCloneObj?.components)
    }
}