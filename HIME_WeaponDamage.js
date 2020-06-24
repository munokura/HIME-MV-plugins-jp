/*:
 * @title Weapon Damage
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.3
 * @date May 26, 2016
 * @filename HIME_WeaponDamage.js
 * @url http://himeworks.com/2016/02/weapon-damage/
 *
 * If you enjoy my work, consider supporting me on Patreon!
 *
 * * https://www.patreon.com/himeworks
 *
 * If you have any questions or concerns, you can contact me at any of
 * the following sites:
 *
 * * Main Website: http://himeworks.com
 * * Facebook: https://www.facebook.com/himeworkscom/
 * * Twitter: https://twitter.com/HimeWorks
 * * Youtube: https://www.youtube.com/c/HimeWorks
 * * Tumblr: http://himeworks.tumblr.com/
 *
 * @plugindesc v1.3 - Define weapon damage formulas and separate them from
 * skill damage formulas.
 * @help
 * == Description ==
 *
 * In RPG Maker, weapons can be equipped to actors.
 * You can also equip them to enemies if you use plugins like Enemy Equips.
 *
 * Weapons can provide parameter bonuses like extra atk and agi, but you can't
 * specify a damage value for the weapons themselves.
 *
 * For example, if you wanted to have the normal attack skill's damage value to
 * be equal to the amount of damage dealt by the weapon, you would be unable to
 * say this directly.
 *
 * You could say that the "atk" bonus from the weapon represents how much damage
 * the weapon can do, but if you were to reference the actor's atk, you would be
 * including any additional atk bonuses that aren't part of the weapon.
 *
 * This plugin allows you to define weapon damage formulas, which can be used
 * in your skill formulas if necessary.
 *
 * By separating the weapon damage from your atk, you have more control over
 * how your want your skills to be set up!
 *
 * == Terms of Use ==
 *
 * - Free for use in non-commercial projects with credits
 * - Free for use in commercial projects, but it would be nice to let me know
 * - Please provide credits to HimeWorks
 *
 * == Change Log ==
 *
 * 1.2 - Mar 28, 2016
 *  * Fixed bug where bare-handed weapon damage wasn't working
 * 1.1 - Feb 7, 2016
 *  * added formula variable "a" for attacker
 * 1.0 - Feb 6, 2016
 *  - initial release
 *
 * == Usage ==
 *
 * To define a damage formula for you weapons, note-tag them with
 *
 *   <weapon damage>
 *     FORMULA
 *   </weapon damage>
 *
 * For example, let's say you wanted your weapon's damage to be between 2 and 16.
 * You could write
 *
 *   2 * (Math.randomInt(8) + 1)
 *
 * Note that we add 1 because randomInt picks a number between 0 and the value
 * you provided.
 *
 * For those that are familiar, this is equivalent to 2d8.
 * So if you wanted to write something like 1d6 + 4, you would write
 *
 *   (1 * (Math.randomInt(6) + 1)) + 4
 *
 * For now, weapon damages are assumed to be simple.
 *
 *   -- Using Weapon Damage --
 *
 * Weapon damage formulas are not automatically included in your skill damage
 * calculations, because you may not want to consider the weapon.
 *
 * For example, if you're casting a spell and you're holding a sword, would you
 * include the sword damage in the spell damage? Maybe, maybe not.
 *
 * To use the weapon damage formula, in your skill formula, you can write
 *
 *   a.weaponDamage(b)
 *
 * Which will return how much damage the attacker's weapons dealt, based on the
 * formula that you defined earlier. This value includes all weapons, so if the
 * attacker is holding two weapons or three weapons or more, they will all be
 * included in this total, which you can then use as part of the skill.
 *
 * So let's say your normal attack was equal to your weapon's damage.
 * You would write
 *
 *   a.weaponDamage(b)
 *
 * But let's say you wanted to add a bonus for having extra "atk" power, which
 * could represent your physical strength. You might say
 *
 *   a.weaponDamage(b) * a.atk / 10
 *
 * Which adds 1 point of damage per 10 points in atk.
 * The weapon itself may provide atk bonus as well, but it is not necessary.
 *
 *   -- Bare Hands --
 *
 * Now, what happens when you don't have a weapon?
 * If no weapon is held, weapon damage is assumed to be "bare-hands" damage.
 *
 * Bare-hands is set up as a weapon in your database. You don't need to actually
 * hold this in order to use the damage formula, but you could if you wanted to.
 *
 * In the plugin manager, choose the ID of the weapon that will represent
 * bare-hands, and then set up the weapon damage formulas usual.
 *
 * This damage formula will be used as the weapon damage.
 * 
 * @param Bare-Hands Weapon ID
 * @desc The weapon in the database that represents bare-handed.
 * Use when a battler is not holding a weapon.
 * @default 1
 */

/*:ja
 * @title Weapon Damage
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.3
 * @date May 26, 2016
 * @filename HIME_WeaponDamage.js
 * @url http://himeworks.com/2016/02/weapon-damage/
 *
 * あなたが私の仕事を楽しんでいるなら、
 * パトレオンで私への支援を検討してください！
 *
 * - https://www.patreon.com/himeworks
 *
 * ご質問や懸念がある場合、次のサイトのいずれかで私に連絡できます。
 *
 * - Main Website: http://himeworks.com
 * - Facebook: https://www.facebook.com/himeworkscom/
 * - Twitter: https://twitter.com/HimeWorks
 * - Youtube: https://www.youtube.com/c/HimeWorks
 * - Tumblr: http://himeworks.tumblr.com/
 *
 * @plugindesc v1.3 各武器独自のダメージ計算式を設定できます
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * RPGツクールMVでは、武器をアクターに装備できます。
 * HIME_EnemyEquips等のプラグインを使用している場合、
 * 敵が装備することもできます。
 *
 * 武器は攻撃力や俊敏性等の能力値ボーナスを設定できますが、
 * 武器自体のダメージ値を指定することはできません。
 *
 * 例えば、
 * 通常の攻撃スキルのダメージ値を武器によるダメージ値と等しくしたい場合、
 * これは設定できません。
 *
 * 武器からの'攻撃力'ボーナスは、
 * 武器がどれだけのダメージを与えるかを表すと言えますが、
 * アクターの攻撃を参照する場合、
 * 武器の一部ではない追加の攻撃ボーナスを含めることになります。
 *
 * このプラグインを使用すると、
 * 必要に応じてスキルの式で使用できる武器のダメージ式を定義できます。
 *
 * 武器のダメージを攻撃から分離することで、
 * スキルをどのように設定するかをより細かく制御できます。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用プロジェクトでの使用は無料ですが、連絡してください
 * - クレジット表示をHimeWorksにしてください
 *
 * == Change Log ==
 *
 * 1.2 - Mar 28, 2016
 *  * Fixed bug where bare-handed weapon damage wasn't working
 * 1.1 - Feb 7, 2016
 *  * added formula variable "a" for attacker
 * 1.0 - Feb 6, 2016
 *  - initial release
 *
 * == 使用法 ==
 *
 * 武器のダメージ式を定義するには、メモタグを付けます。
 *
 *   <weapon damage>
 *     FORMULA
 *   </weapon damage>
 *
 * 例えば、武器のダメージを2から16にしたいとします。
 * 下記のように書きます。
 *
 *   2 * (Math.randomInt(8) + 1)
 *
 * randomIntは0と指定した値の間の数を選択するため、
 * 1を加算するように注意してください。
 *
 * 慣れている人にとっては、2d8と同等です。
 * 1d6+4のようなものを書きたい場合、次のように書きます。
 *
 *   (1 * (Math.randomInt(6) + 1)) + 4
 *
 * ここでは、武器のダメージがシンプルなものを想定しています。
 *
 *   -- 武器ダメージの使用 --
 *
 * 武器のダメージ式は、スキルに武器を考慮したくない場合があるため、
 * スキルのダメージに自動的に含まれません。
 *
 * 例えば、剣を持って呪文を唱えている場合、
 * 剣のダメージを呪文のダメージに含めますか？
 *
 * 武器のダメージ式を使用するには、スキル式に次のように記述します。
 *
 *   a.weaponDamage(b)
 *
 * 上記で定義した式で、攻撃者の武器ダメージ式の結果を返します。
 * この値には全ての武器が含まれるので、
 * 攻撃者が2つ/3つ以上の武器を持っている場合、
 * それら全ての合計がスキルの一部として使用できます。
 *
 * 通常の攻撃スキルのダメージ式に下記を入れると、
 * 武器ダメージ式と等しくなります。
 *
 *   a.weaponDamage(b)
 *
 * しかし、'攻撃力'でボーナスを追加したいとします。
 * 下記のように表すことができます。
 *
 *   a.weaponDamage(b) + a.atk / 10
 *
 * これにより、攻撃力10ポイント毎に1ポイントのダメージが追加されます。
 * 武器自体も攻撃ボーナスを追加できますが、必須ではありません。
 *
 *   -- 素手 --
 *
 * 武器を装備していない場合、武器ダメージは'素手'のダメージと見なされます。
 *
 * 素手はデータベースに武器として設定されています。
 * ダメージ式を使用するために、これを実際に設定する必要はありませんが、
 * 必要であれば可能です。
 *
 * プラグイン管理で、素手を表す武器のIDを選択し、
 * 通常の武器ダメージ式を設定します。
 *
 * このダメージ式は、武器のダメージとして使用されます。
 * 
 * @param Bare-Hands Weapon ID
 * @text 素手の武器ID
 * @desc データベース内の素手を表す武器。バトラーが武器を持っていない時、使用します。
 * @default 1
 */


var Imported = Imported || {};
var TH = TH || {};
Imported.TH_WeaponDamage = 1;
TH.WeaponDamage = TH.WeaponDamage || {};

(function ($) {

  $.Regex = /<weapon[-_ ]damage>([\s\S]*?)<\/weapon[-_ ]damage>/im

  $.params = PluginManager.parameters("HIME_WeaponDamage");
  $.barehandId = Math.floor($.params["Bare-Hands Weapon ID"]);

  Game_Battler.prototype.evalWeaponDamage = function (weapon, target) {
    if (weapon.damageFormula === undefined) {
      weapon.damageFormula = "0";

      var res = $.Regex.exec(weapon.note);
      if (res) {
        weapon.damageFormula = res[1];
      }
    }
    var a = this;
    var b = target;
    return eval(weapon.damageFormula);
  };

  Game_Battler.prototype.weaponDamage = function (target) {
    var weapons = [];
    if (this.weapons) {
      weapons = this.weapons();
    }
    if (weapons.length === 0) {
      return this.evalWeaponDamage($dataWeapons[$.barehandId], target);
    }
    else {
      var total = 0;
      for (var i = 0; i < weapons.length; i++) {
        total += this.evalWeaponDamage(weapons[i], target);
      }
      return total;
    }
  };
})(TH.WeaponDamage);