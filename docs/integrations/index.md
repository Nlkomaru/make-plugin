---
sidebar_position: 1
---

# Vaultを利用したプラグインの作成

このページでは、Vaultを利用したプラグインの作成方法について説明します。


## Vaultとは

[Vault](https://github.com/MilkBowl/VaultAPI)とは、Bukkit/Spigot/PaperなどのMinecraftサーバーにおいて、主にお金のやり取りを行う際に利用されるプラグインです。Vaultを利用することで、複数のプラグイン間でお金のやり取りを行うことができます。

# Vaultを利用したプラグインの作成方法
Vaultには、APIが提供されており、これを利用することでVaultを利用したプラグインを作成することができます。以下に、Vaultを利用したプラグインの作成方法を説明します。

## プラグインの作成

まず、プラグインを作成します。プラグインの作成方法については、[以前の資料](/create-plugin/normal)を参照してください。

## Vaultの導入

まず、ほかのプラグインとの連携を行うには、プラグイン本体が導入されている必要があり、その本体に対してAPIを利用することで連携を行います。そのため、まずVaultを導入します。

[Vaultのダウンロードページ](https://www.spigotmc.org/resources/vault.34315/)から、最新のjarファイルをダウンロードします。ダウンロードしたjarファイルをプラグインの`/plugins`フォルダに配置し、サーバーを再起動します。

### runServerを利用している場合

runServerを利用している場合、`build.gradle.kts`に以下の記述を追加します。

```kotlin
runServer {
        minecraftVersion("1.21.3")
        val plugins = runPaper.downloadPluginsSpec {
            //Vault
            url("https://github.com/MilkBowl/Vault/releases/download/1.7.3/Vault.jar")
        }
        downloadPlugins {
            downloadPlugins.from(plugins)
        }
}
```

こうすることで、Vaultが自動的にダウンロードされ、サーバーが起動する際に読み込まれるようになります。

## VaultのAPIを利用する

### 依存関係の追加

VaultのAPIを利用するためには、以下の依存関係を追加します。

```diff title=gradle/libs.versions.toml
[versions]
+ vault = "1.7"

[libraries]
+ vault-api = { group = "com.github.MilkBowl", name = "VaultAPI", version.ref = "vault" }
```

```diff title=gradle/build.gradle.kts
repositories {
+    maven("https://jitpack.io")
}

dependencies {
+    compileOnly(libs.vault)
}
```

### VaultAPIの利用

VaultAPIを利用するには、まずVaultAPIのEconomyを取得します。以下のコードを参考にしてください。

```java
package dev.nikomaru.vaultTest;

import net.milkbowl.vault.economy.Economy;
import org.bukkit.plugin.java.JavaPlugin;

public final class VaultTest extends JavaPlugin {

    @Override
    public void onEnable() {
        // Plugin startup logic
        if (getServer().getPluginManager().getPlugin("Vault") == null) {
            getLogger().severe("Vault not found!");
            return;
        }
        Economy economy = getServer().getServicesManager().getRegistration(Economy.class).getProvider();
    }

    @Override
    public void onDisable() {
        // Plugin shutdown logic
    }
}
```

このようにして、VaultAPIを利用することができます。

