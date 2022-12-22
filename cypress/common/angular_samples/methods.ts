import { Constants } from './../../fixtures/constants';
import { fields, buttons } from '../selectors';
import { BaseMethods } from './../base';

export class AngularMethods extends BaseMethods {

    public addUser(name: string, email: string): void {
        this.fillField({
            selector: fields.commonField.replace('{fieldName}', Constants.fieldsNames.nameField),
            text: name
        })
        this.fillField({
            selector: fields.commonField.replace('{fieldName}', Constants.fieldsNames.emailField),
            text: email
        })
        this.checkElementState({
            selector: buttons.buttonPrimary,
            state: 'not.be.disabled'
        })
        this.clickElementBySelector({
            selector: buttons.buttonPrimary
        })
    }
}