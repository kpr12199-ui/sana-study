import React, { useState } from 'react';
import { Lock, LogIn, AlertCircle, ShieldCheck, Mail, ArrowLeft } from 'lucide-react';

interface AdminAuthModalProps {
  expectedEmail: string;
  onAuthenticated: (email: string) => void;
  onBackToHome: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  expectedEmail,
  onAuthenticated,
  onBackToHome,
}) => {
  const [emailInput, setEmailInput] = useState(expectedEmail);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSimulatingGoogleLogin, setIsSimulatingGoogleLogin] = useState(false);

  const handleGoogleSignIn = (targetEmail: string) => {
    setIsSimulatingGoogleLogin(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsSimulatingGoogleLogin(false);
      const cleanEmail = targetEmail.trim().toLowerCase();
      const cleanExpected = expectedEmail.trim().toLowerCase();

      if (cleanEmail === cleanExpected) {
        onAuthenticated(cleanEmail);
      } else {
        setErrorMessage('此帳號沒有網站管理權限。僅允許管理員 Google 帳號存取。');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800">
            管理後台身分驗證
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            請登入指定之管理員帳號以管理學習歷程內容
          </p>
        </div>

        {/* Notice of admin email */}
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-sky-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>授權管理員 Google 帳號</span>
          </div>
          <p className="font-mono text-sky-700">{expectedEmail}</p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Direct Google Sign-In Button */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleGoogleSignIn(expectedEmail)}
            disabled={isSimulatingGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-xs transition-colors cursor-pointer disabled:opacity-60"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>使用 Google 帳號登入 ({expectedEmail})</span>
          </button>

          {/* Test other accounts dropdown/input to verify permission check */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-2xs text-slate-400 mb-2">或測試其他 Google 帳號驗證權限：</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="輸入測試 Email"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>
              <button
                type="button"
                onClick={() => handleGoogleSignIn(emailInput)}
                className="px-3.5 py-2 text-xs font-semibold text-sky-800 bg-sky-100 hover:bg-sky-200 rounded-xl transition-colors shrink-0"
              >
                驗證登入
              </button>
            </div>
          </div>
        </div>

        {/* Back to Home link */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            返回公開首頁
          </button>
        </div>
      </div>
    </div>
  );
};
