'use strict';
/* global Effect, eff_applyStatusEffect, eff_damageEffect, StatusEffectDatabase, eff_selfEffect */

// Ability class
/*
  >> Takes an array of effects
  >> Execute() calls each effect's method, passing in the user and target data
*/
function Ability(effects, name, spdMod = 0) {
  this.effects = effects;
  this.name = name;
  this.spdMod = spdMod;
}

Ability.prototype.execute = function (user) {
  var randomExecutionRoll;
  console.log(user.monsterData.name + ' used ' + this.name);
  for (var eff in this.effects) {
    randomExecutionRoll = Math.round(Math.floor(Math.random() * 100));
    if ((randomExecutionRoll + user.target.evasionRate) < this.effects[eff].executionChance) this.effects[eff].effectMethod(user);
    else console.log(user.monsterData.name + ' FAILED TO EXECUTE : effect at index ' + eff, this.randomExecutionRoll + ' , ' + user.target.evasionRate);
  }
};

//All abilities in the game
//Note: DO YOU LIKE NESTING? I HOPE YOU LIKE NESTING!!!!

/*
=== HOW TO WRITE AN ABILITY ===
1. Think of a concept. What effects does the ability do?
2. Add a new property to AbilityDatabase with a new Ability
3. Fill in the following arguments:
  a. Array of effects, written in the order that they are applied
  d. Name as a string

Writing an effect:
Effects have the following parameters
1. Execution chance -> how likely is it to succeed? Number from 1-100
2. Custom values -> this an object literal with properties that are passed to the effect function
  a. eff_damageEffect values: 'damage' (number)
  b. eff_applyStatusEffect values: 'statusToApply' (StatusEffect from StatusEffectDatabase)
  c. eff_selfEffect values: 'selfEffect' (new Effect that applies to user, not target)
  d. eff_modifyStatEffect values: 'statMod' (object literal with 'statName' [name of trait modified, written as currentDefense, currentAttack, etc.] and 'statMod' [number, how much to change stat by] properties)
  e. eff_persistentEffect values:
3. Name as a string
*/
var AbilityDatabase = {};

// MWP
AbilityDatabase['Trample'] = new Ability([
  new Effect(100, { 'damage': 5 }, eff_damageEffect),
  new Effect(100, { 'damage': 5 }, eff_damageEffect)
], 'Trample');

AbilityDatabase['Chomp'] = new Ability([
  new Effect(60, { 'damage': 14 }, eff_damageEffect)
], 'Chomp');

// KRAPKEN
AbilityDatabase['Wrap'] = new Ability([
  new Effect(100, { 'damage': 10 }, eff_damageEffect)
], 'Wrap', 20);

AbilityDatabase['Lure'] = new Ability([
  new Effect(100, { 'statusToApply': StatusEffectDatabase['Lure'] }, eff_applyStatusEffect),
  new Effect(20, { 'damage': 10 }, eff_damageEffect)
], 'Lure');

// GENRATH
AbilityDatabase['Body Slam'] = new Ability([
  new Effect(80, { 'damage': 12 }, eff_damageEffect),
  new Effect(20, {'statusToApply' : StatusEffectDatabase['Flinch']}, eff_applyStatusEffect)
], 'Body Slam');

AbilityDatabase['Fortify'] = new Ability([
  new Effect(100, {
    'selfEffect': new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': 2 } }, eff_modifyStatEffect)
  }, eff_selfEffect),
], 'Fortify');


// AMPHYLISK:
AbilityDatabase['Tail Whip'] = new Ability([
  new Effect(100, {'damage' : 6}, eff_damageEffect),
  new Effect(65, {'statusToApply' : StatusEffectDatabase['Venom']}, eff_applyStatusEffect)
], 'Tail Whip');

AbilityDatabase['Stone Gaze'] = new Ability([
  new Effect(60, {'statusToApply' : StatusEffectDatabase['Paralyze']}, eff_applyStatusEffect)
], 'Stone Gaze');


// DAEDALUS
AbilityDatabase['Charge'] = new Ability([
  new Effect(100, {'damage' : 10}, eff_damageEffect),
  new Effect(20, {'statusToApply' : StatusEffectDatabase['Flinch']}, eff_applyStatusEffect)
], 'Charge');

AbilityDatabase['Overdrive'] = new Ability([
  new Effect(100, {
    'selfEffect' : new Effect(100, {'damage' : 4}, eff_damageEffect)
  }, eff_selfEffect),
  new Effect(100, {
    'selfEffect' : new Effect(100, {'statusToApply' : StatusEffectDatabase['Overdrive']}, eff_applyStatusEffect)
  }, eff_selfEffect)
], 'Overdrive');


// WISHBONE
AbilityDatabase['Confuse'] = new Ability([
  new Effect(100, {'statusToApply' : StatusEffectDatabase['Confuse']}, eff_applyStatusEffect)
], 'Confuse');

AbilityDatabase['Mirror Image'] = new Ability([
  new Effect(100, {
    'selfEffect' : new Effect(100, {'statusToApply' : StatusEffectDatabase['Mirror Image']}, eff_applyStatusEffect)
  }, eff_selfEffect)
], 'Mirror Image');



AbilityDatabase['Poison'] = new Ability([
  new Effect(100, { 'statusToApply': StatusEffectDatabase['Venom'] }, eff_applyStatusEffect)
], 'Poison');

