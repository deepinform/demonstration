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


