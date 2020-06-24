/*:
 @title Parameter Tables
 @author Hime --> HimeWorks (http://himeworks.com)
 @version 1.3
 @date May 7, 2016
 @filename HIME_ParameterTables.js
 @url http://himeworks.com/2016/01/parameter-tables-mv/

 If you enjoy my work, consider supporting me on Patreon!

 * https://www.patreon.com/himeworks

 If you have any questions or concerns, you can contact me at any of
 the following sites:

 * Main Website: http://himeworks.com
 * Facebook: https://www.facebook.com/himeworkscom/
 * Twitter: https://twitter.com/HimeWorks
 * Youtube: https://www.youtube.com/c/HimeWorks
 * Tumblr: http://himeworks.tumblr.com/

 @plugindesc v1.3 - Allows you to use spreadsheet software to maintain paramete rs for classes
 @help
 == Description ==

 Video: https://youtu.be/lZ1O7tgMxMU

 In RPG Maker MV, you have eight basic parameters to work with for your actors

   - Max HP
   - max MP
   - Attack
   - Defense
   - Magical Attack
   - Magical Defense
   - Agility
   - Luck

 Parameters are managed for each class, and your actors' parameters are
 determined by their current level along with their current class.

 However, the only way to manage your parameters is through the editor,
 and the editor does not support

 1. Custom parameters that you would like to use in your game
 2. Levels beyond 99

 This plugin provides you with a way to manage all of your parameters
 as external tables which you can edit using text editors like notepad,
 or more sophisticated spreadsheet software like Excel.

 You can set values for parameters individually for every level between
 1 and 99, as well as levels beyond 99.

 You can also set values for any custom parameters that you may have in
 your game, though you would first need a plugin that provides custom
 parameter functionality.

 By maintaining your parameters externally, you should have more control
 over your game than before.

 == Terms of Use ==

 - Free for use in non-commercial projects with credits
 - Free for use in commercial projects, but it would be nice to let me know
 - Please provide credits to HimeWorks

 == Change Log ==

 1.3 - May 7, 2016
  * Implemented actor-based parameter tables
 1.2 - Mar 28, 2016
  * fixed bug where last row was not read
  * fixed bug where game never loads if no tables are used
 1.1 - Feb 3, 2016
  * fixed bug where due to timing issues, table parsing is skipped
 1.0 - Jan 25, 2016
  * initial release

 == Usage ==

 In your project folder, go to the "Data" folder and created a new folder
 called "params".

 You will place all of the parameter tables inside this folder, along with
 a special configuration file that the plugin uses to tell the game how to
 read your tables.

 -- Parameter Tables --

 To manage parameter curves for each class, you will create a CSV file.
 You can download a sample one from here to get started:

   http://himeworks.com/files/rmmv/library/params/class_param_template.csv

 The first row of the table contains your headers, which are the names of the
 parameters that each column represents.

 Every row after that is the value of the parameter for the corresponding
 level.

 The first column on the left is reserved for levels.

 So for example, this is how your table might look

 Level,Max HP,Max MP,Attack,Defense,Magical Attack,Magical Defense,Agility,Luck
 1,100,80,30,10,10,20,15,7
 2,110,82,34,13,11,21,16,7
 3,120,84,38,16,12,22,17,8
 4,130,86,42,19,13,23,18,8
 5,140,88,46,22,14,24,19,8

 Simply create your table, pick a filename, then save it in the Params folder.

 -- Assigning Tables to Classes --

 In your class database, note-tag classes with

   <parameter table: NAME_OF_TABLE />

 To have the class use that table. If you don't specify a table, the game will
 just use the default curves provided by the class.

 Multiple classes can use the same table if necessary.

 -- Assigning Tables to Actors --

 By default, actor parameters are based on their current class and current
 level. If you wanted actors to have their own parameters and ignore their
 class parameters, you can note-tag an actor directly with

   <parameter table: NAME_OF_TABLE />

 -- Configuration File --

 To get you started, you can download a sample configuration file from here:

   http://himeworks.com/files/rmmv/library/params/config.json

 If you are using the default parameters in your project, you don't need to
 worry about the file since it is set up already for you.

 Otherwise, if you are planning to work with custom parameters, or you want
 to change the displayed names in the tables, you will need to understand how
 to modify the file.

 The format of the file is as follows

   [
     {
        "name"   : "NAME OF YOUR PARAMETER",
        "type"   : "TYPE OF PARAMETER",
        "symbol" : "FORMULA SYMBOL"
        "id"     : parameterID
     },
     {
        "name"   : "Max HP",
        "symbol" : "mhp"
        "type"   : "basic"
        "id"     : 0
     }
     ...
   ]

 The name of the parameter is the name that you used in the table. It must
 match the name exactly.

 There are three types of parameters:

   - basic
   - extra
   - special

 These are the three types of parameters available in the game by default.

 The ID if the parameter is what the game uses to identify which parameter
 to read. The following ID's are reserved:

   basic 0 - max HP
   basic 1 - Max MP
   basic 2 - Attack
   basic 3 - Defense
   basic 4 - Magical Attack
   basic 5 - Magical Defense
   basic 6 - Agility
   basic 7 - Luck

 You can have any number of parameters as you need.

 @param Delimiter
 @desc Which character to use as the field delimiter
 @default ,
 */

/*:ja
 * @title Parameter Tables
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.3
 * @date May 7, 2016
 * @filename HIME_ParameterTables.js
 * @url http://himeworks.com/2016/01/parameter-tables-mv/
 *
 * あなたが私の仕事を楽しんでいるなら、
 * パトレオンで私への支援を検討してください!
 *
 * - https://www.patreon.com/himeworks
 *
 * ご質問や懸念がある場合、次のサイトのいずれかで私に連絡できます。
 *
 * - Main Website: http://himeworks.com
 * - Facebook: https://www.facebook.com/himeworkscom/
 * - Twitter: https://twitter.com/HimeWorks
 * - Youtube: https://www.youtube.com/c/HimeWorks
 * - Tumblr: http://himeworks.tumblr.com/
 *
 * @plugindesc v1.3 職業やアクターの能力値曲線を表計算ソフトで管理できます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * Video: https://youtu.be/lZ1O7tgMxMU
 *
 * RPGツクールMVには、アクター用の8つの基本能力値があります
 *
 *   - Max HP
 *   - max MP
 *   - Attack
 *   - Defense
 *   - Magical Attack
 *   - Magical Defense
 *   - Agility
 *   - Luck
 *
 * 能力値は職業毎に管理され、
 * アクターの能力値は現在のレベルと現在の職業によって決定されます。
 *
 * ただし、能力値を管理する唯一の方法はエディターを使用することであり、
 * エディターは下記をサポートしていません.
 *
 * 1.カスタム能力値
 * 2.99を超えるレベル
 *
 * このプラグインは、
 * メモ帳等のテキストエディターやExcel等の表計算ソフトを使用して
 * 編集できる外部テーブルとして、
 * 全ての能力値を管理する方法を提供します。
 *
 * 1から99までの全てのレベル、99を超えるレベルに対して、
 * 能力値の値を個別に設定できます。
 *
 * また、カスタム能力値の値を設定することもできますが、
 * 最初にカスタム能力値機能を提供するプラグインが必要になります。
 *
 * 能力値を外部で管理することで、
 * 以前よりもより細かく制御できるようになります。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用プロジェクトでの使用は無料ですが、連絡してください
 * - クレジット表示をHimeWorksにしてください
 *
 * == Change Log ==
 *
 * 1.3 - May 7, 2016
 *  * Implemented actor-based parameter tables
 * 1.2 - Mar 28, 2016
 *  * fixed bug where last row was not read
 *  * fixed bug where game never loads if no tables are used
 * 1.1 - Feb 3, 2016
 *  * fixed bug where due to timing issues, table parsing is skipped
 * 1.0 - Jan 25, 2016
 *  * initial release
 *
 * == 使用法 ==
 *
 * プロジェクトフォルダで、'Data'フォルダに移動し、
 * 'params'という新しいフォルダを作成します。
 *
 * 全ての能力値テーブルをこのフォルダ内に配置し、
 * プラグインがテーブルの読み取り方法をゲームに伝えるために使用する
 * 特別な構成ファイルを配置します。
 *
 * -- 能力値テーブル --
 *
 * 各職業の能力値曲線を管理するには、CSVファイルを作成します。
 * 下記からサンプルをダウンロードできます。
 *
 *   http://himeworks.com/files/rmmv/library/params/class_param_template.csv
 *
 * テーブルの最初の行にはヘッダーが含まれています。
 * ヘッダーは、各列が表す能力値の名前です。
 *
 * その後の全ての行は、対応するレベルの能力値の値です。
 *
 * 左側の最初の列はレベル用に予約されています。
 *
 * 例えば、下記のようにテーブルを作ります。
 *
 * Level,Max HP,Max MP,Attack,Defense,Magical Attack,Magical Defense,Agility,Luck
 * 1,100,80,30,10,10,20,15,7
 * 2,110,82,34,13,11,21,16,7
 * 3,120,84,38,16,12,22,17,8
 * 4,130,86,42,19,13,23,18,8
 * 5,140,88,46,22,14,24,19,8
 *
 * テーブルファイルを作成し、Paramsフォルダに保存してください。
 *
 * -- 職業へのテーブルの割り当て --
 *
 * 職業にテーブルを使用させるには、下記のメモタグを職業のメモ欄へ入れます。
 *
 *   <parameter table: FileName_Of_Table />
 *
 * テーブルを指定しない場合、職業が提供するデフォルトの曲線を使用します。
 *
 * 必要に応じて、複数の職業が同じテーブルを使用できます。
 *
 * -- アクターへのテーブルの割り当て --
 *
 * デフォルトでは、
 * アクター能力値は現在の職業と現在のレベルに基づいています。
 * アクターに独自の能力値を持たせ、職業の能力値を無視したい場合、
 * アクターに直接メモタグを付けることができます。
 *
 *   <parameter table: FileName_Of_Table />
 *
 * -- 構成ファイル --
 *
 * 下記からサンプル構成ファイルをダウンロードできます。
 *
 *   http://himeworks.com/files/rmmv/library/params/config.json
 *
 * プロジェクトでデフォルトの能力値を使用している場合、
 * 既にサンプルで設定されているため、
 * このファイルの内容を変更する必要はありません。
 *
 * 構成ファイルを作成し、Paramsフォルダに保存してください。
 *
 * カスタム能力値を使用する予定がある場合、テーブルの表示名を変更する場合、
 * ファイルの変更方法を理解する必要があります。
 *
 * ファイル内の記述形式は次のとおりです。
 *
 *   [
 *     {
 *        "name"   : "NAME OF YOUR PARAMETER",
 *        "type"   : "TYPE OF PARAMETER",
 *        "symbol" : "FORMULA SYMBOL"
 *        "id"     : parameterID
 *     },
 *     {
 *        "name"   : "Max HP",
 *        "symbol" : "mhp"
 *        "type"   : "basic"
 *        "id"     : 0
 *     }
 *     ...
 *   ]
 *
 * 能力値の名前は、テーブルで使用した名前です。
 * 名前と正確に一致する必要があります。
 *
 * 能力値には3つのタイプがあります。
 *
 *   - basic (通常能力値)
 *   - extra (追加能力値)
 *   - special (特殊能力値)
 *
 * これらは、デフォルトで使用できる3種類の能力値です。
 *
 * 読み取る能力値を識別するために次のIDは予約されています。
 *
 *   basic 0 - Max HP (最大HP)
 *   basic 1 - Max MP (最大MP)
 *   basic 2 - Attack (攻撃力)
 *   basic 3 - Defense (防御力)
 *   basic 4 - Magical Attack (魔法力)
 *   basic 5 - Magical Defense (魔法防御)
 *   basic 6 - Agility (敏捷性)
 *   basic 7 - Luck (運)
 *
 * 必要に応じて、任意の数の能力値を使用できます。
 *
 * @param Delimiter
 * @text 区切り文字
 * @desc フィールド区切り文字として使用する文字
 * @default ,
 */


var Imported = Imported || {};
var TH = TH || {};
Imported.TH_ParameterTables = 1;
TH.ParameterTables = TH.ParameterTables || {};

(function ($) {

  $.params = PluginManager.parameters("HIME_ParameterTables");
  $.delimiter = $.params["Delimiter"].trim();
  $.Regex = /<parameter[-_ ]table:\s*(.+?)\s*\/>/im

  $.filesNeeded = 0
  $.filesLoaded = 0;
  $.isConfigLoading = false;
  $.isConfigLoaded = false;
  $.isTableLoading = false
  $.isTableLoaded = false;

  $.config = {};

  $.loadParameterTables = function () {
    for (var i = 1; i < $dataClasses.length; i++) {
      var obj = $dataClasses[i];
      $.loadParameterTable(obj);
    }

    for (var i = 1; i < $dataActors.length; i++) {
      var obj = $dataActors[i];
      $.loadParameterTable(obj);
    }
    $.isTableLoading = true;
  }

  $.loadParameterTable = function (obj) {
    var res = $.Regex.exec(obj.note);
    if (res) {
      $.filesNeeded++;
      var filename = res[1];
      var xhr = new XMLHttpRequest();
      var url = 'data/params/' + filename + ".csv";
      xhr.open('GET', url);
      xhr.overrideMimeType('application/csv');
      xhr.onload = function () {
        if (xhr.status < 400) {
          $.onTableLoad(obj, xhr.responseText);
        }
      };
      xhr.onerror = function () {
        DataManager._errorUrl = DataManager._errorUrl || url;
      };
      xhr.send();
    }
  };

  $.loadConfig = function () {
    var xhr = new XMLHttpRequest();
    var url = "data/params/config.json";
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function () {
      if (xhr.status < 400) {
        $.onConfigLoad(JSON.parse(xhr.responseText));
      }
    };
    xhr.onerror = function () {
      DataManager._errorUrl = DataManager._errorUrl || url;
    };
    xhr.send();
    $.isConfigLoading = true;
  };

  $.onConfigLoad = function (data) {
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      var symbol = obj.symbol;
      var id = obj.id
      $.config[obj.name.toUpperCase()] = obj;
    }
    $.isConfigLoaded = true;
  };

  /* Parameter table is stored as an object, where keys are parameter
   * names are values are arrays of data. The index of each array is the level.
   * Accessing a particular
   */
  $.onTableLoad = function (obj, data) {
    obj.paramTable = { basic: {}, extra: {}, special: {} }
    var columnMap = {}
    data = data.trim().split(/\n/);
    var rows = data.length;
    var table = [];
    for (var i = 0; i < rows; i++) {
      table.push(data[i].split($.delimiter));
    }
    // parse headers
    var headers = table[0];
    for (var i = 1; i < headers.length; i++) {
      columnMap[i] = headers[i].trim();
    }

    // Go through each column, loading up arrays
    for (var key in columnMap) {
      var paramName = columnMap[key].toUpperCase();
      var conf = $.config[paramName];
      var values = [0];
      for (var i = 1; i < rows; i++) {
        values.push(Math.floor(table[i][key]))
      }
      try {
        obj.paramTable[conf.type][conf.id] = values;
      } catch (e) {
        throw (" --> No configuration data found for parameter '" + columnMap[key] + "'")
      }
    }
    $.filesLoaded++;
    $.isTableLoaded = true;
  };

  var TH_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function () {
    var res = TH_DataManager_isDatabaseLoaded.call(this);
    if (res) {
      if (!$.isConfigLoading) {
        $.loadConfig();
        res = false;
      }
      else if ($.isConfigLoaded && !$.isTableLoading) {
        $.loadParameterTables();
        res = false;
      }
      else if ($.isTableLoading) {
        res = ($.filesNeeded === $.filesLoaded);
      }
      else {
        // We're not done until tables are loaded.
        res = false;
      }
    }
    return res;
  };

  Game_Actor.prototype.parameterTable = function () {
    var table = this.actor().paramTable;
    if (table) {
      return table;
    }
    table = this.currentClass().paramTable;
    if (table) {
      return table;
    }
    return null;
  };

  var TH_GameActor_paramBase = Game_Actor.prototype.paramBase;
  Game_Actor.prototype.paramBase = function (paramId) {
    var table = this.parameterTable();
    if (table) {
      return table.basic[paramId][this._level];
    }
    else {
      return TH_GameActor_paramBase.call(this, paramId);
    }
  };

  Game_BattlerBase.prototype.clearParamPlus = function () {
    this._paramPlus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  };

})(TH.ParameterTables);