export interface MarkSpecies{
    id: number;
    name:string;

    getLevel():number;
}

export class Mark{
    mark: MarkSpecies;
    remainTurns: number|null;//null means infinite

    getLevel():number{
        return this.mark.getLevel()
    };
}
