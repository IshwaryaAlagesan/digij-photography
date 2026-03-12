// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const hamburger = document.getElementById('nav-hamburger');
  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    menu.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('mobile-menu-overlay').classList.remove('open');
  document.getElementById('nav-hamburger').classList.remove('open');
  document.body.style.overflow = '';
}

// Sync mobile auth state (called from updateNavUI in auth section)
function syncMobileAuth(user) {
  const mobileGuest = document.getElementById('mobile-nav-guest');
  const mobileUser  = document.getElementById('mobile-nav-user');
  const mobileAvatar = document.getElementById('mobile-nav-avatar');
  const mobileName   = document.getElementById('mobile-nav-username');
  if (user) {
    if (mobileGuest) mobileGuest.style.display = 'none';
    if (mobileUser)  mobileUser.style.display  = 'block';
    if (mobileAvatar) mobileAvatar.textContent = user.name.charAt(0).toUpperCase();
    if (mobileName)   mobileName.textContent   = user.name;
  } else {
    if (mobileGuest) mobileGuest.style.display = 'block';
    if (mobileUser)  mobileUser.style.display  = 'none';
  }
}

// ===== NAVBAR: Highlight active section on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = { rootMargin: '-40% 0px -55% 0px' };

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ===== SCROLL-IN ANIMATIONS =====
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateOnScroll.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .team-card, .stat').forEach(el => {
  el.classList.add('fade-up');
  animateOnScroll.observe(el);
});

// ===== STATS COUNTER ANIMATION =====
const statsData = [
  { el: null, target: 500, suffix: '+' },
  { el: null, target: 98,  suffix: '%' },
  { el: null, target: 10,  suffix: '+' },
  { el: null, target: 24,  suffix: '/7' },
];

const statEls = document.querySelectorAll('.stat h2');
statEls.forEach((el, i) => { statsData[i].el = el; });

let statsAnimated = false;
const statsSection = document.querySelector('.stats-bar');
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;
    statsData.forEach(({ el, target, suffix }) => {
      if (!el) return;
      let count = 0;
      const step = Math.ceil(target / 50);
      const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + suffix;
        if (count >= target) clearInterval(timer);
      }, 30);
    });
  }
}, { threshold: 0.5 });

if (statsSection) statsObserver.observe(statsSection);

// ===== CONTACT FORM =====
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent! ✓';
    btn.style.background = 'linear-gradient(135deg, #059669, #047857)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message ➤';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===================================================
// AUTH: Login / Register / Logout
// ===================================================
const USERS_KEY = 'demosite_users';
const SESSION_KEY = 'demosite_session';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
}
function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function initAuth() {
  const session = getSession();
  if (session) {
    showLoggedIn(session);
  } else {
    showLoggedOut();
  }
}

function showLoggedIn(user) {
  document.getElementById('nav-guest').style.display = 'none';
  const navUser = document.getElementById('nav-user');
  navUser.style.display = 'flex';
  const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  document.getElementById('nav-avatar').textContent = initials;
  document.getElementById('nav-username').textContent = user.name.split(' ')[0];
  syncMobileAuth(user);
}

function showLoggedOut() {
  document.getElementById('nav-guest').style.display = 'flex';
  document.getElementById('nav-user').style.display = 'none';
  syncMobileAuth(null);
}

function openLoginModal() {
  switchToLogin();
  document.getElementById('login-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
  document.getElementById('login-modal').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('login-error').style.display = 'none';
  document.getElementById('register-error').style.display = 'none';
  document.getElementById('login-form').reset();
  document.getElementById('register-form').reset();
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('login-modal')) closeLoginModal();
}

function switchToRegister() {
  document.getElementById('modal-login-view').style.display = 'none';
  document.getElementById('modal-register-view').style.display = 'block';
}

function switchToLogin() {
  document.getElementById('modal-register-view').style.display = 'none';
  document.getElementById('modal-login-view').style.display = 'block';
}

function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.display = 'block';
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    showError('login-error', 'Invalid email or password.');
    return;
  }
  saveSession(user);
  showLoggedIn(user);
  closeLoginModal();
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    showError('register-error', 'An account with this email already exists.');
    return;
  }
  const newUser = { name, email, password };
  users.push(newUser);
  saveUsers(users);
  saveSession(newUser);
  showLoggedIn(newUser);
  closeLoginModal();
}

function logout() {
  clearSession();
  showLoggedOut();
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLoginModal();
});

// ===================================================
// INSTALLMENT CALCULATOR
// ===================================================
let currentFreq = 'weekly';

function setFreq(freq) {
  currentFreq = freq;
  document.getElementById('btn-weekly').classList.toggle('active', freq === 'weekly');
  document.getElementById('btn-monthly').classList.toggle('active', freq === 'monthly');
  document.getElementById('inst-duration-label').textContent =
    freq === 'weekly' ? 'Number of Weeks' : 'Number of Months';
  document.getElementById('inst-duration').placeholder =
    freq === 'weekly' ? 'e.g. 12' : 'e.g. 6';
  document.getElementById('inst-result').style.display = 'none';
}

function fmt(n) {
  return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function calculateInstallment() {
  const amount   = parseFloat(document.getElementById('inst-amount').value);
  const rate     = parseFloat(document.getElementById('inst-rate').value) || 0;
  const duration = parseInt(document.getElementById('inst-duration').value);

  if (!amount || amount <= 0 || !duration || duration <= 0) {
    alert('Please enter a valid amount and number of ' + (currentFreq === 'weekly' ? 'weeks' : 'months') + '.');
    return;
  }

  // Convert annual rate to per-period rate
  const periodsPerYear = currentFreq === 'weekly' ? 52 : 12;
  const r = (rate / 100) / periodsPerYear;
  const n = duration;

  let perPayment;
  if (r === 0) {
    perPayment = amount / n;
  } else {
    // Standard amortisation formula
    perPayment = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayable  = perPayment * n;
  const totalInterest = totalPayable - amount;

  document.getElementById('res-per-payment').textContent   = fmt(perPayment);
  document.getElementById('res-total-payments').textContent = n;
  document.getElementById('res-total-interest').textContent = fmt(totalInterest);
  document.getElementById('res-total-payable').textContent  = fmt(totalPayable);

  // Build schedule table
  const tbody = document.getElementById('schedule-body');
  tbody.innerHTML = '';
  let balance = amount;

  for (let i = 1; i <= n; i++) {
    const interest  = balance * r;
    const principal = perPayment - interest;
    balance = Math.max(0, balance - principal);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i}</td>
      <td>${fmt(perPayment)}</td>
      <td>${fmt(principal)}</td>
      <td>${fmt(interest)}</td>
      <td>${fmt(balance)}</td>`;
    tbody.appendChild(tr);
  }

  const resultEl = document.getElementById('inst-result');
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===================================================
// CUSTOMER MANAGEMENT
// ===================================================
const CUSTOMERS_KEY = 'demosite_customers';

function getCustomers() {
  return JSON.parse(localStorage.getItem(CUSTOMERS_KEY) || '[]');
}
function saveCustomers(list) {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(list));
}

function handleCustomerSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('cust-edit-id').value;
  const customer = {
    id:      editId || Date.now().toString(),
    first:   document.getElementById('cust-first').value.trim(),
    last:    document.getElementById('cust-last').value.trim(),
    address: document.getElementById('cust-address').value.trim(),
    phone:   document.getElementById('cust-phone').value.trim(),
    email:   document.getElementById('cust-email').value.trim(),
  };

  const list = getCustomers();
  if (editId) {
    const idx = list.findIndex(c => c.id === editId);
    if (idx !== -1) list[idx] = customer;
  } else {
    list.push(customer);
  }

  saveCustomers(list);
  renderCustomers();
  cancelEdit();
  document.getElementById('customer-form').reset();

  // Flash success
  const btn = document.getElementById('cust-submit-btn');
  const orig = btn.textContent;
  btn.textContent = editId ? 'Updated! ✓' : 'Added! ✓';
  btn.style.background = 'linear-gradient(135deg, #059669, #047857)';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
  }, 1800);
}

function editCustomer(id) {
  const c = getCustomers().find(c => c.id === id);
  if (!c) return;
  document.getElementById('cust-edit-id').value  = c.id;
  document.getElementById('cust-first').value    = c.first;
  document.getElementById('cust-last').value     = c.last;
  document.getElementById('cust-address').value  = c.address;
  document.getElementById('cust-phone').value    = c.phone;
  document.getElementById('cust-email').value    = c.email;
  document.getElementById('cust-form-heading').textContent = 'Edit Customer';
  document.getElementById('cust-submit-btn').textContent   = 'Save Changes';
  document.getElementById('cust-cancel-btn').style.display = 'inline-block';
  document.getElementById('cust-form-panel') && document.querySelector('.cust-form-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelEdit() {
  document.getElementById('cust-edit-id').value           = '';
  document.getElementById('cust-form-heading').textContent = 'Add New Customer';
  document.getElementById('cust-submit-btn').textContent   = 'Add Customer';
  document.getElementById('cust-cancel-btn').style.display = 'none';
  document.getElementById('customer-form').reset();
}

function deleteCustomer(id) {
  if (!confirm('Delete this customer?')) return;
  const list = getCustomers().filter(c => c.id !== id);
  saveCustomers(list);
  renderCustomers();
}

function renderCustomers() {
  const query = (document.getElementById('cust-search')?.value || '').toLowerCase();
  let list = getCustomers();

  if (query) {
    list = list.filter(c =>
      (c.first + ' ' + c.last + c.email + c.phone + c.address).toLowerCase().includes(query)
    );
  }

  const empty    = document.getElementById('cust-empty');
  const tableWrap = document.getElementById('cust-table-wrap');
  const tbody    = document.getElementById('cust-tbody');
  const countEl  = document.getElementById('cust-count');

  const all = getCustomers();
  countEl.textContent = all.length;

  if (list.length === 0) {
    empty.style.display    = 'block';
    tableWrap.style.display = 'none';
    return;
  }

  empty.style.display    = 'none';
  tableWrap.style.display = 'block';

  tbody.innerHTML = list.map((c, i) => `
    <tr>
      <td>${i + 1}</td>
      <td class="cust-name-cell"><strong>${escHtml(c.first)} ${escHtml(c.last)}</strong></td>
      <td>${escHtml(c.email)}</td>
      <td>${escHtml(c.phone || '—')}</td>
      <td>${escHtml(c.address || '—')}</td>
      <td>
        <div class="cust-actions">
          <button class="btn-edit"   onclick="editCustomer('${c.id}')">&#9998; Edit</button>
          <button class="btn-delete" onclick="deleteCustomer('${c.id}')">&#128465; Delete</button>
        </div>
      </td>
    </tr>`).join('');
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ===================================================
// CRM SYSTEM
// ===================================================
const LEADS_KEY      = 'demosite_leads';
const DEALS_KEY      = 'demosite_deals';
const ACTIVITIES_KEY = 'demosite_activities';

const PIPELINE_STAGES = ['New','Contacted','Proposal','Negotiation','Won','Lost'];

const STAGE_COLORS = {
  New: '#3b82f6', Contacted: '#f59e0b', Proposal: '#8b5cf6',
  Negotiation: '#f97316', Won: '#10b981', Lost: '#ef4444'
};

const ACT_ICONS = { Call:'📞', Email:'📧', Meeting:'👥', Task:'✅', Note:'📝' };
const ACT_COLOR_MAP = { Call:'act-call', Email:'act-email', Meeting:'act-meeting', Task:'act-task', Note:'act-note' };

// --- Storage helpers ---
const getLeads      = () => JSON.parse(localStorage.getItem(LEADS_KEY)      || '[]');
const getDeals      = () => JSON.parse(localStorage.getItem(DEALS_KEY)      || '[]');
const getActivities = () => JSON.parse(localStorage.getItem(ACTIVITIES_KEY) || '[]');
const saveLeads      = d => localStorage.setItem(LEADS_KEY, JSON.stringify(d));
const saveDeals      = d => localStorage.setItem(DEALS_KEY, JSON.stringify(d));
const saveActivities = d => localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(d));

// --- Tab switching ---
function switchCrmTab(tab) {
  document.querySelectorAll('.crm-tab').forEach((b,i) => {
    const tabs = ['dashboard','leads','pipeline','activities'];
    b.classList.toggle('active', tabs[i] === tab);
  });
  document.querySelectorAll('.crm-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('crm-' + tab).classList.add('active');
  if (tab === 'dashboard')   renderCrmDashboard();
  if (tab === 'leads')       renderLeads();
  if (tab === 'pipeline')    renderPipeline();
  if (tab === 'activities')  renderActivities();
}

// ======= DASHBOARD =======
function renderCrmDashboard() {
  const customers  = getCustomers();
  const leads      = getLeads();
  const deals      = getDeals();
  const activities = getActivities();

  const wonRevenue = deals
    .filter(d => d.stage === 'Won')
    .reduce((s, d) => s + (parseFloat(d.value) || 0), 0);

  const openDeals = deals.filter(d => d.stage !== 'Won' && d.stage !== 'Lost').length;

  document.getElementById('crm-kpis').innerHTML = [
    { icon:'👥', label:'Total Customers', val: customers.length, bg:'#eff6ff', sub:'Registered' },
    { icon:'🏆', label:'Total Leads',     val: leads.length,     bg:'#fef9c3', sub:`${leads.filter(l=>l.status==='Qualified').length} qualified` },
    { icon:'📊', label:'Open Deals',      val: openDeals,        bg:'#ede9fe', sub:`${deals.filter(d=>d.stage==='Won').length} won` },
    { icon:'💰', label:'Won Revenue',     val: '$'+wonRevenue.toLocaleString(), bg:'#dcfce7', sub:'Total closed' },
  ].map(k => `
    <div class="kpi-card">
      <div class="kpi-icon" style="background:${k.bg}">${k.icon}</div>
      <div class="kpi-info">
        <span>${k.label}</span>
        <strong>${k.val}</strong>
        <small>${k.sub}</small>
      </div>
    </div>`).join('');

  // Recent leads
  const recentLeads = leads.slice(-5).reverse();
  document.getElementById('dash-leads-list').innerHTML = recentLeads.length
    ? recentLeads.map(l => `
        <div class="dash-item">
          <div style="font-size:1.1rem">🏆</div>
          <div style="flex:1">
            <div class="dash-item-name">${escHtml(l.first+' '+l.last)}</div>
            <div class="dash-item-sub">${escHtml(l.company||'—')}</div>
          </div>
          ${badgeHtml(l.status)}
        </div>`).join('')
    : '<p style="color:#aaa;font-size:0.85rem;text-align:center;padding:1rem">No leads yet</p>';

  // Pipeline by stage
  const stageMap = {};
  PIPELINE_STAGES.forEach(s => stageMap[s] = 0);
  deals.forEach(d => { if (stageMap[d.stage] !== undefined) stageMap[d.stage]++; });
  const maxCount = Math.max(...Object.values(stageMap), 1);
  document.getElementById('dash-pipeline-chart').innerHTML = PIPELINE_STAGES.map(s => `
    <div class="pipeline-bar-row">
      <div class="pipeline-bar-label">${s}</div>
      <div class="pipeline-bar-track">
        <div class="pipeline-bar-fill" style="width:${(stageMap[s]/maxCount)*100}%;background:${STAGE_COLORS[s]}"></div>
      </div>
      <div class="pipeline-bar-count">${stageMap[s]}</div>
    </div>`).join('');

  // Recent activities
  const recentActs = activities.slice(-5).reverse();
  document.getElementById('dash-activity-list').innerHTML = recentActs.length
    ? recentActs.map(a => `
        <div class="dash-item">
          <div style="font-size:1rem">${ACT_ICONS[a.type]||'📝'}</div>
          <div style="flex:1">
            <div class="dash-item-name">${escHtml(a.subject)}</div>
            <div class="dash-item-sub">${escHtml(a.related||'')} · ${a.date||''}</div>
          </div>
          ${badgeHtml(a.status)}
        </div>`).join('')
    : '<p style="color:#aaa;font-size:0.85rem;text-align:center;padding:1rem">No activities yet</p>';
}

function badgeHtml(status) {
  const cls = 'badge badge-' + (status||'').toLowerCase().replace(' ','-');
  return `<span class="${cls}">${escHtml(status||'')}</span>`;
}

// ======= LEADS =======
function handleLeadSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('lead-edit-id').value;
  const lead = {
    id:      editId || Date.now().toString(),
    first:   document.getElementById('lead-first').value.trim(),
    last:    document.getElementById('lead-last').value.trim(),
    company: document.getElementById('lead-company').value.trim(),
    email:   document.getElementById('lead-email').value.trim(),
    phone:   document.getElementById('lead-phone').value.trim(),
    source:  document.getElementById('lead-source').value,
    status:  document.getElementById('lead-status').value,
    notes:   document.getElementById('lead-notes').value.trim(),
    created: editId ? undefined : new Date().toISOString().split('T')[0],
  };
  if (editId) {
    const existing = getLeads().find(l => l.id === editId);
    if (existing) lead.created = existing.created;
  }
  const list = getLeads();
  if (editId) { const i = list.findIndex(l => l.id === editId); if (i !== -1) list[i] = lead; }
  else list.push(lead);
  saveLeads(list);
  renderLeads();
  cancelLeadEdit();
  flashBtn('lead-submit-btn', editId ? 'Updated! ✓' : 'Added! ✓');
}

function editLead(id) {
  const l = getLeads().find(l => l.id === id); if (!l) return;
  document.getElementById('lead-edit-id').value   = l.id;
  document.getElementById('lead-first').value     = l.first;
  document.getElementById('lead-last').value      = l.last;
  document.getElementById('lead-company').value   = l.company;
  document.getElementById('lead-email').value     = l.email;
  document.getElementById('lead-phone').value     = l.phone;
  document.getElementById('lead-source').value    = l.source;
  document.getElementById('lead-status').value    = l.status;
  document.getElementById('lead-notes').value     = l.notes;
  document.getElementById('lead-form-heading').textContent = 'Edit Lead';
  document.getElementById('lead-submit-btn').textContent   = 'Save Changes';
  document.getElementById('lead-cancel-btn').style.display = 'inline-block';
  document.querySelector('.crm-form-panel').scrollIntoView({ behavior:'smooth', block:'start' });
}

function cancelLeadEdit() {
  document.getElementById('lead-edit-id').value           = '';
  document.getElementById('lead-form-heading').textContent = 'Add New Lead';
  document.getElementById('lead-submit-btn').textContent   = 'Add Lead';
  document.getElementById('lead-cancel-btn').style.display = 'none';
  document.getElementById('lead-form').reset();
}

function deleteLead(id) {
  if (!confirm('Delete this lead?')) return;
  saveLeads(getLeads().filter(l => l.id !== id));
  renderLeads();
}

function renderLeads() {
  const query = (document.getElementById('lead-search')?.value||'').toLowerCase();
  let list = getLeads();
  if (query) list = list.filter(l =>
    (l.first+' '+l.last+l.company+l.email+l.status).toLowerCase().includes(query));

  document.getElementById('lead-count').textContent = getLeads().length;

  const empty = document.getElementById('lead-empty');
  const wrap  = document.getElementById('lead-table-wrap');
  const tbody = document.getElementById('lead-tbody');
  if (list.length === 0) { empty.style.display='block'; wrap.style.display='none'; return; }
  empty.style.display='none'; wrap.style.display='block';

  tbody.innerHTML = list.map((l,i) => `
    <tr>
      <td>${i+1}</td>
      <td class="cust-name-cell"><strong>${escHtml(l.first+' '+l.last)}</strong></td>
      <td>${escHtml(l.company||'—')}</td>
      <td>${escHtml(l.email)}</td>
      <td><span style="font-size:0.8rem;color:#666">${escHtml(l.source||'—')}</span></td>
      <td>${badgeHtml(l.status)}</td>
      <td><div class="cust-actions">
        <button class="btn-edit"   onclick="editLead('${l.id}')">✎ Edit</button>
        <button class="btn-delete" onclick="deleteLead('${l.id}')">🗑 Delete</button>
      </div></td>
    </tr>`).join('');
}

// ======= PIPELINE / DEALS =======
function openDealModal(id) {
  if (id) {
    const d = getDeals().find(x => x.id === id); if (!d) return;
    document.getElementById('deal-edit-id').value    = d.id;
    document.getElementById('deal-title').value      = d.title;
    document.getElementById('deal-value').value      = d.value;
    document.getElementById('deal-stage').value      = d.stage;
    document.getElementById('deal-contact').value    = d.contact;
    document.getElementById('deal-close-date').value = d.closeDate;
    document.getElementById('deal-notes').value      = d.notes;
    document.getElementById('deal-modal-title').textContent = 'Edit Deal';
    document.getElementById('deal-submit-btn').textContent  = 'Save Changes';
  } else {
    document.getElementById('deal-form').reset();
    document.getElementById('deal-edit-id').value           = '';
    document.getElementById('deal-modal-title').textContent = 'New Deal';
    document.getElementById('deal-submit-btn').textContent  = 'Create Deal';
  }
  document.getElementById('deal-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDealModal() {
  document.getElementById('deal-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeDealModalOutside(e) {
  if (e.target === document.getElementById('deal-modal')) closeDealModal();
}

function handleDealSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('deal-edit-id').value;
  const deal = {
    id:        editId || Date.now().toString(),
    title:     document.getElementById('deal-title').value.trim(),
    value:     document.getElementById('deal-value').value,
    stage:     document.getElementById('deal-stage').value,
    contact:   document.getElementById('deal-contact').value.trim(),
    closeDate: document.getElementById('deal-close-date').value,
    notes:     document.getElementById('deal-notes').value.trim(),
  };
  const list = getDeals();
  if (editId) { const i = list.findIndex(d => d.id === editId); if (i !== -1) list[i] = deal; }
  else list.push(deal);
  saveDeals(list);
  renderPipeline();
  closeDealModal();
}

function deleteDeal(id) {
  if (!confirm('Delete this deal?')) return;
  saveDeals(getDeals().filter(d => d.id !== id));
  renderPipeline();
}

function moveDeal(id, stage) {
  const list = getDeals();
  const i = list.findIndex(d => d.id === id);
  if (i !== -1) { list[i].stage = stage; saveDeals(list); renderPipeline(); }
}

function renderPipeline() {
  const deals = getDeals();
  const board = document.getElementById('pipeline-board');
  board.innerHTML = PIPELINE_STAGES.map(stage => {
    const stageDealsList = deals.filter(d => d.stage === stage);
    const color = STAGE_COLORS[stage];
    return `
      <div class="pipeline-col">
        <div class="pipeline-col-header">
          <div class="pipeline-col-title" style="color:${color}">${stage}</div>
          <div class="pipeline-col-count">${stageDealsList.length}</div>
        </div>
        ${stageDealsList.map(d => `
          <div class="deal-card" onclick="openDealModal('${d.id}')">
            <div class="deal-card-title">${escHtml(d.title)}</div>
            <div class="deal-card-contact">${escHtml(d.contact||'—')}</div>
            <div class="deal-card-value">${d.value ? '$'+parseFloat(d.value).toLocaleString() : '—'}</div>
            <div class="deal-card-actions" onclick="event.stopPropagation()">
              <select onchange="moveDeal('${d.id}', this.value)" title="Move to stage">
                ${PIPELINE_STAGES.map(s => `<option value="${s}" ${s===stage?'selected':''}>${s}</option>`).join('')}
              </select>
              <button class="btn-delete" onclick="deleteDeal('${d.id}')" style="padding:0.2rem 0.5rem;font-size:0.75rem">🗑</button>
            </div>
          </div>`).join('')}
      </div>`;
  }).join('');
}

// ======= ACTIVITIES =======
function handleActivitySubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('act-edit-id').value;
  const act = {
    id:      editId || Date.now().toString(),
    type:    document.getElementById('act-type').value,
    related: document.getElementById('act-related').value.trim(),
    date:    document.getElementById('act-date').value,
    subject: document.getElementById('act-subject').value.trim(),
    notes:   document.getElementById('act-notes').value.trim(),
    status:  document.getElementById('act-status').value,
  };
  const list = getActivities();
  if (editId) { const i = list.findIndex(a => a.id === editId); if (i !== -1) list[i] = act; }
  else list.push(act);
  saveActivities(list);
  renderActivities();
  cancelActEdit();
  flashBtn('act-submit-btn', editId ? 'Updated! ✓' : 'Logged! ✓');
}

function editActivity(id) {
  const a = getActivities().find(a => a.id === id); if (!a) return;
  document.getElementById('act-edit-id').value   = a.id;
  document.getElementById('act-type').value      = a.type;
  document.getElementById('act-related').value   = a.related;
  document.getElementById('act-date').value      = a.date;
  document.getElementById('act-subject').value   = a.subject;
  document.getElementById('act-notes').value     = a.notes;
  document.getElementById('act-status').value    = a.status;
  document.getElementById('act-form-heading').textContent = 'Edit Activity';
  document.getElementById('act-submit-btn').textContent   = 'Save Changes';
  document.getElementById('act-cancel-btn').style.display = 'inline-block';
}

function cancelActEdit() {
  document.getElementById('act-edit-id').value           = '';
  document.getElementById('act-form-heading').textContent = 'Log Activity';
  document.getElementById('act-submit-btn').textContent   = 'Log Activity';
  document.getElementById('act-cancel-btn').style.display = 'none';
  document.getElementById('activity-form').reset();
}

function deleteActivity(id) {
  if (!confirm('Delete this activity?')) return;
  saveActivities(getActivities().filter(a => a.id !== id));
  renderActivities();
}

function renderActivities() {
  const query = (document.getElementById('act-search')?.value||'').toLowerCase();
  let list = getActivities().slice().reverse();
  if (query) list = list.filter(a =>
    (a.subject+a.related+a.type+a.status).toLowerCase().includes(query));

  document.getElementById('act-count').textContent = getActivities().length;

  const empty    = document.getElementById('act-empty');
  const timeline = document.getElementById('act-timeline');
  if (list.length === 0) { empty.style.display='block'; timeline.innerHTML=''; return; }
  empty.style.display = 'none';

  timeline.innerHTML = list.map((a, idx) => `
    <div class="act-item">
      <div class="act-icon-wrap">
        <div class="act-icon ${ACT_COLOR_MAP[a.type]||'act-note'}">${ACT_ICONS[a.type]||'📝'}</div>
        ${idx < list.length-1 ? '<div class="act-line"></div>' : ''}
      </div>
      <div class="act-body">
        <div class="act-subject">${escHtml(a.subject)}</div>
        <div class="act-meta">
          <span>📅 ${a.date||'—'}</span>
          ${a.related ? `<span>👤 ${escHtml(a.related)}</span>` : ''}
          <span>${escHtml(a.type)}</span>
          ${badgeHtml(a.status)}
        </div>
        ${a.notes ? `<div class="act-notes-text">${escHtml(a.notes)}</div>` : ''}
        <div class="act-actions">
          <button class="btn-edit"   onclick="editActivity('${a.id}')">✎ Edit</button>
          <button class="btn-delete" onclick="deleteActivity('${a.id}')">🗑 Delete</button>
        </div>
      </div>
    </div>`).join('');
}

// --- Shared flash helper ---
function flashBtn(id, msg) {
  const btn = document.getElementById(id);
  if (!btn) return;
  const orig = btn.textContent;
  btn.textContent = msg;
  btn.style.background = 'linear-gradient(135deg,#059669,#047857)';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1800);
}

// ===== INIT =====
initAuth();
renderCustomers();
renderCrmDashboard();
