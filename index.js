 
    (function(){
      const btn = document.querySelector('.theme-toggle');
      function setTheme(mode){
        document.body.classList.toggle('dark', mode === 'dark');
        btn.textContent = mode === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        btn.setAttribute('aria-pressed', mode === 'dark');
        localStorage.setItem('theme', mode);
        const meta = document.querySelector('meta[name="theme-color"]');
        if(meta) meta.setAttribute('content', mode === 'dark' ? '#0b0616' : '#f4b400');
      }
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(stored ? stored : (prefersDark ? 'dark' : 'light'));
      window.toggleTheme = function(){
        const next = document.body.classList.contains('dark') ? 'light' : 'dark';
        setTheme(next);
      };

      window.downloadPDF = function(){
        try{
          if(!(window.jspdf && window.jspdf.jsPDF)) throw new Error('jsPDF not loaded');
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF({ unit: 'pt', format: 'a4' });
          const isDark = document.body.classList.contains('dark');
          const colors = {
            primary: '#f4b400',
            bg: isDark ? '#0b0616' : '#ffffff',
            text: isDark ? '#f9fafb' : '#1f2937',
            muted: isDark ? '#9ca3af' : '#6b7280'
          };
          const hexToRgb = (h)=>{const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h)||[];return [parseInt(m[1]||'0',16),parseInt(m[2]||'0',16),parseInt(m[3]||'0',16)]};

          // background
          let [r,g,b] = hexToRgb(colors.bg); doc.setFillColor(r,g,b); doc.rect(0,0,595,842,'F');
          // header band
          ;[r,g,b] = hexToRgb(colors.primary); doc.setFillColor(r,g,b); doc.rect(0,0,595,90,'F');
          // name + role
          doc.setTextColor(255,255,255); doc.setFont('helvetica','bold'); doc.setFontSize(24); doc.text('Rayan Adlrdard', 40, 52);
          doc.setFont('helvetica','normal'); doc.setFontSize(12); doc.text('Front-end Developer', 40, 72);

          // body text
          const [tR,tG,tB] = hexToRgb(colors.text); const [mR,mG,mB] = hexToRgb(colors.muted);
          doc.setTextColor(tR,tG,tB); doc.setFont('helvetica','bold'); doc.setFontSize(14); doc.text('Profile', 40, 130);
          doc.setFont('helvetica','normal'); doc.setTextColor(mR,mG,mB); doc.setFontSize(11);
          const profile = 'I design and build fast, accessible, SEO‑friendly interfaces that scale. My focus is on clean component architectures, semantic HTML, modern CSS, and performance‑driven JavaScript.';
          doc.text(doc.splitTextToSize(profile, 515), 40, 150);

          doc.setTextColor(tR,tG,tB); doc.setFont('helvetica','bold'); doc.setFontSize(14); doc.text('Skills', 40, 230);
          doc.setFont('helvetica','normal'); doc.setTextColor(mR,mG,mB); doc.setFontSize(11);
          doc.text('HTML, CSS, JavaScript, PHP, WordPress, Bootstrap, Sass, Git, Webpack', 40, 250);

          doc.setTextColor(tR,tG,tB); doc.setFont('helvetica','bold'); doc.setFontSize(14); doc.text('Contact', 40, 290);
          doc.setFont('helvetica','normal'); doc.setTextColor(mR,mG,mB); doc.setFontSize(11);
          doc.text('Dhaka, Bangladesh  ·  Freelance: Available  ·  email@example.com  ·  +880 000 000 0000', 40, 310);

          doc.save('cv.pdf');
        }catch(err){
          // Fallback: trigger download of a static PDF if you place one at this path
          const url = 'cv.pdf';
          const a = document.createElement('a');
          a.href = url; a.download = 'cv.pdf';
          document.body.appendChild(a); a.click(); a.remove();
        }
      };
    })();
  
