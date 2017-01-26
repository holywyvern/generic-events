declare module "generic-events" {

    export type EventCallback = (...args: any[]) => any; 

    export default class EventManager {
        /**
         * Adds one or more callback to listen for an event.
         * @param {string} name The name of the callback.
         * @param {function[]} callbacks A list of callbacks to add
         */        
        on(name:string, ...callbacks: EventCallback[]): void;
        /**
          * Removes callbacks from an event.
          * @param {string} name The name of the callback.
          * @param {function[]} callbacks A list of callbacks to remove 
          * @warn If the list is empty it will remove all events.
          */        
        off(name:string, ...callbacks: EventCallback[]): void;
         /**
         * Removes callbacks from an event.
         * It only removes the one called for be called once.
         * @param {string} name The name of the callback.
         * @param {function[]} callbacks A list of callbacks to remove 
         * @warn If the list is empty it will remove all events.
         */
        offOnce(name:string, ...callbacks: EventCallback[]): void;     
        /**
        * Adds one or more callback to listen for an event.
        * This event will be only called once.
        * @param {string} name The name of the callback.
        * @param {function[]} callbacks A list of callbacks to add
        */
        once(name:string, ...callbacks: EventCallback[]): void;
        /**
         * Call all callbacks assigned to an event name
         * @param {string} name The name of the callback.
         * @param { any[]} ...args A list of arguments
         * @returns false if any of the event's callbacks return false, true otherwise.
         */
        fire(name:string, ...callbacks: any[]): boolean;
        /**
         * Call all callbacks assigned to an event name
         * @param {string} name The name of the callback.
         * @param { any[]} ...args A list of arguments
         * @returns false if any of the event's callbacks return false, true otherwise.
         */        
        emit(name:string, ...callbacks: any[]): boolean;
        /**
         * Adds one or more callback to listen for an event.
         * @param {string} name The name of the callback.
         * @param {function[]} callbacks A list of callbacks to add
         */              
        addEventListener(name:string, ...callbacks: EventCallback[]): void;
        /**
          * Removes callbacks from an event.
          * @param {string} name The name of the callback.
          * @param {function[]} callbacks A list of callbacks to remove 
          * @warn If the list is empty it will remove all events.
          */           
        removeEventListener(name:string, ...callbacks: EventCallback[]): void;
    }


}