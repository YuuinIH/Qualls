
type Elf=any;
export interface CommonEventHandle{

}

export interface MoveEvent{
    move: Readonly<MoveData>,
    target: Elf,
    source: Elf,
}