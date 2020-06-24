/*:
@title State Damage Modifiers
@author Hime --> HimeWorks (http://himeworks.com)
@date Jun 1, 2015
@version 1.4
@filename HIME_StateDamageModifiers.js
@url http://himeworks.com/2015/11/state-damage-modifiers/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.4 - Allows you to create states that will alter damage received
based on a formula
@help
== Description ==

In RPG Maker MV, damage calculations are performed when one battler uses an
action on another battler (including themselves).

So for example, let's say your actor attacked an enemy using skill #3. The
game would look at skill #3's damage formula and use that to determine the
base damage that the skill can deal.

In addition to this "base damage", we also have some extra damage modifiers,
such as the guard effect which halves the damage received, as well as the
critical hit modifier, which increases damage based on a critical multiplier.

This plugin allows you to further apply additional damage modifiers, which
essentially allows you to change the damage even further. These modifiers
will be applied to states, so whenever the state is active, the damage
modifiers will be used.

State damage modifiers can be applied to both the attacker as well as the
target. Attacker damage modifiers are applied before the target damage
modifiers.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==
1.4 - Jun 1, 2016
  * Fixed regex to support multiple note-tags
1.3 - Jan 16, 2016
  * fixed bug where 0 damage returns previous damage
1.2 - Dec 3, 2015
  * bug fix: defender states were evaluated twice
  * Formulas that return no value assume they do not change the current damage
1.1 - Dec 2, 2015
  * separated damage modifiers into attacker and defender formulas
  * evaluate formulas in context of current action
1.0 - Nov 28, 2015
  * initial release

== Usage ==

State damage modifiers are similar to damage formulas, except they have an
extra variable available to use: the current damage.

Because there may be multiple damage modifiers involved, you might want to
apply the modifier on top of the results of previously modified damages.

There are two types of damage modifiers: attacker modifiers, and
defender modifiers. Attack modifiers are used when a battler is
attacking someone. On the other hand, defender modifiers are used when
they are on the receiving end of an attack.

If a battler targets themselves, both attacker and defender modifers are
used for the same battler.

To apply a state damage modifier to a state, note-tag states with the
appropriate modifier. If you want to add an attacker modifier, use

  <state damage modifier: attacker>
     FORMULA
  </state damage modifier>

If you want to add a defender modifier, use

  <state damage modifier: defender>
     FORMULA
  </state damage modifier>

Where the FORMULA is any valid javascript expression that evaluates to a
number. The following formula variables are available

  a - the attacker
  b - the target
  v - game variables
  d - current damage (after previous modifiers are applied)

So for example, let's say you wanted to make it so that this state will simply
cancel out any damage. You can use a simple formula

  0

And the damage will now be 0.

Similarly, you could change the damage so that it will leave you with 1 HP.

  b.hp - 1

Which means the target's current HP, less one. This might be useful if you
wanted your state to always leave 1 HP when it's active.

You might make it so that this state will double the damage dealt. You can
say

  d * 2

Which will multiply the current damage by 2.

The possibilities are endless. You are limited by your javascript knowledge.
If you need help coming up with a formula, many people could potentially help.

 */

/*:ja
 * @title State Damage Modifiers
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @date Jun 1, 2015
 * @version 1.4
 * @filename HIME_StateDamageModifiers.js
 * @url http://himeworks.com/2015/11/state-damage-modifiers/
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
 * @plugindesc v1.4 式に基づいて、受けるダメージを変更するステートを作成できます
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * RPGツクールMVでは、
 * バトラーが別のバトラー(自分自身を含む)にアクションを使用すると、
 * ダメージの計算が実行されます。
 *
 * 例えば、アクターがスキル#3を使用して敵を攻撃したとします。
 * スキル#3のダメージ式を使用して、
 * スキルが与える基本ダメージを決定します。
 *
 * この'基本ダメージ'に加えて、受けたダメージを半分にする防御効果や、
 * 会心乗数に基づいてダメージを増加させるクリティカルヒットなど、
 * 追加のダメージ拡張もあります。
 *
 * このプラグインを使用すると、追加のダメージ拡張をさらに適用できます。
 * 本質的にダメージをさらに変更できます。
 * これらの拡張はステートに適用されるため、
 * ステートが有効になる度に、ダメージ拡張が使用されます。
 *
 * ステートダメージ拡張は、攻撃者と対象の両方に適用できます。
 * 攻撃者のダメージ修正は、対象のダメージ修正の前に適用されます。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用プロジェクトでの使用は連絡してください
 *
 * == Change Log ==
 * 1.4 - Jun 1, 2016
 *   * Fixed regex to support multiple note-tags
 * 1.3 - Jan 16, 2016
 *   * fixed bug where 0 damage returns previous damage
 * 1.2 - Dec 3, 2015
 *   * bug fix: defender states were evaluated twice
 *   * Formulas that return no value assume they do not change the current damage
 * 1.1 - Dec 2, 2015
 *   * separated damage modifiers into attacker and defender formulas
 *   * evaluate formulas in context of current action
 * 1.0 - Nov 28, 2015
 *   * initial release
 *
 * == 使用法 ==
 *
 * ステートダメージ拡張は、
 * 使用可能な追加変数である現在のダメージを持っていることを除いて、
 * ダメージ式に似ています。
 *
 * 複数のダメージ拡張が関係している可能性があるため、
 * 以前に修正したダメージの結果の上に拡張を適用することができます。
 *
 * ダメージ拡張には、攻撃者拡張と防御者拡張の2種類があります。
 * 攻撃者拡張は、バトラーが誰かを攻撃している時、使用されます。
 * 一方、防御者拡張の拡張は、攻撃の受け手にいる時、使用されます。
 *
 * バトラーが自分自身を対象にしている場合、
 * 攻撃者と防御者の両方の拡張が同じバトラーに使用されます。
 *
 *
 * ステートのメモタグ
 *
 * ステートにステートダメージ拡張を適用するには、
 * 適切な拡張を使用してステートにメモタグを付けます。
 * 攻撃者拡張を追加する場合、下記を使用します
 *
 *   <state damage modifier: attacker>
 *      FORMULA
 *   </state damage modifier>
 *
 *
 * 防御者拡張を追加する場合、下記を使用します
 *
 *   <state damage modifier: defender>
 *      FORMULA
 *   </state damage modifier>
 *
 *
 * FORMULAは、数値を返すJavaScript式です。
 * 次の数式変数が利用可能です。
 *
 *   a - 攻撃者
 *   b - 対象
 *   v - 変数
 *   d - 現在のダメージ(前の拡張が適用された後)
 *
 * 例えば、このステートでダメージを単純にキャンセルできるようにしましょう。
 * 簡単な式を使用できます。
 *
 *   return 0
 *
 * これでダメージは0になります。
 *
 * 同様に、HPが1になるようにダメージを変更できます。
 *
 *   return b.hp - 1
 *
 * 対象の現在のHPから1つ少ないHPを意味します。
 * 有効な時、常に1HPを残すようにステートを変更したい場合、便利です。
 *
 * このステートで与えられるダメージが2倍になるようにできます。
 * 下記のように書きます。
 *
 *   return d * 2
 *
 * 現在のダメージに2を掛けます。
 *
 * 可能性は無限大。
 * JavaScriptの知識によって制限されます。
 *
 * 数式の作成に支援が必要な場合、多くの人が潜在的に支援できます。
 *
 */


var Imported = Imported || {};
var TH = TH || {};
Imported.StateDamageModifiers = 1;
TH.StateDamageModifiers = TH.StateDamageModifiers || {};

(function ($) {

  $.AtkRegex = /<state[-_ ]damage[-_ ]modifier:\s*attacker>([\s\S]*?)<\/state[-_ ]damage[-_ ]modifier>/im
  $.DefRegex = /<state[-_ ]damage[-_ ]modifier:\s*defender>([\s\S]*?)<\/state[-_ ]damage[-_ ]modifier>/im

  $.stateDamageModifierAtk = function (state) {
    if (state.damageModifierAtk === undefined) {
      $.loadNotetagStateDamageModifiers(state);
    }
    return state.damageModifierAtk;
  };

  $.stateDamageModifierDef = function (state) {
    if (state.damageModifierDef === undefined) {
      $.loadNotetagStateDamageModifiers(state);
    }
    return state.damageModifierDef;
  };

  $.loadNotetagStateDamageModifiers = function (state) {
    state.damageModifierAtk = null;
    state.damageModifierDef = null;
    var res = $.AtkRegex.exec(state.note);
    if (res) {
      var formula = res[1];
      state.damageModifierAtk = new Function("a", "b", "v", "d", formula);
    }

    res = $.DefRegex.exec(state.note);
    if (res) {
      var formula = res[1];
      state.damageModifierDef = new Function("a", "b", "v", "d", formula);
    }
  };

  var TH_GameAction_makeDamageValue = Game_Action.prototype.makeDamageValue;
  Game_Action.prototype.makeDamageValue = function (target, critical) {
    var value = TH_GameAction_makeDamageValue.call(this, target, critical);
    value = this.applyAttackerStateDamageModifiers(target, critical, value);
    value = this.applyDefenderStateDamageModifiers(target, critical, value);
    return value;
  };

  Game_Action.prototype.applyAttackerStateDamageModifiers = function (target, critical, value) {
    var states = this.subject().states();
    for (var i = 0, len = states.length; i < len; i++) {
      var fn = $.stateDamageModifierAtk(states[i])
      value = this.applyStateDamageModifier(target, critical, value, fn);
    }
    return value;
  };

  Game_Action.prototype.applyDefenderStateDamageModifiers = function (target, critical, value) {
    var states = target.states();
    for (var i = 0, len = states.length; i < len; i++) {
      var fn = $.stateDamageModifierDef(states[i])
      value = this.applyStateDamageModifier(target, critical, value, fn);
    }
    return value;
  };

  Game_Action.prototype.applyStateDamageModifier = function (target, critical, value, fn) {
    if (fn) {
      var a = this.subject();
      var b = target;
      var v = $gameVariables;
      var d = value;
      value = fn.call(this, a, b, v, d)
    }
    return value;
  };
})(TH.StateDamageModifiers);