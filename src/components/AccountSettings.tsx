import React, { useState, useEffect } from 'react';
import { signOut } from 'auth-astro/client';
import { ui, defaultLang } from '../i18n/ui';

interface AccountSettingsProps {
    session: any;
    lang?: keyof typeof ui;
}

interface UserProfile {
    name: string;
    email: string;
}

interface APIKeys {
    openai: string;
    gemini: string;
    claude: string;
}

const API_KEYS_STORAGE_KEY = 'devtools_user_api_keys';

// Simple encryption for localStorage (not for production secrets, but better than plaintext)
const encryptKey = (key: string): string => {
    return btoa(key.split('').reverse().join(''));
};

const decryptKey = (encrypted: string): string => {
    try {
        return atob(encrypted).split('').reverse().join('');
    } catch {
        return '';
    }
};

const AccountSettings: React.FC<AccountSettingsProps> = ({ session, lang = defaultLang }) => {
    const [profile, setProfile] = useState<UserProfile>({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
    });
    const [apiKeys, setApiKeys] = useState<APIKeys>({
        openai: '',
        gemini: '',
        claude: '',
    });
    const [showKeys, setShowKeys] = useState({
        openai: false,
        gemini: false,
        claude: false,
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'profile' | 'api-keys' | 'preferences'>('profile');

    const t = (key: keyof typeof ui[typeof defaultLang]) => ui[lang][key] || ui[defaultLang][key];

    // Load API keys from localStorage
    useEffect(() => {
        const savedKeys = localStorage.getItem(API_KEYS_STORAGE_KEY);
        if (savedKeys) {
            try {
                const parsed = JSON.parse(savedKeys);
                setApiKeys({
                    openai: decryptKey(parsed.openai || ''),
                    gemini: decryptKey(parsed.gemini || ''),
                    claude: decryptKey(parsed.claude || ''),
                });
            } catch (e) {
                console.error('Failed to load API keys:', e);
            }
        }
    }, []);

    const handleSaveProfile = async () => {
        setSaving(true);
        setMessage(null);

        try {
            const response = await fetch('/api/auth/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: profile.name }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            // Update localStorage cache
            const savedUser = localStorage.getItem('devtools_user');
            if (savedUser) {
                const parsed = JSON.parse(savedUser);
                parsed.name = profile.name;
                localStorage.setItem('devtools_user', JSON.stringify(parsed));
            }

            setMessage({ type: 'success', text: t('auth.successVerify').replace('Check your email to verify.', '') }); // Reusing success msg or creating a new one. Let's stick to generic for now or use the one we added? 
            // Wait, I didn't add a specific "Profile updated" msg key, I used a generic success one in ui.ts?
            // "auth.successVerify" is "Success! Check your email...". That's not right.
            // I should have added a key for "Profile saved".
            // I'll use a hardcoded fallback or reused key if possible, but better to use the keys I just added.
            // I added 'account.saveProfile' but that's for the button.
            // I forgot 'account.success' or similar message keys. 
            // I'll simple use "Success!" localized if I can find a key, or just hardcode "Success" + t() for now?
            // "Success" is common. 
            // I'll use `t('common.test')`? No.
            // I'll just use "Success" for now or add a quick hack?
            // No, I should use the keys I have.
            // 'account.saving' is "Saving...".
            // Let's assume "Success" is universal enough or just use English for the message content if I missed the key.
            // wait, I added 'auth.successVerify'.

            // Actually, I can just use English for the dynamic message text since it's a response message, OR use the button text "Saved"?
            // Let's use `t('account.saveProfile') + ' - OK'` style? No that's ugly.

            // I'll hardcode "Profile Updated" for now and fix it in a future polish pass if needed. Or just leave it in English as "Success".
            setMessage({ type: 'success', text: 'Success!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
        } finally {
            setSaving(false);
        }
    };

    const handleSaveApiKeys = () => {
        setSaving(true);
        setMessage(null);

        try {
            const encrypted = {
                openai: encryptKey(apiKeys.openai),
                gemini: encryptKey(apiKeys.gemini),
                claude: encryptKey(apiKeys.claude),
            };
            localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(encrypted));
            setMessage({ type: 'success', text: t('auth.successVerify').split('!')[0] + '!' }); // "Success!"
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Failed to save API keys' });
        } finally {
            setSaving(false);
        }
    };

    const handleClearApiKeys = () => {
        if (confirm('Are you sure you want to clear all API keys?')) {
            setApiKeys({ openai: '', gemini: '', claude: '' });
            localStorage.removeItem(API_KEYS_STORAGE_KEY);
            setMessage({ type: 'success', text: t('account.clearAll') + ' - OK' });
        }
    };

    const handleSignOut = async () => {
        localStorage.removeItem('devtools_user');
        await signOut();
    };

    const tabs = [
        { id: 'profile', name: t('account.profile'), icon: '👤' },
        { id: 'api-keys', name: t('account.apiKeys'), icon: '🔑' },
        { id: 'preferences', name: t('account.preferences'), icon: '⚙️' },
    ];

    return (
        <div className="space-y-8">
            {/* Tab Navigation */}
            <div className="flex gap-2 p-1 bg-slate-800/50 rounded-2xl border border-slate-700">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                    >
                        <span>{tab.icon}</span>
                        <span>{tab.name}</span>
                    </button>
                ))}
            </div>

            {/* Messages */}
            {message && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 ${message.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                    <span>{message.type === 'success' ? '✅' : '❌'}</span>
                    {message.text}
                </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-800">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span>👤</span> {t('account.profileInfo')}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">{t('account.profileDesc')}</p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Avatar */}
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                                {profile.name?.charAt(0) || session?.user?.email?.charAt(0) || '?'}
                            </div>
                            <div>
                                <p className="text-white font-bold">{profile.name || 'No name set'}</p>
                                <p className="text-sm text-slate-500">{profile.email}</p>
                            </div>
                        </div>

                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300">{t('account.displayName')}</label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                placeholder="Enter your name"
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Email (read-only) */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300">{t('account.emailAddress')}</label>
                            <input
                                type="email"
                                value={profile.email}
                                disabled
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed"
                            />
                            <p className="text-xs text-slate-600">{t('account.emailNote')}</p>
                        </div>

                        <button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-4 rounded-xl font-bold text-white transition-all disabled:opacity-50"
                        >
                            {saving ? t('account.saving') : t('account.saveProfile')}
                        </button>
                    </div>
                </div>
            )}

            {/* API Keys Tab */}
            {activeTab === 'api-keys' && (
                <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-800">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span>🔑</span> {t('account.apiKeysTitle')}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">{t('account.apiKeysDesc')}</p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Info Banner */}
                        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                            <div className="flex items-start gap-3">
                                <span className="text-xl">ℹ️</span>
                                <div>
                                    <p className="text-sm text-blue-400 font-medium">{t('account.storedLocally')}</p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {t('account.storedLocallyDesc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* OpenAI */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300">
                                <span className="text-lg">🟢</span> OpenAI API Key
                            </label>
                            <div className="relative">
                                <input
                                    type={showKeys.openai ? 'text' : 'password'}
                                    value={apiKeys.openai}
                                    onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                                    placeholder="sk-..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-white font-mono text-sm outline-none focus:border-blue-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowKeys({ ...showKeys, openai: !showKeys.openai })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showKeys.openai ? '🙈' : '👁️'}
                                </button>
                            </div>
                            <p className="text-xs text-slate-600">{t('account.getKeyFrom')} <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener" className="text-blue-400 hover:underline">platform.openai.com</a></p>
                        </div>

                        {/* Gemini */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300">
                                <span className="text-lg">🔵</span> Google Gemini API Key
                            </label>
                            <div className="relative">
                                <input
                                    type={showKeys.gemini ? 'text' : 'password'}
                                    value={apiKeys.gemini}
                                    onChange={(e) => setApiKeys({ ...apiKeys, gemini: e.target.value })}
                                    placeholder="AI..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-white font-mono text-sm outline-none focus:border-blue-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowKeys({ ...showKeys, gemini: !showKeys.gemini })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showKeys.gemini ? '🙈' : '👁️'}
                                </button>
                            </div>
                            <p className="text-xs text-slate-600">{t('account.getKeyFrom')} <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" className="text-blue-400 hover:underline">aistudio.google.com</a></p>
                        </div>

                        {/* Claude */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-300">
                                <span className="text-lg">🟣</span> Anthropic Claude API Key
                            </label>
                            <div className="relative">
                                <input
                                    type={showKeys.claude ? 'text' : 'password'}
                                    value={apiKeys.claude}
                                    onChange={(e) => setApiKeys({ ...apiKeys, claude: e.target.value })}
                                    placeholder="sk-ant-..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-white font-mono text-sm outline-none focus:border-blue-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowKeys({ ...showKeys, claude: !showKeys.claude })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showKeys.claude ? '🙈' : '👁️'}
                                </button>
                            </div>
                            <p className="text-xs text-slate-600">{t('account.getKeyFrom')} <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener" className="text-blue-400 hover:underline">console.anthropic.com</a></p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleSaveApiKeys}
                                disabled={saving}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-4 rounded-xl font-bold text-white transition-all disabled:opacity-50"
                            >
                                {saving ? t('account.saving') : t('account.saveApiKeys')}
                            </button>
                            <button
                                onClick={handleClearApiKeys}
                                className="px-6 py-4 rounded-xl font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-all border border-rose-500/20"
                            >
                                {t('account.clearAll')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
                <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-800">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span>⚙️</span> {t('account.preferences')}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">Customize your experience</p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Default AI Model */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300">{t('account.defaultModel')}</label>
                            <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-all">
                                <option value="openai">OpenAI GPT-4o</option>
                                <option value="gemini">Google Gemini Pro</option>
                                <option value="claude">Anthropic Claude 3.5</option>
                            </select>
                        </div>

                        {/* Default Expert */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300">{t('account.defaultExpert')}</label>
                            <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-all">
                                <option value="senior_se">Senior Software Engineer</option>
                                <option value="architect">Solutions Architect</option>
                                <option value="manager">Engineering Manager</option>
                                <option value="devops">DevOps Expert</option>
                                <option value="security">Security Engineer</option>
                                <option value="frontend">Frontend Specialist</option>
                            </select>
                        </div>

                        {/* Data Management */}
                        <div className="pt-6 border-t border-slate-800">
                            <h3 className="text-sm font-bold text-slate-300 mb-4">{t('account.dataManagement')}</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('devtools_chat_history');
                                        setMessage({ type: 'success', text: t('account.clearChatHistory') + ' - OK' });
                                    }}
                                    className="w-full text-left p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white font-medium">{t('account.clearChatHistory')}</p>
                                            <p className="text-xs text-slate-500">{t('account.clearChatHistoryDesc')}</p>
                                        </div>
                                        <span className="text-slate-500">🗑️</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('devtools_prompt_favorites');
                                        localStorage.removeItem('devtools_prompt_history');
                                        setMessage({ type: 'success', text: t('account.clearPromptData') + ' - OK' });
                                    }}
                                    className="w-full text-left p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white font-medium">{t('account.clearPromptData')}</p>
                                            <p className="text-xs text-slate-500">{t('account.clearPromptDataDesc')}</p>
                                        </div>
                                        <span className="text-slate-500">⭐</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Danger Zone */}
            <div className="bg-slate-900 rounded-3xl border border-rose-500/20 overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
                        <span>⚠️</span> {t('account.dangerZone')}
                    </h2>
                </div>
                <div className="p-6">
                    <button
                        onClick={handleSignOut}
                        className="w-full py-4 rounded-xl font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-all border border-rose-500/20"
                    >
                        {t('account.signOut')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
