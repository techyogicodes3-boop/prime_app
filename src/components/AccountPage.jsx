import {useEffect,useState} from 'react';
import {LogIn,LogOut,UserPlus,UserRound} from 'lucide-react';

const empty={name:'',email:'',password:''};

async function api(path,options={}){
  const response=await fetch(path,{credentials:'same-origin',...options,headers:{'Content-Type':'application/json',...(options.headers||{})}});
  const body=await response.json().catch(()=>({}));
  if(!response.ok)throw Object.assign(Error(body.error||'Unable to complete the request.'),{fields:body.fields||{}});
  return body;
}

export default function AccountPage(){
  const[mode,setMode]=useState('login'),[form,setForm]=useState(empty),[user,setUser]=useState(null),[csrf,setCsrf]=useState(''),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[error,setError]=useState(''),[fields,setFields]=useState({});
  useEffect(()=>{api('/api/auth/session').then(data=>{setUser(data.user);setCsrf(data.csrf)}).catch(()=>{}).finally(()=>setLoading(false))},[]);
  const submit=async event=>{
    event.preventDefault();if(busy)return;setBusy(true);setError('');setFields({});
    try{const data=await api('/api/auth/'+mode,{method:'POST',body:JSON.stringify(form)});setUser(data.user);setCsrf(data.csrf);setForm(empty);}
    catch(requestError){setError(requestError.message);setFields(requestError.fields)}finally{setBusy(false)}
  };
  const logout=async()=>{setBusy(true);setError('');try{await api('/api/auth/logout',{method:'POST',headers:{'x-csrf-token':csrf}});setUser(null);setCsrf('');}catch(requestError){setError(requestError.message)}finally{setBusy(false)}};
  if(loading)return <section className="account-page"><p role="status">Checking your account…</p></section>;
  if(user)return <section className="account-page"><div className="account-card text-center"><span className="account-icon"><UserRound/></span><p className="eyebrow">YOUR ACCOUNT</p><h1>Welcome, {user.name}</h1><p className="mt-3 text-slate-600">{user.email}</p>{error&&<p className="account-error" role="alert">{error}</p>}<button className="btn mt-7" disabled={busy} onClick={logout}><LogOut size={17}/>{busy?'Signing out…':'Log out'}</button></div></section>;
  return <section className="account-page"><div className="account-card"><span className="account-icon">{mode==='login'?<LogIn/>:<UserPlus/>}</span><p className="eyebrow">ACCOUNT ACCESS</p><h1>{mode==='login'?'Welcome back':'Create your account'}</h1><p className="mt-3 text-slate-600">{mode==='login'?'Sign in securely to continue.':'Register to save your Prism Edu account.'}</p><div className="account-tabs" role="tablist"><button type="button" className={mode==='login'?'is-active':''} onClick={()=>{setMode('login');setError('');setFields({})}}>Login</button><button type="button" className={mode==='register'?'is-active':''} onClick={()=>{setMode('register');setError('');setFields({})}}>Register</button></div><form onSubmit={submit} className="mt-7 space-y-4">{mode==='register'&&<label>Full name<input className="field mt-2" autoComplete="name" value={form.name} onChange={event=>setForm({...form,name:event.target.value})}/>{fields.name&&<small>{fields.name}</small>}</label>}<label>Email address<input className="field mt-2" required type="email" autoComplete="email" value={form.email} onChange={event=>setForm({...form,email:event.target.value})}/>{fields.email&&<small>{fields.email}</small>}</label><label>Password<input className="field mt-2" required minLength={mode==='register'?12:1} maxLength="256" type="password" autoComplete={mode==='login'?'current-password':'new-password'} value={form.password} onChange={event=>setForm({...form,password:event.target.value})}/>{fields.password&&<small>{fields.password}</small>}</label>{error&&<p className="account-error" role="alert">{error}</p>}<button className="btn w-full" disabled={busy}>{busy?'Please wait…':mode==='login'?'Login':'Create account'}</button></form></div></section>;
}
