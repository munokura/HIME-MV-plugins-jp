/*:
 * @title Instance Actors
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.1
 * @date Feb 23, 2016
 * @filename HIME_InstanceActors.js
 * @url http://himeworks.com/2016/01/instance-actors/
 *
 * If you enjoy my work, consider supporting me on Patreon!
 *
 * * https://www.patreon.com/himeworks
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
 * @plugindesc 1.0 - Manage custom actors during the game. These actors can be
 * created during the game
 * @help
 * == Description ==
 *
 * By default, RPG Maker does not support the creation of new actors during the
 * game.
 *
 * When you create your game, you would set up actors in the database, and then
 * during the game, those actors will be used.
 *
 * With this plugin, the possibility of creating completely new actors during
 * the game is open for you.
 *
 * For example, you could create a mechanic where you capture enemies during
 * battle, which are converted to actors before they are added to the party.
 * These actors did not exist when you first created your project, nor do they
 * exist in other save files.
 *
 * This plugin provides the functionality for managing custom actors that are
 * generated at run-time.
 *
 * == Terms of Use ==
 *
 * - Free for use in non-commercial projects with credits
 * - Contact me for commercial use
 *
 * == Change Log ==
 *
 * 1.1 - Feb 23, 2016
 *  * read plugin parameters
 * 1.0 - Jan 23, 2016
 *  * initial release
 *
 * == Usage ==
 *
 * -- Setup --
 *
 * In the plugin parameters, choose the "Template Actor ID". This is the
 * "default" actor that all newly created actors will be based on.
 *
 * Then set the "Start ID", which represents how the custom actors will be
 * identified. Once the game starts, you have no way to change these ID's, so
 * if you are expecting to add more actors to your project, you should take that
 * into consideration when choosing the the start ID. I would go with something
 * like 1000 just to be safe.
 *
 * -- Creating Actors --
 *
 * To create a new actor, use the script call
 *
 *   var newActor = InstanceManager.addActor()
 *
 * The game would create a new actor for you, using the template actor as the
 * base. It would basically be a copy of it with a new ID.
 *
 * If you wanted to base it on a different template, you can specify that in
 * the script call like this
 *
 *   var newActor = InstanceManager.addActor( 2 )
 *
 * Which will use actor 2 as the template.
 * The actor creation process simply creates an actor. It doesn't automatically
 * add it to your party, because you might not want to do that.
 *
 * If you want to add it to your party, you could write
 *
 *   var newActor = InstanceManager.addActor()
 *   $gameParty.addActor(newActor.id)
 *
 * -- Deleting Actors --
 *
 * This plugin does not provide support for deleting actors, because that actor
 * might be in use by other objects. It is safer to simply not use the actor.
 *
 * @param Template Actor ID
 * @desc The default actor to base all newly created actors on
 * @default 1
 *
 * @param Start ID
 * @desc The ID that the game should assign to new actors. This cannot be changed
 * once a game begins, so a larger value is recommended.
 * @default 1000
 */
/*:ja
 * @title Instance Actors
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.1
 * @date Feb 23, 2016
 * @filename HIME_InstanceActors.js
 * @url http://himeworks.com/2016/01/instance-actors/
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
 * @plugindesc 1.0 ゲーム中にカスタムアクターを作成できます。
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 *
 * == 説明 ==
 *
 * RPGツクールMVのデフォルトでは、
 * ゲーム中の新しいアクターの作成をサポートしていません。
 *
 * ゲームを作成する時、データベースにアクターを設定し、
 * ゲーム中にそれらのアクターが使用されます。
 *
 * このプラグインを使用すると、
 * ゲーム中に完全に新しいアクターを作成する可能性が広がります。
 *
 * 例えば、戦闘中に敵をキャプチャして、
 * パーティに追加される前にアクターに変換するメカニックを作成できます。
 * これらのアクターは、プロジェクトを最初に作成した時は存在していません。
 * また、他の保存ファイルにも存在していません。
 *
 * このプラグインは、
 * 実行時に生成されるカスタムアクターを管理するための機能を提供します。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * 1.1 - Feb 23, 2016
 *  * read plugin parameters
 * 1.0 - Jan 23, 2016
 *  * initial release
 *
 * == 使用法 ==
 *
 * -- 設定 --
 *
 * プラグインパラメータで、'Template Actor ID'を選択します。
 * 新しく作成された全てのアクターがベースとする'デフォルト'のアクターです。
 *
 * 次に、カスタムアクターの識別方法を表す'Start ID'を設定します。
 * ゲームが開始すると、これらのIDを変更する方法はないため、
 * プロジェクトにさらにアクターを追加する予定がある場合、
 * Start IDを選択する時、それを考慮に入れる必要があります。
 * 私は安全を考慮し1000のような大きな値をお勧めします。
 *
 * -- アクターの作成 --
 *
 * 新しいアクターを作成するには、スクリプトを使用します
 *
 *   var newActor = InstanceManager.addActor()
 *
 * テンプレートアクターをベースとして使用して、新しいアクターを作成します。
 * 基本的には、新しいIDが付いたコピーです。
 *
 * 別のテンプレートをベースにしたい場合、次のスクリプトで指定できます。
 *
 *   var newActor = InstanceManager.addActor( 2 )
 *
 * テンプレートとしてアクター2を使用します。
 * アクター作成プロセスは、単にアクターを作成するだけです。
 * パーティに自動的に追加されるわけではありません。
 * したくないかもしれないからです。
 *
 * パーティーに追加したい場合
 *
 *   var newActor = InstanceManager.addActor()
 *   $gameParty.addActor(newActor.id)
 *
 * -- アクターの削除 --
 *
 * このプラグインは、他のオブジェクトによって使用されている可能性があるため、
 * アクターの削除をサポートしていません。
 * アクターを使用しない方が安全です。
 *
 * @param Template Actor ID
 * @text テンプレートアクターID
 * @desc 新しく作成される全アクターのベースとなるデフォルトのアクター
 * @default 1
 *
 * @param Start ID
 * @text 開始ID
 * @desc 新しいアクターに割り当てるID。ゲームの開始後は変更できないため、大きな値をお勧めします。
 * @default 1000
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.InstanceActors = 1;
TH.InstanceActors = TH.InstanceActors || {};

function InstanceManager() {
};

(function ($) {

  $.params = PluginManager.parameters("HIME_InstanceActors");
  $.templateActorId = Math.floor($.params["Template Actor ID"]);
  $.startId = Math.floor($.params["Start ID"]);

  InstanceManager.loadActors = function (contents) {
    var data = contents.instanceActors;
    for (var i = 0; i < data.length; i++) {
      var actorData = data[i];
      $dataActors[actorData.id] = actorData;
    }
  };

  InstanceManager.saveActors = function (contents) {
    contents.instanceActors = this._instanceActors();
    return contents;
  };

  InstanceManager._instanceActors = function () {
    return $dataActors.slice($.startId);
  };

  /* Creates a new data actor.
   * If an actor ID is specified the new actor will be created using
   * that actor as a template.
   */
  InstanceManager._createActor = function (templateActorId) {
    templateActorId = templateActorId || $.templateActorId;
    var actor = JsonEx.makeDeepCopy($dataActors[templateActorId]);
    this._setupActor(actor);
    return actor;
  };

  InstanceManager._setupActor = function (actor) {
    var newId = this._generateActorId()
    actor.id = newId;
  }

  InstanceManager._generateActorId = function () {
    return Math.max($.startId, $dataActors.length);
  };

  /* Adds a new actor to the database. Returns the newly created actor */
  InstanceManager.addActor = function (templateActorId) {
    newActor = this._createActor(templateActorId);
    $dataActors[newActor.id] = newActor;
    return newActor;
  };

  /* Removes the specified actor from the database.
   * Let's not do this since that data may be used by other objects
   */
  InstanceManager.removeActor = function () {
  };

  /***************************************************************************/

  var TH_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    var contents = TH_DataManager_makeSaveContents.call(this);
    contents = InstanceManager.saveActors(contents);
    return contents;
  };

  var TH_DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    TH_DataManager_extractSaveContents.call(this, contents);
    InstanceManager.loadActors(contents);
  };

})(TH.InstanceActors);