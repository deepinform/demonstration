# 合规审查与风险评级系统 - 静态原型

本原型满足 PRD 要求：纯前端（HTML/CSS/JS + localStorage），角色流程闭环（Admin/Analyst/Manager），基于香港地区规则清单生成适用清单、实时计算评分与评级，任务流转与报告导出。

## 目录结构

```
prototype/
  index.html                # 登录
  dashboard.html            # 任务看板（所有角色可见）
  subjects.html             # 存量主体管理（检索主体、进入审查、查看报告）
  admin-templates.html      # Admin 知识库模板管理
  analyst-new.html          # Analyst 新建主体并生成适用清单
  subject.html              # 主体详情（审查与实时评分）
  review.html               # Manager 待审核列表（批准/退回）
  report.html               # 报告查看与打印导出（不在侧栏显示，供浮窗导出使用）
  assets/
    js/
      storage.js           # localStorage 封装、任务/用户/模板初始化
      ui.js                # 通用 UI（侧栏、状态徽标）
      hk_rules.js          # 香港规则清单 + 计算权重工具
```

## 使用说明（本地）

直接双击 `index.html` 打开浏览器即可体验（建议 Chrome/Edge）。选择用户登录：
- admin（Admin）
- alice（Analyst）
- mike（Manager）

## 角色流程

1. Admin：进入“知识库模板”，可创建/发布/废止模板（已内置一个已发布的香港模板）。
2. Analyst：进入“新建主体”，填写基本信息（含“是否涉及发行业务”），系统基于模板生成“适用清单”，并创建任务；在主体详情执行审查，实时计算“风险总分”和“评级”；提交审核后状态变更为“待审核”。
3. Manager：进入“待审核”，可查看主体详情与评分；执行“批准”将归档（已完成），或“退回”并填写理由（主体/任务状态更新为已退回）。当 Analyst 对已完成主体“重新发起审核”后，Manager 在消息栏审批并可将主体置为“已失效”。
4. 报告：在“存量主体管理”点击“点击查看”打开报告浮窗；仅当主体状态为“已完成”时可导出为 PDF，否则提示“该主体未完成风险审查”。

## 评分与评级规则（实现要点）

- 必须性：当规则标注“是”则必须；“否”则非必须；“涉及发行业务”则取主体字段 `issuerBiz` 是否为“是”。
- 权重：依据 PRD
  - 必须+高=5、非必须+高=4、必须+中=3、非必须+中=2、必须+低=2、非必须+低=1。
- 结论系数：符合=100%，不符合=0%。
- 风险总分：实际总得分/总权重分×100。
- 评级：<80 高风险；80-89 中风险；≥90 低风险。

## GitHub Pages 部署

1. 新建 GitHub 仓库（Public）。
2. 将 `prototype/` 目录内所有文件上传到仓库根目录（或作为子目录也可，但建议根目录以便直接访问）。
3. 在仓库 Settings > Pages：
   - Source 选择 `Deploy from a branch`
   - Branch 选择 `main` 分支与根目录 `/`，保存。
4. 等待几分钟，GitHub 会生成访问链接，访问 `index.html` 即可。

## 操作指南（快速入口）

- 登录：`index.html`
- 任务看板：`dashboard.html`
- 存量主体管理：`subjects.html`
- Admin 模板管理：`admin-templates.html`
- Analyst 新建主体：`analyst-new.html`
- 主体详情：`subject.html?subjectId=S1`（示例）
- Manager 待审核：`review.html`
- 报告（辅助页，不在侧栏）：`report.html?subjectId=...`

## 重要操作逻辑

- 同名主体校验（同地区+同名）：
  - 只要存在状态≠“已失效”的同名主体，则拒绝创建，并弹窗展示该主体基础信息。
- 重新发起审核：
  - Analyst 在 `subject.html` 的“已完成”主体下方点击“重新发起审核”，提交申请；
  - Manager 在 `review.html` 的消息栏批准后，主体状态置为“已失效”，并通知 Analyst；
  - Analyst 在 `dashboard.html` 消息中点击“更新主体信息”，跳转 `analyst-new.html?cloneFrom=...` 预填基础信息并按新增流程继续；
  - “已失效”主体不可编辑清单内容，直到新主体流程完成。


