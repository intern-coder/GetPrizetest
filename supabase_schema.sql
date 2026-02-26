-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop old tables if they exist to clean up
DROP TABLE IF EXISTS shipping_info;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS game_results;
DROP TABLE IF EXISTS prizes;
DROP TABLE IF EXISTS users;

-- 1. 创建统计数据表 (stats)
CREATE TABLE IF NOT EXISTS stats (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    change TEXT,
    trend TEXT CHECK (trend IN ('up', 'down')),
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建订单表 (orders)
-- 此表结构与后台管理系统完全一致
-- 逻辑：使用 name 字段存储注册手机号作为主关联键，同时增加 order_no 唯一订单号
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_no TEXT UNIQUE, -- 订单编号
    initials TEXT,
    name TEXT NOT NULL,
    location TEXT,
    prize TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'completed')),
    full_name TEXT,
    address1 TEXT,
    address2 TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建反馈表 (feedbacks)
CREATE TABLE IF NOT EXISTS feedbacks (
    id SERIAL PRIMARY KEY,
    "user" TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    phone TEXT,
    date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 创建产品/奖品进度表 (products)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    rewarded INTEGER DEFAULT 0,
    progress INTEGER DEFAULT 0,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 创建设置表 (settings)
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 创建用户登录表 (app_users)
-- 专门用于前端 App 的手机号注册与登录
CREATE TABLE IF NOT EXISTS app_users (
    id SERIAL PRIMARY KEY,
    phone TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 填充初始测试数据 (幂等插入)
-- ---------------------------------------------------------

INSERT INTO stats (label, value, change, trend, icon) 
VALUES 
('累计参与人数', '12,540', '+12.5%', 'up', 'group'),
('中奖率', '8.5%', '+0.5%', 'up', 'celebration'),
('待发货订单', '1', '0%', 'up', 'pending_actions')
ON CONFLICT DO NOTHING;

INSERT INTO products (name, rewarded, progress, icon) 
VALUES 
('Raw Beet Powder', 540, 75, 'eco'),
('Concentrated Juice', 210, 45, 'water_drop'),
('Energy Capsules', 1200, 92, 'pill'),
('VIP Gift Box', 45, 15, 'card_giftcard')
ON CONFLICT DO NOTHING;

INSERT INTO settings (key, value) 
VALUES 
('site_name', '管理系统'),
('admin_email', 'admin@beetroot.com'),
('maintenance_mode', 'false')
ON CONFLICT (key) DO NOTHING;

-- 开启 Row Level Security (RLS) 并配置公共访问权限
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;

-- 策略幂等处理
DROP POLICY IF EXISTS "Allow public access for all" ON stats;
CREATE POLICY "Allow public access for all" ON stats FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access for all" ON orders;
CREATE POLICY "Allow public access for all" ON orders FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access for all" ON feedbacks;
CREATE POLICY "Allow public access for all" ON feedbacks FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access for all" ON products;
CREATE POLICY "Allow public access for all" ON products FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access for all" ON settings;
CREATE POLICY "Allow public access for all" ON settings FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public access for all" ON app_users;
CREATE POLICY "Allow public access for all" ON app_users FOR ALL USING (true);
