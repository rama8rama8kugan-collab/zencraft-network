'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'purchases' | 'inventory' | 'settings'>('overview');

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await fetch('/api/users/me');
      if (!response.ok) {
        router.push('/');
        return;
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (loading) {
    return (
      <Container className="py-20">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-purple"></div>
        </div>
      </Container>
    );
  }

  if (!user) {
    return <div>Not logged in</div>;
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'purchases', label: 'Purchase History' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'settings', label: 'Settings' },
  ] as const;

  return (
    <Container className="py-20">
      <SectionTitle title="Player Profile" subtitle={user.minecraftUsername} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-1 bg-dark-secondary border border-accent-purple/20 rounded-lg p-6 h-fit"
        >
          <div className="text-center mb-6">
            {user.head && (
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={user.head}
                  alt="Player Head"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h3 className="text-xl font-bold">{user.minecraftUsername}</h3>
            {user.rank && <p className="text-accent-purple mt-2">{user.rank.displayName}</p>}
          </div>

          <div className="space-y-4 border-t border-accent-purple/20 pt-6">
            <div>
              <p className="text-sm text-gray-400">UUID</p>
              <p className="font-mono text-xs break-all">{user.uuid}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Coins</p>
              <p className="text-lg font-bold text-accent-cyan">{user.coins}</p>
            </div>
            {user.profile && (
              <>
                <div>
                  <p className="text-sm text-gray-400">Level</p>
                  <p className="text-lg font-bold text-accent-emerald">{user.profile.level}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Spent</p>
                  <p className="text-lg font-bold">₹{user.profile.totalSpent.toFixed(2)}</p>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-3"
        >
          {/* Tabs */}
          <div className="flex gap-2 border-b border-accent-purple/20 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-accent-purple text-accent-purple'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && <OverviewTab user={user} />}
          {activeTab === 'purchases' && <PurchasesTab userId={user.id} />}
          {activeTab === 'inventory' && <InventoryTab userId={user.id} />}
          {activeTab === 'settings' && <SettingsTab userId={user.id} />}
        </motion.div>
      </div>
    </Container>
  );
}

function OverviewTab({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-secondary border border-accent-purple/20 rounded-lg p-6">
          <h4 className="font-bold mb-3">Account Info</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Username:</span>
              <span>{user.minecraftUsername}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Member Since:</span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-secondary border border-accent-purple/20 rounded-lg p-6">
          <h4 className="font-bold mb-3">Statistics</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Orders:</span>
              <span>{user.profile?.totalOrders || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Spent:</span>
              <span className="text-accent-emerald">₹{user.profile?.totalSpent.toFixed(2) || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PurchasesTab({ userId }: { userId: string }) {
  const [purchases, setPurchases] = useState<any[]>([]);

  const fetchPurchases = useCallback(async () => {
    try {
      const response = await fetch(`/api/orders?userId=${userId}`);
      const data = await response.json();
      setPurchases(data.orders || []);
    } catch (error) {
      console.error('Failed to fetch purchases:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  if (purchases.length === 0) {
    return <p className="text-gray-400">No purchases yet</p>;
  }

  return (
    <div className="space-y-4">
      {purchases.map((purchase) => (
        <div key={purchase.id} className="bg-dark-secondary border border-accent-purple/20 rounded-lg p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="font-bold">Order #{purchase.orderNumber}</p>
              <p className="text-sm text-gray-400">{new Date(purchase.createdAt).toLocaleDateString()}</p>
            </div>
            <span className={`px-3 py-1 rounded text-sm font-semibold ${
              purchase.status === 'COMPLETED' ? 'bg-accent-emerald/20 text-accent-emerald' : 'bg-accent-purple/20 text-accent-purple'
            }`}>
              {purchase.status}
            </span>
          </div>
          <p className="text-accent-cyan font-bold">₹{purchase.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

function InventoryTab({ userId }: { userId: string }) {
  const [inventory, setInventory] = useState<any[]>([]);

  const fetchInventory = useCallback(async () => {
    try {
      const response = await fetch(`/api/inventory?userId=${userId}`);
      const data = await response.json();
      setInventory(data.items || []);
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  if (inventory.length === 0) {
    return <p className="text-gray-400">Your inventory is empty</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {inventory.map((item) => (
        <div key={item.id} className="bg-dark-secondary border border-accent-purple/20 rounded-lg p-4">
          <p className="font-bold">{item.itemName}</p>
          <p className="text-sm text-gray-400 mb-2">{item.itemType}</p>
          <p className="text-accent-cyan font-semibold">Qty: {item.quantity}</p>
          {item.expiresAt && <p className="text-xs text-orange-400 mt-2">Expires: {new Date(item.expiresAt).toLocaleDateString()}</p>}
        </div>
      ))}
    </div>
  );
}

function SettingsTab({ userId }: { userId: string }) {
  return (
    <div className="bg-dark-secondary border border-accent-purple/20 rounded-lg p-6">
      <h4 className="font-bold mb-4">Settings</h4>
      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input type="checkbox" defaultChecked className="w-4 h-4" />
          <span>Email Notifications</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" defaultChecked className="w-4 h-4" />
          <span>Discord Notifications</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" defaultChecked className="w-4 h-4" />
          <span>Public Profile</span>
        </label>
      </div>
      <button className="mt-6 w-full bg-accent-purple hover:bg-accent-purple/80 px-6 py-2 rounded font-semibold transition-colors">
        Save Changes
      </button>
    </div>
  );
}