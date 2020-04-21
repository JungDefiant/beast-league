// Ability class
/*
  >> Takes an array of effects
  >> Execute calls each effect's method, passing in the user and target data
*/
function Ability(effects){
  this.effects = effects;
}

Ability.prototype.execute = function(user, target) {
  var randomExecutionRoll;
  
  for(var eff in effects) {
    randomExecutionRoll = Math.round(Math.floor(Math.random * 100));
    if(randomExecutionRoll) eff.effectMethod(user, target);
  }
};

var AbilityDatabase = [];
AbilityDatabase['Trample'] = new Ability([
  new Effect(100, {'damage' : 5}, EffectMethodsDatabase['damageEffect']),
  new Effect(100, {'damage' : 5}, EffectMethodsDatabase['damageEffect'])
]);
AbilityDatabase['Body Slam'] = new Ability([
  new Effect(80, {'damage' : 12}, EffectMethodsDatabase['damageEffect'])
]);