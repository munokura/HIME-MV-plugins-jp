/*:ja
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_CommonEventButtons.js
 * @title End Phase Triggers
 * @author Hime
 * @date Nov 11, 2015
 * @plugindesc v1.0 戦闘終了前に実行するイベントがあれば、実行してから戦闘を終了します
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * http://himeworks.com/2015/10/end-phase-triggers-mv/
 * 
 * == 説明 ==
 *
 * RPGツクールMVのデフォルトでは、全てのアクターや敵が戦闘で敗北した場合、
 * 単純に勝敗処理に直行するようになっています。
 *
 * プラグインを有効にすることで、
 * 戦闘終了までに実行できるイベントがあるかチェックし、実行します。
 *
 * == 使用方法 ==
 *
 * インストールするだけで動きます。
 *
 * == 利用例 ==
 *
 * 死に際にセリフを言う敵を作る
 * https://tkool.jp/mv/guide/006_006f.html
 *
 * 上記の記事では台詞イベントを実行するために、
 * 不死身ステートをつける方法を案内しています。
 *
 * このプラグインを使用すると、不死身ステートをつける必要はなく、
 * 敵を倒すと台詞イベントが実行されてから、戦闘が終了します。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * Nov 11, 2015 - added a check to see if events can run.
 * Oct 28, 2015 - initial release
 */

/*:
@title End Phase Triggers
@author Hime
@date Nov 11, 2015
@url http://himeworks.com/2015/10/end-phase-triggers-mv/
@plugindesc Checks whether there are any events to run before ending the
battle.
@help 
== Description ==

By default, when all actors or enemies are defeated in battle, the game
will simply go straight to the victory or defeat processing.

However, by enabling plugin, the game will perform a check to see if
there are any events that can be run before the battle finishes.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 11, 2015 - added a check to see if events can run.
Oct 28, 2015 - initial release
 
== Usage == 

Plug and Play.

*/

var Imported = Imported || {};
var TH = TH || {};

Imported.EndPhaseTriggers = 1
TH.EndPhaseTriggers = TH.EndPhaseTriggers || {};

(function ($) {

  /* Overwrite. The order of the event checking logic is changed so that
     battle end check occurs after all events have been checked */
  BattleManager.updateEventMain = function () {
    $gameTroop.updateInterpreter();
    $gameParty.requestMotionRefresh();

    /* If event is running, don't start a new one */
    if ($gameTroop.isEventRunning()) {
      return true;
    }

    /* See if there are any events that we can run */
    if (this.canRunEvents()) {
      $gameTroop.setupBattleEvent();
      if ($gameTroop.isEventRunning() || SceneManager.isSceneChanging()) {
        return true;
      }
    }

    /* No events? Let's check if the battle should end */
    if (this.checkBattleEnd()) {
      return true
    }
    return false;
  };

  /* Determines whether events can run or not */
  BattleManager.canRunEvents = function () {
    return true;
  }

})(TH.EndPhaseTriggers);