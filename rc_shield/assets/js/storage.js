// LocalStorage helpers for the prototype
const LS = {
  get(key, defaultValue) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null || raw === undefined) return defaultValue;
      return JSON.parse(raw);
    } catch (e) {
      return defaultValue;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

const ID = {
  next(key) {
    const k = `__seq_${key}`;
    const n = Number(localStorage.getItem(k) || 0) + 1;
    localStorage.setItem(k, String(n));
    return n;
  }
};

function generateSubjectId(region) {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  const dateKey = `${y}${m}${d}`;
  const k = `__seq_SUBJECT_${region}_${dateKey}`;
  const n = Number(localStorage.getItem(k) || 0) + 1;
  localStorage.setItem(k, String(n));
  const nn = String(n).padStart(2, '0');
  return `${region}${dateKey}${nn}`;
}

// Bootstrap default users and one default HK template if not present
function bootstrapDefaults() {
  const users = LS.get('proto_users', null);
  if (!users) {
    LS.set('proto_users', [
      { username: 'admin', role: 'Admin' },
      { username: 'alice', role: 'Analyst' },
      { username: 'mike', role: 'Manager' }
    ]);
  }
  const templates = LS.get('proto_templates', null);
  if (!templates) {
    LS.set('proto_templates', [
      {
        id: 'HK_DEFAULT',
        name: '香港-通用检查清单',
        region: 'HK',
        version: 'v1.0',
        status: '已发布',
        publishAt: new Date().toISOString(),
        items: [],
        rulesSource: 'HK_RULES',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  }
  if (!LS.get('proto_tasks', null)) LS.set('proto_tasks', []);
  if (!LS.get('proto_subjects', null)) LS.set('proto_subjects', []);
  if (!LS.get('proto_messages', null)) LS.set('proto_messages', []);
}

bootstrapDefaults();

function getCurrentUser() {
  return LS.get('proto_current_user', null);
}

function requireAuth(roles) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = './index.html';
    return null;
  }
  if (roles && roles.length && !roles.includes(user.role)) {
    alert('无权访问此页面');
    window.location.href = './dashboard.html';
    return null;
  }
  return user;
}

function createTaskFromSubject(subject, analystUsername) {
  const tasks = LS.get('proto_tasks', []);
  const task = {
    id: `T${ID.next('task')}`,
    subjectId: subject.id,
    companyName: subject.basic.name,
    analyst: analystUsername,
    status: '未经审查',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    history: [
      { at: new Date().toISOString(), by: analystUsername, action: '创建任务' }
    ]
  };
  tasks.unshift(task);
  LS.set('proto_tasks', tasks);
  return task;
}

function updateTaskStatus(taskId, status, byUser, extra) {
  const tasks = LS.get('proto_tasks', []);
  const t = tasks.find(x => x.id === taskId);
  if (!t) return;
  t.status = status;
  t.updatedAt = new Date().toISOString();
  t.history.push({ at: t.updatedAt, by: byUser, action: status, ...extra });
  LS.set('proto_tasks', tasks);
}

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function formatDateTime(iso) {
  try {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  } catch (e) {
    return iso;
  }
}

window.Proto = {
  LS,
  ID,
  generateSubjectId,
  getCurrentUser,
  requireAuth,
  createTaskFromSubject,
  updateTaskStatus,
  getQueryParam,
  formatDateTime,
  Messages: {
    list(filter) {
      const msgs = LS.get('proto_messages', []);
      if (!filter) return msgs;
      return msgs.filter(m => Object.keys(filter).every(k => m[k] === filter[k]));
    },
    push(msg) {
      const msgs = LS.get('proto_messages', []);
      const now = new Date().toISOString();
      const m = { id: 'MSG_' + ID.next('msg'), createdAt: now, updatedAt: now, status: msg.status || '待审批', ...msg };
      msgs.unshift(m);
      LS.set('proto_messages', msgs);
      return m;
    },
    update(id, patch) {
      const msgs = LS.get('proto_messages', []);
      const i = msgs.findIndex(x => x.id === id);
      if (i >= 0) {
        msgs[i] = { ...msgs[i], ...patch, updatedAt: new Date().toISOString() };
        LS.set('proto_messages', msgs);
        return msgs[i];
      }
      return null;
    }
  }
};


