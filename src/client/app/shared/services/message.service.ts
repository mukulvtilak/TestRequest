import { Injectable, EventEmitter } from '@angular/core';
// @Injectable()
export class MessageService {
    public static EVENT_MESSAGE = 'EVENT HAPPENED MESSAGE';
    public static onUnauthorized: EventEmitter<Object> = new EventEmitter<Object>();
    public static onMessageAdded: EventEmitter<Object> = new EventEmitter<Object>();

    static addMessage(value: Object) {
        // Example addMessage({ severity: 'success', summary: 'Success', message: 'Record Saved' })
        MessageService.onMessageAdded.emit(value);
    }
    static setSessionTimeOutMessage(value: boolean) {
        MessageService.onUnauthorized.emit({ message: 'Unauthorized' });
    }
}
