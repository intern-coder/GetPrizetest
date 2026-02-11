# Supabase 数据库连接指南

为了让应用能够正常运行，您需要连接到自己的 Supabase 数据库。请按照以下步骤操作：

## 1. 获取 API 凭证
1. 登录 [Supabase Dashboard](https://supabase.com/dashboard/)。
2. 创建一个新项目（或选择现有项目）。
3. 进入 **Project Settings** (左下角齿轮图标) -> **API**。
4. 找到以下两个值：
   - **Project URL**: 类似 `https://xyz.supabase.co`
   - **anon (public) API key**: 类似 `eyJhbG...`

## 2. 配置环境变量
在项目根目录下找到 `.env.local` 文件（如果不存在则创建），填入您的凭证：

```env
VITE_SUPABASE_URL=您的_Project_URL
VITE_SUPABASE_ANON_KEY=您的_anon_key
```

> [!IMPORTANT]
> 修改 `.env.local` 后，请重启本地开发服务器（`npm run dev`）以使更改生效。

## 3. 初始化数据库表
为了让应用能存储数据，您需要运行我在项目中为您准备的 SQL 脚本：

1. 在 Supabase Dashboard 中，点击左侧菜单的 **SQL Editor**。
2. 点击 **New Query**。
3. 打开本项目中的 [supabase_schema.sql](file:///c:/Users/22577/Downloads/rooted-vitality-rewards/supabase_schema.sql) 文件。
4. 将文件中的所有代码复制并粘贴到 Supabase 的 SQL 编辑器中。
5. 点击 **Run**。

## 4. 验证连接
运行 SQL 后，您可以刷新应用页面：
1. 转动转盘。
2. 提交反馈或收货信息。
3. 然后在 Supabase 的 **Table Editor** 中查看 `game_results` 或 `shipping_info` 表，确认数据是否已成功存入。

---
**提示：** 我已经在代码中为您配置好了所有的 API 调用逻辑，您只需要完成上述数据库层面的设置即可。
