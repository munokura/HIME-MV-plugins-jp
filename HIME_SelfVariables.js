/*:
@title Self Variables
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.4
@date Feb 24, 2016
@filename HIME_SelfVariables.js
@url http://himeworks.com/2015/12/self-variables/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.4 - Allows you to create and manage self-variables for all
of your events!
@help
== Description ==

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.4 - Feb 24, 2016
  * fixed bug where setting a value to 0 doesn't set anything.
1.3 - Feb 10, 2016
  * added support for clearing self-variables
1.2 - Jan 27, 2016
  * Added support for script calls in move routes
1.1 - Dec 27, 2016
  * added support for specifying eventId and mapId in script calls
1.0 - Dec 9, 2015
  * Initial release

== Usage ==

To assign a value to a self-variable, use the script call

  this.set_self_variable(NAME, VALUE)

Where the NAME is the name of the self-variable you want to use, and the
VALUE is some value that you want to assign.

For example, it could be a number

  this.set_self_variable("check_times", 1)

Which would set the variable called "check_times" to 1.

You can then get the value of this self-variable using the script call

  this.get_self_variable("check_times")

Which will return the value 1.

The value of the variable can be anything you want, including numbers, strings,
objects, booleans, functions, and so on. There is no restriction to what you
would like to store, as long as you're consistent.

If you would like to clear an event's self-variable, you can say

   this.clear_self_variable( NAME )
   this.clear_self_variable( NAME, EVENTID )
   this.clear_self_variable( NAME, EVENTID, MAPID )

Or if you would like to clear all of an event's self-variables, you can say

   this.clear_all_self_variables()
   this.clear_all_self_variables( EVENTID )
   this.clear_all_self_variables( EVENTID, MAPID )

If no event ID is specified, it is assumed to be the current event.
If no map ID is specified, it is assumed to be the current map

  -- Working with other events --

Notice that the only two pieces of information you provide are

  1. the variable name
  2. the value (when setting a value)

This is because we assume you are operating on the current event, on the
current map. You may also choose to operate on other events by specifying
event ID's and map ID's in your script calls.

  this.set_self_variable(NAME, VALUE, EVENT_ID)
  this.set_self_variable(NAME, VALUE, EVENT_ID, MAP_ID)

For example if you write

  this.set_self_variable("test", 3, 4)

It will set the self-variable "test" to value 3, for event 4.
If you specify event 0, it will mean the current event.

If you write

  this.set_self_variable("test", 3, 4, 2)

Then you are setting the self-variable "test" to 3, for event 4, on map 2.

Similar script calls are available for getting self-variables:

  this.get_self_variable(NAME, EVENTID)
  this.get_self_variable(NAME, EVENTID, MAPID)

  -- Working with self-variables and numbers --

Unlike regular variables, you don't have a nice editor dialog to work with.
So if you wanted to manipulate them, you will have to use some script calls.

For example, let's say you wanted to keep track of the number of times you've
interacted with the event. The first time you interact with it, you would say

  this.set_self_variable("interact_count", 1)

The next time you interact with it again, you would start by getting the
value of the self-variable, increase it by 1, and then assigning that to the
variable.

  var oldCount = this.get_self_variable("interact_count") || 0;
  var newCount = oldCount + 1;
  this.set_self_variable("interact_count", newCount);

Note the extra part in that first line. This is a shortcut in case that
variable never had a value to begin with. This may be useful if you're
strictly working with numbers.

  -- Working with self-variables and strings --

You can store strings (or "text") inside self-variables as well. For example,
you could say

  this.set_self_variable("myName", "tester")

And the variable called `myName` will now hold the value "tester".
If you wanted to check the value of this variable equals "tester,
you could something like

  this.get_self_variable("myName") === "tester"

Which will return true or false depending on what the value of the variable is.

 */

/*:ja
 * @title Self Variables
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.4
 * @date Feb 24, 2016
 * @filename HIME_SelfVariables.js
 * @url http://himeworks.com/2015/12/self-variables/
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
 * @plugindesc v1.4 全てのイベントのセルフ変数を作成/管理できます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * 1.4 - Feb 24, 2016
 *   * fixed bug where setting a value to 0 doesn't set anything.
 * 1.3 - Feb 10, 2016
 *   * added support for clearing self-variables
 * 1.2 - Jan 27, 2016
 *   * Added support for script calls in move routes
 * 1.1 - Dec 27, 2016
 *   * added support for specifying eventId and mapId in script calls
 * 1.0 - Dec 9, 2015
 *   * Initial release
 *
 * == 使用法 ==
 *
 * セルフ変数に値を割り当てるには、スクリプトコールを使用します
 *
 *   this.set_self_variable(NAME, VALUE)
 *
 * NAMEは使用するセルフ変数の名前で、VALUEは割り当てる値です。
 *
 * 例えば、数字とします
 *
 *   this.set_self_variable("check_times", 1)
 *
 * これにより、'check_times'という変数が1に設定されます。
 *
 * その後、スクリプトコールを使用して、このセルフ変数の値を取得できます。
 *
 *   this.get_self_variable("check_times")
 *
 * 値1を返します。
 *
 * 変数の値は、数字、文字列、オブジェクト、ブール値、関数など、
 * 必要なものであれば何でもかまいません。
 * 一貫している限り、保存したいものに制限はありません。
 *
 * イベントのセルフ変数をクリアしたい場合、次のように書きます。
 *
 *    this.clear_self_variable( NAME )
 *    this.clear_self_variable( NAME, EVENTID )
 *    this.clear_self_variable( NAME, EVENTID, MAPID )
 *
 * または、イベントのセルフ変数を全てクリアしたい場合、次のように書きます。
 *
 *    this.clear_all_self_variables()
 *    this.clear_all_self_variables( EVENTID )
 *    this.clear_all_self_variables( EVENTID, MAPID )
 *
 * イベントIDが指定されていない場合、現在のイベントであると見なされます。
 * マップIDが指定されていない場合、現在のマップであると見なされます。
 *
 *   -- 他のイベントでの動作 --
 *
 * 提供する情報は2つだけであることに注意してください
 *
 *   1.変数名
 *   2.値（値を設定する場合）
 *
 * これは現在のイベントで、現在のマップで操作していると想定しているためです。
 * また、スクリプトコールでイベントIDとマップIDを指定することにより、
 * 他のイベントを操作することもできます。
 *
 *   this.set_self_variable(NAME, VALUE, EVENT_ID)
 *   this.set_self_variable(NAME, VALUE, EVENT_ID, MAP_ID)
 *
 * 例1
 *
 *   this.set_self_variable("test", 3, 4)
 *
 * イベント4のセルフ変数'test'を値3に設定します。
 * イベント0を指定すると、現在のイベントを意味します。
 *
 * 例2
 *
 *   this.set_self_variable("test", 3, 4, 2)
 *
 * マップ2でイベント4のセルフ変数'test'を3に設定します。
 *
 * セルフ変数を取得するために、同様のスクリプトコールを使用できます。
 *
 *   this.get_self_variable(NAME, EVENTID)
 *   this.get_self_variable(NAME, EVENTID, MAPID)
 *
 *   -- セルフ変数と数値の使用 --
 *
 * 通常の変数とは異なり、使用するエディタダイアログはありません。
 * それらを操作する場合、いくつかのスクリプトコールを使用する必要があります。
 *
 * 例えば、イベントとやり取りした回数を追跡したいとします。
 * 初めて対話する時、下記のように書きます。
 *
 *   this.set_self_variable("interact_count", 1)
 *
 * 次に対話する時、セルフ変数の値を取得し、1増加し、
 * それを変数に割り当てることから始めます。
 *
 *   var oldCount = this.get_self_variable("interact_count") || 0;
 *   var newCount = oldCount + 1;
 *   this.set_self_variable("interact_count", newCount);
 *
 * その最初の行の余分な部分に注意してください。
 * 変数が最初から値を持たない場合のショートカットです。
 * 数値を厳密に操作している場合、便利です。
 *
 *   -- セルフ変数と文字列の使用 --
 *
 * 文字列をセルフ変数内に保存することもできます。
 *
 *   this.set_self_variable("myName", "tester")
 *
 * "myName"と呼ばれる変数は値"tester"を保持するようになります。
 * この変数の値が'tester'と等しいかは、下記のようにすると確認できます。
 *
 *   this.get_self_variable("myName") === "tester"
 *
 * 変数の値に応じて、true/falseを返します。
 *
 */


var Imported = Imported || {};
var TH = TH || {};
Imported.TH_SelfVariables = 1;
TH.SelfVariables = TH.SelfVariables || {};

var $gameSelfVariables = null;

function Game_SelfVariables() {
  this.initialize.apply(this, arguments);
}

(function ($) {

  Game_SelfVariables.prototype.initialize = function () {
    this._data = {};
  };

  Game_SelfVariables.prototype.getMapData = function (mapId) {
    if (!this._data[mapId]) {
      this._data[mapId] = {};
    }
    return this._data[mapId];
  };

  Game_SelfVariables.prototype.getEventData = function (mapId, eventId) {
    var mapData = this.getMapData(mapId);
    if (!mapData[eventId]) {
      mapData[eventId] = {};
    }
    return mapData[eventId];
  };

  Game_SelfVariables.prototype.value = function (mapId, eventId, id) {
    var eventData = this.getEventData(mapId, eventId);
    return eventData[id];
  };

  Game_SelfVariables.prototype.setValue = function (mapId, eventId, id, value) {
    var eventData = this.getEventData(mapId, eventId);
    if (value !== undefined) {
      eventData[id] = value;
    } else {
      delete eventData[id];
    }
    this.onChange();
  };

  Game_SelfVariables.prototype.clear = function (mapId, eventId, id) {
    var eventData = this.getEventData(mapId, eventId);
    delete eventData[id];
  };

  Game_SelfVariables.prototype.clearAll = function (mapId, eventId) {
    var mapData = this.getMapData(mapId);
    delete mapData[eventId];
  };

  Game_SelfVariables.prototype.onChange = function () {
    $gameMap.requestRefresh();
  };

  /***************************************************************************/

  var TH_DataManager_createGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function () {
    TH_DataManager_createGameObjects.call(this);
    $gameSelfVariables = new Game_SelfVariables();
  };

  var TH_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    var contents = TH_DataManager_makeSaveContents.call(this);
    contents.selfVariables = $gameSelfVariables;
    return contents;
  };

  var TH_DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    TH_DataManager_extractSaveContents.call(this, contents);
    $gameSelfVariables = contents.selfVariables;
  };

  /***************************************************************************/

  Game_Character.prototype.get_self_variable = function (id, eventId, mapId) {
    eventId = eventId || this._eventId;
    if (eventId === 0) {
      eventId = this._eventId;
    }
    mapId = mapId || this._mapId;
    return $gameSelfVariables.value(mapId, eventId, id);
  };

  Game_Character.prototype.set_self_variable = function (id, value, eventId, mapId) {
    eventId = eventId || this._eventId;
    if (eventId === 0) {
      eventId = this._eventId;
    }
    mapId = mapId || this._mapId;
    $gameSelfVariables.setValue(mapId, eventId, id, value);
  };

  Game_Character.prototype.clear_self_variable = function (id, eventId, mapId) {
    eventId = eventId || this._eventId;
    if (eventId === 0) {
      eventId = this._eventId;
    }
    mapId = mapId || this._mapId;
    $gameSelfVariables.clear(mapId, eventId, id);
  };

  Game_Character.prototype.clear_all_self_variables = function (eventId, mapId) {
    eventId = eventId || this._eventId;
    if (eventId === 0) {
      eventId = this._eventId;
    }
    mapId = mapId || this._mapId;
    $gameSelfVariables.clearAll(mapId, eventId);
  };

  /***************************************************************************/

  /* Gets the value of a self-variable for a specific event on the map.
   * If eventId is unspecified, it will assume the current event
   * If mapId is unspecified, it will assume the current map
   */
  Game_Interpreter.prototype.get_self_variable = function (id, eventId, mapId) {
    eventId = eventId || this._eventId;
    if (eventId === 0) {
      eventId = this._eventId;
    }
    mapId = mapId || this._mapId;
    return $gameSelfVariables.value(mapId, eventId, id);
  };

  /* Sets the value of a self-variable for a specific event on the map.
   * If eventId is unspecified, it will assume the current event
   * If mapId is unspecified, it will assume the current map
   */
  Game_Interpreter.prototype.set_self_variable = function (id, value, eventId, mapId) {
    eventId = eventId || this._eventId;
    if (eventId === 0) {
      eventId = this._eventId;
    }
    mapId = mapId || this._mapId;
    $gameSelfVariables.setValue(mapId, eventId, id, value);
  };

  Game_Interpreter.prototype.clear_self_variable = function (id, eventId, mapId) {
    eventId = eventId || this._eventId;
    if (eventId === 0) {
      eventId = this._eventId;
    }
    mapId = mapId || this._mapId;
    $gameSelfVariables.clear(mapId, eventId, id);
  };

  Game_Interpreter.prototype.clear_all_self_variables = function (eventId, mapId) {
    eventId = eventId || this._eventId;
    if (eventId === 0) {
      eventId = this._eventId;
    }
    mapId = mapId || this._mapId;
    $gameSelfVariables.clearAll(mapId, eventId);
  };
})(TH.SelfVariables);