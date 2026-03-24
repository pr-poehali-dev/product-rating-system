import { useState } from 'react';
import Icon from '@/components/ui/icon';
import FeedPage from '@/pages/FeedPage';
import SearchPage from '@/pages/SearchPage';
import CategoriesPage from '@/pages/CategoriesPage';
import RatingsPage from '@/pages/RatingsPage';
import ProfilePage from '@/pages/ProfilePage';
import WriteReviewPage from '@/pages/WriteReviewPage';

type Tab = 'feed' | 'search' | 'categories' | 'ratings' | 'profile';

const NAV_TABS = [
  { id: 'feed' as Tab, icon: 'Home', label: 'Лента' },
  { id: 'search' as Tab, icon: 'Search', label: 'Поиск' },
  { id: 'categories' as Tab, icon: 'Grid3x3', label: 'Разделы' },
  { id: 'ratings' as Tab, icon: 'Trophy', label: 'Рейтинги' },
  { id: 'profile' as Tab, icon: 'User', label: 'Профиль' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const [isWriting, setIsWriting] = useState(false);

  if (isWriting) {
    return <WriteReviewPage onBack={() => setIsWriting(false)} />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'feed': return <FeedPage />;
      case 'search': return <SearchPage />;
      case 'categories': return <CategoriesPage />;
      case 'ratings': return <RatingsPage />;
      case 'profile': return <ProfilePage />;
    }
  };

  return (
    <div className="max-w-md mx-auto relative min-h-screen">
      <div className="pb-20">
        {renderPage()}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-30">
        <div className="bg-white/95 backdrop-blur-xl border-t border-border/50 px-2 py-2 shadow-xl">
          <div className="flex items-center justify-around relative">
            {NAV_TABS.slice(0, 2).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === tab.id ? 'text-purple-600' : 'text-muted-foreground hover:text-gray-600'
                }`}
              >
                <div className={`relative ${activeTab === tab.id ? 'scale-110' : ''} transition-transform`}>
                  <Icon
                    name={tab.icon}
                    size={22}
                    className={activeTab === tab.id ? 'fill-purple-100 stroke-purple-600' : ''}
                  />
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-600" />
                  )}
                </div>
                <span className={`text-[10px] font-semibold ${activeTab === tab.id ? 'text-purple-600' : 'text-muted-foreground'}`}>
                  {tab.label}
                </span>
              </button>
            ))}

            <div className="px-3">
              <button
                onClick={() => setIsWriting(true)}
                className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-lg pulse-glow hover:scale-110 active:scale-95 transition-all -mt-5"
              >
                <Icon name="Plus" size={26} className="text-white" />
              </button>
            </div>

            {NAV_TABS.slice(3).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === tab.id ? 'text-purple-600' : 'text-muted-foreground hover:text-gray-600'
                }`}
              >
                <div className={`relative ${activeTab === tab.id ? 'scale-110' : ''} transition-transform`}>
                  <Icon
                    name={tab.icon}
                    size={22}
                    className={activeTab === tab.id ? 'fill-purple-100 stroke-purple-600' : ''}
                  />
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-600" />
                  )}
                </div>
                <span className={`text-[10px] font-semibold ${activeTab === tab.id ? 'text-purple-600' : 'text-muted-foreground'}`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
