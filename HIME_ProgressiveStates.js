/*:
@title Progressive States
@author Hime --> HimeWorks (http://himeworks.com)
@date Nov 20, 2015
@filename HIME_ProgressiveStates.js
@url http://himeworks.com/2015/11/progressive-states-mv/

If you enjoy my work, consider supporting me on Patreon!

https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

Main Website: http://himeworks.com
Facebook: https://www.facebook.com/himeworkscom/
Twitter: https://twitter.com/HimeWorks
Youtube: https://www.youtube.com/c/HimeWorks
Tumblr: http://himeworks.tumblr.com/

@plugindesc Allows you to create states where whenever the state is
removed due to expiry, a new state will be added afterwards.
@help
== Description ==

Video: https://www.youtube.com/watch?v=9vjzhg36GqU

Do you have states that automatically change into other states after
a certain amount of turns or actions have elapsed?

For example, you have a Doom state that counts down every turn,
and when the countdown reaches 0, the battler will automatically die.

Or perhaps you have a Poison state that will worsen if it's not
treated, and after walking around for 50 steps, the poison state
automatically turns into a deadlier poison state.

Or perhaps you have a Frozen state that prevents the battler from
moving, but if it gets hit by any damage, it will immediately die.

This plugin allows you to set up your states so that when the state is
removed automatically, new states will be added.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 20, 2015 - refactored code to make it easier to check states
Nov 19, 2015 - initial release

== Usage ==

To specify what states will be added when a state is automatically
removed, add the note-tag

  <progressive state: ID>

Where the ID is the ID of the state that will be added. You can add
multiple states by adding additional notetags.

 */
/*:ja
 * @title Progressive States
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @date Nov 20, 2015
 * @filename HIME_ProgressiveStates.js
 * @url http://himeworks.com/2015/11/progressive-states-mv/
 *
 * あなたが私の仕事を楽しんでいるなら、
 * パトレオンで私への支援を検討してください！
 *
 * * https://www.patreon.com/himeworks
 *
 * ご質問や懸念がある場合、
 * 次のサイトのいずれかで私に連絡できます。
 *
 * Main Website: http://himeworks.com
 * Facebook: https://www.facebook.com/himeworkscom/
 * Twitter: https://twitter.com/HimeWorks
 * Youtube: https://www.youtube.com/c/HimeWorks
 * Tumblr: http://himeworks.tumblr.com/
 *
 * @plugindesc ステートが自動解除された時、新しいステートが追加されるようにステートを設定できます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * Video: https://www.youtube.com/watch?v=9vjzhg36GqU
 *
 * 一定量のターン/アクションが経過すると、
 * 自動的に他のステートに変化するステートがありますか?
 *
 * 例えば、ターン毎にカウントダウンするステートがあり、
 * カウントダウンが0に達すると、バトラーは自動的に死にます。
 *
 * あるいは、治療しないと悪化する毒ステートがあり、
 * 50歩歩いた後、毒ステートが自動的に致命的な毒ステートに変わります。
 *
 * あるいは、
 * バトラーの動きを妨げる凍結ステートになっているかもしれませんが、
 * ダメージを受けた場合、即座に死にます。
 *
 * このプラグインを使用すると、ステートが自動的に解除される時、
 * 新しいステートが追加されるようにステートを設定できます。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用プロジェクトでの使用は連絡してください
 *
 * == Change Log ==
 *
 * Nov 20, 2015 - refactored code to make it easier to check states
 * Nov 19, 2015 - initial release
 *
 * == 使用法 ==
 *
 * ステートが自動的に削除された時、
 * 追加されるステートを指定するには、メモタグを追加します。
 *
 *   <progressive state: ID>
 *
 * IDは追加されるステートのIDです。
 * メモタグを追加して、複数のステートを追加できます。
 *
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.ProgressiveStates = 1;
TH.ProgressiveStates = TH.ProgressiveStates || {};

(function ($) {

  $.Regex = /<progressive[-_ ]state:\s*(\d+)\s*>/img

  $.getProgressiveStates = function (state) {
    if (state.progressiveStates !== undefined) {
      return state.progressiveStates;
    }
    state.progressiveStates = [];
    var res;
    while (res = $.Regex.exec(state.note)) {
      var id = Math.floor(res[1]);
      state.progressiveStates.push(id);
    }
    return state.progressiveStates;
  };

  /* Remove by walking */
  var TH_ProgressiveStates_GameBattler_updateStateSteps = Game_Actor.prototype.updateStateSteps;
  Game_Actor.prototype.updateStateSteps = function (state) {
    TH_ProgressiveStates_GameBattler_updateStateSteps.call(this, state);
    if (!this.isStateAffected(state.id)) {
      this.addProgressiveStates(state);
    }
  };

  /* Remove by damage */
  var TH_ProgressiveStates_GameBattler_removeStatesByDamage = Game_Battler.prototype.removeStatesByDamage;
  Game_Battler.prototype.removeStatesByDamage = function () {
    var oldStates = this._states.clone();
    TH_ProgressiveStates_GameBattler_removeStatesByDamage.call(this);
    var newStates = this._states;
    this.checkProgressiveStates(oldStates, newStates);
  };

  /* Remove by turn end and action end */
  var TH_ProgressiveStates_GameBattler_removeStatesAuto = Game_Battler.prototype.removeStatesAuto;
  Game_Battler.prototype.removeStatesAuto = function (timing) {
    var oldStates = this._states.clone();
    TH_ProgressiveStates_GameBattler_removeStatesAuto.call(this, timing);
    var newStates = this._states;
    this.checkProgressiveStates(oldStates, newStates);
  };

  Game_Battler.prototype.checkProgressiveStates = function (oldStates, newStates) {
    for (var i = 0, len = oldStates.length; i < len; i++) {
      var stateId = oldStates[i];
      var state = $dataStates[stateId];
      if (!newStates.contains(stateId)) {
        this.addProgressiveStates(state);
      }
    }
  };

  Game_Battler.prototype.addProgressiveStates = function (state) {
    var progStates = $.getProgressiveStates(state);
    for (var i = 0, len = progStates.length; i < len; i++) {
      this.addState(progStates[i]);
    }
  };
})(TH.ProgressiveStates);