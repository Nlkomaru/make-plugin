---
sidebar_position: 2
---

# フレームワークを利用したコマンドの実装(Cloud編)

前章では、BukkitのAPIを利用してコマンドを実装しました。
しかし、BukkitのAPIは非常に複雑で、初心者には理解が難しい部分もあります。
そこで、IncendoのCloudというコマンドフレームワークを利用することで、コマンドの実装を簡単に行う方法について説明します。

## Cloudとは

Cloudは、コマンドフレームでマインクラフトサーバーのコマンドを簡単に実装するためのライブラリです。
また、マインクラフト以外のコマンドの実装においても利用することができます。

詳しくは、[こちら](https://cloud.incendo.org/#)を参照してください。

## Cloudの導入

```diff title="build.gradle.kts"
repositories {
    mavenCentral()
+   maven("https://oss.sonatype.org/content/repositories/snapshots/")
}

dependencies {
+   implementation(libs.cloud.core)
+   implementation(libs.cloud.paper)
+   implementation(libs.cloud.annotations)
}
```

また、libs.versions.tomlに以下の設定を追加します。

```toml title="gradle/libs.versions.toml"
[versions]
cloud = "2.0.0"
cloudPaper = "2.0.0-beta.10"

[libraries]
cloud-core = { group = "org.incendo", name = "cloud-core", version.ref = "cloud" }
cloud-paper = { group = "org.incendo", name = "cloud-paper", version.ref = "cloudPaper" }
cloud-annotations = { group = "org.incendo", name = "cloud-annotations", version.ref = "cloud" }
```

## コマンドハンドラーの作成
