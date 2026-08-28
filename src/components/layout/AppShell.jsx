import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { appConfig, storageKeys } from '../../config/appConfig'
import { authService } from '../../services/authService'
import { useTheme } from '../../providers/ThemeProvider'
import { Icon } from '../ui/Icon'

const navItems = [
  { to: '/', label: 'common.home', end: true },
  { to: '/explore', label: 'common.explore' },
  { to: '/about', label: 'common.about' },
  { to: '/bookings', label: 'common.myBookings' },
]

export function AppShell() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(() => authService.getCurrentUser())
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => setIsMenuOpen(false), [location.pathname])
  useEffect(() => {
    const refreshUser = () => setUser(authService.getCurrentUser())
    window.addEventListener('karago:auth-changed', refreshUser)
    return () => window.removeEventListener('karago:auth-changed', refreshUser)
  }, [])

  const changeLanguage = (language) => {
    if (!appConfig.supportedLanguages.includes(language)) return
    i18n.changeLanguage(language)
    localStorage.setItem(storageKeys.language, language)
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
    } finally {
      navigate('/')
    }
  }

  return <div className="app-shell">
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand"><span className="brand-mark"><Icon name="microphone" size={18}/></span><span>{t('common.appName')}</span></Link>
        <nav className={`primary-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label={t('navigation.menu')}>
          <div className="mobile-nav-head"><span className="brand">{t('common.appName')}</span><button className="icon-button" onClick={() => setIsMenuOpen(false)} aria-label={t('navigation.closeMenu')}><Icon name="close"/></button></div>
          {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.end}>{t(item.label)}</NavLink>)}
          <div className="mobile-settings"><div className="language-control" aria-label={t('navigation.language')}><button className={i18n.language === 'vi' ? 'active' : ''} onClick={() => changeLanguage('vi')}>VI</button><span>/</span><button className={i18n.language === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>EN</button></div><button className="button button-secondary" onClick={toggleTheme}><Icon name={theme === 'dark' ? 'sun' : 'moon'}/>{t('navigation.theme')}</button></div>
          <div className="mobile-nav-actions">
            {user ? <button className="button button-secondary" onClick={handleLogout}>{t('common.logout')}</button> : <><Link className="button button-secondary" to="/login">{t('common.login')}</Link><Link className="button button-primary" to="/register">{t('common.register')}</Link></>}
          </div>
        </nav>
        <div className="header-actions">
          <div className="language-control" aria-label={t('navigation.language')}><button className={i18n.language === 'vi' ? 'active' : ''} onClick={() => changeLanguage('vi')}>VI</button><span>/</span><button className={i18n.language === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>EN</button></div>
          <button className="icon-button" onClick={toggleTheme} aria-label={theme === 'dark' ? t('navigation.switchToLight') : t('navigation.switchToDark')}><Icon name={theme === 'dark' ? 'sun' : 'moon'}/></button>
          {user ? <button className="avatar-button" onClick={handleLogout} title={t('common.logout')}>{user.name?.charAt(0).toUpperCase()}</button> : <Link className="header-login" to="/login">{t('common.login')}</Link>}
          <Link className="button button-primary header-book" to="/explore">{t('common.bookNow')}</Link>
          <button className="icon-button menu-button" onClick={() => setIsMenuOpen(true)} aria-label={t('navigation.menu')}><Icon name="menu"/></button>
        </div>
      </div>
      {isMenuOpen && <button className="nav-backdrop" onClick={() => setIsMenuOpen(false)} aria-label={t('navigation.closeMenu')}/>} 
    </header>
    <main><Outlet/></main>
    <footer className="site-footer"><div className="container footer-grid"><div><Link to="/" className="brand"><span className="brand-mark"><Icon name="microphone" size={18}/></span>{t('common.appName')}</Link><p className="footer-tagline">{t('footer.tagline')}</p></div><div><h3>{t('footer.discover')}</h3><Link to="/explore">{t('common.explore')}</Link><Link to="/about">{t('common.about')}</Link></div><div><h3>{t('footer.account')}</h3><Link to="/bookings">{t('common.myBookings')}</Link><Link to="/login">{t('common.login')}</Link></div><div><h3>{t('footer.support')}</h3><a href="mailto:hello@karago.vn">hello@karago.vn</a><button>{t('footer.help')}</button></div></div><div className="container footer-bottom"><span>{t('footer.copyright')}</span><div><button>{t('footer.terms')}</button><button>{t('footer.privacy')}</button></div></div></footer>
  </div>
}
