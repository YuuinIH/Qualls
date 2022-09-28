// //常量定义
// const HookEnum = {values: ["默认"]}
// const TargetEnum = {
//   values: [
//     "自身",
//     "对方"
//   ]
// }
// const TargetStateEnum = {
//   values: [
//     "物攻等级",
//     "特攻等级",
//     "物防等级",
//     "特防等级",
//     "速度等级",
//     "物攻值",
//     "特攻值",
//     "物防值",
//     "特防值",
//     "速度值",
//     "当前体力值",
//     "最大体力值"
//   ]
// }
// const CalculateTypeEnum = {
//   values: [
//     "取大",
//     "取小",
//     "加",
//     "减",
//     "乘",
//     "随机"
//   ]
// }
// const NumberEffectOperatorEnum = {
//   values: [
//     "增加",
//     "减少",
//     "乘",
//     "上限",
//     "下限",
//     "设值"
//   ]
// }
// const NumberEffectTypeEnum = {
//   values: [
//     "物攻等级",
//     "特攻等级",
//     "物防等级",
//     "特防等级",
//     "速度等级",
//     "物攻值",
//     "特攻值",
//     "物防值",
//     "特防值",
//     "速度值",
//     "体力值",
//     "先制能力",
//     "命中率",
//     "闪避率",
//     "暴击率",
//     "致命率",
//     "技能威力",
//     "技能伤害",
//     "技能怒气",
//     "基础伤害",
//     "附加伤害",
//     "固定伤害",
//     "真实伤害",
//     "受到的伤害",
//     "造成的伤害",
//     "直接怒气变化",
//     "直接体力变化"
//   ]
// }
// const MarkEffectTypeEnum = {
//   values: [
//     "必中",
//     "无法闪避",
//     "无视强化",
//     "无视攻击类强化",
//     "无视防御类强化"
//   ]
// }
// const BooleanNumberRelationEnum = {
//   values: [
//     "大于等于",
//     "小于等于",
//     "大于",
//     "小于",
//     "等于",
//     "不等于"
//   ]
// }
// const BooleanLogicalRelationEnum = {
//   values: [
//     "并且",
//     "或者"
//   ]
// }


// //函数定义
// /**
//  * 函数定义, 入参和返回值
//  */
// const FunctionImplN = [["参数0", "参数1"], "返回值"]


// /**
//  * 数值类型预定义
//  */
// let NumberValue = null;
// /**
//  * 固定值, 返回自身
//  */
// const FunctionImpl1 = [[Number], Number]
// /**
//  * 动态值, 根据参数取值
//  */
// const FunctionImpl2 = [[TargetEnum, TargetStateEnum], Number]
// /**
//  * 计算值, 根据参数计算
//  */
// const FunctionImpl8 = [[CalculateTypeEnum, NumberValue], Number]
// /**
//  * 值, 常量或者以上几种之一
//  */
// NumberValue = Number || FunctionImpl1 || FunctionImpl2 || FunctionImpl8


// /**
//  * 布尔类型预定义
//  */
// let BooleanValue = null;
// /**
//  * 大小关系
//  */
// const FunctionImpl11 = [[BooleanNumberRelationEnum, NumberValue, NumberValue], Boolean]
// /**
//  * 逻辑关系
//  */
// const FunctionImpl12 = [[BooleanLogicalRelationEnum, BooleanValue, BooleanValue], Boolean]
// /**
//  * 取反逻辑
//  */
// const FunctionImpl13 = [[BooleanValue], Boolean]
// /**
//  * 断言, 布尔值或者以上几种之一
//  */
// BooleanValue = Boolean || FunctionImpl11 || FunctionImpl12 || FunctionImpl13


// //效果定义

// /**
//  * 值类型效果
//  */
// const FunctionImpl21 = [[NumberEffectOperatorEnum, NumberEffectTypeEnum, NumberValue], Boolean]

// /**
//  * 标记类型效果
//  */
// const FunctionImpl22 = [[MarkEffectTypeEnum], Boolean]

// /**
//  * Buff标记类效果
//  */
// const BuffDef = {
//   //id
//   id: 10001,
//   //值
//   value: 1,
//   //标记数量, 与addCount互斥
//   count: 1,
//   //标记改动数量
//   addCount: 1,
//   //最大数量
//   maxCount: 2,
//   //回合倒计时, -1无限制
//   roundTTL: 2,
//   //次数倒计时, -1无限制
//   countTTL: 3
// }

// const FunctionImpl23 = [[BuffDef], Boolean]

// const SimpleEffect = FunctionImpl21 || FunctionImpl22 || FunctionImpl23


// //实现类
// /**
//  * 单个效果, conditions 全部为真时执行 actions, 否则执行 elseActions
//  */
// const SingleEffect = {
//   hook: HookEnum,
//   target: TargetEnum,
//   conditions: Array && BooleanValue,
//   actions: Array && SimpleEffect,
//   elseActions: Array && SimpleEffect
// }

// const SkillEffect = {
//   //技能名称
//   name: String,
//   effects: Array && SingleEffect
// }