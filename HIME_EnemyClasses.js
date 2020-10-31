/*:ja
 * @target MV
 * @title Enemy Classes
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @date Jan 7, 2016
 * @version 1.1
 * @filename HIME_EnemyClasses.js
 *
 *
 * @plugindesc v1.1 敵に職業を割り当て、敵の職業とレベルで能力値やアクションを決められます。
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * http://himeworks.com/2015/11/enemy-classes/
 * 
 * == 説明 ==
 *
 * 敵を管理するより良い方法が必要ですか？
 *
 * 例えば、敵レベルを提供するプラグインがある場合、
 * 職業を使用して敵の能力値を決定できます。
 *
 * このプラグインを使用すると、職業を敵に割り当てることができます。
 *
 * 敵に職業がある場合、能力値は全て職業とレベルに基づいて決まります。
 * デフォルトでは、レベル1と見なされます。
 *
 * 職業が提供されていない場合、通常どおり独自の能力値から読み取ります。
 *
 * == 使用法 ==
 *
 * 職業を敵に割り当てるには、メモタグを使用します。
 *
 *   <enemy class: CLASS_ID />
 *
 * CLASS_ID は設定する職業のIDです。
 *
 * -- 敵の職業を変更する --
 *
 * 敵の職業を変更したい場合、プラグインコマンドを使用できます。
 *
 *   change_enemy_class member MEMBER_ID to class CLASS_ID
 *
 * MEMBER_IDは、1から始まる敵の位置です。
 * 例えば、3番目の敵の職業を4に変更する場合、次のように記述します。
 *
 *   change_enemy_class member 3 to class 4
 *
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * 1.1 - Jan 7, 2016
 *  * enemy trait objects now includes enemy class
 * 1.0 - Nov 23, 2015
 *  * initial release
 */
/*
 * ご質問やご不明な点がございましたら、下記のいずれかでご連絡ください。
 *
 * Main Website: http://himeworks.com
 * Facebook: https://www.facebook.com/himeworkscom/
 * Twitter: https://twitter.com/HimeWorks
 * Youtube: https://www.youtube.com/c/HimeWorks
 * Tumblr: http://himeworks.tumblr.com/
 */

/*:
@title Enemy Classes
@author Hime --> HimeWorks (http://himeworks.com)
@date Jan 7, 2016
@version 1.1
@filename HIME_EnemyClasses.js
@url  http://himeworks.com/2015/11/enemy-classes/

If you have any questions or concerns, you can contact me at any of
the following sites:

Main Website: http://himeworks.com
Facebook: https://www.facebook.com/himeworkscom/
Twitter: https://twitter.com/HimeWorks
Youtube: https://www.youtube.com/c/HimeWorks
Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.1 - Allows you to assign a class to an enemy. Parameters
and actions available are determined by enemy class and levels.
@help
== Description ==

Would you like a better way to manage your enemies?

For example, if you have a plugin that gives you enemy levels, you could
take advantage of using classes to determine what the enemy's parameters
will be.

This plugin allows you to assign classes to enemies.

When an enemy has a class, all of their parameters will be based on what
class and level they are. By default, they are assumed to be level 1.

If no class is provided, they will just read from their own parameters
as usual.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.1 - Jan 7, 2016
 * enemy trait objects now includes enemy class
1.0 - Nov 23, 2015
 * initial release

== Usage ==

To assign a class to an enemy, use the note-tag

  <enemy class: CLASS_ID />

Where the CLASS_ID is the ID of the class you want to set.

-- Changing Enemy Class --

If you would like to change an enemy's class, you can use the plugin
command

  change_enemy_class member MEMBER_ID to class CLASS_ID

Where the MEMBER_ID is the position of the enemy, starting from 1.
For example, if you want to change the third enemy's class to 4, you
would write

  change_enemy_class member 3 to class 4

 */

var Imported = Imported || {};
var TH = TH || {};
Imported.EnemyClasses = 1;
TH.EnemyClasses = TH.EnemyClasses || {};

(function ($) {

  $.Regex = /<enemy[-_ ]class:\s*(.+?)\s*\/>/im

  $.getEnemyClass = function (enemy) {
    if (enemy.classId !== undefined) {
      return enemy.classId;
    }
    enemy.classId = 0;
    var res = $.Regex.exec(enemy.note);
    if (res) {
      enemy.classId = Math.floor(res[1]);
    }
    return enemy.classId;
  };

  /***************************************************************************/

  var TH_EnemyClasses_GameEnemy_initMembers = Game_Enemy.prototype.initMembers;
  Game_Enemy.prototype.initMembers = function () {
    this._level = 1;
    this._classId = 0;
    TH_EnemyClasses_GameEnemy_initMembers.call(this);
  };

  var TH_EnemyClasses_GameEnemy_setup = Game_Enemy.prototype.setup;
  Game_Enemy.prototype.setup = function (enemyId, x, y) {
    this._classId = $.getEnemyClass($dataEnemies[enemyId]);
    TH_EnemyClasses_GameEnemy_setup.call(this, enemyId, x, y);
  };

  Game_Enemy.prototype.currentClass = function () {
    return $dataClasses[this._classId];
  };

  var TH_EnemyClasses_GameEnemy_paramBase = Game_Enemy.prototype.paramBase;
  Game_Enemy.prototype.paramBase = function (paramId) {
    if (this._classId === 0) {
      return TH_EnemyClasses_GameEnemy_paramBase.call(this, paramId);
    }
    else {
      return this.currentClass().params[paramId][this._level];
    }
  };

  Game_Enemy.prototype.changeClass = function (classId, keepExp) {
    this._classId = classId;
    this.refresh();
  };

  var TH_GameEnemy_traitObjects = Game_Enemy.prototype.traitObjects;
  Game_Enemy.prototype.traitObjects = function () {
    var traits = TH_GameEnemy_traitObjects.call(this);
    if (this._classId > 0) {
      traits = traits.concat(this.currentClass());
    }
    return traits;
  };

  var TH_GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    var cmd = command.toLowerCase();
    if (cmd === "change_enemy_class") {
      var id = Math.floor(args[1]) - 1
      var classId = Math.floor(args[4]);
      var keepExp = true;
      $gameTroop.members()[id].changeClass(classId, keepExp);
    }
    else {
      TH_GameInterpreter_pluginCommand.call(this, command, args);
    }
  };
})(TH.EnemyClasses);