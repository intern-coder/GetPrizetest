import { supabase } from './supabaseClient';
import { UserState } from './types';

// 严格清洗手机号，确保格式化为 +11234567890 这种形式
const formatPhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    // 如果已经是 11 位且以 1 开头，加 +
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
        return `+${cleaned}`;
    }
    // 如果是 10 位，补齐区号
    if (cleaned.length === 10) {
        return `+1${cleaned}`;
    }
    // 其他情况返回原样或按 10 位逻辑处理
    return cleaned.startsWith('+') ? phone : `+1${cleaned}`;
};

// 获取当前登录用户的手机号
export const getCurrentUserPhone = () => {
    return localStorage.getItem('rv_user_phone');
};

// 手机号登录
export const login = async (phone: string, password: string) => {
    if (!supabase) throw new Error('Supabase 未初始化');

    const formattedPhone = formatPhone(phone);
    const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('phone', formattedPhone)
        .eq('password', password)
        .maybeSingle();

    if (error) {
        console.error('登录错误:', error);
        throw error;
    }

    if (!data) {
        throw new Error('手机号或密码错误');
    }

    localStorage.setItem('rv_user_phone', formattedPhone);
    return data;
};

// 手机号注册
export const register = async (phone: string, password: string) => {
    if (!supabase) throw new Error('Supabase 未初始化');

    const formattedPhone = formatPhone(phone);
    const { data, error } = await supabase
        .from('app_users')
        .insert({ phone: formattedPhone, password })
        .select()
        .maybeSingle();

    if (error) {
        if (error.code === '23505') {
            throw new Error('该手机号已注册');
        }
        console.error('注册错误:', error);
        throw error;
    }

    localStorage.setItem('rv_user_phone', formattedPhone);
    return data;
};

// 记录中奖信息 (改为仅本地记录，不再立即创建订单)
export const recordWin = async (prizeName: string) => {
    // 根据用户要求，半路退出不计入订单，因此这里不再执行数据库插入
    console.log('Prize won but not saved to DB yet:', prizeName);
    return;
};

// 获取用户所有订单列表
export const fetchUserOrders = async () => {
    if (!supabase) return [];
    const phone = getCurrentUserPhone();
    if (!phone) return [];

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('name', phone) // 使用 name 字段匹配
        .order('created_at', { ascending: false });

    if (error) {
        console.error('获取订单列表失败:', error);
        return [];
    }
    return data || [];
};

// 提交反馈
export const submitFeedback = async (rating: number, comment: string) => {
    if (!supabase) return;
    const phone = getCurrentUserPhone();
    if (!phone) throw new Error('请先登录');

    const { error } = await supabase
        .from('feedbacks')
        .insert({
            phone: phone,
            user: phone,
            rating,
            comment,
            date: new Date().toLocaleDateString()
        });

    if (error) {
        console.error('提交反馈失败:', error);
        throw error;
    }
};

// 保存收件地址信息并正式创建订单
export const saveShippingInfo = async (info: UserState['shippingInfo'], prizeName: string) => {
    if (!info || !supabase || !prizeName) return;
    const phone = getCurrentUserPhone();
    if (!phone) throw new Error('请先登录');

    // 只有在此处完成时，才正式生成并插入订单
    const orderNo = `RTD-${Date.now().toString().slice(-6)}${Math.floor(100 + Math.random() * 900)}`;

    const { error } = await supabase
        .from('orders')
        .insert({
            order_no: orderNo,
            name: phone,       // 使用关联标识
            initials: info.initials,
            location: info.location,
            full_name: info.name,
            phone: info.phone, // 收件人电话
            address1: info.address,
            address2: info.address2,
            city: info.city,
            state: info.province,
            zip: info.zipCode,
            prize: prizeName,
            status: 'reviewing'
        });

    if (error) {
        console.error('创建订单失败:', error);
        throw error;
    }
};

// 获取用户信息和上一次抽奖状态
export const fetchUserProfile = async () => {
    if (!supabase) return null;
    const phone = getCurrentUserPhone();
    if (!phone) return null;

    try {
        const { data: latestOrder } = await supabase
            .from('orders')
            .select('*')
            .eq('name', phone)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        const { data: latestFeedback } = await supabase
            .from('feedbacks')
            .select('*')
            .eq('user', phone)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (!latestOrder) {
            return {
                shippingInfo: null,
                prize: null,
                hasSpun: false,
                rating: latestFeedback?.rating || 0,
                feedback: latestFeedback?.comment || '',
            };
        }

        return {
            shippingInfo: {
                name: latestOrder.full_name || '',
                initials: latestOrder.initials || '',
                location: latestOrder.location || '',
                phone: latestOrder.phone || '',
                province: latestOrder.state || '',
                city: latestOrder.city || '',
                address: latestOrder.address1 || '',
                address2: latestOrder.address2 || '',
                zipCode: latestOrder.zip || ''
            },
            prize: latestOrder.prize,
            hasSpun: true,
            rating: latestFeedback?.rating || 0,
            feedback: latestFeedback?.comment || '',
        };
    } catch (error) {
        console.error('获取个人资料失败:', error);
        return null;
    }
};

export const logout = () => {
    localStorage.removeItem('rv_user_phone');
};
