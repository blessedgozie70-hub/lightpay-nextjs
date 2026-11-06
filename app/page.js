 "use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownLeft, ArrowLeftRight, ArrowRight, ArrowUpRight, Bell, Check,
  ChevronDown, CircleHelp, CreditCard, Download, Eye, EyeOff, FileText,
  Home, Lightbulb, LogOut, Menu, MoreHorizontal, Moon, Plus, Search, Settings, Sun,
  ShieldCheck, Smartphone, Sparkles, Wallet, Wifi, X, Zap
} from "lucide-react";

const initialTransactions = [
  { id: "LP-10842", name: "Adaeze Okafor", detail: "Transfer · 10:42 AM", date: "Today", amount: -18500, status: "Successful", type: "transfer", initials: "AO", color: "lavender" },
  { id: "LP-10841", name: "Airtime purchase", detail: "MTN · 9:18 AM", date: "Today", amount: -2500, status: "Successful", type: "airtime", initials: "M", color: "yellow" },
  { id: "LP-10840", name: "Freelance payment", detail: "Money received · 8:06 AM", date: "Today", amount: 125000, status: "Successful", type: "received", initials: "FP", color: "mint" },
  { id: "LP-10821", name: "Ikeja Electric", detail: "Electricity · Oct 7", date: "Yesterday", amount: -12000, status: "Successful", type: "bill", initials: "IE", color: "peach" },
  { id: "LP-10794", name: "Chisom Nwosu", detail: "Transfer · Oct 6", date: "Oct 6", amount: -7500, status: "Pending", type: "transfer", initials: "CN", color: "blue" },
];

const naira = (value) => `${value < 0 ? "−" : ""}₦${Math.abs(value).toLocaleString("en-NG", { maximumFractionDigits: 2 })}`;

function Brand() {
  return <div className="brand-mark"><span className="brand-icon"><Lightbulb size={21} strokeWidth={2.5} /></span><span>light<span>pay</span></span></div>;
}

function Button({ children, variant = "primary", block = false, ...props }) {
  return <button className={`btn ${variant}${block ? " block" : ""}`} {...props}>{children}</button>;
}

export default function HomePage() {
  const [active, setActive] = useState("Dashboard");
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("lightpay-theme");
    if (savedTheme === "dark" || savedTheme === "light") setTheme(savedTheme);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("lightpay-theme", theme);
  }, [theme]);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [modal, setModal] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ recipient: "", bank: "LightPay", account: "", amount: "", note: "" });
  const [billForm, setBillForm] = useState({ category: "Airtime", provider: "MTN", phone: "", amount: "" });

  const filteredTransactions = useMemo(() => transactions.filter((tx) => {
    const matchesQuery = `${tx.name} ${tx.detail} ${tx.id}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || tx.status === filter;
    return matchesQuery && matchesFilter;
  }), [transactions, query, filter]);

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3200);
  };

  const navItems = [
    { label: "Dashboard", icon: Home },
    { label: "Transfer", icon: ArrowLeftRight },
    { label: "Bills & payments", icon: Zap },
    { label: "Transactions", icon: FileText },
    { label: "Wallet & cards", icon: Wallet },
    { label: "Notifications", icon: Bell, count: "2" },
  ];

  const openAction = (label) => {
    if (label === "Transfer") { setModal("transfer"); return; }
    if (label === "Bills & payments") { setModal("bills"); return; }
    if (label === "Wallet & cards") { setActive(label); setMobileNav(false); return; }
    if (label === "Notifications") { setActive(label); setMobileNav(false); return; }
    setActive(label);
    setMobileNav(false);
  };

  const submitTransfer = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.recipient.trim() || !form.account.trim() || !Number.isFinite(amount) || amount <= 0) {
      notify("Add a recipient, account number and valid amount.");
      return;
    }
    const newTx = {
      id: `LP-${Math.floor(10900 + Math.random() * 900)}`,
      name: form.recipient,
      detail: `Transfer · Just now${form.note ? ` · ${form.note}` : ""}`,
      date: "Today", amount: -amount, status: "Successful", type: "transfer",
      initials: form.recipient.split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase(), color: "lavender"
    };
    setTransactions((prev) => [newTx, ...prev]);
    setModal("");
    setForm({ recipient: "", bank: "LightPay", account: "", amount: "", note: "" });
    notify("Demo transfer completed. No real money moved.");
  };

  const submitBill = (e) => {
    e.preventDefault();
    const amount = Number(billForm.amount);
    if (!billForm.phone.trim() || !Number.isFinite(amount) || amount <= 0) {
      notify("Enter a phone or meter number and a valid amount.");
      return;
    }
    const newTx = {
      id: `LP-${Math.floor(10900 + Math.random() * 900)}`,
      name: `${billForm.provider} ${billForm.category}`,
      detail: `${billForm.category} · Just now`,
      date: "Today", amount: -amount, status: "Successful", type: "bill",
      initials: billForm.provider.slice(0, 2).toUpperCase(), color: "yellow"
    };
    setTransactions((prev) => [newTx, ...prev]);
    setModal("");
    setBillForm({ category: "Airtime", provider: "MTN", phone: "", amount: "" });
    notify("Demo payment completed. No real payment was sent.");
  };

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileNav ? "mobile-open" : ""}`}>
        <div className="sidebar-top"><Brand /><button className="icon-btn mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={19}/></button></div>
        <div className="workspace-label">YOUR SPACE</div>
        <nav className="main-nav">
          {navItems.map(({ label, icon: Icon, count }) => (
            <button key={label} className={`nav-link ${active === label ? "selected" : ""}`} onClick={() => openAction(label)}>
              <Icon size={18} strokeWidth={1.8}/><span>{label}</span>{count && <span className="nav-count">{count}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><ShieldCheck size={18}/></div><strong>Your money, your control.</strong><p>Keep your account safe with smart security habits.</p><button onClick={() => notify("Security centre is a demo feature.")}>Security centre <ArrowRight size={13}/></button></div>
          <button className={`nav-link ${active === "Profile & settings" ? "selected" : ""}`} onClick={() => openAction("Profile & settings")}><Settings size={18}/><span>Profile & settings</span></button>
          <div className="user-profile"><div className="avatar user-avatar">CE</div><div className="user-meta"><strong>Ekene Chigozirim</strong><span>Personal account</span></div><button className="icon-btn" aria-label="Account menu" onClick={() => openAction("Profile & settings")}><MoreHorizontal size={19}/></button></div>
        </div>
      </aside>

      {mobileNav && <button className="nav-scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation"/>}

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {[
          { label: "Dashboard", icon: Home },
          { label: "Transfer", icon: ArrowLeftRight },
          { label: "Bills & payments", icon: Zap },
          { label: "Transactions", icon: FileText },
          { label: "Wallet & cards", icon: Wallet },
        ].map(({ label, icon: Icon }) => (
          <button key={label} className={`mobile-bottom-item ${active === label ? "selected" : ""}`} onClick={() => openAction(label)} aria-label={label}>
            <Icon size={19} strokeWidth={1.9} />
            <span>{label === "Bills & payments" ? "Bills" : label === "Wallet & cards" ? "Wallet" : label}</span>
          </button>
        ))}
      </nav>

      <section className="main-area">
        <header className="topbar">
          <div className="topbar-left"><button className="icon-btn mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={21}/></button><div className="breadcrumb">Your space <span>/</span> <strong>{active}</strong></div></div>
          <div className="topbar-actions"><div className="secure-pill"><span/> Secure connection</div><button className="icon-btn theme-toggle" aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`} onClick={() => setTheme(current => current === "light" ? "dark" : "light")}>{theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}</button><button className="icon-btn notification-btn" aria-label="Notifications" onClick={() => openAction("Notifications")}><Bell size={19}/><i/></button><button className="top-avatar" onClick={() => openAction("Profile & settings")} aria-label="Open profile">CE</button></div>
        </header>

        {active === "Dashboard" && <div className="page-content">
          <section className="welcome-row"><div><div className="eyebrow"><Sparkles size={14}/> YOUR MONEY, MADE CLEAR</div><h1>Good afternoon, Ekene <span className="wave">✳</span></h1><p className="page-subtitle">Here&apos;s what&apos;s happening with your money today.</p></div><Button variant="secondary" onClick={() => notify("Your demo statement is ready to export soon.")}><Download size={16}/> Download statement</Button></section>

          <section className="overview-grid">
            <div className="balance-card">
              <div className="balance-top"><span className="balance-label">Total available balance</span><button className="visibility-btn" onClick={() => setBalanceVisible(!balanceVisible)}>{balanceVisible ? <Eye size={16}/> : <EyeOff size={16}/>} {balanceVisible ? "Hide" : "Show"}</button></div>
              <div className="balance-amount">{balanceVisible ? "₦1,284,500" : "₦ ••••••••"}<span>.00</span></div>
              <div className="balance-note"><span className="trend-chip"><ArrowUpRight size={13}/> 12.8%</span><span>compared with last month</span></div>
              <div className="balance-divider"/>
              <div className="account-row"><div><span className="mini-label">Account number</span><strong>8024  ••••  1942</strong></div><button className="copy-account" onClick={() => { navigator.clipboard?.writeText("802400001942"); notify("Demo account number copied."); }}>Copy details <ArrowRight size={14}/></button></div>
              <div className="balance-orb orb-one"/><div className="balance-orb orb-two"/>
            </div>
            <div className="mini-stat-column">
              <div className="stat-card"><div className="stat-top"><span className="stat-icon incoming"><ArrowDownLeft size={18}/></span><span className="stat-period">THIS MONTH</span></div><div className="stat-label">Money in</div><div className="stat-value">₦485,000</div><div className="stat-foot positive"><span>↗ 8.4%</span> vs last month</div></div>
              <div className="stat-card"><div className="stat-top"><span className="stat-icon outgoing"><ArrowUpRight size={18}/></span><span className="stat-period">THIS MONTH</span></div><div className="stat-label">Money out</div><div className="stat-value">₦162,400</div><div className="stat-foot neutral">Across 18 transactions</div></div>
            </div>
          </section>

          <section className="quick-section"><div className="section-heading"><div><h2>Quick actions</h2><p>What would you like to do?</p></div><span className="tiny-label">SIMPLE. SECURE. LIGHT.</span></div>
            <div className="quick-grid">
              <button className="quick-action transfer-action" onClick={() => setModal("transfer")}><span className="quick-icon"><ArrowUpRight size={20}/></span><span><strong>Send money</strong><small>Transfer to anyone</small></span><ArrowRight className="quick-arrow" size={16}/></button>
              <button className="quick-action bills-action" onClick={() => setModal("bills")}><span className="quick-icon"><Zap size={20}/></span><span><strong>Pay a bill</strong><small>Utilities & subscriptions</small></span><ArrowRight className="quick-arrow" size={16}/></button>
              <button className="quick-action airtime-action" onClick={() => { setBillForm((f) => ({...f, category:"Airtime"})); setModal("bills"); }}><span className="quick-icon"><Smartphone size={20}/></span><span><strong>Buy airtime</strong><small>Top up in seconds</small></span><ArrowRight className="quick-arrow" size={16}/></button>
              <button className="quick-action data-action" onClick={() => { setBillForm((f) => ({...f, category:"Data"})); setModal("bills"); }}><span className="quick-icon"><Wifi size={20}/></span><span><strong>Buy data</strong><small>Stay connected</small></span><ArrowRight className="quick-arrow" size={16}/></button>
            </div>
          </section>

          <section className="transactions-section"><div className="section-heading transaction-heading"><div><h2>Recent transactions</h2><p>Your latest money moves, all in one place.</p></div><button className="text-link" onClick={() => setActive("Transactions")}>View all transactions <ArrowRight size={15}/></button></div><TransactionTable transactions={transactions.slice(0,4)} onSelect={(tx) => { setModal(`detail:${tx.id}`); }}/></section>
          <footer className="page-footer"><span>© 2026 LightPay Technologies</span><span><ShieldCheck size={13}/> Your financial data deserves care.</span><span className="prototype-label"><span/> Prototype · Simulated data</span></footer>
        </div>}

        {active === "Transactions" && <div className="page-content secondary-page"><div className="eyebrow"><FileText size={14}/> MONEY MOVEMENT</div><h1>Transactions</h1><p className="page-subtitle">Every payment, transfer and top-up in one place.</p><div className="list-toolbar"><div className="search-box"><Search size={17}/><input placeholder="Search transactions..." value={query} onChange={(e) => setQuery(e.target.value)}/></div><select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status"><option>All</option><option>Successful</option><option>Pending</option></select></div><TransactionTable transactions={filteredTransactions} onSelect={(tx) => setModal(`detail:${tx.id}`)}/></div>}

        {active === "Wallet & cards" && <div className="page-content secondary-page"><div className="eyebrow"><Wallet size={14}/> YOUR MONEY HOME</div><h1>Wallet & cards</h1><p className="page-subtitle">A clearer view of your account details and card controls.</p><div className="wallet-grid"><div className="virtual-card"><div className="virtual-card-head"><Brand/><span>VIRTUAL</span></div><div className="chip"/><div className="card-number">•••• &nbsp; •••• &nbsp; •••• &nbsp; 1942</div><div className="card-bottom"><div><small>CARD HOLDER</small><strong>EKENE CHIGOZIRIM</strong></div><div className="master-mark"><i/><i/></div></div></div><div className="panel account-panel"><h3>Account details</h3><DetailRow label="Account name" value="Ekene Chigozirim"/><DetailRow label="Account number" value="802400001942"/><DetailRow label="Account type" value="Personal"/><DetailRow label="Card status" value="Demo · Not issued"/><Button variant="secondary" onClick={() => notify("Real card controls are not connected in this prototype.")}><CreditCard size={16}/> Manage card</Button></div></div><div className="notice"><ShieldCheck size={19}/><div><strong>Prototype wallet</strong><p>These are sample account details. No real bank account or card is connected.</p></div></div></div>}

        {active === "Bills & payments" && <div className="page-content secondary-page"><div className="eyebrow"><Zap size={14}/> PAY IT, SIMPLY</div><h1>Bills & payments</h1><p className="page-subtitle">Take care of everyday payments without the runaround.</p><div className="bill-categories">{[["Airtime",Smartphone,"Top up your phone"],["Data",Wifi,"Keep browsing"],["Electricity",Zap,"Pay your power bill"],["Other bills",FileText,"More payment types"]].map(([name,Icon,desc])=><button className="bill-category" key={name} onClick={()=>{setBillForm(f=>({...f,category:name}));setModal("bills");}}><span><Icon size={21}/></span><strong>{name}</strong><small>{desc}</small><ArrowRight size={16}/></button>)}</div></div>}

        {active === "Notifications" && <div className="page-content secondary-page"><div className="eyebrow"><Bell size={14}/> STAY IN THE LOOP</div><h1>Notifications</h1><p className="page-subtitle">Important updates, without the noise.</p><div className="panel notification-list"><NoticeItem title="Welcome to LightPay" body="Your demo account is ready to explore." time="Just now" icon={Sparkles}/><NoticeItem title="Keep your account secure" body="Never share your PIN or password with anyone." time="Today, 9:00 AM" icon={ShieldCheck}/><NoticeItem title="Monthly summary is ready" body="Your October activity summary is available in the dashboard." time="Yesterday" icon={FileText}/></div></div>}

        {active === "Profile & settings" && <div className="page-content secondary-page"><div className="eyebrow"><Settings size={14}/> YOUR ACCOUNT, YOUR WAY</div><h1>Profile & settings</h1><p className="page-subtitle">Manage your personal details and preferences.</p><div className="panel settings-panel"><div className="profile-banner"><div className="profile-big-avatar">CE</div><div><h3>Ekene Chigozirim</h3><p>ekene@example.com · Demo profile</p></div><Button variant="secondary" onClick={()=>notify("Profile editing will be available in a future version.")}>Edit profile</Button></div><DetailRow label="Full name" value="Ekene Chigozirim"/><DetailRow label="Email address" value="ekene@example.com"/><DetailRow label="Phone number" value="+234 800 000 0000"/><div className="theme-setting-row"><div><strong>Appearance</strong><small>Choose how LightPay looks on this device.</small></div><button className="theme-setting-control" onClick={() => setTheme(current => current === "light" ? "dark" : "light")}><span>{theme === "light" ? "Light mode" : "Dark mode"}</span>{theme === "light" ? <Moon size={16}/> : <Sun size={16}/>}</button></div><button className="settings-option" onClick={()=>notify("Security settings are demo-only for now.")}><ShieldCheck size={18}/><span><strong>Security & privacy</strong><small>Password, devices and account protection</small></span><ArrowRight size={16}/></button><button className="settings-option" onClick={()=>notify("Help centre is not connected in this prototype.")}><CircleHelp size={18}/><span><strong>Help & support</strong><small>Get help using LightPay</small></span><ArrowRight size={16}/></button></div></div>}
      </section>

      {modal === "transfer" && <Modal title="Send money" subtitle="A simple, secure transfer flow." onClose={()=>setModal("")}><form onSubmit={submitTransfer} className="modal-form"><div className="demo-warning"><ShieldCheck size={17}/><span>Demo mode. This will not move real money.</span></div><label>Recipient name<input value={form.recipient} onChange={e=>setForm({...form,recipient:e.target.value})} placeholder="e.g. Adaeze Okafor" required/></label><label>Bank or wallet<select value={form.bank} onChange={e=>setForm({...form,bank:e.target.value})}><option>LightPay</option><option>Access Bank</option><option>GTBank</option><option>Zenith Bank</option><option>UBA</option><option>First Bank</option></select></label><label>Account number<input value={form.account} onChange={e=>setForm({...form,account:e.target.value})} inputMode="numeric" minLength="6" placeholder="Enter account number" required/></label><label>Amount (NGN)<div className="amount-input"><span>₦</span><input type="number" min="1" step="1" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} placeholder="0.00" required/></div></label><label>Note <span className="optional">(optional)</span><input value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="What's it for?"/></label>{form.amount && Number(form.amount)>0 && <div className="transfer-total"><span>Total to send</span><strong>{naira(Number(form.amount))}</strong></div>}<Button type="submit" block>Review & send <ArrowRight size={16}/></Button></form></Modal>}

      {modal === "bills" && <Modal title="Pay a bill" subtitle="Choose a service and enter payment details." onClose={()=>setModal("")}><form onSubmit={submitBill} className="modal-form"><div className="demo-warning"><ShieldCheck size={17}/><span>Demo mode. No provider will be contacted.</span></div><label>Payment type<select value={billForm.category} onChange={e=>setBillForm({...billForm,category:e.target.value})}><option>Airtime</option><option>Data</option><option>Electricity</option><option>Other bills</option></select></label><label>Provider<select value={billForm.provider} onChange={e=>setBillForm({...billForm,provider:e.target.value})}>{(billForm.category==="Electricity"?["Ikeja Electric","Eko Electric","Abuja Electric"]:["MTN","Airtel","Glo","9mobile"]).map(x=><option key={x}>{x}</option>)}</select></label><label>Phone or meter number<input value={billForm.phone} onChange={e=>setBillForm({...billForm,phone:e.target.value})} placeholder="Enter number" required/></label><label>Amount (NGN)<div className="amount-input"><span>₦</span><input type="number" min="1" step="1" value={billForm.amount} onChange={e=>setBillForm({...billForm,amount:e.target.value})} placeholder="0.00" required/></div></label><Button type="submit" block>Confirm demo payment <ArrowRight size={16}/></Button></form></Modal>}

      {modal.startsWith("detail:") && <Modal title="Transaction details" subtitle="A closer look at this transaction." onClose={()=>setModal("")}>{(()=>{const tx=transactions.find(t=>t.id===modal.slice(7));return tx?<div className="transaction-detail"><div className="detail-status"><span className={`tx-avatar ${tx.color}`}>{tx.initials}</span><span className={`status-pill ${tx.status==="Pending"?"pending":""}`}><Check size={13}/>{tx.status}</span></div><div className={`detail-amount ${tx.amount>0?"income":""}`}>{naira(tx.amount)}</div><p className="detail-name">{tx.name}</p><div className="detail-rows"><DetailRow label="Transaction ID" value={tx.id}/><DetailRow label="Description" value={tx.detail}/><DetailRow label="Date" value={tx.date}/><DetailRow label="Status" value={tx.status}/><DetailRow label="Mode" value="Simulated transaction"/></div><div className="demo-warning"><ShieldCheck size={17}/><span>Prototype record only. No real payment occurred.</span></div></div>:null})()}</Modal>}

      {toast && <div className="toast"><span className="toast-check"><Check size={15}/></span>{toast}<button onClick={()=>setToast("")} aria-label="Dismiss notification"><X size={15}/></button></div>}
    </main>
  );
}

function TransactionTable({ transactions, onSelect }) {
  if (!transactions.length) return <div className="empty-state"><Search size={25}/><strong>No transactions found</strong><p>Try a different search or filter.</p></div>;
  return <div className="transaction-table"><div className="table-head"><span>TRANSACTION</span><span>DATE</span><span>STATUS</span><span className="amount-col">AMOUNT</span><span/></div>{transactions.map((tx)=><button className="transaction-row" key={tx.id} onClick={()=>onSelect(tx)}><div className="tx-person"><span className={`tx-avatar ${tx.color}`}>{tx.initials}</span><span><strong>{tx.name}</strong><small>{tx.detail}</small></span></div><span className="tx-date">{tx.date}</span><span><span className={`status-pill ${tx.status==="Pending"?"pending":""}`}><i/>{tx.status}</span></span><strong className={`tx-amount ${tx.amount>0?"income":""}`}>{naira(tx.amount)}</strong><MoreHorizontal className="row-more" size={18}/></button>)}</div>;
}
function Modal({ title, subtitle, onClose, children }) { return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section className="modal-card"><div className="modal-header"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="icon-btn" onClick={onClose} aria-label="Close modal"><X size={19}/></button></div>{children}</section></div>; }
function DetailRow({ label, value }) { return <div className="detail-row"><span>{label}</span><strong>{value}</strong></div>; }
function NoticeItem({ title, body, time, icon: Icon }) { return <div className="notice-item"><span className="notice-item-icon"><Icon size={18}/></span><div><strong>{title}</strong><p>{body}</p><small>{time}</small></div><span className="unread-dot"/></div>; }
