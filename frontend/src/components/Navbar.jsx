import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Menu, X, User, Users, LogOut, PlusCircle, LayoutDashboard, ChevronDown, Building2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, isAuthenticated, isCandidate, isRecruiter, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenu, setUserMenu] = useState(false)

  const handleLogout = async () => {
    await logout()
    setMobileOpen(false); setUserMenu(false)
    toast.success('Signed out')
    navigate('/')
  }

  const isActive = (p) => pathname === p

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/50 shadow-sm" role="banner">
      <div className="page-container">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Bytes Jobs home">
            <svg width="32" height="32" viewBox="0 0 32 32" className="flex-shrink-0 transition-transform group-hover:rotate-[-4deg]" aria-hidden="true">
              <rect x="1" y="1" width="30" height="30" rx="9" fill="var(--primary)" />
              <path d="M9 22V10h6.2c2.6 0 4.3 1.5 4.3 3.7 0 1.5-.8 2.6-2.1 3.1 1.6.4 2.6 1.7 2.6 3.4 0 2.4-1.8 3.8-4.6 3.8H9zm3-7h2.6c1 0 1.6-.5 1.6-1.4s-.6-1.4-1.6-1.4H12v2.8zm0 4.6h2.9c1.1 0 1.8-.6 1.8-1.5s-.7-1.5-1.8-1.5H12v3z" fill="#fff"/>
            </svg>
            <span className="font-bold text-lg tracking-tight" style={{color:'var(--text-1)'}}>
              Bytes<span style={{color:'var(--primary)', fontWeight:400}}> Jobs</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {[
              {to:'/jobs', label:'Browse Jobs'},
              ...(isCandidate ? [{to:'/dashboard', label:'Dashboard'}] : []),
              ...(isRecruiter ? [{to:'/recruiter/dashboard', label:'Dashboard'}, {to:'/recruiter/talent', label:'Find Talent'}, {to:'/recruiter/team', label:'Team'}] : []),
            ].map(({to, label}) => (
              <Link key={to} to={to} aria-current={isActive(to) ? 'page' : undefined}
                className={`nav-link px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(to) ? 'text-primary-600 font-semibold' : 'text-gray-600 hover:bg-surface-3 hover:text-primary-600'
                }`}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2.5 pl-3 pr-3 py-2 rounded-xl border border-transparent hover:border-primary-200 hover:bg-surface-3 transition-all"
                  aria-expanded={userMenu} aria-haspopup="true" aria-label="User menu">
                  <div className="w-7 h-7 rounded-lg bg-hero-gradient flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {user?.full_name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold max-w-[100px] truncate" style={{color:'var(--text-1)'}}>
                    {user?.full_name?.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform text-gray-400 ${userMenu ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-card-lg border border-primary-100 py-1.5 z-50 animate-scale-in" role="menu">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-xs font-semibold" style={{color:'var(--text-1)'}}>{user?.full_name}</p>
                      <p className="text-xs" style={{color:'var(--text-3)'}}>{user?.email}</p>
                    </div>
                    {[
                      {to:'/profile', icon:User, label:'My Profile'},
                      ...(isRecruiter ? [{to:'/recruiter/post-job', icon:PlusCircle, label:'Post a Job'}] : []),
                    ].map(({to, icon:Icon, label}) => (
                      <Link key={to} to={to} onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium hover:bg-surface-3 hover:text-primary-600 transition-colors"
                        style={{color:'var(--text-2)'}} role="menuitem">
                        <Icon className="w-4 h-4" aria-hidden="true" /> {label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-50 mt-1 pt-1">
                      <button onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors" role="menuitem">
                        <LogOut className="w-4 h-4" aria-hidden="true" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm font-semibold">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm">Get Started <span aria-hidden="true">→</span></Link>
              </>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden btn-ghost p-2"
            aria-expanded={mobileOpen} aria-controls="mobile-menu" aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-white/50 bg-white/95 backdrop-blur animate-fade-up" role="navigation" aria-label="Mobile navigation">
          <div className="page-container py-4 flex flex-col gap-1">
            <Link to="/jobs" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-surface-3 transition-colors" style={{color:'var(--text-2)'}}>
              Browse Jobs
            </Link>
            {isAuthenticated ? (
              <>
                {isCandidate && <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-surface-3 transition-colors" style={{color:'var(--text-2)'}}>
                  <LayoutDashboard className="w-4 h-4 text-primary-500" aria-hidden="true" /> Dashboard
                </Link>}
                {isRecruiter && <>
                  <Link to="/recruiter/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-surface-3 transition-colors" style={{color:'var(--text-2)'}}>
                    <LayoutDashboard className="w-4 h-4 text-primary-500" aria-hidden="true" /> Dashboard
                  </Link>
                  <Link to="/recruiter/talent" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-surface-3 transition-colors" style={{color:'var(--text-2)'}}>
                    <Users className="w-4 h-4 text-primary-500" aria-hidden="true" /> Find Talent
                  </Link>
                  <Link to="/recruiter/team" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-surface-3 transition-colors" style={{color:'var(--text-2)'}}>
                    <Building2 className="w-4 h-4 text-primary-500" aria-hidden="true" /> Team Settings
                  </Link>
                  <Link to="/recruiter/post-job" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-surface-3 transition-colors" style={{color:'var(--text-2)'}}>
                    <PlusCircle className="w-4 h-4 text-primary-500" aria-hidden="true" /> Post a Job
                  </Link>
                </>}
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-surface-3 transition-colors" style={{color:'var(--text-2)'}}>
                  <User className="w-4 h-4 text-primary-500" aria-hidden="true" /> My Profile
                </Link>
                <hr className="my-2 border-gray-100" />
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" aria-hidden="true" /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary w-full justify-center">Sign In</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}
      {userMenu && <div className="fixed inset-0 z-30" onClick={() => setUserMenu(false)} aria-hidden="true" />}
    </header>
  )
}
