# GitHub 托管指南

由于您的系统中尚未检测到 Git 环境，您可以按照以下两种方式之一将项目上传到 GitHub。

## 方案一：使用 GitHub Desktop（最推荐，简单直观）

如果您不熟悉命令行，这是最简单的办法：

1. **下载并安装**：前往 [desktop.github.com](https://desktop.github.com/) 下载并安装 GitHub Desktop。
2. **登录**：打开软件并登录您的 GitHub 账号。
3. **添加项目**：
   - 点击菜单栏的 `File` -> `Add local repository...`。
   - 选择您的项目文件夹：`c:\Users\22577\Downloads\rooted-vitality-rewards`。
4. **初始化 Git**：如果提示该文件夹不是一个 Git 仓库，点击 `create a repository`。
5. **发布到 GitHub**：
   - 在左侧填写 Commit 信息（如 "Initial commit"）。
   - 点击 `Commit to main`。
   - 点击上方的 `Publish repository` 按钮，设置项目名为 `rooted-vitality-rewards`，然后点击发布。

## 方案二：使用命令行（专业开发者常用）

如果您希望安装 Git 并通过命令行操作：

1. **安装 Git**：从 [git-scm.com](https://git-scm.com/) 下载并安装。安装时请确保选中 "Add to PATH" 选项。
2. **初始化并上传**：
   在项目目录下打开终端（PowerShell 或 CMD），依次运行以下命令：

   ```bash
   # 初始化仓库
   git init

   # 将所有文件加入缓存（.gitignore 会自动忽略敏感文件）
   git add .

   # 提交更改
   git commit -m "Initial commit"

   # 在 GitHub 上创建一个新仓库，然后运行以下命令（替换为您自己的仓库地址）
   git remote add origin https://github.com/您的用户名/您的仓库名.git
   git branch -M main
   git push -u origin main
   ```

## 注意事项
> [!IMPORTANT]
> - **不要上传密钥**：项目中的 `.gitignore` 文件已经配置为忽略 `.env.local`。请确保**不要**手动删除这个忽略规则，以免将您的 Supabase 密钥泄露到公网。
> - **README**：项目根目录下的 `README.md` 可以简单描述一下这个项目的功能。

---
完成上传后，您就可以通过 GitHub 链接随时查看和分享您的代码了！
