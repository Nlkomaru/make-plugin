---
sidebar_position: 4
---

# Gradle Kotlin DSL

GradleにはGroovy DSLとKotlin DSLの2つのDSLがあります。Kotlin DSLはGroovy DSLよりも型安全であり、IDEの補完機能が強力です。このページでは、Gradle Kotlin DSLの基本的な使い方を紹介します。

## プロジェクトの移行

GradleプロジェクトをKotlin DSLに移行するには、`settings.gradle.kts`と`build.gradle.kts`を作成します。
また、gradle version catalogを利用することで、依存関係のバージョンを管理することができます。

### gradle version catalog

```toml title="gradle/libs.versions.toml"
[versions]
paper = "1.21.4-R0.1-SNAPSHOT"

[libraries]
paper-api = { group = "io.papermc.paper", name = "paper-api", version.ref = "paper" }

[plugins]
run-paper = { id = "xyz.jpenilla.run-paper", version = "2.3.1" }
plugin-yml = { id = "net.minecrell.plugin-yml.paper", version = "0.6.0" }
shadow = { id = "com.github.johnrengelman.shadow", version = "8.1.1" }
```

### settings.gradle.kts

```kotlin title="settings.gradle.kts"
rootProject.name = "template"

pluginManagement {
    repositories {
        gradlePluginPortal()
        maven("https://papermc.io/repo/repository/maven-public/")
    }
}
```

### build.gradle.kts

```kotlin title="build.gradle.kts"
plugins {
    java
    alias(libs.plugins.shadow)
    alias(libs.plugins.run.paper)
    alias(libs.plugins.plugin.yml)
}

group = project.properties["group"] as String
version = project.properties["version"] as String
val projectName = project.rootProject.name

repositories {
    mavenCentral()
    maven("https://repo.papermc.io/repository/maven-public/")

}

dependencies {
    compileOnly(libs.paper.api)
}

val targetJavaVersion = 21

tasks {
    compileJava {
        this.options.encoding = Charsets.UTF_8.name()
        this.options.release.set(targetJavaVersion)
    }
    shadowJar {}
    build {
        dependsOn(shadowJar)
    }

    runServer {
        minecraftVersion("1.21.3")
        downloadPlugins {
//            url("https://download.luckperms.net/1542/bukkit/loader/LuckPerms-Bukkit-5.4.129.jar")
        }
    }
}

```

## gradle.properties

`gradle.properties`にプロパティを追加することで、プロジェクトの設定を外部化することができます。

```properties title="gradle.properties"
group=party.morino
version=1.0-SNAPSHOT
```
