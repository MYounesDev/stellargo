'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/hooks/useWallet';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { User as UserIcon, Edit2, Save, Award, TrendingUp, MapPin, Gift, Users, Briefcase, Heart } from 'lucide-react';
import { User } from '@/types';

export default function ProfilePage() {
  const router = useRouter();
  const { publicKey, isConnected } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (!isConnected) {
      router.push('/app/map');
      return;
    }

    if (publicKey) {
      fetchUserProfile();
    }
  }, [isConnected, publicKey, router]);

  const fetchUserProfile = async () => {
    if (!publicKey) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${publicKey}`);
      const data = await response.json();

      if (data.success && data.data) {
        setUser(data.data);
        setUsername(data.data.username || '');
        setBio(data.data.bio || '');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!publicKey) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/users/${publicKey}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          bio,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.data);
        setEditing(false);
        alert('Profile updated successfully!');
      } else {
        throw new Error(data.error || 'Failed to update profile');
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 10)}...${address.slice(-6)}`;
  };

  const getPersonaIcon = (persona: string) => {
    switch (persona) {
      case 'personal':
        return Users;
      case 'business':
        return Briefcase;
      case 'nonprofit':
        return Heart;
      default:
        return UserIcon;
    }
  };

  const getPersonaColor = (persona: string) => {
    switch (persona) {
      case 'personal':
        return 'from-cyber-500 to-green-500';
      case 'business':
        return 'from-cyan-500 to-blue-500';
      case 'nonprofit':
        return 'from-pink-500 to-purple-500';
      default:
        return 'from-slate-500 to-slate-700';
    }
  };

  const getPersonaLabel = (persona: string) => {
    switch (persona) {
      case 'personal':
        return 'Personal User';
      case 'business':
        return 'Business';
      case 'nonprofit':
        return 'Non-Profit';
      default:
        return persona;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-500 bg-animated flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-500 bg-animated flex items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <UserIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Profile Not Found</h2>
          <p className="text-slate-400 mb-6">
            Please complete onboarding first
          </p>
          <Button variant="primary" onClick={() => router.push('/app/map')}>
            Go to Map
          </Button>
        </Card>
      </div>
    );
  }

  const PersonaIcon = getPersonaIcon(user.persona);

  return (
    <div className="min-h-screen bg-dark-950 bg-animated pt-20 md:pt-24 pb-20 md:pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-slate-400">Manage your account and view your stats</p>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className={`w-20 h-20 bg-gradient-to-br ${getPersonaColor(user.persona)} rounded-2xl flex items-center justify-center`}>
                <PersonaIcon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {user.username || 'Anonymous User'}
                </h2>
                <p className="text-slate-400 text-sm mb-1">{truncateAddress(user.publicKey)}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-cyber-500/20 text-cyber-400">
                  {getPersonaLabel(user.persona)}
                </span>
              </div>
            </div>

            {!editing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditing(false);
                    setUsername(user.username || '');
                    setBio(user.bio || '');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSave}
                  loading={saving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </div>

          {/* Bio Section */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Bio</label>
            {editing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                maxLength={200}
                rows={3}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyber-500 transition-colors resize-none"
              />
            ) : (
              <p className="text-slate-400">
                {user.bio || 'No bio yet. Click Edit Profile to add one.'}
              </p>
            )}
          </div>

          {editing && (
            <div className="mt-4">
              <label className="block text-sm font-semibold text-white mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                maxLength={50}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyber-500 transition-colors"
              />
            </div>
          )}
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Level & Badge</h3>
              <Award className="w-5 h-5 text-cyber-500" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-dark-500">{user.level}</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Current Level</p>
                <p className="text-white font-semibold">Level {user.level}</p>
                {user.badge && (
                  <p className="text-cyber-500 text-sm">{user.badge}</p>
                )}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Activity</h3>
              <TrendingUp className="w-5 h-5 text-cyber-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Total Transactions</span>
                <span className="text-white font-semibold">
                  {user.totalDropsCreated + user.totalDropsClaimed}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Success Rate</span>
                <span className="text-cyber-500 font-semibold">
                  {user.totalDropsCreated > 0
                    ? Math.round((user.totalDropsClaimed / user.totalDropsCreated) * 100)
                    : 0}%
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Stats */}
        <Card>
          <h3 className="text-xl font-bold text-white mb-6">Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <MapPin className="w-5 h-5 text-cyber-500" />
              </div>
              <p className="text-slate-400 text-sm mb-1">Drops Created</p>
              <p className="text-2xl font-bold text-white">{user.totalDropsCreated}</p>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Gift className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-slate-400 text-sm mb-1">Drops Claimed</p>
              <p className="text-2xl font-bold text-white">{user.totalDropsClaimed}</p>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-slate-400 text-sm mb-1">Total Sent</p>
              <p className="text-2xl font-bold text-white">{user.totalAmountSent.toFixed(2)} XLM</p>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-cyan-500" />
              </div>
              <p className="text-slate-400 text-sm mb-1">Total Received</p>
              <p className="text-2xl font-bold text-white">{user.totalAmountReceived.toFixed(2)} XLM</p>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/app/map')}
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Map
          </button>
        </div>
      </div>
    </div>
  );
}

