async function doRegister(){
const c=document.getElementById('reg-company').value;
if(!c){showNotif('Ошибка','Заполните название 
компании','red');return;}
const p={};
p.company_name=c;
p.inn=val('reg-inn');
p.contact_person=val('reg-contact');
p.phone=val('reg-phone');
p.email=val('reg-email');
p.password=val('reg-pass');
p.participant_type=val('reg-type');
if(!p.email||!p.password){showNotif('Ошибка','Укажите email и 
пароль','red');return;}
try{
const r=await 
fetch('/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)});
const d=await r.json();
if(!r.ok){showNotif('Ошибка',d.error||'Не удалось','red');return;}
hideAuth();
showNotif('Заявка отправлена','После проверки получите доступ');
}catch(e){showNotif('Ошибка','Нет связи с сервером','red');}
}
async function doLogin(){
const email=document.getElementById('login-email').value;
co 
fetch('/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
const d=await r.json();
if(!r.ok){showNotif('Ошибка',d.error||'Неверный email или 
пароль','red');return;}
currentUser={id:d.participant_id,name:d.company_name||'Компания',type:d.participanl||email};
hideAuth();
applyUserUI();
showNotif('Добро пожаловать','Вы вошли в систему');
}catch(e){showNotif('Ошибка','Нет связи с сервером','red');}
}
function val(id){const el=document.getElementById(id);return el?
