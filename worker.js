export default {
async fetch(request) {
const url = new URL(request.url);

if (url.pathname === "/api/health") {
  return Response.json({ status: "ok" });
}

if (url.pathname !== "/") {
  return new Response("Not found", { status: 404 });
}

const html = `<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mandu Green Villa | Book Your Stay</title>
<style>
body{margin:0;background:#f8f4e9;color:#463426;font-family:Arial,sans-serif}
header{background:#463426;color:white;text-align:center;padding:28px 16px}
main{max-width:520px;margin:24px auto;padding:0 15px}
.card{background:white;padding:22px;border-radius:14px}
label{display:block;margin-top:15px;font-weight:bold}
input,select{box-sizing:border-box;width:100%;padding:12px;margin-top:6px;border:1px solid #cbbda8;border-radius:7px;font-size:16px}
button{width:100%;padding:14px;margin-top:20px;background:#9b7738;color:white;border:0;border-radius:8px;font-size:16px}
.note{font-size:13px;line-height:1.5;color:#6f6255}
</style>
</head>
<body>
<header><h1>Mandu Green Villa</h1><p>A peaceful stay in historic Mandu</p></header>
<main><section class="card">
<h2>Book your stay</h2>
<form id="booking">
<label for="villa">Choose villa</label>
<select id="villa"><option>Roopmati Villa</option><option>Baz Bahadur Villa</option></select>
<label for="checkin">Check-in</label><input id="checkin" type="date" required>
<label for="checkout">Check-out</label><input id="checkout" type="date" required>
<label for="guests">Guests</label><input id="guests" type="number" min="1" max="30" value="2" required>
<label for="name">Guest name</label><input id="name" maxlength="100" required>
<label for="phone">Mobile number</label><input id="phone" type="tel" maxlength="20" required>
<button type="submit">Continue booking request</button>
</form>
<p id="result" class="note"></p>
<p class="note">Demo only: availability is not yet checked and no booking or payment is confirmed.</p>
</section></main>
<script>
const ci=document.getElementById('checkin');
const co=document.getElementById('checkout');
const today=new Date();
const minDate=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
ci.min=minDate;co.min=minDate;
ci.addEventListener('change',()=>{co.min=ci.value||minDate;if(co.value&&co.value<=ci.value)co.value='';});
document.getElementById('booking').addEventListener('submit',e=>{
e.preventDefault();
if(co.value<=ci.value){document.getElementById('result').textContent='Check-out must be after check-in.';return;}
const fields=['villa','checkin','checkout','guests','name','phone'];
const labels=['Villa','Check-in','Check-out','Guests','Name','Phone'];
const message=fields.map((id,i)=>labels[i]+': '+document.getElementById(id).value).join('\\n');
const link=document.createElement('a');
link.href='https://wa.me/?text='+encodeURIComponent('Mandu Green Villa booking request\\n'+message);
link.target='_blank';link.rel='noopener noreferrer';
link.textContent='Send request on WhatsApp';
const result=document.getElementById('result');
result.replaceChildren(link);
});
</script>
</body>
</html>`;return new Response(html, {
  headers: { "Content-Type": "text/html; charset=UTF-8" }
});

}
};
