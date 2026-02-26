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

// 记录中奖信息
export const recordWin = async (prizeName: string) => {
    if (!supabase) return;
    const phone = getCurrentUserPhone();
    if (!phone) throw new Error('请先登录');

    // 生成唯一的订单编号：RTD + 时间戳后 6 位 + 3 位随机数
    const orderNo = `RTD-${Date.now().toString().slice(-6)}${Math.floor(100 + Math.random() * 900)}`;

    const { error } = await supabase
        .from('orders')
        .insert({
            order_no: orderNo, // 保存唯一订单编号
            name: phone,       // 根据用户建议，使用 name 字段作为关联标识
            phone: phone,      // 初始收货电话
            prize: prizeName,
            status: 'pending'
        });

    if (error) {
        console.error('记录中奖失败:', error);
        throw error;
    }
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

// 保存收件地址信息
export const saveShippingInfo = async (info: UserState['shippingInfo']) => {
    if (!info || !supabase) return;
    const phone = getCurrentUserPhone();
    if (!phone) throw new Error('请先登录');

    // 使用 name 字段查找最近订单
    const { data: latestOrder, error: fetchError } = await supabase
        .from('orders')
        .select('id')
        .eq('name', phone)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (fetchError || !latestOrder) {
        throw new Error('未找到您的中奖记录');
    }

    const { error } = await supabase
        .from('orders')
        .update({
            full_name: info.name,
            phone: info.phone, // 这里的 phone 是收件人电话
            address1: info.address,
            city: info.city,
            state: info.province,
            zip: info.zipCode,
            status: 'reviewing'
        })
        .eq('id', latestOrder.id);

    if (error) {
        console.error('更新地址失败:', error);
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

        if (!latestOrder) {
            return {
                shippingInfo: null,
                prize: null,
                hasSpun: false,
            };
        }

        return {
            shippingInfo: {
                name: latestOrder.full_name || '',
                phone: latestOrder.phone || '',
                province: latestOrder.state || '',
                city: latestOrder.city || '',
                address: latestOrder.address1 || '',
                zipCode: latestOrder.zip || ''
            },
            prize: latestOrder.prize,
            hasSpun: true,
        };
    } catch (error) {
        console.error('获取个人资料失败:', error);
        return null;
    }
};

export const logout = () => {
    localStorage.removeItem('rv_user_phone');
};
