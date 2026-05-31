import TopBar from '../components/TopBar';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import {
  Globe, Mail, ExternalLink, Save, Image, Palette,
  Link2, Bell, Shield, Database,
} from 'lucide-react';

const tabs = [
  { id: 'general', label: 'Général', icon: Globe },
  { id: 'links', label: 'Liens externes', icon: Link2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Sécurité', icon: Shield },
];

export default function SettingsPage() {
  const { collapsed, setCollapsed } = useOutletContext();
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <TopBar title="Paramètres" subtitle="Configuration du site web" onToggleSidebar={() => setCollapsed(!collapsed)} />

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs sidebar */}
          <div className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-2 flex lg:flex-col gap-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                  >
                    <Icon size={16} className={activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'general' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-dark mb-1">Informations du site</h3>
                  <p className="text-xs text-gray-400 mb-5">Configurez les informations générales de votre site web.</p>
                </div>
                <div className="grid gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nom du site</label>
                    <input type="text" defaultValue="FINACOM - Finance Communautaire" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                    <textarea rows={3} defaultValue="Institution de microfinance agréée œuvrant pour l'inclusion financière au Burkina Faso." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email de contact</label>
                      <input type="email" defaultValue="info@finacom.bf" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Téléphone</label>
                      <input type="text" defaultValue="+226 25 00 00 00" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Adresse</label>
                    <input type="text" defaultValue="01 BP 1234 Ouagadougou 01, Burkina Faso" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Logo du site</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                        <Image size={24} className="text-gray-300" />
                      </div>
                      <button className="px-4 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">Changer le logo</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'links' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-dark mb-1">Liens externes</h3>
                  <p className="text-xs text-gray-400 mb-5">Configurez les liens vers les plateformes et portails externes.</p>
                </div>
                {[
                  { label: 'Portail email (Webmail)', placeholder: 'https://mail.finacom.bf', icon: Mail },
                  { label: 'Plateforme client', placeholder: 'https://client.finacom.bf', icon: Globe },
                  { label: 'Portail de demandes', placeholder: 'https://demandes.finacom.bf', icon: ExternalLink },
                  { label: 'Application mobile (Play Store)', placeholder: 'https://play.google.com/store/apps/...', icon: ExternalLink },
                  { label: 'Application mobile (App Store)', placeholder: 'https://apps.apple.com/...', icon: ExternalLink },
                ].map((link) => {
                  const Icon = link.icon;
                  return (
                    <div key={link.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">{link.label}</label>
                        <input type="url" placeholder={link.placeholder} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-400 transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-dark mb-1">Notifications</h3>
                  <p className="text-xs text-gray-400 mb-5">Gérez les notifications par email et dans l'application.</p>
                </div>
                {[
                  { label: 'Nouvelle demande reçue', desc: 'Recevez un email à chaque nouvelle demande', enabled: true },
                  { label: 'Nouvel utilisateur inscrit', desc: 'Notification lors de l\'ajout d\'un utilisateur', enabled: true },
                  { label: 'Document téléchargé', desc: 'Alerte quand un document est téléchargé plus de 100 fois', enabled: false },
                  { label: 'Rapport hebdomadaire', desc: 'Résumé des statistiques envoyé chaque lundi', enabled: true },
                ].map((notif) => (
                  <div key={notif.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-dark">{notif.label}</p>
                      <p className="text-xs text-gray-400">{notif.desc}</p>
                    </div>
                    <button className={`w-11 h-6 rounded-full transition-colors relative ${notif.enabled ? 'bg-primary-500' : 'bg-gray-200'}`}>
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notif.enabled ? 'left-[22px]' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-dark mb-1">Sécurité</h3>
                  <p className="text-xs text-gray-400 mb-5">Paramètres de sécurité et de maintenance.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div>
                      <p className="text-sm font-semibold text-dark">Authentification à deux facteurs</p>
                      <p className="text-xs text-gray-400">Obligatoire pour les administrateurs</p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold">Activé</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div>
                      <p className="text-sm font-semibold text-dark">Expiration des sessions</p>
                      <p className="text-xs text-gray-400">Déconnexion automatique après inactivité</p>
                    </div>
                    <select className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs outline-none">
                      <option>30 minutes</option>
                      <option>1 heure</option>
                      <option>4 heures</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div>
                      <p className="text-sm font-semibold text-dark">Sauvegarde automatique</p>
                      <p className="text-xs text-gray-400">Sauvegarde quotidienne de la base de données</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Database size={14} className="text-primary-500" />
                      <span className="text-xs text-gray-500">Dernière : 14 Avr 2026, 03:00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg ${
                  saved
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-600/15'
                }`}
              >
                {saved ? <><Save size={16} /> Enregistré !</> : <><Save size={16} /> Enregistrer les modifications</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
