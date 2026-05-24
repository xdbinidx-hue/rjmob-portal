'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass }),
    })
    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError('Väärä käyttäjätunnus tai salasana')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f8f6' }}>
      <div style={{ background: 'white', borderRadius: 16, padding: '2rem', width: 320, border: '0.5px solid #e5e5e5' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 15, fontWeight: 500 }}>RJ-Mob <span style={{ color: '#185FA5' }}>Command Center</span></div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Kirjaudu sisään</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Käyttäjätunnus"
            value={user}
            onChange={e => setUser(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '0.5px solid #ddd', fontSize: 14, outline: 'none' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="Salasana"
            value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '0.5px solid #ddd', fontSize: 14, outline: 'none' }}
          />
        </div>
        {error && <div style={{ color: '#A32D2D', fontSize: 12, marginBottom: 12 }}>{error}</div>}
        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#185FA5', color: 'white', border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
        >
          Kirjaudu
        </button>
      </div>
    </div>
  )
}
