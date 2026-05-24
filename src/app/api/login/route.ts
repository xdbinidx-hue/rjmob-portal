import { NextRequest, NextResponse } from 'next/server'

const USERS: Record<string, string> = {
  'albin': '1023',
  'arbnor': '1023',
}

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (USERS[username] && USERS[username] === password) {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('rjmob_auth', username, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
    return res
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
