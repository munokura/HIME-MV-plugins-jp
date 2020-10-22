/*:ja
 * @target MZ MV
 * @title Conditional Choice Text
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.1
 * @date Dec 27, 2015
 * @filename HIME_ConditionalChoiceText.js
 * @url https://raw.githubusercontent.com/munokura/HIME-MV-plugins-jp/master/HIME_ConditionalChoiceText.js
 *
 * @plugindesc v1.1 イベントの選択肢毎にテキストをいつでも変更できます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 * 
 * 元プラグイン:
 * http://himeworks.com/2015/11/conditional-choice-text/
 * 
 *
 * == 説明 ==
 *
 * RPGツクールMVではプレーヤーに選択肢を提供できます。
 * 選択する選択肢に応じて、イベントの動作は異なります。
 *
 * ただし、特定の条件が満たされているかどうかに応じて、
 * 特定の選択肢に異なるテキストを表示したい場合はどうなりますか?
 * 例えば、'地元の人が外国語で言っていることを理解できるアイテム'を
 * 見つけられなかった場合、表示される全てのテキストが文字化けする'でしょう。
 *
 * 特に、選択を無効にできるプラグインと組み合わせると、
 * 実際のテキストの代わりに疑問符を表示できます。
 *
 * このプラグインを使用すると、
 * イベントを使用して選択肢のテキストを簡単に変更できます。
 *
 *
 * == 使用法 ==
 *
 * 選択テキストを設定するには2つの方法があります。
 *
 * 1.プラグインコマンドを使用します。
 *
 * プラグインコマンドを作成して作成する
 *
 *   choice_text choiceNumber customText
 *
 * 'choiceNumber'はテキストが適用される選択肢の番号であり、
 * 'customText'は変更するテキストです。
 * テキストにスペースを含めることができます。
 *
 * 例えば、2番目の選択肢のテキストを"???"に変更する場合は下記になります。
 *
 *   choice_text 2 ???
 *
 * 条件分岐を適切に設定するのはあなた次第です。
 *
 * 2.スクリプトコールの使用
 *
 * スクリプトコールの作成と書き方は下記になります。
 *
 *   this.choice_text(choiceNumber, customText, condition)
 *
 * 'choiceNumber'はテキストが適用される選択肢の番号であり、
 * 'customText'は変更するテキストです。
 *
 * 'condition'は、true/falseに評価される有効な式です。
 * 指定された選択肢のテキストは、条件がtrueの場合のみ変更されます。
 *
 * 2番目の選択肢のテキストを???に変更するには、
 * スイッチ3がオフであると仮定すると下記になります。、
 *
 *   this.choice_text(2, "???", "$gameSwitches.value(3) === false")
 *
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 *
 * == Change Log ==
 *
 * 1.1 - Dec 27, 2015
 *  * choice text is now evaluated in the interpreter
 *  * game message returns choices with updated text
 * 1.0 - Nov 6, 2015
 *  * initial release
 */
/* あなたが私の仕事を楽しんでいるなら、
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
 * @title Conditional Choice Text
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.1
 * @date Dec 27, 2015
 * @filename HIME_ConditionalChoiceText.js
 * @url http://himeworks.com/2015/11/conditional-choice-text/
 *
 * If you enjoy my work, consider supporting me on Patreon!
 *
 * * https://www.patreon.com/himeworks
 *
 * If you have any questions or concerns, you can contact me at any of
 * the following sites:
 *
 * * Main Website: http://himeworks.com
 * * Facebook: https://www.facebook.com/himeworkscom/
 * * Twitter: https://twitter.com/HimeWorks
 * * Youtube: https://www.youtube.com/c/HimeWorks
 * * Tumblr: http://himeworks.tumblr.com/
 *
 * @plugindesc v1.1 - Allows you to dynamically set the text for each choice
 * in your events.
 * @help
 * -------------------------------------------------------------------------
 * == Description ==
 *
 * RPG Maker allows you to offer your players choice selection, and
 * depending on which choice they pick, your events will behave differently.
 *
 * However, what happens if you wanted to have a particular choice display
 * a different text, depending on whether certain conditions have been met?
 * Maybe if you haven't found an item that allows you to understand what the
 * locals are saying in a foreign language, all of the text that is shown
 * will be garbled.
 *
 * In particular, if you combine it with a plugin that allows you to disable
 * choices, you could show question marks instead of the actual text.
 *
 * With this plugin, you can easily change a choice's text using events.
 *
 * == Terms of Use ==
 *
 * - Free for use in non-commercial projects with credits
 * - Contact me for commercial use
 *
 * == Change Log ==
 *
 * 1.1 - Dec 27, 2015
 *  * choice text is now evaluated in the interpreter
 *  * game message returns choices with updated text
 * 1.0 - Nov 6, 2015
 *  * initial release
 *
 * == Usage ==
 *
 * There are two ways to set the choice text.
 *
 * 1. Using a plugin command.
 *
 * Create a plugin command and write
 *
 *   choice_text choiceNumber customText
 *
 * Where the `choiceNumber` is the number of the choice that the text
 * will apply to, and `customText` is the text that you want to change
 * to. You can include spaces in your text.
 *
 * For example, if you want to change the second choice's text to
 * "???" you can write
 *
 *   choice_text 2 ???
 *
 * It is up to you to set up the conditional branches appropriately.
 *
 * 2. Using a script call
 *
 * Create a script call and write
 *
 *   this.choice_text(choiceNumber, customText, condition)
 *
 * Where the `choiceNumber` is the number of the choice that the text
 * will apply to, and `customText` is the text that you want to change
 * to.
 *
 * The `condition` is a valid formula that evaluates to true or false.
 * The specified choice's text will only be changed if the condition
 * is true.
 *
 * To change the second choice's text to ??? assuming switch 3 is OFF,
 * you can write
 *
 *   this.choice_text(2, "???", "$gameSwitches.value(3) === false")
 *
 * -------------------------------------------------------------------------
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.ConditionalChoiceText = 1;
TH.ConditionalChoiceText = TH.ConditionalChoiceText || {};

(function($) {

    /* store the text for each choice */
    var TH_ConditionalChoiceText_GameMessage_Clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        TH_ConditionalChoiceText_GameMessage_Clear.call(this);
        this._customChoiceText = {};
    };

    /* Replace each choice text if needed */
    var TH_GameMessage_choices = Game_Message.prototype.choices;
    Game_Message.prototype.choices = function() {
        var res = TH_GameMessage_choices.call(this);
        for (var key in this._customChoiceText) {
            res[key] = this._customChoiceText[key]
        }
        return res;
    };

    /* Returns the custom text for the given choice */
    Game_Message.prototype.choiceText = function(choiceNum) {
        return this._customChoiceText[choiceNum];
    }

    Game_Message.prototype.setChoiceText = function(choiceNum, text) {
        this._customChoiceText[choiceNum] = text;
    }

    /* Use a plugin command*/
    var TH_ConditionalChoiceText_GameInterpreterPluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        TH_ConditionalChoiceText_GameInterpreterPluginCommand.call(this, command, args);
        if (command.toLowerCase() === "choice_text") {
            var choiceNum = Math.floor(args[0] - 1);
            var text = args.slice(1).join(" ")
            $gameMessage.setChoiceText(choiceNum, text);
        }
        return true;
    };

    Game_Interpreter.prototype.choice_text = function(choiceNum, text, formula) {
        var num = Math.floor(choiceNum) - 1;
        if (eval(formula)) {
            $gameMessage.setChoiceText(num, text);
        }
    };

    /* Use a script call */
    choice_text = function(choiceNum, text, formula) {
        var num = Math.floor(choiceNum) - 1;
        if (eval(formula)) {
            $gameMessage.setChoiceText(num, text);
        }
    };
})(TH.ConditionalChoiceText);