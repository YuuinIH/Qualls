
export interface EventListener{
    registerEvent(event: string, callback: Function): void;
    triggerEvent(event: string, ...args: any[]): void;
}

export class EventListener implements EventListener{
    private readonly Battle:Battle
    private events: {[key: string]: Function[]} = {};

    constructor(battle: Battle){
        this.Battle = battle;
    }

    registerEvent(event: string, callback: Function): void{
        if(this.events[event] == null){
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    triggerEvent(event: string, ...args: any[]): void{
        if(this.events[event] != null){
            for(let callback of this.events[event]){
                callback(...args);
            }
        }
    }

    emit(event: string, ...args: any[]): void{
        this.triggerEvent(event, ...args);
    }
}