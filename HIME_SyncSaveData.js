/*:
@title Sync Save Data
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Dec 31, 2015
@filename HIME_SyncSaveData.js
@url http://himeworks.com/2015/12/sync-save-data/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.0 - allows you to "synchronize" game data across different
save files and during the title screen
@help 
== Description ==

In RPG Maker, all of the game data is isolated within each save file.

This means that you can turn on a switch in one game, save the game, then
load up another game, and see that the switch is still off.

However, there may be times when you want to turn on a switch in one game and
have it turn on for other games as well.

In particular, you might want to be able to be able to record the value of
this switch during the title screen.

With this plugin, you can specify that certain data will be "synchronized",
which means if you change the value in one game, all other save files as well
as the title screen will be affected as long as you save the game.

Note that data will only be synchronized during the save process. Simply
turning on a switch does not mean it will be turned on everywhere else.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.0 - Dec 31, 2015
 - initial release

== Usage ==

Currently, only switches and variables can be synchronized.

-- Synchronizing Switches -- 

To synchronize switches, go to the "Control Switches" event command and select
a switch. Then, rename the switches that should be synchronized with a [S] in
front. For example:

  [S] My Switch

When you save your game, all switches with an [S] in their name will be
automatically synchronized. You can verify that the sync works when you load
a different save file and check the value of the switch.

-- Synchronizing Variables -- 

To synchronize variables, go to the "Control Variables" event command and
select a variable. Then rename the variable with a [S] in front.

  [S] My Variable
  
-- Manual Sync'ing --

By default, whenever you save or load the game, all sync data will be
automatically saved or loaded.

You can manually perform the synchronization using script calls:

  DataManager.saveSyncData()
  
This will save all of the sync data, which will be applied to any other
save file upon loading.

You can also load the sync data manually:

  DataManager.syncData()

 */
/*:ja
 * @title Sync Save Data
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.0
 * @date Dec 31, 2015
 * @filename HIME_SyncSaveData.js
 * @url http://himeworks.com/2015/12/sync-save-data/
 *
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
 *
 * @plugindesc v1.0 異なるセーブファイル間に'同期'するスイッチと変数が作れます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * RPGツクールMVでは、ゲームデータは全て各セーブファイル内で分離されています。
 * あるゲームでスイッチをオンにして、
 * セーブしてから別のセーブデータを読み込んでも、
 * スイッチがオフのままなのを確認できます。
 * しかし、あるセーブデータでスイッチをオンにして、
 * 他のセーブデータでもスイッチをオンにしたい場合もあるでしょう。
 * 特に、タイトル画面中にこのスイッチの値を記録したい場合があります。
 *
 * このプラグインでは、特定のデータを'同期'するように指定することができ、
 * あるセーブデータで値を変更した場合、そのセーブデータが保存している間は、
 * タイトル画面だけでなく、他の全てのセーブデータも影響を受けます。
 * データが同期されるのはセーブされているデータがある場合だけなので
 * 注意してください。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * 1.0 - Dec 31, 2015
 *  - initial release
 *
 * == 使用方法 ==
 *
 * 現在は、スイッチと変数だけが同期できるようになっています。
 *
 * -- スイッチの同期化 --
 *
 * スイッチを同期させるには、
 * イベントコマンド'スイッチの操作'でスイッチを選択します。
 * そして、スイッチの名前の先頭に[S]をつけると同期します。
 * 例えば、以下のようにします。
 *
 *   [S]ゲーム共通スイッチ1
 *
 * セーブすると、名前に[S]がついている全てのスイッチが自動的に同期されます。
 * 同期が行われているかは、
 * 別のセーブファイルを読み込んで、スイッチの値を確認できます。
 *
 * -- 変数の同期化 --
 *
 * 変数を同期させるには、
 * イベントコマンド"スイッチの操作"で変数を選択します。
 * そして、変数名の先頭に[S]を付けます。
 *
 *   [S]ゲーム共通変数1
 *
 * -- 手動同期 --
 *
 * デフォルトでは、ゲームを保存/ロードする度に、
 * 全ての同期データが自動的に保存/ロードされます。
 * スクリプトを使用して手動で同期を実行することができます。
 *
 *   DataManager.saveSyncData()
 *
 * 同期データが全て保存され、読み込み時に他のセーブファイルにも適用されます。
 * 同期データを手動で読み込むこともできます。
 *
 *   DataManager.syncData()
 *
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.SyncSaveData = 1;
TH.SyncSaveData = TH.SyncSaveData || {};

(function ($) {

  $.SyncTag = "[S]"

  var TH_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function () {
    var res = TH_DataManager_isDatabaseLoaded.call(this);
    if (res) {
      this._cacheSyncDatabase();
    }
    return res;
  };

  DataManager._cacheSyncDatabase = function () {
    this._cacheSyncSwitches();
    this._cacheSyncVariables();
  };

  DataManager._cacheSyncSwitches = function () {
    this._syncSwitches = []
    var switches = $dataSystem.switches;
    for (var i = 0; i < switches.length; i++) {
      var name = switches[i];
      if (name !== "" && name.contains($.SyncTag)) {
        this._syncSwitches.push(i);
      }
    };
  };

  DataManager._cacheSyncVariables = function () {
    this._syncVariables = []
    var variables = $dataSystem.variables;
    for (var i = 0; i < variables.length; i++) {
      var name = variables[i];
      if (name !== "" && name.contains($.SyncTag)) {
        this._syncVariables.push(i);
      }
    };
  };

  var TH_DataManager_setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function () {
    TH_DataManager_setupNewGame.call(this);
    this.syncData();
  }

  var TH_DataManager_saveGameWithoutRescue = DataManager.saveGameWithoutRescue;
  DataManager.saveGameWithoutRescue = function (savefileId) {
    var res = TH_DataManager_saveGameWithoutRescue.call(this, savefileId);
    this.saveSyncData();
    return res;
  };

  DataManager.saveSyncData = function () {
    var json = JsonEx.stringify(this.makeSyncData());
    StorageManager.save("sync", json);
  };

  DataManager.makeSyncData = function () {
    var info = {}
    info.switches = this.makeSyncSwitches();
    info.variables = this.makeSyncVariables();
    return info
  };

  DataManager.makeSyncSwitches = function () {
    var data = {}
    for (var i = 0; i < this._syncSwitches.length; i++) {
      var switchId = this._syncSwitches[i];
      data[switchId] = $gameSwitches.value(switchId);
    };
    return data;
  };

  DataManager.makeSyncVariables = function () {
    var data = {}
    for (var i = 0; i < this._syncVariables.length; i++) {
      var varId = this._syncVariables[i];
      data[varId] = $gameVariables.value(varId);
    };
    return data;
  };

  var TH_DataManager_loadGameWithoutRescue = DataManager.loadGameWithoutRescue
  DataManager.loadGameWithoutRescue = function (savefileId) {
    var res = TH_DataManager_loadGameWithoutRescue.call(this, savefileId);
    if (res) {
      res = this.syncData();
    }
    return res;
  };

  DataManager.syncData = function () {
    data = StorageManager.load("sync")
    if (!data) {
      return true;
    }
    var info = JsonEx.parse(data)
    this.syncSwitches(info.switches);
    this.syncVariables(info.variables);
    return true;
  };

  DataManager.syncSwitches = function (switches) {
    for (var id in switches) {
      $gameSwitches.setValue(id, switches[id]);
    }
  }

  DataManager.syncVariables = function (variables) {
    for (var id in variables) {
      $gameVariables.setValue(id, variables[id]);
    }
  }

  /***************************************************************************/

  var TH_StorageManager_localFilePath = StorageManager.localFilePath
  StorageManager.localFilePath = function (savefileId) {
    if (savefileId === "sync") {
      name = "sync_data.rpgsave";
      return this.localFileDirectoryPath() + name;
    }
    else {
      return TH_StorageManager_localFilePath.call(this, savefileId);
    }
  };

  var TH_StorageManager_webStorageKey = StorageManager.webStorageKey;
  StorageManager.webStorageKey = function (savefileId) {
    if (savefileId === "sync") {
      return "RPG TH_SyncData";
    }
    else {
      return TH_StorageManager_webStorageKey.call(this, savefileId);
    }
  };
})(TH.SyncSaveData);