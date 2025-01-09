---
sidebar_position: 1
---

# Bukkit標準のコマンド実装

このページでは、Bukkit標準のコマンドの実装方法について説明します。

:::note
なお、この実装方法については冗長な記述が多いため、実際のプラグイン開発では、コマンドの実装に関するフレームワークを使用することが推奨されます。
:::

## CommandExecutorを実装する

CommandExecutorインターフェースを実装することで、コマンドの処理を実装できます。
ここが、コマンドが送られたときに呼び出されるメソッドです。

```java
package party.morino.resources.plugin;

import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;

public class MyCommandExecutor implements CommandExecutor {
    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (command.getName().equalsIgnoreCase("mycommand")) {
            sender.sendMessage("Hello, world!");
            return true;
        }
        return false;
    }
}
```

onCommandメソッドの引数は以下の通りです。
- sender: コマンドを実行したプレイヤー
- command: 実行されたコマンド
- label: コマンドのエイリアス
- args: コマンドの引数

## メインクラスにCommandExecutorを登錨する

CommandExecutorを作成するだけでは、コマンドが実行されることはありません。
コマンドを実行するためには、プラグインのメインクラスでCommandExecutorを登錨する必要があります。
登録することによって、コマンドが実行されたときにCommandExecutorのonCommandメソッドが呼び出されます。

```java
package party.morino.resources.plugin;

import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {
    @Override
    public void onEnable() {
        getCommand("mycommand").setExecutor(new MyCommandExecutor());
    }
}
```


## plugin.ymlを作成する

また、個のプラグインはこのようなコマンドを持っていることをBukkitに伝えるために、plugin.ymlファイルを作成する必要があります。

```yaml title="src/main/resources/plugin.yml"
name: MyPlugin
main: party.morino.resources.plugin.MyPlugin
version: 1.0
commands:
  mycommand:
    description: Hello, world!
```

この方法が、Buikkt標準のコマンドの実装方法です。
しかし、この方法は冗長な記述が多いため、実際のプラグイン開発では、コマンドの実装に関するフレームワークを使用することが推奨されます。
そこで、コマンドフレームワークを使うと簡単にコマンドを作成できる。
