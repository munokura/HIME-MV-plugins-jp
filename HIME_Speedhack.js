/*
 * 私の作品を楽しんでいただけたら、Patreonでの支援をご検討ください。
 * 
 * https://www.patreon.com/himeworks
 * 
 * ご質問やご不明な点がありましたら、
 * 以下のいずれかのサイトからご連絡ください。
 * 
 * Main Website: http://himeworks.com
 * Facebook: https://www.facebook.com/himeworkscom/
 * Twitter: https://twitter.com/HimeWorks
 * Youtube: https://www.youtube.com/c/HimeWorks
 * Tumblr: http://himeworks.tumblr.com/
 */

/*:ja
 * @target MV MZ
 * @title Speed Hack
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.1
 * @date Sep 6, 2020
 * @filename HIME_SpeedHack.js
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_Speedhack.js
 * 
 * @plugindesc v1.1 テストプレイを高速化するスピードハックです。デバッグ専用です。
 * @help 
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * https://himeworks.com/2020/09/speed-hack/
 * 
 * == 説明 ==
 * 
 * テストプレイを高速化するスピードハックです。
 * デバッグ専用です。
 * 
 * デフォルトでは、ゲームは1倍速で動作しますが、
 * 2倍速、3倍速、5倍速、10倍速、50倍速、100倍速など、
 * 好きな速度で動作させることができます。
 * 
 * == 使用方法 ==
 * 
 * スクリプト
 * 
 *   $gameSystem.setSpeedhack( NUMBER )
 *   
 * NUMBERは、ゲームの実行速度の乗数です。
 * 
 * MZユーザーの場合は、プラグインコマンド
 * 
 *   Change Speed
 *   
 * で、乗数を指定します。
 * 
 * == 利用規約 ==
 * 
 * - クレジットがあれば、非営利プロジェクトでの使用は無料です。
 * - 商用利用の場合、私に連絡してください。
 * 
 * == Change Log ==
 * 
 * 1.1 - Sep 6, 2020
 *   * added Game_System script call
 *   * added MZ plugin command
 * 1.0 - Sep 6, 2020
 *   * initial release
 * 
 * @command Change Speed
 * @text 速度変更
 * @desc ゲームの実行速度を設定します。
 * 
 * @arg Multiplier
 * @text 乗数
 * @type number
 * @desc ゲームの実行速度を設定します。1は通常の速度です。
 * @default 2
 */

/*
 * If you enjoy my work, consider supporting me on Patreon!
 * 
 * https://www.patreon.com/himeworks
 * 
 * If you have any questions or concerns, you can contact me at any of
 * the following sites:
 * 
 * Main Website: http://himeworks.com
 * Facebook: https://www.facebook.com/himeworkscom/
 * Twitter: https://twitter.com/HimeWorks
 * Youtube: https://www.youtube.com/c/HimeWorks
 * Tumblr: http://himeworks.tumblr.com/
 */

/*:
 * @target MV MZ
 * @title Speed Hack
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.1
 * @date Sep 6, 2020
 * @filename HIME_SpeedHack.js
 * @url https://himeworks.com/2020/09/speed-hack/
 * 
 * @plugindesc v1.1 - Just speed hacks for speeding up your test plays.
 * This is meant for debug only.
 * @help 
 * == Description ==
 * 
 * Testing your games is pretty slow, so I offer this speed hack solution
 * that will let you playtest your games at any speed that you want.
 * 
 * By default, the game runs at 1x speed, but you can run at 2x, 3x, 5x,
 * 10x, 50x, 100x, whatever you want.
 * 
 * == Usage ==
 * 
 * Script call
 * 
 *   $gameSystem.setSpeedhack( NUMBER )
 *   
 * Where NUMBER is the multiplier on how fast the game should run.
 * 
 * For MZ users, you can use the plugin command
 * 
 *   Change Speed
 *   
 * And then specify the multiplier.
 * 
 * == Terms of Use ==
 * 
 * - Free for use in non-commercial projects with credits
 * - Contact me for commercial use
 * 
 * == Change Log ==
 * 
 * 1.1 - Sep 6, 2020
 *   * added Game_System script call
 *   * added MZ plugin command
 * 1.0 - Sep 6, 2020
 *   * initial release
 * 
 * @command Change Speed
 * @arg Multiplier
 * @type number
 * @desc How fast you want the game to run. 1x is normal speed.
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.SpeedHack = 1;
TH.SpeedHack = TH.SpeedHack || {};

(function ($) {

  var scriptName = document.currentScript.src.split("/").pop();
  var lastDot = scriptName.lastIndexOf(".")

  // get plugin parameters using script name as key
  $.pluginName = scriptName.substring(0, lastDot);

  $.changeSpeed = function (args) {
    let multiplier = Math.floor(args["Multiplier"]);
    $gameSystem.setSpeedhack(multiplier);
  }

  if (Utils.RPGMAKER_NAME === "MZ") {
    PluginManager.registerCommand($.pluginName, "Change Speed", $.changeSpeed);
  }

  Game_System.prototype.setSpeedhack = function (n) {
    SceneManager.setSpeedMultiplier(n);
  }

  var TH_SceneManager_initialize = SceneManager.initialize
  SceneManager.initialize = function () {
    TH_SceneManager_initialize.call(this);
    this._speedMultiplier = 1;
    this._dupeUpdate = false;
  }

  SceneManager.setSpeedMultiplier = function (n) {
    this._speedMultiplier = n;
  }

  var TH_SceneManager_update = SceneManager.update;
  SceneManager.update = function (deltaTime) {
    TH_SceneManager_update.call(this, deltaTime);

    this._dupeUpdate = true
    for (let i = 1; i < this._speedMultiplier; i++) {
      this.updateMain();
    }
    this._dupeUpdate = false
  };

  // for MV, update main does a bunch of frame sync'ing which we don't want for dupe updates
  if (Utils.RPGMAKER_NAME === "MV") {
    var TH_SceneManager_updateMain = SceneManager.updateMain
    SceneManager.updateMain = function () {
      if (this._dupeUpdate) {
        this.updateInputData();
        this.changeScene();
        this.updateScene();
      }
      else {
        TH_SceneManager_updateMain.call(this);
      }
    };
  }

  var TH_WindowSelectable_processCursorMove = Window_Selectable.prototype.processCursorMove
  Window_Selectable.prototype.processCursorMove = function () {
    if (!SceneManager._dupeUpdate) {
      TH_WindowSelectable_processCursorMove.call(this);
    }
  }

  var TH_WindowSelectable_processHanding = Window_Selectable.prototype.processHandling
  Window_Selectable.prototype.processHandling = function () {
    if (!SceneManager._dupeUpdate) {
      TH_WindowSelectable_processHanding.call(this);
    }
  }

})(TH.SpeedHack);
