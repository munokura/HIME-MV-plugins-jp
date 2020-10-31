/*:ja
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_PreEmptiveBattleEvents.js
 * @title Pre-emptive Battle Events
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.0
 * @date Jan 10, 2016
 * @filename HIME_PreEmptiveBattleEvents.js
 *
 * @plugindesc v1.0 次の戦闘が先制攻撃か不意打ちかを変数で指定できます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * http://himeworks.com/2016/01/pre-emptive-battle-events/
 * 
 * == 説明 ==
 *
 * 戦闘が始まる時、先制攻撃を行うか、敵からの不意打ちを受けるかを
 * 制御したいと思ったことはありませんか?
 *
 * このプラグインは、いくつかの変数を設定することにより、
 * 先制攻撃/不意打ちを保証する方法を提供します。
 *
 * 変数は、対応するエフェクトが発生する戦闘回数を決定します。
 *
 * 例えば、先制変数の値が3だった場合、
 * つまり次の3回の戦闘で先制攻撃を受けることになります。
 *
 * 各戦闘中、変数は自動的に1ずつ減少するため、
 * 自分で更新することを心配する必要はありません。
 *
 * イベント/スキルでこれらの変数を管理することにより、
 * 強制的な先制攻撃/不意打ちを作成できます。
 *
 * == 使用法 ==
 *
 * プラグインパラメータで、先制攻撃を表す変数を選択します。
 *
 * 次に、イベントで設定するか、
 * 変数値を変更する他の手法で設定します。
 *
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用プロジェクトでの使用は無料ですが、連絡してください
 * - クレジット表示をHimeWorksにしてください
 *
 * == Change Log ==
 *
 * 1.0 - Jan 10, 2016
 *  - initial release
 * 
 * @param Pre-Emptive Variable ID
 * @text 先制攻撃変数ID
 * @type variable
 * @desc 先制攻撃の数を追跡する変数
 * @default 10
 *
 * @param Surprise Variable ID
 * @text 不意打ち変数ID
 * @type variable
 * @desc 不意打ちの数を追跡する変数
 * @default 11
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
 * @title Pre-emptive Battle Events
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.0
 * @date Jan 10, 2016
 * @filename HIME_PreEmptiveBattleEvents.js
 * @url http://himeworks.com/2016/01/pre-emptive-battle-events/
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
 * @plugindesc v1.0 - Allows you to use an event command to determine whether
 * the next battle will be a pre-emptive or surprise attack
 * @help
 * == Description ==
 *
 * Ever wanted more control over whether your party will get a pre-emptive
 * strike when a battle begins, or a surprise attack from the enemy?
 *
 * This plugin provides you with a way to guarantee a pre-emptive or surprise
 * by setting some variables.
 *
 * The variables determine how many battles the corresponding effect will
 * occur.
 * For example, if your pre-emptive variable had a value of 3, that means for
 * the next 3 battles, you will have pre-emptive strike.
 *
 * During each battle, the variables will automatically be decreased by 1, so
 * you don't need to worry about updating them yourself.
 *
 * By managing these variables in your events or skills, you can create forced
 * pre-emptive strikes or surprise attacks, which leads to different mechanics
 * and storyline tools for your game.
 *
 * == Terms of Use ==
 *
 * - Free for use in non-commercial projects with credits
 * - Free for use in commercial projects, but it would be nice to let me know
 * - Please provide credits to HimeWorks
 *
 * == Change Log ==
 *
 * 1.0 - Jan 10, 2016
 *  - initial release
 *
 * == Usage ==
 *
 * In the plugin parameters, choose which variables will represent pre-emptive
 * strike and surprise attack.
 *
 * Then, you can just set them up in your events, or any other methods that
 * you know to change variable values.
 *
 * @param Pre-Emptive Variable ID
 * @desc Game Variable that tracks the number of battles that will be pre-emptive.
 * @default 10
 *
 * @param Surprise Variable ID
 * @desc Game Varaible that tracks the number of battles that will be surprise
 * @default 11
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.TH_PreEmptiveBattleEvent = 1;
TH.PreEmptiveBattleEvent = TH.PreEmptiveBattleEvent || {};

(function ($) {

  $.params = PluginManager.parameters("HIME_PreEmptiveBattleEvents");
  $.preEmptiveId = Math.floor($.params["Pre-Emptive Variable ID"]);
  $.surpriseId = Math.floor($.params["Surprise Variable ID"]);

  var TH_BattleManager_startBattle = BattleManager.startBattle;
  BattleManager.startBattle = function () {
    this.checkPreemptiveVariables();
    TH_BattleManager_startBattle.call(this);
  };

  BattleManager.checkPreemptiveVariables = function () {
    if ($gameVariables.value($.preEmptiveId) > 0) {
      $gameVariables.setValue($.preEmptiveId, $gameVariables.value($.preEmptiveId) - 1)
      this._preemptive = true;
    }

    if ($gameVariables.value($.surpriseId) > 0) {
      $gameVariables.setValue($.surpriseId, $gameVariables.value($.surpriseId) - 1)
      this._surprise = true;
    }
  };
})(TH.PreEmptiveBattleEvent)