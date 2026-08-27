import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/useAuth'
import Icon from '../components/ui/Icon'
import ThemeToggle from '../components/ui/ThemeToggle'
import LanguageToggle from '../components/ui/LanguageToggle'

export default function Register() {
  const { t } = useTranslation()
  const { user, register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  if (user) return <Navigate to="/account" replace />
  const submit = (event) => { event.preventDefault(); setError(''); if (form.password.length < 8) return setError(t('auth.passwordLength')); if (form.password !== form.confirmPassword) return setError(t('auth.passwordMismatch')); try { register({ name: form.name, email: form.email, phone: form.phone, password: form.password }); navigate('/account') } catch { setError(t('auth.emailExists')) } }
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  return <main className="auth-page"><div className="auth-quick-actions"><LanguageToggle /><ThemeToggle /></div><section className="auth-visual register-visual"><div><span className="eyebrow light">{t('auth.joinEyebrow')}</span><h1>{t('auth.joinTitle')}</h1><p>{t('auth.joinText')}</p></div></section><section className="auth-panel"><div className="auth-card"><Link className="back-link" to="/"><Icon name="chevron" size={16} /> {t('auth.backHome')}</Link><span className="eyebrow">{t('auth.newMember')}</span><h2>{t('auth.registerTitle')}</h2><p>{t('auth.registerSubtitle')}</p><form onSubmit={submit}><label>{t('form.fullName')}<input required value={form.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" /></label><div className="form-grid"><label>{t('form.email')}<input type="email" required value={form.email} onChange={(event) => update('email', event.target.value)} /></label><label>{t('form.phone')}<input required inputMode="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} /></label></div><div className="form-grid"><label>{t('form.password')}<input type="password" required value={form.password} onChange={(event) => update('password', event.target.value)} /></label><label>{t('form.confirmPassword')}<input type="password" required value={form.confirmPassword} onChange={(event) => update('confirmPassword', event.target.value)} /></label></div>{error && <div className="error-banner" role="alert">{error}</div>}<button className="button button-primary full" type="submit">{t('auth.createAccount')} <Icon name="arrow" size={17} /></button></form><p className="auth-switch">{t('auth.haveAccount')} <Link to="/login">{t('auth.signIn')}</Link></p></div></section></main>
}
