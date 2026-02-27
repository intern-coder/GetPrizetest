import React, { useEffect, useState } from 'react';
import { UserState, Step, Order } from '../types';
import { fetchUserOrders } from '../api';
import { translations } from '../translations';

interface Props {
  userState: UserState;
  onBack: () => void;
  onNavigate: (step: Step) => void;
  language: 'zh' | 'en';
}

const OrdersPage: React.FC<Props> = ({ onBack, onNavigate, language }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const t = translations[language];

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchUserOrders();
        setOrders(data);
      } catch (e) {
        console.error('Failed to load orders:', e);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const OrderDetailsModal = ({ order, onClose }: { order: Order; onClose: () => void }) => {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
        <div className="bg-white rounded-[40px] w-full max-w-sm overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-500 text-[9px] font-black rounded uppercase tracking-wider mb-1">
                  {t.order_free}
                </span>
                <h3 className="font-black text-slate-900 text-xl leading-tight">{order.prize}</h3>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 active:scale-90 transition-all">
                <span className="material-icons text-lg">close</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Status Section */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t.nav_orders} {t.order_no}</span>
                  <span className="font-black text-sm text-slate-900 font-mono">{order.order_no}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-100">
                  <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'completed' ? 'bg-green-500' : order.status === 'rejected' ? 'bg-red-500' : 'bg-amber-400'} ${order.status !== 'completed' && order.status !== 'rejected' ? 'animate-pulse' : ''}`}></div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${order.status === 'completed' ? 'text-green-600' : order.status === 'rejected' ? 'text-red-500' : 'text-amber-500'}`}>
                    {order.status === 'completed' ? t.order_status_completed : order.status === 'rejected' ? t.order_status_rejected : order.status === 'reviewing' ? t.order_status_reviewing : t.order_status_pending}
                  </span>
                </div>
              </div>

              {/* Rejection Reason */}
              {(order.status === 'rejected') && (order.rejection_reason || order.rejectreason) && (
                <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                  <div className="flex items-start gap-2">
                    <span className="material-icons text-red-500 text-sm mt-0.5">error_outline</span>
                    <div>
                      <span className="block text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">{t.order_reject_reason}</span>
                      <p className="text-sm font-bold text-red-700 leading-snug">{order.rejection_reason || order.rejectreason}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tracking Info */}
              {order.status === 'completed' && (order.tracking_no || order.tracking_courier || order.ship_date) && (
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex flex-col gap-4">
                  <div className="flex items-start gap-2">
                    <span className="material-icons text-green-500 text-sm mt-0.5">local_shipping</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className="block text-[10px] font-black text-green-500 uppercase tracking-widest">{t.order_courier}</span>
                        {order.ship_date && (
                          <span className="text-[10px] font-bold text-green-600/60 uppercase tracking-tighter">
                            {t.order_ship_date}: {order.ship_date}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-black text-green-900">{order.carrier || order.tracking_courier || '---'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-3 border-t border-green-200/50">
                    <span className="material-icons text-green-500 text-sm mt-0.5">tag</span>
                    <div className="flex-1">
                      <span className="block text-[10px] font-black text-green-500 uppercase tracking-widest mb-1">{t.order_tracking_no}</span>
                      <p className="text-sm font-black text-green-800 font-mono tracking-tight">{order.tracking_no || '---'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Details */}
              <div className="px-1">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{t.order_shipping_details}</span>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="material-icons text-slate-300 text-sm mt-0.5">person</span>
                    <span className="text-sm font-bold text-slate-700">{order.full_name}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-icons text-slate-300 text-sm mt-0.5">phone</span>
                    <span className="text-sm font-bold text-slate-700">{order.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-icons text-slate-300 text-sm mt-0.5">place</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">{order.address1}</span>
                      {order.address2 && <span className="text-xs text-slate-400 mt-0.5">{order.address2}</span>}
                      <span className="text-xs text-slate-500 font-medium mt-1">
                        {order.city}, {order.state} {order.zip}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-8 bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              {t.order_close}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <header className="sticky top-0 z-50 bg-bg-light/80 backdrop-blur-md px-6 pt-12 pb-4 border-b border-slate-100">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-all"
          >
            <span className="material-icons text-slate-600">chevron_left</span>
          </button>
          <h1 className="flex-1 text-center font-black text-lg tracking-tight mr-10">{t.order_title}</h1>
        </div>
      </header>

      <main className="p-6 pb-24 flex-grow">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 pointer-events-none">
            <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.order_loading}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
              <span className="material-icons text-4xl">inventory_2</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{t.order_none}</h3>
            <p className="text-slate-400 text-sm mb-8 px-8">{t.order_go_game}</p>
            <button
              onClick={() => onNavigate(Step.GAME)}
              className="bg-primary hover:bg-accent-red text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              {t.nav_game}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-500 text-[9px] font-black rounded uppercase tracking-wider mb-1">
                      {t.order_free}
                    </span>
                    <h3 className="font-black text-slate-900 text-base">{order.prize}</h3>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">{t.order_no}</span>
                    <span className="block font-black text-xs text-slate-900 font-mono tracking-tighter">
                      {order.order_no}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50 group/status">
                  <div className="flex items-center gap-1.5">
                    <span className="material-icons text-slate-300 text-sm">schedule</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {new Date(order.created_at || Date.now()).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center gap-1 color-primary hover:bg-slate-50 px-2 py-1 rounded-lg transition-all active:scale-95"
                  >
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{t.order_view_details}</span>
                    <span className="material-icons text-sm text-primary">chevron_right</span>
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'completed' ? 'bg-green-500' : order.status === 'rejected' ? 'bg-red-500' : 'bg-amber-400'} ${order.status !== 'completed' && order.status !== 'rejected' ? 'animate-pulse' : ''}`}></div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${order.status === 'completed' ? 'text-green-600' : order.status === 'rejected' ? 'text-red-500' : 'text-amber-500'}`}>
                      {order.status === 'completed' ? t.order_status_completed : order.status === 'rejected' ? t.order_status_rejected : order.status === 'reviewing' ? t.order_status_reviewing : t.order_status_pending}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest pt-8 pb-4">
              {t.order_all_loaded}
            </p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}

      {/* Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/80 backdrop-blur-md border-t border-slate-100 px-12 py-4 flex justify-between items-center z-40">
        <button
          onClick={() => onNavigate(Step.GAME)}
          className="flex flex-col items-center text-slate-400"
        >
          <span className="material-icons">auto_awesome</span>
          <span className="text-[10px] mt-1 font-bold">{t.nav_game}</span>
        </button>
        <button
          onClick={() => onNavigate(Step.ORDERS)}
          className="flex flex-col items-center text-primary"
        >
          <span className="material-icons">receipt_long</span>
          <span className="text-[10px] mt-1 font-bold">{t.nav_orders}</span>
        </button>
        <button
          onClick={() => onNavigate(Step.PROFILE)}
          className="flex flex-col items-center text-slate-400"
        >
          <span className="material-icons">person</span>
          <span className="text-[10px] mt-1 font-bold">{t.nav_profile}</span>
        </button>
      </nav>
    </div>
  );
};

export default OrdersPage;
