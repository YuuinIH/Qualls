import { MoveData } from "../moves";

export const MovesDex:{[MoveName:string]:MoveData} = {
    weaknessattack: {
        id: 10004,
        name: "Weakness Attack",
        cost: 10,
        basePower: 70,
        accuracy: 95,
        category: "physical",
        type: "water",
        priority: 0,
    },

}