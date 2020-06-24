/*:
@title Common Event Queue
@author Hime
@date Nov 5, 2015
@plugindesc Allows you to reserve multiple common events.
@help 
== Description ==

By default, if you try to reserve multiple common events, the engine
will only execute the last one.

This plugin allows you to call multiple common events and make sure that
the engine executes every one of them.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==
Nov 5, 2015
  - Fixed error where I cleared out Imported
Oct 27, 2015
  - Initial release
 
== Usage == 

Plug-and-play
 */
/*:ja
 * @title Common Event Queue
 * @author Hime
 * @date Nov 5, 2015
 * @filename HIME_CommonEventQueue.js
 * @url http://himeworks.com/2015/10/common-event-queue-mv/
 *
 * @plugindesc v1.0 複数のコモンイベントを予約できます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * == 説明 ==
 *
 * デフォルトでは、複数のコモンイベントを予約しようとすると、
 * エンジンは最後のイベントのみを実行します。
 * このプラグインを使用すると、複数のコモンイベントを呼び出して、
 * エンジンが全てのコモンイベントを実行するようにすることができます。
 *
 * == 効果例 ==
 *
 * RPGツクールMVのデフォルトは、アイテムに複数のコモンイベントを設定した場合、
 * 最後のイベントのみを実行します。
 * このプラグインをインストールすると、
 * 登録されたコモンイベント全てが実行されます。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 * Nov 5, 2015
 *   - Fixed error where I cleared out Imported
 * Oct 27, 2015
 *   - Initial release
 *
 * == 使用方法 ==
 *
 * インストールするだけです。
 */

var Imported = Imported || {}
var TH = TH || {};
Imported.CommonEventQueue = 1;
TH.CommonEventQueue = TH.CommonEventQueue || {};

(function ($) {

  var TH_CommonEventQueue_GameTemp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    TH_CommonEventQueue_GameTemp_initialize.call(this);
    this._commonEventQueue = [];
  };

  Game_Temp.prototype.reserveCommonEvent = function (commonEventId) {
    if (commonEventId > 0) {
      this._commonEventQueue.push(commonEventId);
    }
  };

  Game_Temp.prototype.isCommonEventReserved = function () {
    return this._commonEventQueue.length > 0;
  };

  Game_Temp.prototype.reservedCommonEvent = function () {
    var id = this._commonEventQueue.shift()
    return $dataCommonEvents[id];
  };
})(TH.CommonEventQueue);