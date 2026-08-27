import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/useAuth'
import Icon from '../ui/Icon'
import ThemeToggle from '../ui/ThemeToggle'
import LanguageToggle from '../ui/LanguageToggle'

const navItems = [
  { to: '/', key: 'nav.home' },
  { to: '/rooms', key: 'nav.rooms' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
]

function Brand({ onClick }) {
  return (
    <Link className="brand" to="/" aria-label="Booking Nhanh home" onClick={onClick}>
      <span className="brand-mark"><span /><span /><span /><span /></span>
      <span className="brand-copy"><strong>booking</strong><small>NHANH</small></span>
    </Link>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const closeButtonRef = useRef(null)
  const profileRef = useRef(null)
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!menuOpen) return undefined

    const scrollPosition = window.scrollY
    const previousBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    }
    const previousHtmlOverflow = document.documentElement.style.overflow
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.documentElement.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', handleKeyDown)
      Object.assign(document.body.style, previousBodyStyles)
      document.documentElement.style.overflow = previousHtmlOverflow
      window.scrollTo({ top: scrollPosition, behavior: 'auto' })
    }
  }, [menuOpen])

  useEffect(() => {
    if (!profileOpen) return undefined
    const handleOutsideClick = (event) => {
      if (!profileRef.current?.contains(event.target)) setProfileOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setProfileOpen(false)
    }
    window.addEventListener('pointerdown', handleOutsideClick)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('pointerdown', handleOutsideClick)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [profileOpen])

  const closeMenu = () => setMenuOpen(false)
  const handleLogout = () => {
    closeMenu()
    logout()
    navigate('/')
  }

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">{t('nav.skipContent')}</a>
      <div className="announcement-bar">
        <div className="shell announcement-inner">
          <span><b>{t('announcement.highlight')}</b> {t('announcement.message')}</span>
          <div className="announcement-links">
            <a href="tel:+842873073999">+84 28 7307 3999</a>
            <span>{t('announcement.hours')}</span>
          </div>
        </div>
      </div>

      <div className={`navigation-wrap ${menuOpen ? 'menu-active' : ''}`}>
        <div className="shell navigation">
          <Brand />

          <nav className="navigation-links" aria-label={t('nav.mainNavigation')}>
            {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'}>{t(item.key)}</NavLink>)}
            {user?.role === 'admin' && <NavLink to="/admin">{t('nav.dashboard')}</NavLink>}
          </nav>

          <div className="navigation-actions">
            <ThemeToggle />
            <LanguageToggle />
            {user ? (
              <div className="profile-menu" ref={profileRef}>
                <button className="profile-trigger" type="button" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen} aria-haspopup="menu">
                  <span>{user.name.charAt(0).toUpperCase()}</span>
                  <span className="profile-name">{user.name.split(' ')[0]}</span>
                  <Icon name="chevronDown" size={14} />
                </button>
                {profileOpen && (
                  <div className="profile-dropdown" role="menu">
                    <div><strong>{user.name}</strong><small>{user.email}</small></div>
                    <Link role="menuitem" to={user.role === 'admin' ? '/admin' : '/account'}>{user.role === 'admin' ? t('nav.dashboard') : t('nav.myBookings')}</Link>
                    <button role="menuitem" type="button" onClick={handleLogout}>{t('nav.logout')}</button>
                  </div>
                )}
              </div>
            ) : <Link className="login-link" to="/login">{t('nav.login')}</Link>}
            <Link className="button button-primary compact" to="/booking">{t('nav.bookNow')}</Link>
          </div>

          <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={t('nav.toggleMenu')}>
            <Icon name="menu" size={25} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <button className="menu-backdrop" type="button" onClick={closeMenu} aria-label={t('nav.closeMenu')} />
          <aside id="mobile-navigation" className="mobile-drawer" role="dialog" aria-modal="true" aria-label={t('nav.mainNavigation')}>
            <div className="mobile-drawer-header">
              <Brand onClick={closeMenu} />
              <button ref={closeButtonRef} className="mobile-close-button" type="button" onClick={closeMenu} aria-label={t('nav.closeMenu')}><Icon name="close" size={22} /></button>
            </div>

            {user && <div className="mobile-profile"><span>{user.name.charAt(0).toUpperCase()}</span><div><strong>{user.name}</strong><small>{user.email}</small></div></div>}

            <nav aria-label={t('nav.mainNavigation')}>
              {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={closeMenu}>{t(item.key)} <Icon name="arrow" size={17} /></NavLink>)}
              {user && <NavLink to={user.role === 'admin' ? '/admin' : '/account'} onClick={closeMenu}>{user.role === 'admin' ? t('nav.dashboard') : t('nav.myBookings')} <Icon name="arrow" size={17} /></NavLink>}
            </nav>

            <div className="mobile-settings">
              <span>{t('nav.preferences')}</span>
              <div><ThemeToggle showLabel /><LanguageToggle showLabel /></div>
            </div>

            <div className="mobile-drawer-actions">
              <Link className="button button-primary" to="/booking" onClick={closeMenu}>{t('nav.bookNow')}</Link>
              {user ? <button className="button button-secondary" type="button" onClick={handleLogout}>{t('nav.logout')}</button> : <Link className="button button-secondary" to="/login" onClick={closeMenu}>{t('nav.login')}</Link>}
            </div>
          </aside>
        </>
      )}
    </header>
  )
}
