
function TopBar({ activePage, files = [], selectedFile = '', onFileChange }: {
  activePage: string
  files?: {id:string, name:string}[]
  selectedFile?: string
  onFileChange?: (id: string) => void
}) {
  return (
    <div style={{background:'white', borderBottom:'0.5px solid #eee', padding:'0 16px', display:'flex', alignItems:'center', height:48, position:'sticky', top:0, zIndex:10, gap:0}}>
      <span style={{fontWeight:600, fontSize:14, color:'#111', marginRight:24, whiteSpace:'nowrap'}}>RJ-Mob</span>
      {[
        {label:'Tuottoseuranta', href:'/tuotto'},
        {label:'Trendit', href:'/trendit'},
        {label:'Myyntiseuranta', href:'/etela'},
        {label:'Run Rate', href:'/runrate'},
      ].map(item => (
        <a key={item.href} href={item.href}
          style={{
            fontSize:13, fontWeight: activePage === item.href ? 500 : 400,
            color: activePage === item.href ? '#185FA5' : '#555',
            textDecoration:'none', padding:'0 14px', height:48,
            display:'flex', alignItems:'center',
            borderBottom: activePage === item.href ? '2px solid #185FA5' : '2px solid transparent',
            whiteSpace:'nowrap'
          }}>
          {item.label}
        </a>
      ))}
      {files.length > 0 && onFileChange && (
        <select value={selectedFile} onChange={e => onFileChange(e.target.value)}
          style={{marginLeft:8, fontSize:12, border:'0.5px solid #ddd', borderRadius:8, padding:'4px 10px', background:'white', cursor:'pointer', color:'#333'}}>
          {files.map(f => (
            <option key={f.id} value={f.id}>
              {f.name.replace('Myyntiseuranta ','').replace(' 2026','')}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default function RunRatePage() {
  return (
    <div style={{minHeight:'100vh', background:'#f8f8f6'}}>
      <TopBar activePage="/runrate" />
      <div style={{maxWidth:900, margin:'0 auto', padding:'40px 16px', textAlign:'center', color:'#888', fontSize:14}}>
        Run Rate -näkymä tulossa — odottaa Excel-päivitystä työpäivädatalla.
      </div>
    </div>
  )
}
