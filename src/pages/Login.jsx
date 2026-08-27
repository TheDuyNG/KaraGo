import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/useAuth'
import Icon from '../components/ui/Icon'
import ThemeToggle from '../components/ui/ThemeToggle'
import LanguageToggle from '../components/ui/LanguageToggle'

export default function Login() {
  const { t } = useTranslation()
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/account'} replace />
  const submit = (event) => { event.preventDefault(); setError(''); try { const loggedIn = login(form.email, form.password); navigate(location.state?.from?.pathname || (loggedIn.role === 'admin' ? '/admin' : '/account')) } catch { setError(t('auth.invalidCredentials')) } }
  return <main className="auth-page"><div className="auth-quick-actions"><LanguageToggle /><ThemeToggle /></div><section className="auth-visual"><div><span className="eyebrow light">{t('auth.welcomeEyebrow')}</span><h1>{t('auth.welcomeTitle')}</h1><p>{t('auth.welcomeText')}</p></div></section><section className="auth-panel"><div className="auth-card"><Link className="back-link" to="/"><Icon name="chevron" size={16} /> {t('auth.backHome')}</Link><span className="eyebrow">{t('auth.memberAccess')}</span><h2>{t('auth.loginTitle')}</h2><p>{t('auth.loginSubtitle')}</p><form onSubmit={submit}><label>{t('form.email')}<input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" /></label><label>{t('form.password')}<input type="password" required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="current-password" /></label>{error && <div className="error-banner" role="alert">{error}</div>}<button className="button button-primary full" type="submit">{t('auth.signIn')} <Icon name="arrow" size={17} /></button></form><div className="demo-credentials"><strong>{t('auth.adminDemo')}</strong><span>admin@bookingnhanh.vn</span><span>Admin@123</span></div><p className="auth-switch">{t('auth.noAccount')} <Link to="/register">{t('auth.createAccount')}</Link></p></div></section></main>
}
