'use client'

export default function Home() {
  const nav = [
    {label:'Tuottoseuranta', href:'/tuotto', desc:'Myyjät, ROI, netto'},
    {label:'Trendit', href:'/trendit', desc:'Kuukausikehitys'},
    {label:'Myyntiseuranta', href:'/etela', desc:'Etelän Härät'},
    {label:'Run Rate', href:'/runrate', desc:'Tulossa'},
  ]

  return (
    <div style={{minHeight:'100vh', fontFamily:'system-ui,sans-serif', background:'#0a0a0a'}}>
      <div style={{position:'relative', height:'100vh', overflow:'hidden'}}>
        <img src="/hero.jpg" alt="RJ-Mob"
          style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', opacity:0.5}} />
        <div style={{position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)'}} />
        <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 24px'}}>
          <div style={{fontSize:11, letterSpacing:'4px', color:'rgba(255,255,255,0.5)', textTransform:'uppercase', marginBottom:16}}>Command Center</div>
          <div style={{fontSize:64, fontWeight:700, color:'white', letterSpacing:'-2px', lineHeight:1, marginBottom:16}}>RJ-Mob</div>
          <div style={{fontSize:15, color:'rgba(255,255,255,0.55)', maxWidth:420, lineHeight:1.7, marginBottom:48}}>
            Reaaliaikainen johtamisjärjestelmä — myynti, kannattavuus ja kassavirta yhdessä näkymässä.
          </div>
          <div style={{display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center'}}>
            {nav.map(item => (
              <a key={item.href} href={item.href}
                style={{padding:'14px 24px', background:'rgba(255,255,255,0.08)', border:'0.5px solid rgba(255,255,255,0.15)', borderRadius:12, textDecoration:'none'}}>
                <div style={{fontSize:13, fontWeight:500, color:'white', marginBottom:3}}>{item.label}</div>
                <div style={{fontSize:11, color:'rgba(255,255,255,0.45)'}}>{item.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
