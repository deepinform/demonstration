function renderSidebar(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const user = Proto.getCurrentUser();
  const role = user ? user.role : '';
  el.innerHTML = `
    <div id=\"appSidebar\" class=\"fixed top-0 left-0 h-screen w-64 bg-white border-r z-40 transition-all\">
      <div class=\"p-4 font-semibold text-lg flex items-center justify-between\">
        <span class=\"sb-label\">合规审查原型</span>
        <button id=\"sbToggle\" class=\"text-sm text-blue-600 hover:underline sb-label\">隐藏</button>
      </div>
      <nav class=\"px-2 space-y-1\">
        <a href=\"./dashboard.html\" class=\"flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50\"><span>🎯</span><span class=\"sb-label\">任务看板</span></a>
        <a href=\"./subjects.html\" class=\"flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50\"><span>🏙️</span><span class=\"sb-label\">存量主体管理</span></a>
        ${role === 'Admin' ? '<a href="./admin-templates.html" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50"><span>📚</span><span class="sb-label">知识库模板</span></a>' : ''}
        ${role === 'Analyst' ? '<a href="./analyst-new.html" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50"><span>➕</span><span class="sb-label">新建主体</span></a>' : ''}
        ${role === 'Manager' ? '<a href="./review.html" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50"><span>🔎</span><span class="sb-label">待审核</span></a>' : ''}
        <button id="logoutBtn" class="w-full text-left px-3 py-2 rounded hover:bg-red-50 text-red-600 flex items-center gap-3"><span>🔴</span><span class="sb-label">退出登录</span></button>
      </nav>
      <div class=\"absolute bottom-10 left-0 right-0 px-3 text-xs text-gray-600\">
        <div class=\"sb-label\">当前操作人：${user ? user.username : '-'}<\/div>
        <div class=\"sb-label\">角色：${role || '-'}<\/div>
        <div class=\"sb-label mt-3\">版权所有 © 2025 deepinform<\/div>
        <div class=\"sb-label mt-1\">deepinform专注于金融与互联网领域的法律合规与风险内控管理，欢迎业务咨询与交流建联<\/div>
        <div class=\"sb-label mt-1\">联系方式：<a class=\"text-blue-600 hover:underline\" href=\"mailto:m18902001867@163.com\">m18902001867@163.com<\/a><\/div>
        <div class=\"sb-label mt-1\">联系表单：<a class=\"text-blue-600 hover:underline\" href=\"https://docs.qq.com/form/page/DU2xoSFdHbHVMSFBH\" target=\"_blank\" rel=\"noopener noreferrer\">点击留言<\/a><\/div>
      </div>
      <div class=\"absolute bottom-2 left-0 right-0 flex justify-center\">
        <button id=\"sbToggleBottom\" class=\"w-8 h-8 rounded-full border flex items-center justify-center hover:bg-blue-50\" title=\"展开/收起\">⮜</button>
      </div>
    </div>
  `;
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      Proto.LS.remove('proto_current_user');
      window.location.href = './index.html';
    });
  }

  // Sidebar toggle
  const sb = document.getElementById('appSidebar');
  const main = document.getElementById('main');
  const key = '__sidebar_collapsed';
  function applySidebarState() {
    const collapsed = Proto.LS.get(key, false);
    if (collapsed) {
      // collapsed: narrow sidebar
      sb.style.width = '4rem';
      if (main) { main.classList.remove('ml-64'); if (!main.classList.contains('ml-16')) main.classList.add('ml-16'); }
      // hide labels
      sb.querySelectorAll('.sb-label').forEach(n => n.style.display = 'none');
    } else {
      sb.style.width = '16rem';
      if (main) { main.classList.remove('ml-16'); if (!main.classList.contains('ml-64')) main.classList.add('ml-64'); }
      sb.querySelectorAll('.sb-label').forEach(n => n.style.display = '');
    }
  }
  const toggleBtn = document.getElementById('sbToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const collapsed = !!Proto.LS.get(key, false);
      Proto.LS.set(key, !collapsed);
      applySidebarState();
      toggleBtn.textContent = Proto.LS.get(key, false) ? '显示' : '隐藏';
    });
  }
  const toggleBottom = document.getElementById('sbToggleBottom');
  if (toggleBottom) {
    toggleBottom.addEventListener('click', () => {
      const collapsed = !!Proto.LS.get(key, false);
      Proto.LS.set(key, !collapsed);
      applySidebarState();
    });
  }
  applySidebarState();
}

function statusBadge(status) {
  const map = {
    '未经审查': 'bg-gray-100 text-gray-700',
    '审查中': 'bg-blue-100 text-blue-700',
    '待审核': 'bg-yellow-100 text-yellow-700',
    '已退回': 'bg-red-100 text-red-700',
    '已完成': 'bg-green-100 text-green-700'
  };
  const cls = map[status] || 'bg-gray-100 text-gray-700';
  return `<span class="px-2 py-1 text-xs rounded ${cls}">${status}</span>`;
}

function riskBadge(level) {
  const map = { '高': 'bg-red-100 text-red-700', '中': 'bg-yellow-100 text-yellow-700', '低': 'bg-green-100 text-green-700' };
  const cls = map[level] || 'bg-gray-100 text-gray-700';
  return `<span class="px-2 py-1 text-xs rounded ${cls}">${level}</span>`;
}

// Prevent body scroll when scrolling inside an element
function isolateScroll(el) {
  if (!el) return;
  el.addEventListener('wheel', (e) => {
    const delta = e.deltaY;
    const atTop = el.scrollTop === 0;
    const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;
    const goingUp = delta < 0;
    const goingDown = delta > 0;
    if ((goingUp && !atTop) || (goingDown && !atBottom)) {
      e.preventDefault();
      el.scrollTop += delta;
    }
  }, { passive: false });
  // Touch support
  let startY = 0;
  el.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; }, { passive: true });
  el.addEventListener('touchmove', (e) => {
    const dy = startY - e.touches[0].clientY;
    const atTop = el.scrollTop === 0;
    const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;
    if ((dy > 0 && !atBottom) || (dy < 0 && !atTop)) {
      e.preventDefault();
      el.scrollTop += dy;
    }
  }, { passive: false });
}

// Horizontal scroll isolation
function isolateHorizontalScroll(el) {
  if (!el) return;
  el.addEventListener('wheel', (e) => {
    const dx = e.deltaX || (e.shiftKey ? e.deltaY : 0);
    const atLeft = el.scrollLeft === 0;
    const atRight = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;
    const goingLeft = dx < 0;
    const goingRight = dx > 0;
    if ((goingLeft && !atLeft) || (goingRight && !atRight)) {
      e.preventDefault();
      el.scrollLeft += dx;
    }
  }, { passive: false });
  // Touch support
  let startX = 0;
  el.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchmove', (e) => {
    const dx = startX - e.touches[0].clientX;
    const atLeft = el.scrollLeft === 0;
    const atRight = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;
    if ((dx > 0 && !atRight) || (dx < 0 && !atLeft)) {
      e.preventDefault();
      el.scrollLeft += dx;
    }
  }, { passive: false });
}

window.UI = { renderSidebar, statusBadge, riskBadge, isolateScroll, isolateHorizontalScroll };


// Invitation code gate: enforce 90s limit until correct code is provided
(function inviteCodeGate(){
  try {
    // Login页未引入本文件；本逻辑仅在业务页面生效
    var OK_FLAG = 'rc_shield_invited_ok';
    var REQUIRED_CODE = 'H11ZK14JDX';
    var ok = (localStorage.getItem(OK_FLAG) === '1');

    // 未通过邀请码前：每次进入业务页都彻底重置系统数据（包括登录状态、用户、模板等）
    if (!ok) {
      try {
        localStorage.clear();
        // 重新写入系统默认数据（默认用户/模板等）
        if (typeof bootstrapDefaults === 'function') { bootstrapDefaults(); }
      } catch(e) {}
    }

    // 已放行则不计时
    if (ok) return;

    // 90秒后弹窗
    var t = setTimeout(function showInviteModal(){
      // 若期间已通过则不再弹窗
      if (localStorage.getItem(OK_FLAG) === '1') return;
      var wrap = document.createElement('div');
      wrap.innerHTML = '' +
        '<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">' +
        '  <div class="bg-white rounded-xl shadow p-6 w-[720px] max-w-[92vw]">' +
        '    <div class="text-lg font-semibold mb-2">访问受限</div>' +
        '    <div class="text-sm text-gray-700 leading-6">' +
        '      您已经超过了最大访问时间，如需体验产品完整功能，请输入邀请码，填写表单或者通过邮件联系我们以获取产品邀请码。' +
        '    </div>' +
        '    <div class="mt-3 text-sm text-gray-700">' +
        '      邮箱：<a class="text-blue-600 hover:underline" href="mailto:m18902001867@163.com">m18902001867@163.com</a>' +
        '      <span class="mx-2">｜</span>' +
        '      <a class="text-blue-600 hover:underline" href="https://docs.qq.com/form/page/DU2xoSFdHbHVMSFBH" target="_blank" rel="noopener noreferrer">获取邀请码</a>' +
        '    </div>' +
        '    <div class="mt-4">' +
        '      <label class="block text-sm text-gray-600 mb-1">邀请码</label>' +
        '      <input id="inviteCodeInput" class="border rounded px-3 py-2 w-full" placeholder="请输入邀请码" />' +
        '      <div id="inviteErr" class="text-xs text-red-600 mt-2 hidden">邀请码不正确</div>' +
        '    </div>' +
        '    <div class="mt-4 text-right space-x-2">' +
        '      <button id="inviteExit" class="px-4 py-2 border rounded text-red-700 border-red-300 hover:bg-red-50">退出系统</button>' +
        '      <button id="inviteSubmit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">提交</button>' +
        '    </div>' +
        '  </div>' +
        '</div>';
      document.body.appendChild(wrap);

      var input = document.getElementById('inviteCodeInput');
      var err = document.getElementById('inviteErr');
      var submit = document.getElementById('inviteSubmit');
      var exitBtn = document.getElementById('inviteExit');

      if (submit) {
        submit.addEventListener('click', function(){
          var v = (input && input.value ? String(input.value).trim() : '');
          if (v === REQUIRED_CODE) {
            try { localStorage.setItem(OK_FLAG, '1'); } catch(e) {}
            if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
          } else {
            if (err) err.classList.remove('hidden');
          }
        });
      }
      if (exitBtn) {
        exitBtn.addEventListener('click', function(){
          try { Proto.LS.remove('proto_current_user'); } catch(e) {}
          try { window.open('', '_self'); window.close(); } catch(e) {}
          window.location.replace('./index.html');
        });
      }
    }, 60000);
    // 不暴露定时器句柄；按需可取消
  } catch (e) {
    // fail open
  }
})();

