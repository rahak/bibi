Contribution Guide
==================

本プロジェクトの開発を円滑にするため、このガイドを参考に共同開発をおこなってください。  
ソースコードに対する変更は全てIssuesとPull requestsを通じて行います。

役割
----
開発を円滑に進めるため、開発者同士での役割を以下のように分担します。

name                  | Project | issue | PR |
--------------------- | ------- | ----- | -- |
Project Manager<br>(PM)  | 全体の設定を管理する<br>issueを管理する<br>milestoneを管理する<br>labelを管理する | issueを追加する<br>milestoneを割り当てる<br>issueに他者をアサインする<br>issueを閉じる | PRをレビューする<br>PRをマージする
Sub Project Manager<br>(Sub-PM)       | ※ 必要に応じてPMを代行する | issueを追加する<br>issueに他者をアサインする<br>issueに自身をアサインする<br>issueを閉じる | PRを作成する<br>PRをレビューする<br>PRをマージする
Contributor           | - | issueを追加する<br>issueに自身をアサインする<br>自身がアサインされたissueを閉じる | PRを作成する<br>PRをレビューする

開発の流れ
--------

本プロジェクトの開発は以下の流れで行います。

* 誰かがプロジェクトにissueを追加する
* PMがissueに対してmilestoneを割り当てる
* PMかSub-PMがissueに開発者をアサインする
* 開発者はローカルで新しいブランチを`master`から派生して、コミットを追加する
* コミットを追加したブランチ指定して`master`に対してPRを追加する
* 他の開発者によってレビューを行いApproveかRequest changesを入力する
* PM/Sub-PMが一つ以上のApproveがあるPRを`master`にマージする
* PM/Sub-PMがmilestoneの進捗に合わせて適宜リリース作業を行う

Branches
--------

基本は[GitHub Flow](https://gist.github.com/Gab-km/3705015)に則りつつ、円滑に開発作業を進めるために、以下の命名ルールを追加しています。

* `master`ブランチは、GitHub Flowに則り、"何であれデプロイ可能である"ことを維持する
* `master`ブランチがデプロイ可能でない状態になった場合や、早急に修正されなければならない不具合を修正する場合は、修正を`hotfix-*`の名前でブランチを作りPRを作成すること<br>例）`hotfix-crash-when-launch`
* `hotfix-*`ブランチから`master`に対するPRは他のPRよりも優先してレビューとマージを行う
* 管理が煩雑になることを防ぐため、特に理由がなければ `fork` は使用しない
* hotfix以外でissueを解決するための変更を行う場合は、`issue-{issue番号}-{変更内容}` の名前のブランチを作る<br>例）`issue-123-add-something-feature`

Issues
------

ソースコードに対する変更を行う際は、まず最初にissueを追加してください。  
issueで対応時期や対応内容を適宜議論した上で、issueに開発者をアサインしてください。

* issueは誰でもopenできる
* issueはCommit commentやPRのDescriptionにキーワードを記述することでcloseする<br>参考）https://help.github.com/en/articles/closing-issues-using-keywords<br>例）キーワード `fix #123` がコメントに含まれるコミットを `master` にマージすると、issue `#123` がcloseされる

Pull requests
-------------

`master`ブランチに対する変更は、必ずPull requestで他者からレビューされたものをPM/Sub-PMがマージするようにしてください。
issueにアサインされた開発者は、`master`を元に新たなブランチを追加し、そこで作業した後、`master`に対してPRを作成してください。

変更中に`master`が別のPRによって更新された場合、PRがコンフリクトによってマージできなくなることがあります。  
この場合は、PRの作成者自身が`master`をPRのブランチにマージするか、rebaseしてコンフリクトを解消してください。

PRがレビュー可能な状態になったら、PM/Sub-PMに対してReview requestを行ってください。

* PRのレビューにはGithub pull request reviews機能を使用する
* PRの作成者はReview追加時にPM/Sub-PMと、他の開発者に対してRequest reviewを行う
* Request changesが投稿された場合は、適宜指摘された項目に対応するか、議論した上で、更新後に改めてRequest reviewを行う
* ApproveされたものについてはPM/Sub-PMが速やかに`master`にマージする
