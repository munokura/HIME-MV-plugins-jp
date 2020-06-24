/*:
@title Double Cast State
@author Hime
@date Nov 5, 2015
@plugindesc Allows you to create a state that will double the number
of times skills or items will be used.
@help
== Description ==

This plugin allows you to easily double the number of times
certain skills are casted.

When a particular state is added to an actor or enemy, all of their
skills will hit twice as many times.

For example, by default, when you cast heal, you only heal once.
However, when the double cast state is effect, you will heal twice
for the price of one!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 5, 2015 -  initial release

== Usage ==

First, note-tag states with

   <double cast>

To specify that they have the double cast effect.

Then, note-tag all skills that can be affected by this
double cast effect with

   <can double cast>

Only skills that have this note-tag will have the double effect.

 */
/*:ja
 * @title Double Cast State
 * @author Hime
 * @date Nov 5, 2015
 * @filename HIME_DoubleCastState.js
 * @url http://himeworks.com/2015/11/double-cast-state/
 *
 * @plugindesc v1.0 スキル、アイテムの連続回数が2倍になるステートが作れます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * 特定のスキルの連続回数を簡単に2倍にできるプラグインです。
 * アクターや敵に特定のステートが追加されると、
 * そのスキルの連続回数が2倍になるダブルキャストステートになります。
 * 例えば、デフォルトでは回復の連続回数は1回です。
 * しかし、ダブルキャストステートになると、
 * 1回分のコストで2回の回復が可能になります。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * Nov 5, 2015 -  initial release
 *
 * == 使用方法 ==
 *
 * ステートのメモタグ
 *
 *    <double cast>
 *
 * このステートがダブルキャストステートになります。
 *
 *
 * スキル、アイテムのメモタグ
 *   ダブルキャスト効果を受けられる全スキル、アイテムに
 *   下記のメモタグを入れてください。
 *
 *    <can double cast>
 *
 *   このメモタグが入っているスキル、アイテムだけが
 *   ダブルキャスト効果を発揮します。
 *
 */

var Imported = Imported || {}
var TH = TH || {};
Imported.DoubleCastState = 1;
TH.DoubleCastState = TH.DoubleCastState || {};

(function ($) {

  $.StateRegex = /<double[-_ ]cast>/i
  $.SkillRegex = /<can[-_ ]double[-_ ]cast>/i

  $.loadNotetagDoubleCastState = function (state) {
    state.isDoubleCastState = false;
    var res = $.StateRegex.exec(state.note);
    if (res) {
      state.isDoubleCastState = true;
    }
  }

  $.loadNotetagCanDoubleCast = function (item) {
    item.canDoubleCast = false;
    var res = $.SkillRegex.exec(item.note)
    if (res) {
      item.canDoubleCast = true;
    }
  };

  $.isDoubleCastState = function (state) {
    console.log(state)
    if (state.isDoubleCastState === undefined) {
      $.loadNotetagDoubleCastState(state);
    }
    return state.isDoubleCastState;
  };

  $.canDoubleCast = function (item) {
    if (item.canDoubleCast === undefined) {
      $.loadNotetagCanDoubleCast(item);
    }
    return item.canDoubleCast;
  };

  /* Overwrite. Use a range rather than a static value */
  var TH_DoubleCastState_GameAction_numRepeats = Game_Action.prototype.numRepeats;
  Game_Action.prototype.numRepeats = function () {
    var num = TH_DoubleCastState_GameAction_numRepeats.call(this)
    if (this.subject().hasDoubleCastEffect() && $.canDoubleCast(this.item())) {
      num *= 2;
    }
    return num;
  };

  Game_BattlerBase.prototype.hasDoubleCastEffect = function () {
    var states = this.states();
    for (var i = states.length - 1; i >= 0; i--) {
      if ($.isDoubleCastState(states[i])) {
        return true;
      }
    }
    return false;
  }
})(TH.DoubleCastState);