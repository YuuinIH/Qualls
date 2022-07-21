export const MovesDex:{[MoveName:string]:MoveData} = {
    fenlitupo:{
        id: 10005,
        name: "奋力突破",
        cost: 20,
        basePower: 65,
        accuary: 95,
        category: "physical",
        type: "normal",
        priority: 0,
        afterHit: function(this: Battle, source: Elf, target: Elf, move: ActiveMove){
            this.target.addMark("易伤");
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
        beforeClacDamage: function(this: Battle, source: Elf, target: Elf, move: ActiveMove){
            if(target.battle.Random(100) < 5){
                this.target.addMark("防御力降低");
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
        afterHit: function(this: Battle, source: Elf, target: Elf, move: ActiveMove){
            this.source.addMark("佯攻");
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
        afterHit: function(this: Battle, source: Elf, target: Elf, move: ActiveMove){
            this.source.addMark("攻击力提升");
        }
    }
}