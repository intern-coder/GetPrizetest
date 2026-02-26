
import React, { useState, useCallback, useEffect } from 'react';
import { Step, UserState } from './types';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import WheelGame from './components/WheelGame';
import FeedbackForm from './components/FeedbackForm';
import ShippingForm from './components/ShippingForm';
import SuccessPage from './components/SuccessPage';
import OrdersPage from './components/OrdersPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import { getCurrentUserPhone, recordWin, submitFeedback, saveShippingInfo, fetchUserProfile } from './api';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<Step>(Step.LANDING);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [userState, setUserState] = useState<UserState>({
    hasSpun: false,
    rating: 0,
    feedback: '',
  });

  const loadUserProfile = useCallback(async () => {
    try {
      const profile = await fetchUserProfile();
      if (profile) {
        setUserState(prev => ({
          ...prev,
          hasSpun: profile.hasSpun,
          prize: profile.prize || undefined,
          shippingInfo: profile.shippingInfo || undefined,
        }));
      }
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }, []);

  useEffect(() => {
    const initApp = async () => {
      await loadUserProfile();
      setLoading(false);
    };
    initApp();
  }, [loadUserProfile]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      switch (prev) {
        case Step.LANDING:
          if (!getCurrentUserPhone()) return Step.LOGIN;
          return Step.GAME;
        case Step.LOGIN: return Step.GAME;
        case Step.GAME: return Step.FEEDBACK;
        case Step.FEEDBACK: return Step.SHIPPING;
        case Step.SHIPPING: return Step.SUCCESS;
        default: return prev;
      }
    });
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((prev) => {
      switch (prev) {
        case Step.LOGIN: return Step.LANDING;
        case Step.GAME: return Step.LANDING;
        case Step.FEEDBACK: return Step.GAME;
        case Step.SHIPPING: return Step.FEEDBACK;
        case Step.ORDERS: return Step.GAME;
        case Step.PROFILE: return Step.GAME;
        case Step.SETTINGS: return Step.PROFILE;
        default: return prev;
      }
    });
  }, []);

  const navigateTo = useCallback((step: Step) => {
    setCurrentStep(step);
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case Step.LANDING:
        return <LandingPage onStart={nextStep} language={language} />;
      case Step.LOGIN:
        return (
          <LoginPage
            onSuccess={async () => {
              await loadUserProfile();
              nextStep();
            }}
            onBack={goBack}
            language={language}
          />
        );
      case Step.GAME:
        return (
          <WheelGame
            onWin={async (prize) => {
              try {
                await recordWin(prize);
                setUserState(prev => ({ ...prev, hasSpun: true, prize }));
              } catch (e) {
                console.error('Failed to save win:', e);
                setUserState(prev => ({ ...prev, hasSpun: true, prize }));
              }
            }}
            onNext={nextStep}
            onNavigate={navigateTo}
            currentStep={currentStep}
            language={language}
          />
        );
      case Step.FEEDBACK:
        return (
          <FeedbackForm
            onBack={goBack}
            onSubmit={async (rating, feedback) => {
              try {
                await submitFeedback(rating, feedback);
                setUserState(prev => ({ ...prev, rating, feedback }));
                nextStep();
              } catch (e) {
                console.error('Failed to submit feedback:', e);
                setUserState(prev => ({ ...prev, rating, feedback }));
                nextStep();
              }
            }}
            language={language}
          />
        );
      case Step.SHIPPING:
        return (
          <ShippingForm
            onBack={goBack}
            onSubmit={async (info) => {
              try {
                await saveShippingInfo(info);
                setUserState(prev => ({ ...prev, shippingInfo: info }));
                nextStep();
              } catch (e) {
                console.error('Failed to save shipping info:', e);
                setUserState(prev => ({ ...prev, shippingInfo: info }));
                nextStep();
              }
            }}
            language={language}
          />
        );
      case Step.SUCCESS:
        return <SuccessPage
          onReset={() => setCurrentStep(Step.LANDING)}
          onViewOrders={() => setCurrentStep(Step.ORDERS)}
          language={language}
        />;
      case Step.ORDERS:
        return (
          <OrdersPage
            userState={userState}
            onBack={goBack}
            onNavigate={navigateTo}
            language={language}
          />
        );
      case Step.PROFILE:
        return (
          <ProfilePage
            userState={userState}
            onBack={goBack}
            onNavigate={navigateTo}
            language={language}
          />
        );
      case Step.SETTINGS:
        return (
          <SettingsPage
            language={language}
            setLanguage={setLanguage}
            onBack={goBack}
          />
        );
      default:
        return <LandingPage onStart={nextStep} language={language} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-light">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-bg-light dark:bg-bg-dark overflow-hidden relative shadow-2xl">
      {renderStep()}
    </div>
  );
};

export default App;
