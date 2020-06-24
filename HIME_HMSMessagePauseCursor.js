/*:
 * @title HMS: Message Pause Cursor
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.2.1
 * @date Dec 21, 2015
 * @filename HIME_HMSMessagePauseCursor.js
 * @url http://himeworks.com/2015/12/message-pause-cursor/
 *
 * If you enjoy my work, consider supporting me on Patreon!
 *
 * - https://www.patreon.com/himeworks
 *
 * If you have any questions or concerns, you can contact me at any of
 * the following sites:
 *
 * - Main Website: http://himeworks.com
 * - Facebook: https://www.facebook.com/himeworkscom/
 * - Twitter: https://twitter.com/HimeWorks
 * - Youtube: https://www.youtube.com/c/HimeWorks
 * - Tumblr: http://himeworks.tumblr.com/
 *
 *
 * @plugindesc v1.2 - Allows you to customize your message pause cursor.
 * @help
 *
 * == Description ==
 *
 * By default, when a message has finished displaying all of the words and is
 * waiting for player input, a little animated cursor is shown to indicate that
 * the player should press the confirm button to proceed.
 *
 * However, this cursor is stored inside the windowskin, which gives you enough
 * freedom to have one 24x24 cursor with 4 frames of animation. You also cannot
 * choose where the cursor should appear, or how fast it should animate.
 *
 * With this plugin, you are given more control over that pause cursor.
 *
 * You can change how it looks!
 * You can change where it's positioned!
 * You can change how fast it animates!
 *
 * What kind of cursor will you create?
 *
 * == Terms of Use ==
 *
 * - Free for use in non-commercial projects with credits
 * - Contact me for commercial use
 *
 * == Change Log ==
 *
 * 1.2.1 - Apr 11, 2020 by Renko
 *  * from loadSystemImages function (line 157) to loadSystemWindowImage
 * 1.2 - Dec 21, 2015
 *  * renamed to HMSMessagePauseCursor
 *  * added support for 'end' text align
 * 1.1 - Dec 15, 2015
 *  * use "Default Align" plugin parameter
 * 1.0 - Dec 14, 2015
 *  * initial release
 *
 * == Usage ==
 *
 * Create an image called "MessagePauseCursor" and save it in the img/system
 * folder of your project.
 *
 * This image is broken down into a grid.
 *
 * Each row represents a single cursor.
 * Each column represents an animation frame for that cursor.
 *
 * Each frame can be of any width or height, but all frames must have the
 * same width and height.
 *
 * You can have any number of frames per cursor, but all cursors must have
 * the same number of frames.
 *
 * Once you have set up your pause cursor image, go to the plugin manager
 * and for this plugin "Hime_MessagePauseCursor", specify how many rows
 * there are and how many frames there are in each row.
 *
 * -- Changing Cursors --
 *
 * To change which cursor is shown, you can use the script call
 *
 *   $gameMessage.setCursorId(NUMBER)
 *
 * Where the NUMBER is the ID of the cursor. The first cursor at the top
 * is number 1. The second is number 2. So if you wanted to change to cursor 2,
 * you would make the script call
 *
 *   $gameMessage.setCursorId(2)
 *
 * -- Changing Alignment --
 *
 * Alignment determines where the cursor is positioned in the window.
 * To change the alignment, use the script call
 *
 *   $gameMessage.setCursorAlign( ALIGNMENT )
 *
 * You have three options for the ALIGNMENT
 *
 *   'center'  - center of window, at the bottom
 *   'left'    - lower-left corner of the window
 *   'right'   - lower right corner of the window
 *   'end'     - right after the last character
 *
 * -- Changing Animation Speed --
 *
 * To change the animation speed, use the script call
 *
 *   $gameMessage.setCursorSpeed( SPEED )
 *
 * Where the SPEED is a number between 1 and probably 24.
 * The higher the number, the faster it is. You can experiment with each
 * number to see how fast they are.
 *
 *
 * @param Filename
 * @desc Name of the file to use in the img/system folder (no extension)
 * Change this if needed.
 * @default MessagePauseCursor
 *
 * @param Default Cursor ID
 * @desc default cursor ID you want to start with as a number.
 * First cursor at the top is 1, second is 2, and so on.
 * @default 1
 *
 * @param Number of Rows
 * @desc Number of rows in the image. One cursor per row.
 * @default 3
 *
 * @param Number of Frames
 * @desc Number of frames per animation.
 * @default 4
 *
 * @param Default Align
 * @desc The alignment of the pause cursor in the message window.
 * Can be 'left', 'center', 'right', or 'end' without quotes
 * @default center
 *
 */
/*:ja
 * @title HMS: Message Pause Cursor
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.2.1
 * @date Dec 21, 2015
 * @filename HIME_HMSMessagePauseCursor.js
 * @url http://himeworks.com/2015/12/message-pause-cursor/
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
 *
 * @plugindesc v1.2.1 文章の表示の一時停止カーソルをカスタマイズ（アニメーション）できます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * デフォルトでは、文章の表示でプレーヤーの入力を待機している場合、
 * プレーヤーが確認ボタンを押して続行する必要があることを示す
 * 小さなアニメーションカーソルが表示されます。
 *
 * ただし、このカーソルはウィンドウスキンの内部に格納されるため、
 * 4フレームのアニメーションを持つ24x24カーソルを1つ持つのに
 * 十分な自由度があります。
 * また、カーソルを表示する場所や、
 * アニメーションの速度を選択することもできません。
 *
 * このプラグインを使用すると、一時停止カーソルをより詳細に制御できます。
 *
 * 見た目を変えることができます！
 * 位置を変えることができます！
 * アニメーションの速さを変更できます。
 *
 * どのようなカーソルを作成しますか？
 * 
 * サンプル画像が下記にあります。
 * http://himeworks.com/blog/wp-content/uploads/2015/12/MessagePauseCursor.png
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * 1.2.1 - Apr 11, 2020 by Renko
 *  * from loadSystemImages function (line 157) to loadSystemWindowImage
 * 1.2 - Dec 21, 2015
 *  * renamed to HMSMessagePauseCursor
 *  * added support for 'end' text align
 * 1.1 - Dec 15, 2015
 *  * use "Default Align" plugin parameter
 * 1.0 - Dec 14, 2015
 *  * initial release
 *
 * == 使用法 ==
 *
 * 'MessagePauseCursor'という画像を作成し、
 * プロジェクトのimg/systemフォルダに保存します。
 *
 * この画像はグリッドに分割されています。
 *
 * 各行は単一のカーソルを表します。
 * 各列は、そのカーソルのアニメーションフレームを表します。
 *
 * 各フレームの幅/高さは任意ですが、
 * 全てのフレームは同じ幅と高さでなければなりません。
 *
 * カーソル毎に任意の数のフレームを設定できますが、
 * 全てのカーソルには同じ数のフレームを設定する必要があります。
 *
 * 一時停止カーソル画像を設定したら、プラグイン管理に移動し、
 * このプラグイン'Hime_MessagePauseCursor'について、
 * 行数と各行のフレーム数を指定します。
 *
 * -- カーソルの変更 --
 *
 * 表示されるカーソルを変更するには、スクリプトコールを使用します。
 *
 *   $gameMessage.setCursorId(NUMBER)
 *
 * NUMBERはカーソルのIDです。
 * 一番上の最初のカーソルは番号1です。
 * 2番目は番号2です。
 * したがって、カーソル2に変更する場合、下記のスクリプトを実行します。
 *
 *   $gameMessage.setCursorId(2)
 *
 * -- 配置の変更 --
 *
 * ウィンドウ内のカーソルの位置を決定します。
 * 配置を変更するには、下記のスクリプトを実行します。
 *
 *   $gameMessage.setCursorAlign( ALIGNMENT )
 *
 * ALIGNMENTには3つのオプションがあります
 *
 *   'center'  - ウィンドウの中央、下部
 *   'left'    - ウィンドウの左下隅
 *   'right'   - ウィンドウの右下隅
 *   'end'     - 最後の文字の直後
 *
 * -- アニメーション速度の変更 --
 *
 * アニメーションの速度を変更するには、下記のスクリプトを実行します。
 *
 *   $gameMessage.setCursorSpeed( SPEED )
 *
 * SPEEDは1から24までの数値です。
 * 数値が大きいほど、高速です。
 * それぞれの数値を試して、どれだけ速いかを確認してください。
 *
 *
 * @param Filename
 * @text ファイル名
 * @desc ファイルの名前(拡張子なし)img/systemフォルダに保存
 * 必要に応じて変更します。
 * @default MessagePauseCursor
 *
 * @param Default Cursor ID
 * @text デフォルトのカーソルID
 * @desc 数値として開始する場合のデフォルトのカーソル。
 * 一番上の最初のカーソルは1、2番目は2、というように続きます。
 * @default 1
 *
 * @param Number of Rows
 * @text 行数
 * @desc 画像の行数。
 * 行毎に1つのカーソル。
 * @default 3
 *
 * @param Number of Frames
 * @text フレーム数
 * @desc アニメーション毎のフレーム数
 * @default 4
 *
 * @param Default Align
 * @text デフォルト配置
 * @type select
 * @option 左
 * @value left
 * @option 中央
 * @value center
 * @option 右
 * @value right
 * @option 最後
 * @value end
 * @desc メッセージウィンドウ内の一時停止カーソルのデフォルト配置
 * @default center
 *
 */
var Imported = Imported || {};
var TH = TH || {};
Imported.TH_MessagePauseCursor = 1;
TH.MessagePauseCursor = TH.MessagePauseCursor || {};

(function ($) {

  $.params = PluginManager.parameters("HIME_HMSMessagePauseCursor");

  $.filename = $.params["Filename"];
  $.defaultId = Math.floor($.params["Default Cursor ID"])
  $.numRows = Math.floor($.params["Number of Rows"])
  $.numFrames = Math.floor($.params["Number of Frames"])
  $.align = $.params["Default Align"].toLowerCase();

  var TH_SceneBoot_loadSystemWindowImage = Scene_Boot.prototype.loadSystemWindowImage;
  Scene_Boot.prototype.loadSystemWindowImage = function () {
    TH_SceneBoot_loadSystemWindowImage.call(this);
    ImageManager.loadSystem($.filename);
  };

  var TH_GameMessage_initialize = Game_Message.prototype.initialize;
  Game_Message.prototype.initialize = function () {
    TH_GameMessage_initialize.call(this);
    this._pauseCursorId = $.defaultId;
    this._pauseCursorAlign = $.align
    this._pauseCursorSpeed = 4
    this._pauseCursorNeedsRefresh = false;
  };

  Game_Message.prototype.setCursorId = function (id) {
    this._pauseCursorId = id;
    this.refreshPauseCursor();
  };

  Game_Message.prototype.setCursorAlign = function (align) {
    this._pauseCursorAlign = align.toLowerCase();
    this.refreshPauseCursor();
  };

  Game_Message.prototype.setCursorSpeed = function (speed) {
    this._pauseCursorSpeed = speed;
    this.refreshPauseCursor();
  };

  Game_Message.prototype.refreshPauseCursor = function () {
    this._pauseCursorNeedsRefresh = true;
  };

  /***************************************************************************/

  var TH_WindowMessage_initialize = Window_Message.prototype.initialize;
  Window_Message.prototype.initialize = function () {
    TH_WindowMessage_initialize.call(this);
    this._pauseCursorId = $.defaultId - 1
    this._pauseCursorFrames = $.numFrames;
    this._pauseCursorRows = $.numRows;
    this._pauseCursorAlign = $.align
    this._pauseCursorSpeed = 64 / (this._pauseCursorFrames * 4)

    bmp = ImageManager.loadSystem($.filename);
    this._pauseCursorWidth = bmp.width / this._pauseCursorFrames;
    this._pauseCursorHeight = bmp.height / this._pauseCursorRows;
  };

  var TH_WindowMessage_startMessage = Window_Message.prototype.startMessage
  Window_Message.prototype.startMessage = function () {
    TH_WindowMessage_startMessage.call(this);
    if ($gameMessage._pauseCursorNeedsRefresh) {
      this._refreshPauseSign();
      $gameMessage._pauseCursorNeedsRefresh = false;
    }
  };

  var TH_WindowMessage__refreshPauseSign = Window.prototype._refreshPauseSign;
  Window_Message.prototype._refreshPauseSign = function () {
    this._pauseCursorId = $gameMessage._pauseCursorId - 1;
    this._pauseCursorAlign = $gameMessage._pauseCursorAlign;
    this._pauseCursorSpeed = 64 / (this._pauseCursorFrames * $gameMessage._pauseCursorSpeed)
    var sx = 0;
    var sy = this._pauseCursorId * this._pauseCursorHeight;
    this._windowPauseSignSprite.bitmap = ImageManager.loadSystem($.filename);
    this._windowPauseSignSprite.anchor.x = 0.5;
    this._windowPauseSignSprite.anchor.y = 1;
    this._refreshPauseSignPosition();
    this._windowPauseSignSprite.setFrame(sx, sy, this._pauseCursorWidth, this._pauseCursorHeight);
    this._windowPauseSignSprite.alpha = 0;
  };

  Window.prototype._refreshPauseSignPosition = function () {
    if (this._pauseCursorAlign == 'center') {
      this._windowPauseSignSprite.move(this._width / 2, this._height);
    }
    else if (this._pauseCursorAlign == 'right') {
      this._windowPauseSignSprite.move(this._width - this._pauseCursorWidth, this._height);
    }
    else if (this._pauseCursorAlign == 'left') {
      this._windowPauseSignSprite.move(this._pauseCursorWidth, this._height);
    }
    else if (this._pauseCursorAlign == 'end') {
      if (this._textState) {
        this._windowPauseSignSprite.move(this._textState.x + this._pauseCursorWidth, this._textState.y + this._textState.height + this._pauseCursorHeight / 2);
      }
    }
  };

  var TH_WindowMessage_onEndOfText = Window_Message.prototype.onEndOfText;
  Window_Message.prototype.onEndOfText = function () {
    this._refreshPauseSignPosition();
    TH_WindowMessage_onEndOfText.call(this);
  };

  Window_Message.prototype._updatePauseSign = function () {
    var sprite = this._windowPauseSignSprite;
    var x = Math.floor(this._animationCount / this._pauseCursorSpeed) % $.numFrames;
    var y = this._pauseCursorId;;
    var sx = 0;
    var sy = 0;
    var pw = this._pauseCursorWidth;
    var ph = this._pauseCursorHeight
    if (!this.pause) {
      sprite.alpha = 0;
    } else if (sprite.alpha < 1) {
      sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
    }
    sprite.setFrame(sx + x * pw, sy + y * pw, pw, ph);
    sprite.visible = this.isOpen();
  };
})(TH.MessagePauseCursor);