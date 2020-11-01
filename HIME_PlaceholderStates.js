/*:ja
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_PlaceholderStates.js
 * @title Placeholder States
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.0
 * @date Jan 10, 2015
 * @filename HIME_PlaceholderStates.js
 * 
 * @plugindesc v1.0 同じステートを追加で付与された時、違うステートを付与するなどJavaScriptでカスタマイズできます
 * @help 
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 * 
 * 元プラグイン:
 * http://himeworks.com/2016/01/placeholder-states/
 * 
 * == 説明 ==
 * 
 * プレースホルダステートとは、実際にバトラーに追加される時、
 * どのステートが追加されるかを式を使って決定する特別なステートのことです。
 * 例えば、'凍結'というステートがあったとします。
 * 最初に凍結ステートを適用すると、敵は凍結ステートになります。
 * しかし、既に凍結している敵に凍結ステートを適用すると、
 * 敵は粉々になって死んでしまいます。
 * 別の例として、'毒'というステートがあったとします。
 * このステートを最初にバトラーに適用すると、毒1が追加されます。
 * すでに毒1を持っているバトラーに毒のステートを追加すると、
 * 毒は削除され、毒2に置き換わります。
 * 同じバトラーに複数回使用しても、
 * 潜在的に異なる結果が得られるステートを作成することができます。
 * 
 * == 使用方法 ==
 * 
 * ステートのメモタグ
 * 
 * <placeholder state>
 *   FORMULA
 * </placeholder state>
 * 
 * FORMULAは数値を返すjavascriptの式で、
 * 実際に追加/削除されたステートのIDになります。
 * 任意の数の条件を使用することができます。
 * 
 * 以下の数式変数が利用可能です。
 * 
 *   a - "this"バトラー
 *   v - 変数
 *   
 * 例:ステート4、5以外に設定(無効化の仮のステートを作成)
 *   ステート4が付与していればステート5に置き換え。
 *   付与していなければ、ステート4を付与。
 * 
 * <placeholder state>
 *   if (a.isStateAffected(4)) { 
 *        5;
 *     } else {
 *        4;
 *     }
 * </placeholder state>
 * 
 * 
 * == 利用規約 ==
 * 
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 * 
 * == Change Log ==
 * 
 * 1.0 - Jan 10, 2016
 *  - initial release
 */
/*
 * あなたが私の仕事を楽しんでいるなら、
 * パトレオンで私への支援を検討してください！
 * 
 * - https://www.patreon.com/himeworks
 * 
 * ご質問や懸念がある場合、
 * 次のサイトのいずれかで私に連絡できます。
 * 
 * - Main Website: http://himeworks.com
 * - Facebook: https://www.facebook.com/himeworkscom/
 * - Twitter: https://twitter.com/HimeWorks
 * - Youtube: https://www.youtube.com/c/HimeWorks
 * - Tumblr: http://himeworks.tumblr.com/
 */

/*:
@title Placeholder States
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Jan 10, 2015
@filename HIME_PlaceholderStates.js
@url http://himeworks.com/2016/01/placeholder-states/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.0 - allows you to create a state that may resolve to a different
state when it is added or removed.
@help 
== Description ==

Placeholder States are special states that use a formula to determine which
state will be added, when they are actually being added to a battler.

For example, let's say you had a state called "Freeze". When you first apply
the freeze state, the enemy will be frozen. However, if you applied the freeze
state to an enemy that is already frozen, they will shatter and die.

As another example, suppose you had a state called Poison. When you first
apply the state to a battler, Poison 1 will be added. When you add the Poison
state to a battler that already has Poison 1, it will be removed, and replaced
with Poison 2.

This allows you to create states that can be used on the same battler multiple
times, but potentially have different results.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.0 - Jan 10, 2016
- initial release

== Usage ==

Note-tag states with

<placeholder state>
 FORMULA
</placeholder state>

Where the FORMULA is any javascript expression that returns a number, which
will be the ID of the state that is actually added or removed. You can use
any number of conditions.

The following formula variables are available

 a - "this" battler.
 v - game variables
 
*/

var Imported = Imported || {};
var TH = TH || {};
Imported.TH_PlaceholderStates = 1;
TH.PlaceholderStates = TH.PlaceholderStates || {};

(function ($) {

  $.Regex = /<placeholder[-_ ]state>([\s\S]*?)<\/placeholder[-_ ]state>/im

  $.isPlaceholderState = function (state) {
    return $.placeholderStateFormula(state) !== ""
  }

  $.placeholderStateFormula = function (state) {
    if (state.placeholderStateFormula === undefined) {
      state.placeholderStateFormula = "";
      var res = $.Regex.exec(state.note);
      if (res) {
        state.placeholderStateFormula = res[1];
        console.log(res)
      }
    }
    return state.placeholderStateFormula;
  };

  var TH_GameBattler_addState = Game_Battler.prototype.addState;
  Game_Battler.prototype.addState = function (stateId) {
    stateId = this.evalPlaceholderState(stateId);
    TH_GameBattler_addState.call(this, stateId);
  };

  var TH_GameBattler_removeState = Game_Battler.prototype.removeState;
  Game_Battler.prototype.removeState = function (stateId) {
    stateId = this.evalPlaceholderState(stateId);
    TH_GameBattler_removeState.call(this, stateId);
  };

  Game_Battler.prototype.evalPlaceholderState = function (stateId) {
    var state = $dataStates[stateId]
    if ($.isPlaceholderState(state)) {
      var formula = $.placeholderStateFormula(stateId);
      var a = this;
      var v = $gameVariables;
      return eval(state.placeholderStateFormula);
    }
    else {
      return stateId;
    }
  };

})(TH.PlaceholderStates);