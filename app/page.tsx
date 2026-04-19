"use client"

import { useState } from "react"
import { Music, User, Calendar, Share2, Upload, CheckCircle2 } from "lucide-react"
import JSZip from "jszip"

export default function StormFormPage() {
  const [formData, setFormData] = useState({
    songNameHeb: "", artistName: "", genre: "", instagram: "", 
    writer: "", composer: "", arranger: "",
    masterOwner: "deVee Boutique Label", lyrics: "",
    releaseDate: "", spotifyPage: "", appleMusicPage: "", tiktokTiming: ""
  })
  const [artworkFile, setArtworkFile] = useState<File | null>(null)
  const [artistPhotoFile, setArtistPhotoFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle')

  const handlePackAndShare = async () => {
    if (!artworkFile || !artistPhotoFile) {
      return alert("אח שלי, חובה להעלות גם עטיפה וגם תמונת אמן!")
    }
    setStatus('processing')

    try {
      const zip = new JSZip()
      const folderName = `${formData.songNameHeb || 'New_Song'} - deVee Distro`
      
      const pilInfo = `שלום מחלקת ניו מדיה ותמלוגים (PIL),\n\nמצורפים חומרים להפצת סינגל חדש תחת deVee Boutique Label:\n\n--- פרטי השיר ---\nשם השיר: ${formData.songNameHeb}\nשם האמן (עברית + אנגלית): ${formData.artistName}\nז'אנר: ${formData.genre}\nקישור לאינסטגרם: ${formData.instagram}\nעמוד אמן ספוטיפיי: ${formData.spotifyPage || 'לא צוין'}\nאמן אפל מיוזיק: ${formData.appleMusicPage || 'לא צוין'}\n\n--- קרדיטים ---\nמילים: ${formData.writer}\nלחן: ${formData.composer}\nעיבוד והפקה: ${formData.arranger}\nבעלים של המאסטר: ${formData.masterOwner}\n\n--- תזמון ---\nתאריך הוצאה מבוקש: ${formData.releaseDate}\nתזמון סאונד טיקטוק: ${formData.tiktokTiming || 'לא צוין'}\n\n--- מילים ---\n${formData.lyrics}\n\nבברכה,\nדיויד בן דויד - deVee Studio`;
      
      zip.file("PIL_INFO.txt", pilInfo)
      zip.file(`Artwork_${artworkFile.name}`, artworkFile)
      zip.file(`ArtistPhoto_${artistPhotoFile.name}`, artistPhotoFile)

      const content = await zip.generateAsync({ type: "blob" })
      const file = new File([content], `${folderName}.zip`, { type: "application/zip" })

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: folderName,
            text: `אח שלי, מצורפת חבילת הפצה לשיר: ${formData.songNameHeb}`,
          })
          setStatus('done')
          setTimeout(() => setStatus('idle'), 3000)
        } catch (error: any) {
          if (error.name === 'AbortError') {
            setStatus('idle')
          } else {
            triggerDownload(content, folderName)
          }
        }
      } else {
        triggerDownload(content, folderName)
      }
    } catch (error) {
      console.error(error)
      setStatus('idle')
    }
  }

  const triggerDownload = (blob: Blob, name: string) => {
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${name}.zip`
    link.click()
    alert("התיקייה ירדה להורדות - פשוט שלח אותה לדיויד בוואטסאפ!")
    setStatus('done')
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 font-sans select-none pb-20" dir="rtl">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full h-[400px] bg-[#0077FF]/10 blur-[120px]" />
      </div>

      <div className="max-w-[500px] mx-auto space-y-8 relative z-10">
        
        <header className="text-center space-y-2 pt-6 pb-2">
          <div className="w-20 h-20 mx-auto mb-3 transition-transform hover:scale-105">
            <img src="/logo.png" className="w-full h-full object-contain" alt="Storm Form Logo" />
          </div>
          <h1 className="text-[10px] font-black uppercase tracking-[0.8em] text-white drop-shadow-[0_0_15px_rgba(0,119,255,0.8)] opacity-90">
            STORM FORM
          </h1>
        </header>

        <div className="bg-[#121212] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-md space-y-8 text-right">
          
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#0077FF] flex items-center gap-2 px-1">
              <Music className="w-3.5 h-3.5" /> פרטי השיר והאמן
            </label>
            <div className="grid grid-cols-1 gap-3">
              <input placeholder="שם השיר (עברית)" onChange={e => setFormData({...formData, songNameHeb: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#0077FF] outline-none transition-all placeholder:text-white/20 text-right" />
              <input placeholder="שם האמן (עברית ואנגלית)" onChange={e => setFormData({...formData, artistName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#0077FF] outline-none transition-all placeholder:text-white/20 text-right" />
              <input placeholder="קישור לאינסטגרם" onChange={e => setFormData({...formData, instagram: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#0077FF] outline-none transition-all placeholder:text-white/20 text-right" />
              <input placeholder="ז'אנר" onChange={e => setFormData({...formData, genre: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#0077FF] outline-none transition-all placeholder:text-white/20 text-right" />
              <input placeholder="עמוד אמן ספוטיפיי (במידה ויש)" onChange={e => setFormData({...formData, spotifyPage: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#0077FF] outline-none transition-all placeholder:text-white/20 text-right" />
              <input placeholder="אמן אפל מיוזיק (במידה ויש)" onChange={e => setFormData({...formData, appleMusicPage: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#0077FF] outline-none transition-all placeholder:text-white/20 text-right" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#0077FF] flex items-center gap-2 px-1">
              <User className="w-3.5 h-3.5" /> קרדיטים ומילים
            </label>
            <div className="grid grid-cols-1 gap-3">
              <input placeholder="כותב מילים" onChange={e => setFormData({...formData, writer: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#0077FF] outline-none transition-all placeholder:text-white/20 text-right" />
              <input placeholder="מלחין" onChange={e => setFormData({...formData, composer: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#0077FF] outline-none transition-all placeholder:text-white/20 text-right" />
              <input placeholder="מעבד ומפיק מוזיקלי" onChange={e => setFormData({...formData, arranger: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#0077FF] outline-none transition-all placeholder:text-white/20 text-right" />
            </div>
            <textarea placeholder="הדבק כאן את מילות השיר..." onChange={e => setFormData({...formData, lyrics: e.target.value})} className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-[#0077FF] transition-all resize-none placeholder:text-white/20 text-right" />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#0077FF] flex items-center gap-2 px-1">
              <Upload className="w-3.5 h-3.5" /> קבצים ותזמון
            </label>
            <div className="space-y-4">
              <div className="relative group">
                <input type="file" accept="image/*" onChange={(e) => setArtworkFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                <div className={`w-full p-4 border-2 border-dashed rounded-xl flex items-center justify-between transition-all ${artworkFile ? 'border-[#0077FF] bg-[#0077FF]/5' : 'border-white/10 group-hover:border-white/20'}`}>
                  <span className="text-sm text-white/40 truncate max-w-[200px]">
                    {artworkFile ? artworkFile.name : 'בחר קובץ עטיפה (3000px)'}
                  </span>
                  <Upload className={`w-4 h-4 ${artworkFile ? 'text-[#0077FF]' : 'text-white/20'}`} />
                </div>
              </div>

              <div className="relative group">
                <input type="file" accept="image/*" onChange={(e) => setArtistPhotoFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                <div className={`w-full p-4 border-2 border-dashed rounded-xl flex items-center justify-between transition-all ${artistPhotoFile ? 'border-[#0077FF] bg-[#0077FF]/5' : 'border-white/10 group-hover:border-white/20'}`}>
                  <span className="text-sm text-white/40 truncate max-w-[200px]">
                    {artistPhotoFile ? artistPhotoFile.name : 'בחר תמונת אמן עדכנית'}
                  </span>
                  <User className={`w-4 h-4 ${artistPhotoFile ? 'text-[#0077FF]' : 'text-white/20'}`} />
                </div>
              </div>
              
              <div className="relative">
                <input 
                  type="date" 
                  onChange={e => setFormData({...formData, releaseDate: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-[#0077FF] text-right appearance-none" 
                  style={{ minHeight: '52px' }}
                />
                {!formData.releaseDate && (
                  <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none text-white/20 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>תאריך הפצה מבוקש</span>
                  </div>
                )}
              </div>

              <input placeholder="תזמון סאונד טיקטוק (לדוג׳ 1:01-2:20)" onChange={e => setFormData({...formData, tiktokTiming: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#0077FF] outline-none transition-all placeholder:text-white/20 text-right" />
            </div>
          </div>

          <button 
            onClick={handlePackAndShare}
            disabled={!formData.songNameHeb || !artworkFile || !artistPhotoFile || status === 'processing'}
            className={`w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-2xl ${status === 'done' ? 'bg-green-600' : 'bg-[#0077FF] text-white hover:scale-[1.01] active:scale-95 disabled:opacity-20'}`}
          >
            {status === 'processing' ? 'אורז חבילה...' : status === 'done' ? <><CheckCircle2 className="w-4 h-4" /> סיימנו!</> : <><Share2 className="w-4 h-4" /> ארוז ושתף בוואטסאפ</>}
          </button>
        </div>

        <footer className="text-center space-y-4 pt-4">
          <p className="text-[10px] font-medium tracking-[0.1em] text-white/30 normal-case">
            Powered By deVee Boutique Label
          </p>
          <div className="w-10 h-10 mx-auto transition-all hover:scale-110 opacity-90">
            <img src="/label_logo.jpg" alt="deVee Label" className="w-full h-full object-contain rounded-full" />
          </div>
        </footer>
      </div>
    </main>
  )
}