﻿/*:ja
 * @target MZ MV
 * @title Disabled Choice Conditions
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.4
 * @date Aug 24, 2020
 * @filename HIME_DisabledChoiceConditions.js
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_DisabledChoiceConditions.js
 *
 * @plugindesc v1.4 '選択肢の表示'の選択肢毎に有効/無効をカスタム条件で切り替えられます。
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * http://himeworks.com/2015/10/disabled-choice-conditions/
 * 
 * 
 * == 説明 ==
 *
 * RPGツクールMVには、
 * 選択肢の一覧から個々の選択肢を無効にする方法が付属していません。
 * 例えば、プレイヤーに特定の選択肢を選択させてはいけないが、
 * それでも表示させたい場合、基本的にはその方法はありません。
 * このプラグインを使えば、
 * 使い慣れたツールを使って、自分のカスタム条件に基づいて
 * 各選択肢を無効にする方法を簡単に実現できます。
 *
 * == 使用方法 ==
 *
 * 選択肢を無効にするには、次の2つの方法があります。
 *
 * 1. プラグインコマンドを使う
 *
 * 選択肢を無効にするには、下記のプラグインコマンドを使います。
 *
 *   disable_choice choiceNumber
 *
 * choiceNumber は無効にしたい選択肢の番号です。
 *
 * ロジックの実装には、
 * 必要に応じて条件分岐やその他のイベントコマンドを使用します。
 *
 * 2. スクリプトを使う
 *
 *    this.disable_choice( choiceNumber, formula )
 *
 * choiceNumber は無効にしたい選択肢の番号で、
 * formula はJavascriptの式です。
 *
 * 例えば、スイッチ4がOFFの場合、選択肢3を無効にするには、次のようにします。
 *
 *    this.disable_choice(3, "$gameSwitches.value(4) === false")
 *
 * -- 選択肢が複数セットある場合 --
 *
 * 無効化条件は、
 * 同じインデントレベルの'選択肢の表示'に適用されます。
 *
 * 経験則として、全ての無効化条件は選択肢の直前に宣言するべきです。
 * メッセージと選択肢が分断されるのを避けるために、
 * 無効化条件をメッセージの前にも置くことができます。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * 1.4 - Aug 23, 2020
 *  * support for MZ
 * 1.3 - Jan 5, 2016
 *  * Provided script call with interpreter scope
 * 1.2 - Nov 2, 2015
 *  * rewrote input methods. You can either use a script call, or a
 *    plugin command directly
 * 1.1 - Nov 1, 2015
 *  * added support for plugin/conditional pair
 * 1.0 - Oct 31, 2015
 *  * initial release
 * 
 * 
 * @command disableCommand
 * @desc ページを起動します
 * 
 * @arg Choice Number
 * @type number
 * @desc 無効にするかどうかの選択。1, 2, 3, ...
 * 
 * @arg Condition
 * @type note
 * @desc 選択肢を無効にする場合にtrueを返す式。
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
 *
 */

/*:
-------------------------------------------------------------------------
@target MZ
@title Disabled Choice Conditions
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.4
@date Aug 24, 2020
@url http://himeworks.com/2015/10/disabled-choice-conditions/
@filename HIME_DisabledChoiceConditions.js

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/
-------------------------------------------------------------------------
@plugindesc v1.4 Allows you to disable individual choices in a set of options based on custom conditions
@help 
-------------------------------------------------------------------------
== Description ==

RPG Maker does not come with a way to disable individual choices from
a list of choices. For example, if the player shouldn't be allowed to
select a particular option, but you still want to show it, there's
basically no way to do it.

This plugin provides an easy way for you to disable each choice based
on your own custom conditions using tools that you are already
familiar with!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.4 - Aug 23, 2020
 * support for MZ
1.3 - Jan 5, 2016
 * Provided script call with interpreter scope
1.2 - Nov 2, 2015
 * rewrote input methods. You can either use a script call, or a
   plugin command directly
1.1 - Nov 1, 2015
 * added support for plugin/conditional pair
1.0 - Oct 31, 2015
 * initial release
 
== Usage == 

There are two ways to disable a choice

1. Using a plugin command

To disable a choice, simply use the plugin command

  disable_choice choiceNumber
  
Where the choiceNumber is the number of the choice that
you wish to disable

Use conditional branches and any other event commands as needed
to implement your logic.

2. Using a script call

   this.disable_choice( choiceNumber, formula )
   
Where the choiceNumber is the number of the choice that
you wish to disable, and the formula is a valid Javascript formula.

For example, to disable choice 3 if switch 4 is OFF, you can say

   this.disable_choice(3, "$gameSwitches.value(4) === false")   
   
-- When there are multiple sets of choices --

Disable conditions apply to the immediate set of choices, on the same
indentation level.

As a rule of thumb, you should declare all disable conditions
immediately before your choices. To avoid breaking up messages
and choices, you can place the disable conditions before any
messages as well.

-------------------------------------------------------------------------
@command disableCommand
@desc activates the page!

@arg Choice Number
@type number
@desc The choice to disable. 1, 2, 3, ...

@arg Condition
@type note
@desc Formula that returns true if choice should be disabled.

 */
var Imported = Imported || {}
var TH = TH || {};
Imported.DisabledChoiceConditions = 1;
TH.DisabledChoiceConditions = TH.DisabledChoiceConditions || {};

(function($) {

    /* store all indices that are disabled */
    var TH_DisableChoiceConditions_GameMessage_Clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        TH_DisableChoiceConditions_GameMessage_Clear.call(this);
        this._DisabledChoiceConditions = {};
    };

    /* Returns whether the specified choice is disabled */
    Game_Message.prototype.isChoiceDisabled = function(choiceNum) {
        return this._DisabledChoiceConditions[choiceNum];
    }

    Game_Message.prototype.disableChoice = function(choiceNum, bool) {
        this._DisabledChoiceConditions[choiceNum] = bool;
    }

    /* After setting up choices, go and disable any that should be disabled */
    var TH_DisableChoiceConditions_WindowChoiceList_MakeCommandList = Window_ChoiceList.prototype.makeCommandList;
    Window_ChoiceList.prototype.makeCommandList = function() {
        TH_DisableChoiceConditions_WindowChoiceList_MakeCommandList.call(this);
        for (var i = 0; i < this._list.length; i++) {
            if ($gameMessage.isChoiceDisabled(i)) {
                this._list[i].enabled = false;
            }
        }
    };

    /* Gray out disabled choices */
    var TH_DisableChoiceConditions_WindowChoiceList_DrawItem = Window_ChoiceList.prototype.drawItem
    Window_ChoiceList.prototype.drawItem = function(index) {
        this.changePaintOpacity(this.isCommandEnabled(index));
        TH_DisableChoiceConditions_WindowChoiceList_DrawItem.call(this, index);
    };

    /* MV plugin command */
    var TH_DisabledChoiceConditions_GameInterpreterPluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        TH_DisabledChoiceConditions_GameInterpreterPluginCommand.call(this, command, args);
        if (command.toLowerCase() === "disable_choice") {
            var choiceNum = Math.floor(args[0] - 1);
            $gameMessage.disableChoice(choiceNum, true);
        }
        return true;
    };

    /* disable choice script call, with interpreter scope */
    Game_Interpreter.prototype.disable_choice = function(choiceNum, formula) {
        var num = Math.floor(choiceNum) - 1;
        $gameMessage.disableChoice(num, eval(formula));
    };

    /* disable choice script call */
    disable_choice = function(choiceNum, formula) {
        var num = Math.floor(choiceNum) - 1;

        var disable;
        if (formula === undefined) {
            disable = true
        } else {
            disable = eval(formula)
        }
        $gameMessage.disableChoice(num, disable);
    };
})(TH.DisabledChoiceConditions);