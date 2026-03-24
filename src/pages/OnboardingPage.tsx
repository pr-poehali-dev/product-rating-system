import { useState } from 'react';
import { INTEREST_SUGGESTIONS } from '@/data/mockData';
import { saveUser } from '@/data/userStore';
import Icon from '@/components/ui/icon';

type Props = { onDone: () => void };

type Step = 'welcome' | 'name' | 'interests' | 'done';

export default function OnboardingPage({ onDone }: Props) {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    saveUser({ name: name.trim() || 'Анонимный', interests: selected, isOnboarded: true });
    onDone();
  };

  if (step === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-purple-200 opacity-30 blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-pink-200 opacity-30 blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="relative text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl gradient-primary shadow-2xl mb-6 animate-bounce-in">
            <span className="text-4xl">⭐</span>
          </div>

          <h1 className="font-caveat text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Зацени
          </h1>
          <p className="text-gray-600 text-lg font-medium mb-2">Честные отзывы на всё вокруг</p>
          <p className="text-gray-400 text-sm mb-10 leading-relaxed max-w-xs mx-auto">
            Оценивай товары, места и услуги. Читай отзывы от живых людей. Получай очки за полезные обзоры.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
            <button
              onClick={() => setStep('name')}
              className="gradient-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-purple-300 hover:scale-[1.02] active:scale-[0.98] transition-all text-base"
            >
              Начать 🚀
            </button>
            <button
              onClick={handleFinish}
              className="text-muted-foreground text-sm py-2 hover:text-gray-700 transition-colors"
            >
              Войти без аккаунта
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'name') {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-16 pb-8">
        <div className="mb-2">
          <div className="flex gap-1 mb-6">
            {['name', 'interests'].map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${s === 'name' || step === 'interests' ? 'gradient-primary' : 'bg-muted'}`}
              />
            ))}
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Шаг 1 из 2</p>
          <h2 className="font-caveat text-3xl font-bold mb-2">Как тебя зовут?</h2>
          <p className="text-gray-500 text-sm">Это имя увидят другие пользователи под твоими отзывами</p>
        </div>

        <div className="mt-8 flex-1">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Твоё имя..."
            autoFocus
            className="w-full bg-muted rounded-2xl px-5 py-4 text-base outline-none focus:ring-2 focus:ring-purple-300 transition-all font-golos"
            onKeyDown={e => e.key === 'Enter' && name.trim() && setStep('interests')}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {['Алексей', 'Мария', 'Иван', 'Анна', 'Дмитрий'].map(n => (
              <button
                key={n}
                onClick={() => setName(n)}
                className="px-3 py-1.5 bg-white border border-border rounded-xl text-sm font-medium hover:border-purple-300 hover:text-purple-600 transition-all"
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setStep('interests')}
          disabled={!name.trim()}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all mt-6 ${
            name.trim()
              ? 'gradient-primary text-white shadow-lg hover:shadow-purple-300'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          Далее →
        </button>
      </div>
    );
  }

  if (step === 'interests') {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-16 pb-8">
        <div className="mb-2">
          <div className="flex gap-1 mb-6">
            {['name', 'interests'].map((s) => (
              <div key={s} className="h-1 flex-1 rounded-full gradient-primary" />
            ))}
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Шаг 2 из 2</p>
          <h2 className="font-caveat text-3xl font-bold mb-1">Что тебя интересует?</h2>
          <p className="text-gray-500 text-sm">
            Выбери минимум 2 темы — лента будет показывать именно их
          </p>
        </div>

        <div className="mt-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {INTEREST_SUGGESTIONS.map((interest, idx) => {
              const isSelected = selected.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => toggle(interest.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all animate-slide-up ${
                    isSelected
                      ? 'border-purple-400 bg-purple-50 shadow-md shadow-purple-100'
                      : 'border-border bg-white hover:border-purple-200'
                  }`}
                  style={{ animationDelay: `${idx * 0.04}s` }}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">{interest.emoji}</span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center animate-bounce-in">
                        <Icon name="Check" size={11} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className={`font-semibold text-sm mt-2 ${isSelected ? 'text-purple-700' : 'text-gray-700'}`}>
                    {interest.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4">
          {selected.length > 0 && (
            <p className="text-center text-xs text-purple-600 font-semibold mb-3">
              Выбрано: {selected.length} {selected.length === 1 ? 'интерес' : selected.length < 5 ? 'интереса' : 'интересов'}
            </p>
          )}
          <button
            onClick={handleFinish}
            disabled={selected.length < 2}
            className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
              selected.length >= 2
                ? 'gradient-primary text-white shadow-lg hover:shadow-purple-300 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {selected.length >= 2 ? '🎉 Готово! Показать мою ленту' : `Выбери ещё ${2 - selected.length}`}
          </button>
          <button
            onClick={handleFinish}
            className="w-full text-center text-sm text-muted-foreground py-3 hover:text-gray-600 transition-colors"
          >
            Пропустить, покажи всё подряд
          </button>
        </div>
      </div>
    );
  }

  return null;
}
