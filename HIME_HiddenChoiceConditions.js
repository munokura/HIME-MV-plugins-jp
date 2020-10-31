﻿/*:ja
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_HiddenChoiceConditions.js
 * @title Hidden Choice Conditions
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.2
 * @date Jan 5, 2016
 * @filename HIME_HiddenChoiceConditions.js
 * 
 * @plugindesc v1.2 '選択肢の表示'の選択肢毎に表示/非表示をカスタム条件で切り替えられます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 * 
 * 元プラグイン:
 * http://himeworks.com/2015/11/hidden-choice-conditions/
 * 
 * == 説明 ==
 * 
 * 選択肢の組み合わせ毎に多くの異なる選択肢のセットや
 * 条件分岐を作成せずに選択肢を隠す方法が必要ですか?
 * 
 * このプラグインを使うと、イベントだけを使って、
 * 特定の選択肢を非表示に指示することができます。
 * 
 * == 互換性 ==
 * 
 * 互換性の為に、
 * このプラグインは他の選択肢関連のプラグインの下に配置してください。
 * 例えば、HIME_DisabledChoiceConditionsプラグインを使用している場合、
 * このプラグインはその下に配置してください。
 * 
 * 
 * == 使用方法 == 
 * 
 * 選択肢を隠すには2つの方法があります。
 * 
 * 1. プラグインコマンドを使う
 * 
 * プラグインコマンドを作成
 * 
 *    hide_choice choiceNumber
 *    
 * choiceNumber は非表示にしたい選択肢の番号です。
 * 
 * 選択肢は1から始まる数字なので、2番目の選択肢を隠したい場合、
 * 次のようになります。
 * 
 *    hide_choice 2
 *    
 * 2. スクリプトを使う
 * 
 * スクリプトを作成
 * 
 *    hide_choice( choiceNumber, condition )
 * 
 * choiceNumber は非表示にしたい選択肢の番号で、
 * conditionはtrueかfalseかを評価するjavascriptの式です。
 * 
 * 例:スイッチ3がOFFの場合、選択肢を非表示にしたい場合のスクリプト
 * 
 *    hide_choice(3, "$gameSwitches.value(3) === false")
 *    
 * 非表示の選択肢コマンドは、
 * コマンドが呼び出されたリストの最初の選択肢のセットに適用されます。
 * 非表示を必要とする選択肢が複数ある場合、
 * それらの選択肢に対しても非表示の選択肢コマンドを作成する必要があります。
 * 
 * 
 * == 利用規約 ==
 * 
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 * 
 * == Change Log ==
 * 
 * 1.2 - Jan 5, 2016
 *  * added support for evaluating formulas inside interpreter scope
 * 1.1 - Nov 6, 2015
 *  * choices need to be backed up and restored, otherwise the
 *    choice list will just keep hiding them on refresh
 * 1.0 - Nov 4, 2015
 *  * initial release
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
@title Hidden Choice Conditions
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.2
@date Jan 5, 2016
@filename HIME_HiddenChoiceConditions.js
@url http://himeworks.com/2015/11/hidden-choice-conditions/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc Allows you to hide choices with a simple event call
@help 
== Description ==

Need a way to hide a choice without creating lots and lots of different
sets of choices and conditional branches for each combination of choices?

This plugin allows you to instruct the event to hide certain choices
from being shown, using only events!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.2 - Jan 5, 2016
* added support for evaluating formulas inside interpreter scope
1.1 - Nov 6, 2015
* choices need to be backed up and restored, otherwise the
  choice list will just keep hiding them on refresh
1.0 - Nov 4, 2015
* initial release

== Compatibility ==

For compatibility purposes, please place this plugin below other
choice-related plugins. For example, if you are using the Disabled
Choice Conditions plugin, this plugin should go below it.
 
== Usage == 

There are two ways to hide choices

1. Using a plugin command.

Create a plugin command and write

  hide_choice choiceNumber
  
Where the choiceNumber is the number of the choice that you would
like to hide.

Choices are numbers starting from 1, so if you want to hide the second
choice, you would say

  hide_choice 2
  
2. Using a script call

Create a script call and write

  hide_choice( choiceNumber, condition )
  
Where the choiceNumber is the number of the choice that you would like
to hide, and the condition is a javascript formula that evaluates to
true or false.

For example, if you want to hide a choice if switch 3 is OFF, you can
use the script call

  hide_choice(3, "$gameSwitches.value(3) === false")
  
Hidden choice commands apply to the first set of choices down the list
from where the commands have been called. If you have multiple sets
of choices that require hiding, you will need to create hidden choice
commands for those as well.

*/
var Imported = Imported || {}
var TH = TH || {};
Imported.HiddenChoiceConditions = 1;
TH.HiddenChoiceConditions = TH.HiddenChoiceConditions || {};

(function ($) {

  Game_Message.prototype.backupChoices = function () {
    this._oldChoices = this._choices.clone();
  }

  Game_Message.prototype.restoreChoices = function () {
    this._choices = this._oldChoices.clone();
  }

  /* store all indices that are hidden */
  var TH_HiddenChoiceConditions_GameMessage_Clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function () {
    TH_HiddenChoiceConditions_GameMessage_Clear.call(this);
    this._hiddenChoiceConditions = {};
    this._oldChoices = [];
  };

  /* Returns whether the specified choice is hidden */
  Game_Message.prototype.isChoiceHidden = function (choiceNum) {
    return this._hiddenChoiceConditions[choiceNum];
  }

  Game_Message.prototype.hideChoice = function (choiceNum, bool) {
    this._hiddenChoiceConditions[choiceNum] = bool;
  }

  var TH_HiddenChoices_GameInterpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
  Game_Interpreter.prototype.setupChoices = function (params) {
    TH_HiddenChoices_GameInterpreter_setupChoices.call(this, params);
    $gameMessage.backupChoices();
  };

  /* Use a plugin command*/
  var TH_HiddenChoiceConditions_GameInterpreterPluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    TH_HiddenChoiceConditions_GameInterpreterPluginCommand.call(this, command, args);
    if (command.toLowerCase() === "hide_choice") {
      var choiceNum = Math.floor(args[0] - 1);
      $gameMessage.hideChoice(choiceNum, true);
    }
    return true;
  };

  Game_Interpreter.prototype.hideChoice = function (choiceNum, formula) {
    var num = Math.floor(choiceNum) - 1;
    $gameMessage.hideChoice(num, eval(formula));
  };

  /* hidden choice script call */
  hide_choice = function (choiceNum, formula) {
    var num = Math.floor(choiceNum) - 1;
    $gameMessage.hideChoice(num, eval(formula));
  };

  var TH_HiddenChoiceConditions_WindowChoiceList_MakeCommandList = Window_ChoiceList.prototype.makeCommandList;
  Window_ChoiceList.prototype.makeCommandList = function () {
    $gameMessage.restoreChoices();
    this.clearChoiceMap();
    TH_HiddenChoiceConditions_WindowChoiceList_MakeCommandList.call(this);

    /* Remove choices in reverse to avoid index issues */
    var needsUpdate = false;
    for (var i = this._list.length; i > -1; i--) {
      if ($gameMessage.isChoiceHidden(i)) {
        this._list.splice(i, 1)
        $gameMessage._choices.splice(i, 1)
        needsUpdate = true;
      }
      else {
        /* Add this to our choice map */
        this._choiceMap.unshift(i);
      }
    }

    /* If any choices were deleted, update our window placement/size */
    if (needsUpdate === true) {
      this.updatePlacement();
    }
  };

  /* Stores the choice numbers at each index */
  Window_ChoiceList.prototype.clearChoiceMap = function () {
    this._choiceMap = [];
  };

  /* Overwrite. We need to get the choice number for our index
     since the index no longer matches the choice number  */
  Window_ChoiceList.prototype.callOkHandler = function () {
    $gameMessage.onChoice(this._choiceMap[this.index()]);
    this._messageWindow.terminateMessage();
    this.close();
  };
})(TH.HiddenChoiceConditions);