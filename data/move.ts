import { Character } from "../logic/character";
import { ActiveMove, MoveData }from "../logic/moves";
export const MovesDex:{[MoveName:string]:MoveData} = {
    fenlitupo:{
        id: 10005,
        name: "奋力突破",
        cost: 20,
        basePower: 65,
        accuracy: 95,
        category: "physical",
        type: "normal",
        priority: 0,
        onAfterHit: function(source:Character, target:Character){
            target.addMark("易伤");
        }
    },
    lieyanjvexiji:{
        id: 10006,
        name:"烈焰绝袭击",
        cost: 30,
        basePower: 125,
        accuracy: 95,
        category: "physical",
        type: "fire",
        priority: 0,
        onBeforeClacDamage: function(source:Character, target:Character, move: ActiveMove){
            if(this.random(0,100) < 5){
                target.addMark("防御力降低");
            }
        }
    },
    yanggong:{
        id: 10007,
        name:"佯攻",
        cost: 15,
        basePower: 75,
        accuracy: 95,
        category: "physical",
        type: "normal",
        priority: 2,
        onAfterHit: function(source:Character, target:Character, move: ActiveMove){
            source.addMark("佯攻");
        }
    },
    qili:{
        id: 10008,
        name:"气力",
        cost: 10,
        basePower: 0,
        accuracy: 100,
        category: "status",
        type: "normal",
        priority: 0,
        onAfterHit: function(this: Battle, source:Character, target:Character, move: ActiveMove){
            source.addMark("攻击力提升",1);
        }
    }
}