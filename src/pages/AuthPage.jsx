import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authService } from '../services/authService'
import { Icon } from '../components/ui/Icon'
import heroImage from '../assets/images/karaoke-suite.png'

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  const submit = async (event) => {
    event.preventDefault(); setError('')
    if (isRegister && form.password !== form.confirmPassword) { setError(t('auth.passwordMismatch')); return }
    setIsSubmitting(true)
    try { await (isRegister ? authService.register(form) : authService.login(form)); navigate(location.state?.from?.pathname ?? '/bookings') }
    catch { setError(t('auth.genericError')); setIsSubmitting(false) }
  }
  return <section className="auth-page"><div className="auth-visual"><img src={heroImage} alt=""/><div><p className="eyebrow light"><span/>{t('home.eyebrow')}</p><h2>{t('home.promiseTitle')}</h2></div></div><div className="auth-panel"><div className="auth-form-wrap"><Link className="brand auth-brand" to="/"><span className="brand-mark"><Icon name="microphone" size={18}/></span>{t('common.appName')}</Link><p className="eyebrow"><span/>{isRegister ? t('common.register') : t('common.login')}</p><h1>{isRegister ? t('auth.createTitle') : t('auth.welcomeBack')}</h1><p>{isRegister ? t('auth.registerSubtitle') : t('auth.loginSubtitle')}</p>{error && <div className="alert" role="alert">{error}</div>}<form onSubmit={submit}>{isRegister && <div className="field"><label htmlFor="auth-name">{t('auth.name')}</label><input id="auth-name" required value={form.name} onChange={(event) => update('name', event.target.value)}/></div>}<div className="field"><label htmlFor="auth-email">{t('auth.email')}</label><input id="auth-email" type="email" required value={form.email} onChange={(event) => update('email', event.target.value)}/></div><div className="field"><label htmlFor="auth-password">{t('auth.password')}</label><input id="auth-password" type="password" required minLength="6" value={form.password} onChange={(event) => update('password', event.target.value)}/>{isRegister && <small>{t('auth.passwordHint')}</small>}</div>{isRegister && <div className="field"><label htmlFor="auth-confirm">{t('auth.confirmPassword')}</label><input id="auth-confirm" type="password" required value={form.confirmPassword} onChange={(event) => update('confirmPassword', event.target.value)}/></div>}<button className="button button-primary button-large button-full" disabled={isSubmitting}>{isRegister ? t('auth.registerAction') : t('auth.loginAction')}<Icon name="arrowRight"/></button></form><p className="auth-switch">{isRegister ? t('auth.hasAccount') : t('auth.noAccount')} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? t('common.login') : t('common.register')}</Link></p></div></div></section>
}
