document.addEventListener("DOMContentLoaded",()=>{
  const year=document.querySelector("#year");
  if(year) year.textContent=new Date().getFullYear();

  const m=document.querySelector(".menu"), n=document.querySelector("nav");
  if(m && n) m.addEventListener("click",()=>n.classList.toggle("open"));

  document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    const t=b.dataset.filter;
    document.querySelectorAll(".item").forEach(x=>x.style.display=t==="all"||x.dataset.type===t?"flex":"none");
  }));

  const f=document.querySelector("#newsletter");
  if(f) f.addEventListener("submit",e=>{
    e.preventDefault();
    alert("धन्यवाद! आपने लेखनी की चिट्ठियों के लिए सदस्यता ली है।");
    f.reset();
  });

  const c=document.querySelector("#contact");
  if(c){
    c.addEventListener("submit",e=>{
      const action=c.getAttribute("action")||"";
      if(action.includes("YOUR_FORM_ID")){
        e.preventDefault();
        const status=c.querySelector(".status");
        if(status) status.textContent="अभी Formspree Form ID जोड़ें। README में दिए चरण देखें।";
        return;
      }
      // Real Formspree form: allow the browser to submit normally.
    });
  }
});