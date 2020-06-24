/*:
@title Actor Battle Commands
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.5
@date Aug 25, 2016
@filename HIME_ActorBattleCommands.js
@url http://himeworks.com/2015/12/actor-battle-commands/

If you enjoy my work, consider supporting me on Patreon!

https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

Main Website: http://himeworks.com
Facebook: https://www.facebook.com/himeworkscom/
Twitter: https://twitter.com/HimeWorks
Youtube: https://www.youtube.com/c/HimeWorks
Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.4 - Provides you with tools to customize and manage actor
battle commands.
@help 
== Description ==

This plugin allows you to manage each and every one of your actors'
battle commands.

You can hide them or show them at anytime.
You can disable them or enable them whenever you want.

You can even choose which commands your actors will be able to use
during battle!

If you are a plugin developer, you can also create your own commands
easily and allow other game developers to use them in their games!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.5 - Aug 25, 2016
  * Updated skill_list to only display skill_type commands that are visible
  * Updated skill_list to only enable skills that are actually enabled
1.4 - Jul 12, 2016
  * Bug fix: changing class doesn't refresh class commands
1.31 - May 26, 2016
  * Fixed default actor commands
1.3 - Feb 17, 2016
  * added support for specifying "enabled" condition for commands
  * added support for specifying "visible" condition for commands
1.2 - Dec 22, 2015
  * fixed bug where class commands are "shared" between actors
1.1 - Dec 6, 2015
  * added support for tagging classes with battle commands.
1.0 - Dec 6, 2015
  * initial release

== Usage ==

Before we begin, we will need to understand how commands are structured.
Every command comes with 3 pieces of information

  1. Display Name
  2. Symbol
  3. Extra Data
  
The "display name" is the name that is drawn on the screen that the player
can see. You can change the display name at anytime.

The "symbol" is the name that the code uses to identify a certain type
of command. For example, "item" is the name of the Item command. You can
have the item command displayed as "Backpack", but it will still use
"item" internally.

Thre "Extra data" is information that the game uses to determine how to
handle a command. Different commands may need different extra data.

Anyways, let's start adding some commands for your actors.

  -- Initializing Commands --
  
You can initialize commands for each actor. This plugin offers a 
basic note-tag:

  <battle command: SYMBOL EXT />
 
Where the SYMBOL is the name of a pre-defined battle command. The ones
available by default are

  attack          - the "attack" command
  guard           - the "guard" command  
  skill_list      - all skill types the actor can use
  item            - the "item" command
  skill_type ID   - a specific skill type. Specify the skill type ID

You can also tag classes with battle commands. The actual commands
the actor will receive are as follows

1. If the actor has commands, it will use those commands
2. Otherwise, it will check its class for commands.
3. Otherwise, it will use default commands
  
Now, let's take a look at these commands.

  -- Command: attack --
  
This is your basic "Attack" command. It just uses the "Attack" skill,
or whatever skill is assigned to the "attack" command. You can add it
by writing

  <battle command: attack />
  
  -- Command: guard --
  
This is your basic "Guard" command. It just uses the "Guard" skill,
or whatever skill is assigned to the "guard" command". You can add it
by writing

  <battle command: guard />
  
  -- Command: skill_list --
  
This command adds all of the skill types that your actor can use.
For example, if it can use "Magic" and "Special" skills, both will be
added to your list of commands automatically. You can add this by
writing
  
  <battle command: skill_list />
  
  -- Command: item --
  
This command let's you use the "item" command, which will bring up the
item window. You can add this by writing

  <battle command: item />
  
  -- Command: skill_type --
  
This is a new command provided by this plugin. It allows you to display
a certain skill type. For example, if you had "Magic" as skill type 1 and
"Special" as skill type 2, you can add "Special" to your actors by writing

  <battle command: skill_type 2 />
  
Note the use of the number 2 as extra data.

  == Working with Advanced Battle Command ==
  
If you would like to use more advanced functionality, you must use a more
advanced note-tag.

It looks like this:

  <battle command>
    name: "Guarding skill!"
    symbol: "guard",
    isEnabled: "a.hp > 200",
    isVisible: "a.hp > 100"
  </battle command>
  
You do not have to specify all of the options; just use the ones that you 
need to use.

  == Managing Commands using Events ==
  
A number of script calls are available for managing commands during the game.
You can add or remove commands, hide or show commands, enable or disable
commands, and so on.
  
  -- Hiding or Showing Commands --
  
When a command is hidden, it won't be shown to the player.
  
You can hide or show battle commands for each actor during the game.
To hide or show a command, use the script call

  hide_actor_command(ID, SYMBOL)
  show_actor_command(ID, SYMBOL)
  
Where the ID is the ID of the actor, and the SYMBOl is the symbol
of the command. If the actor doesn't have that command, nothing will happen.

For example if you want to hide the item command for actor 4, use

  hide_actor_command(4, "item")
  
If you need to specify extra data, you can specify extra data like this

  hide_actor_command(ID, SYMBOL, EXT)
  show_actor_command(ID, SYMBOL, EXT)
  
Where the EXT is your extra data.

  -- Enabling or Disabling Commands --
  
When a command is disabled, it cannot be selected. If the player tries
to select it, the game will simply play a buzzer sound. To enable or
disable a command, use the script calls

  enable_actor_command(ID, SYMBOL)
  disable_actor_command(ID, SYMBOL)
  
Where the ID is the ID of the actor, and the SYMBOl is the symbol
of the command. If the actor doesn't have that command, nothing will happen.

For example if you want to disable all skill commands for actor 5, use

  disable_actor_command(5, "skill_list")
  
If you need to specify extra data, you can specify extra data like this

  hide_actor_command(ID, SYMBOL, EXT)
  show_actor_command(ID, SYMBOL, EXT)
  
Where the EXT is your extra data.
 */
/*:ja
 * @title Actor Battle Commands
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.6b
 * @date Mar 30, 2017
 * @filename HIME_ActorBattleCommands.js
 * @url http://himeworks.com/2015/12/actor-battle-commands/
 *
 * あなたが私の仕事を楽しんでいるなら、
 * パトレオンで私を支援することを検討してください！
 *
 * https://www.patreon.com/himeworks
 *
 * ご質問やご不明な点がございましたら、次のいずれかのサイトでご連絡ください。
 *
 * Main Website: http://himeworks.com
 * Facebook: https://www.facebook.com/himeworkscom/
 * Twitter: https://twitter.com/HimeWorks
 * Youtube: https://www.youtube.com/c/HimeWorks
 * Tumblr: http://himeworks.tumblr.com/
 *
 * @plugindesc v1.6b アクターのバトルコマンドを管理する機能を追加します
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * == 説明 ==
 *
 * アクターのバトルコマンドを管理する機能を追加します。
 *
 * いつでも非表示/表示にできます。
 * いつでも無効/有効にできます。
 *
 * 戦闘中にアクターが使用できるコマンドを選択することもできます。
 *
 * プラグイン開発者の場合、独自のコマンドを簡単に作成し、
 * 他のゲーム開発者がそれらをゲームで使用できるようにすることもできます。
 *
 * == 利用規約 ==
 *
 * - クレジットを含む非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 * 1.6b - Mar 30, 2017
 *   * Altered to use with YEP_EquipBattleSkills
 *
 * 1.5 - Aug 25, 2016
 *   * Updated skill_list to only display skill_type commands that are visible
 *   * Updated skill_list to only enable skills that are actually enabled
 * 1.4 - Jul 12, 2016
 *   * Bug fix: changing class doesn't refresh class commands
 * 1.31 - May 26, 2016
 *   * Fixed default actor commands
 * 1.3 - Feb 17, 2016
 *   * added support for specifying "enabled" condition for commands
 *   * added support for specifying "visible" condition for commands
 * 1.2 - Dec 22, 2015
 *   * fixed bug where class commands are "shared" between actors
 * 1.1 - Dec 6, 2015
 *   * added support for tagging classes with battle commands.
 * 1.0 - Dec 6, 2015
 *   * initial release
 *
 * == 使用法 ==
 *
 * 始める前に、コマンドの構造を理解する必要があります。
 * 全てのコマンドには3つの情報が含まれています
 *
 *   1. 表示名
 *   2. シンボル(SYMBOL)
 *   3. 追加データ(EXT)
 *
 * '表示名'は画面上に表示される名前です。
 * 表示名はいつでも変更できます。
 *
 * 'シンボル'はコードが特定のタイプのコマンドを識別するために使用する名前です。
 * 'item'はアイテムコマンドの名前です。
 * アイテムコマンドを'バックパック'として表示できますが、
 * 内部では'item'を使用します。
 *
 * '追加データ'はゲームがコマンドの処理方法を決定するために使用する情報です。
 * コマンド毎に異なる追加データが必要になる場合があります。
 *
 * アクターと職業にメモタグを付けることができます。
 *
 *
 *   -- メモタグ基本書式 --
 *
 * 基本的なメモタグの書式は下記になります。
 *
 *   <battle command: SYMBOL EXT />
 *
 * SYMBOL（シンボル）は事前定義された戦闘コマンドの名前です。
 * EXTは追加データです。
 *
 * デフォルトで利用可能な SYMBOL は下記です。
 *
 *   attack          - 「攻撃」コマンド
 *   guard           - 「防御」コマンド
 *   skill_list      - アクターが使用できる全てのスキルタイプ
 *   item            - 「アイテム」コマンド
 *   skill_type ID   - 特定のスキルタイプ。 スキルタイプIDを指定する
 *
 * YEP_EquipBattleSkillsを使用している場合：
 *   skill           - 戦闘スキルの装備スロットを呼び出します。
 *
 * アクターが受ける実際のコマンドは次のとおりです
 *
 * 1.アクターにコマンドがある場合、それらのコマンドを使用します
 * 2.それ以外の場合、コマンドの職業を確認します。
 * 3.それ以外の場合、デフォルトのコマンドを使用します。
 *
 *   -- 「攻撃」コマンド --
 *
 * 基本的な'攻撃'コマンドです。
 * '攻撃'スキル/'攻撃'コマンドに割り当てられているスキルを使用します。
 * 下記メモタグを入力すると追加できます。
 *
 *   <battle command: attack />
 *
 *   -- 「防御」コマンド --
 *
 * 基本的な'防御'コマンドです。
 * '防御'スキル/'防御'コマンドに割り当てられているスキルを使用します。
 * 下記メモタグを入力すると追加できます。
 *
 *   <battle command: guard />
 *
 *   -- 「スキルリスト」コマンド --
 *
 * アクターが使用できる全てのスキルタイプを追加します。
 * '魔法'と'特殊'のスキルを使用できる場合、
 * 両方がコマンドのリストに自動的に追加されます。
 * 下記メモタグを入力すると追加できます。
 *
 *   <battle command: skill_list />
 *
 *   -- 「アイテム」コマンド --
 *
 * 'アイテム'コマンドを使用して、アイテムウィンドウを表示します。
 * 下記メモタグを入力すると追加できます。
 *
 *   <battle command: item />
 *
 *   -- 「スキルタイプ」コマンド --
 *
 * このプラグインが提供する新しいコマンドです。
 * 特定のスキルタイプを表示できます。
 * スキルタイプ1に'マジック'があり、
 * スキルタイプ2に'スペシャル'がある場合、
 * 下記メモタグを入力すると、アクターに'スペシャル'を追加できます。
 *
 *   <battle command: skill_type 2 />
 *
 * 追加データとして2番を使用していることに注意してください。
 *
 *   == 高度な戦闘コマンドの使用 ==
 *
 * より高度な機能を使用する場合、より高度なメモタグを使用する必要があります。
 *
 * 例
 *
 *   <battle command>
 *     name: "Guarding skill!"
 *     symbol: "guard",
 *     isEnabled: "a.hp > 200",
 *     isVisible: "a.hp > 100"
 *   </battle command>
 *
 * 全てのオプションを指定する必要はありません。
 * 必要なものだけを使用してください。
 *
 *   == イベントを使用したコマンドの管理 ==
 *
 * ゲーム中にコマンドを管理するために、
 * 多くのスクリプトを使用できます。
 * コマンドの追加/削除、
 * コマンドの非表示/表示、
 * コマンドの有効化/無効化などができます。
 *
 *   -- コマンドの非表示/表示 --
 *
 * コマンドが非表示の場合、コマンドはプレーヤーに表示されません。
 *
 * ゲーム中に各アクターの戦闘コマンドを非表示/表示できます。
 * コマンドを非表示/表示するには、スクリプトを使用します。
 *
 *   hide_actor_command(ID, SYMBOL)
 *   show_actor_command(ID, SYMBOL)
 *
 * IDはアクターのIDであり、SYMBOLはコマンドのシンボルです。
 * アクターにそのコマンドがない場合、何も起こりません。
 *
 * アクター4のアイテムコマンドを非表示にする場合は、下記を使用します。
 *
 *   hide_actor_command(4, "item")
 *
 * 次のように追加データを指定できます。
 *
 *   hide_actor_command(ID, SYMBOL, EXT)
 *   show_actor_command(ID, SYMBOL, EXT)
 *
 * EXTは追加データです。
 *
 *   -- コマンドの有効化/無効化 --
 *
 * コマンドを無効にすると、選択できなくなります。
 * プレイヤーが選択しようとすると、ゲームはブザー音を鳴らすだけです。
 * コマンドを有効/無効にするには、スクリプトを使用します。
 *
 *   enable_actor_command(ID, SYMBOL)
 *   disable_actor_command(ID, SYMBOL)
 *
 * IDはアクターのIDであり、SYMBOLはコマンドのシンボルです。
 * アクターにそのコマンドがない場合、何も起こりません。
 *
 * アクター5の全てのスキルコマンドを無効にする場合、次を使用します。
 *
 *   disable_actor_command(5, "skill_list")
 *
 * 次のように追加データを指定できます。
 *
 *   hide_actor_command(ID, SYMBOL, EXT)
 *   show_actor_command(ID, SYMBOL, EXT)
 *
 * EXTは追加データです。
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.ActorBattleCommands = 1;
TH.ActorBattleCommands = TH.ActorBattleCommands || {};

function Data_BattlerCommand() {
  this.initialize.apply(this, arguments);
}

(function ($) {

  Data_BattlerCommand.prototype.initialize = function (name, symbol, ext) {
    this._name = name;
    this._symbol = symbol;
    this._ext = ext;
    this._enabled = true;
    this._visible = true;
    this._enableCondition = null;
    this._visibleCondition = null;
  };

  Data_BattlerCommand.prototype.name = function () {
    return this._name;
  };

  Data_BattlerCommand.prototype.setName = function (name) {
    this._name = name;
  };

  Data_BattlerCommand.prototype.symbol = function () {
    return this._symbol;
  };

  Data_BattlerCommand.prototype.ext = function () {
    return this._ext;
  };

  /* Whether this command is enabled or not */
  Data_BattlerCommand.prototype.isEnabled = function (user) {
    return this._enabled && (!this._enableCondition || this.evalCondition(this._enableCondition, user));
  };

  Data_BattlerCommand.prototype.setEnabled = function (bool) {
    this._enabled = bool
  };

  /* Whether this command is visible or not */
  Data_BattlerCommand.prototype.isVisible = function (user) {
    return this._visible && (!this._visibleCondition || this.evalCondition(this._visibleCondition, user));
  };

  Data_BattlerCommand.prototype.setVisible = function (bool) {
    this._visible = bool
  };

  Data_BattlerCommand.prototype.evalCondition = function (formula, user) {
    var a = user;
    var s = $gameSwitches;
    var v = $gameVariables;
    return eval(formula);
  };

  /***************************************************************************/

  $.Regex = /<battle[-_ ]command:\s*(\w+?)(?:\s+(\w+))?\s*\/>/img
  $.ExtRegex = /<battle[-_ ]command>([\s\S]*?)<\/battle[-_ ]command>/img

  $.defaultBattlerCommands = function (obj) {
    var cmds = [
      $.makeCommand("attack"),
      $.makeCommand("skill_list"),
      $.makeCommand("guard"),
      $.makeCommand("item")
    ];
    return cmds;
  };

  $.battlerCommands = function (obj) {
    if (obj.battlerCommands === undefined) {
      this.loadNotetagBattlerCommands(obj);
    }
    return obj.battlerCommands;
  };

  $.loadNotetagBattlerCommands = function (obj) {
    obj.battlerCommands = []
    var res;
    while (res = $.Regex.exec(obj.note)) {
      var symbol = res[1];
      var ext = res[2];
      var cmd = $.makeCommand(symbol, ext);
      obj.battlerCommands.push(cmd);
    }

    while (res = $.ExtRegex.exec(obj.note)) {
      var data = new Function("return {" + res[1] + "}")();
      var name = data.name;
      var symbol = data.symbol.toLowerCase();
      var ext = data.ext;
      var disableCondition = data.isEnabled;
      var hideCondition = data.isVisible;
      var cmd = $.makeCommand(symbol, ext);
      if (name) {
        cmd.setName(name)
      }
      if (hideCondition) {
        cmd._visibleCondition = hideCondition;
      }

      if (disableCondition) {
        cmd._enableCondition = disableCondition;
      }
      obj.battlerCommands.push(cmd)
    }
  };

  $.makeCommand = function (symbol, ext) {
    var methodName = "makeCommand_" + symbol;
    if (this[methodName]) {
      return this[methodName](symbol, ext);
    }
    else {
      throw new Error("Invalid battle command type: " + symbol);
    }
  };

  $.makeCommand_attack = function (symbol, ext) {
    return new Data_BattlerCommand(TextManager.attack, symbol);
  };

  $.makeCommand_guard = function (symbol, ext) {
    return new Data_BattlerCommand(TextManager.guard, symbol);
  };

  $.makeCommand_skill_type = function (symbol, ext) {
    var stypeId = Math.floor(ext);
    name = $dataSystem.skillTypes[stypeId];
    return new Data_BattlerCommand(name, symbol, stypeId);
  };

  $.makeCommand_skill_list = function (symbol, ext) {
    return new Data_BattlerCommand("", symbol);
  };

  $.makeCommand_item = function (symbol, ext) {
    return new Data_BattlerCommand(TextManager.item, symbol);
  };

  /***************************************************************************/

  var TH_GameBattler_initialize = Game_Battler.prototype.initialize;
  Game_Battler.prototype.initialize = function () {
    TH_GameBattler_initialize.call(this);
    this._hiddenSkillTypes = {};
    this._disabledSkillTypes = {};
    this._battleCommands = [];
    this._extraBattleCommands = [];
  };


  Game_Battler.prototype.initBattleCommands = function () {
  };

  Game_Battler.prototype.battleCommands = function () {
    return this._battleCommands;
  };

  /* Sorts battle commands based on their priority
   * specified for the battler
   */
  Game_Battler.prototype.sortBattleCommands = function () {
    // TO DO
  };

  Game_Battler.prototype.addBattleCommand = function (symbol, ext) {
    var cmd = $.makeCommand(symbol, ext);
    this._extraBattleCommands.push(cmd);
    this._battleCommands.push(cmd);
    this.sortBattleCommands();
  };

  Game_Battler.prototype.removeBattleCommand = function (symbol, ext) {
    var cmds = this.battleCommands();
    for (var i = cmds.length - 1; i > -1; i--) {
      var cmd = cmds[i];
      if (cmd.symbol() === symbol && (!ext || (ext && cmd.ext() === ext))) {
        this._battleCommands.splice(i, 1);
      }
    }
  };

  Game_Battler.prototype.setBattleCommandEnabled = function (bool, symbol, ext) {
    this._disabledSkillTypes[ext] = !bool;
    var cmds = this.battleCommands();
    for (var i = 0, len = cmds.length; i < len; i++) {
      var cmd = cmds[i];
      if ((cmd.symbol() === symbol) && (!ext || (ext && cmd.ext() === ext))) {
        cmd.setEnabled(bool);
      }
    }
  };

  Game_Battler.prototype.setBattleCommandVisible = function (bool, symbol, ext) {
    this._hiddenSkillTypes[ext] = !bool;
    var cmds = this.battleCommands();
    for (var i = 0, len = cmds.length; i < len; i++) {
      var cmd = cmds[i];
      if (cmd.symbol() === symbol && (!ext || (ext && cmd.ext() === ext))) {
        cmd.setVisible(bool);
      }
    }
  };

  Game_Battler.prototype.isSkillTypeHidden = function (id) {
    return !!this._hiddenSkillTypes[id];
  };

  Game_Battler.prototype.isSkillTypeDisabled = function (id) {
    return !!this._disabledSkillTypes[id];
  };

  Game_Battler.prototype.refreshBattleCommands = function () {
  };

  /***************************************************************************/

  Game_Actor.prototype.initBattleCommands = function () {
    Game_Battler.prototype.initBattleCommands.call(this);
    var cmds = $.battlerCommands(this.actor())
    if (cmds.length === 0) {
      cmds = $.battlerCommands(this.currentClass())
    }
    if (cmds.length === 0) {
      cmds = $.defaultBattlerCommands(this.actor());
    };
    this._battleCommands = JsonEx.makeDeepCopy(cmds);
  };

  var TH_GameActor_setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function (actorId) {
    TH_GameActor_setup.call(this, actorId);
    this.initBattleCommands();
  };

  Game_Actor.prototype.refreshBattleCommands = function () {
    this.initBattleCommands();
    this._battleCommands = this._battleCommands.concat(this._extraBattleCommands);
  };

  var TH_GameActor_changeClass = Game_Actor.prototype.changeClass;
  Game_Actor.prototype.changeClass = function (classId, keepExp) {
    TH_GameActor_changeClass.call(this, classId, keepExp);
    this.refreshBattleCommands();
  }

  /***************************************************************************/

  /* Overwrite. Generate commands from actor's list */
  var TH_WindowActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
  Window_ActorCommand.prototype.makeCommandList = function () {
    if (this._actor) {
      var cmds = this._actor.battleCommands();
      var len = cmds.length;
      if (len > 0) {
        for (var i = 0; i < len; i++) {
          var cmd = cmds[i];
          if (this.isVisible(cmd)) {
            this.addBattleCommand(cmd);
          }
        }
      }
      else {
        TH_WindowActorCommand_makeCommandList.call(this);
      }
    }
  };

  Window_ActorCommand.prototype.addBattleCommand = function (cmd) {
    var methodName = "addBattleCommand_" + cmd.symbol();
    this[methodName](cmd);
  };

  /* New. Determine command visibility from the command */
  Window_ActorCommand.prototype.isVisible = function (cmd) {
    return cmd.isVisible(this._actor);
  };

  /* New */
  Window_ActorCommand.prototype.addBattleCommand_attack = function (cmd) {
    var enabled = cmd.isEnabled(this._actor) && this._actor.canAttack();
    this.addCommand(cmd.name(), cmd.symbol(), enabled);
  };

  Window_ActorCommand.prototype.addBattleCommand_guard = function (cmd) {
    var enabled = cmd.isEnabled(this._actor) && this._actor.canGuard();
    this.addCommand(cmd.name(), cmd.symbol(), enabled);
  };

  Window_ActorCommand.prototype.addBattleCommand_item = function (cmd) {
    var enabled = cmd.isEnabled(this._actor);
    this.addCommand(cmd.name(), cmd.symbol(), enabled);
  };

  Window_ActorCommand.prototype.addBattleCommand_skill_list = function (cmd) {
    var enabled = cmd.isEnabled(this._actor);
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function (a, b) {
      return a - b;
    });
    skillTypes.forEach(function (stypeId) {
      if (!this._actor.isSkillTypeHidden(stypeId)) {
        var name = $dataSystem.skillTypes[stypeId];
        var enabled = !this._actor.isSkillTypeDisabled(stypeId);
        this.addCommand(name, 'skill_type', enabled, stypeId);
      }
    }, this);
  };

  Window_ActorCommand.prototype.addBattleCommand_skill_type = function (cmd) {
    var enabled = cmd.isEnabled(this._actor);
    this.addCommand(cmd.name(), cmd.symbol(), enabled, cmd.ext());
  };

  /* An extra binding for clarity */
  var TH_SceneBattle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function () {
    TH_SceneBattle_createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler('skill_type', this.commandSkill.bind(this));
  };

  /***************************************************************************/

  hide_actor_command = function (id, symbol, ext) {
    $gameActors.actor(id).setBattleCommandVisible(false, symbol, ext)
  };

  show_actor_command = function (id, symbol, ext) {
    $gameActors.actor(id).setBattleCommandVisible(true, symbol, ext)
  };

  enable_actor_command = function (id, symbol, ext) {
    $gameActors.actor(id).setBattleCommandEnabled(true, symbol, ext)
  };

  disable_actor_command = function (id, symbol, ext) {
    $gameActors.actor(id).setBattleCommandEnabled(false, symbol, ext)
  };
})(TH.ActorBattleCommands);

