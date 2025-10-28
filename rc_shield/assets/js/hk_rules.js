// 香港地区规则清单（节选，覆盖多领域与不同风险/必须性，供原型演示）
// 字段：region, domain, subdomain, item, basis, mustRule, riskLevel
// mustRule: "是" | "否" | "涉及发行业务"

const HK_RULES = [
  // 主体资质｜牌照与许可（4）
  { region: 'HK', domain: '主体资质', subdomain: '牌照与许可', item: '虚拟资产服务牌照持有情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章，简称 “AMLO”）第 5B 部', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '主体资质', subdomain: '牌照与许可', item: '牌照有效期与业务匹配度', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 5B 部', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '主体资质', subdomain: '牌照与许可', item: '相联实体资质合规性', basis: '《适用于持牌法团相联实体及证监会持牌虚拟资产服务提供者的反洗钱及反恐融资指引》', mustRule: '是', riskLevel: '中' },
  { region: 'HK', domain: '主体资质', subdomain: '牌照与许可', item: '证券类业务牌照获取情况', basis: '《证券及期货条例》（第 571 章）', mustRule: '涉及发行业务', riskLevel: '高' },

  // 主体资质｜法律主体资格（5）
  { region: 'HK', domain: '主体资质', subdomain: '法律主体资格', item: '注册文件真实性有效性', basis: '《公司条例》（第 622 章）', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '主体资质', subdomain: '法律主体资格', item: '法团注册合规性', basis: '《公司条例》（第 622 章）', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '主体资质', subdomain: '法律主体资格', item: '非香港公司注册备案情况', basis: '无特定专项条款，参考公司注册相关通用规定', mustRule: '是', riskLevel: '中' },
  { region: 'HK', domain: '主体资质', subdomain: '法律主体资格', item: 'ICO 业务文件披露情况', basis: '无特定专项条款，参考虚拟资产监管通用要求', mustRule: '涉及发行业务', riskLevel: '高' },
  { region: 'HK', domain: '主体资质', subdomain: '法律主体资格', item: 'ICO 业务代币属性明确情况', basis: '无特定专项条款，参考虚拟资产监管通用要求', mustRule: '涉及发行业务', riskLevel: '高' },

  // 主体资质｜股权与控制权（5）
  { region: 'HK', domain: '主体资质', subdomain: '股权与控制权', item: '股权结构清晰度', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRQ 条', mustRule: '是', riskLevel: '中' },
  { region: 'HK', domain: '主体资质', subdomain: '股权与控制权', item: '最终拥有人身份背景合规性', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRQ 条', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '主体资质', subdomain: '股权与控制权', item: '最终拥有人资金来源合规性', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRQ 条', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '主体资质', subdomain: '股权与控制权', item: '规避监管持股情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRQ 条', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '主体资质', subdomain: '股权与控制权', item: '跨境股权结构合规性', basis: '国际税收相关规则', mustRule: '否', riskLevel: '中' },

  // 主体资质｜关键人员资质（7）
  { region: 'HK', domain: '主体资质', subdomain: '关键人员资质', item: '“适当人选” 评估通过情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRJ 条', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '主体资质', subdomain: '关键人员资质', item: '无犯罪记录情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRJ 条', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '主体资质', subdomain: '关键人员资质', item: '专业背景合规性', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRJ 条', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '主体资质', subdomain: '关键人员资质', item: '财务稳健性', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRJ 条', mustRule: '是', riskLevel: '中' },
  { region: 'HK', domain: '主体资质', subdomain: '关键人员资质', item: '无违规破产清盘记录情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRJ 条', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '主体资质', subdomain: '关键人员资质', item: '核心业务人员专业资质合规性', basis: '无特定专项条款，参考虚拟资产服务人员资质通用要求', mustRule: '否', riskLevel: '中' },
  { region: 'HK', domain: '主体资质', subdomain: '关键人员资质', item: '核心业务人员从业合规记录情况', basis: '无特定专项条款，参考虚拟资产服务人员资质通用要求', mustRule: '否', riskLevel: '中' },

  // 合规体系｜AML/CFT 制度（6）
  { region: 'HK', domain: '合规体系', subdomain: '反洗钱及反恐融资（AML/CFT）制度', item: 'AML/CFT 政策制定情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '反洗钱及反恐融资（AML/CFT）制度', item: 'AML/CFT 程序制定情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '反洗钱及反恐融资（AML/CFT）制度', item: 'AML/CFT 管控措施制定情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '反洗钱及反恐融资（AML/CFT）制度', item: '全流程覆盖情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '反洗钱及反恐融资（AML/CFT）制度', item: '加密货币交易风险识别机制建立情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '反洗钱及反恐融资（AML/CFT）制度', item: '代币兑换风险识别机制建立情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },

  // 合规体系｜客户尽职调查流程（10）
  { region: 'HK', domain: '合规体系', subdomain: '客户尽职调查流程', item: '新客户个人身份验证情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '客户尽职调查流程', item: '新客户法人身份验证情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '客户尽职调查流程', item: '高风险客户强化尽职调查情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '客户尽职调查流程', item: '现有客户身份信息复核情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '客户尽职调查流程', item: '现有客户风险等级复核情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '客户尽职调查流程', item: '休眠账户重新评估情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '否', riskLevel: '中' },
  { region: 'HK', domain: '合规体系', subdomain: '客户尽职调查流程', item: '大额交易资金来源核实情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '客户尽职调查流程', item: '大额交易交易目的核实情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '客户尽职调查流程', item: '跨境交易资金来源核实情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '客户尽职调查流程', item: '跨境交易交易目的核实情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },

  // 合规体系｜可疑交易管理（6）
  { region: 'HK', domain: '合规体系', subdomain: '可疑交易管理', item: '可疑交易识别机制建立情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》附录 B', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '可疑交易管理', item: '可疑交易及时报告情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '可疑交易管理', item: '可疑交易记录留存情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '中' },
  { region: 'HK', domain: '合规体系', subdomain: '可疑交易管理', item: '价格异常波动监测指标设置情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '可疑交易管理', item: '高频交易监测指标设置情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '可疑交易管理', item: '可疑交易记录留存情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '中' },

  // 合规体系｜合规培训与监督（11）
  { region: 'HK', domain: '合规体系', subdomain: '合规培训与监督', item: 'AML/CFT 培训开展情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '中' },
  { region: 'HK', domain: '合规体系', subdomain: '合规培训与监督', item: '虚拟资产监管法规培训开展情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '中' },
  { region: 'HK', domain: '合规体系', subdomain: '合规培训与监督', item: '培训记录完整性', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '否', riskLevel: '中' },
  { region: 'HK', domain: '合规体系', subdomain: '合规培训与监督', item: '独立合规部门设立情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '合规培训与监督', item: '合规人员权限充足性', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '否', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '合规培训与监督', item: '合规人员专业能力情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '否', riskLevel: '高' },
  { region: 'HK', domain: '合规体系', subdomain: '合规培训与监督', item: '内部合规检查开展情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '是', riskLevel: '中' },
  { region: 'HK', domain: '合规体系', subdomain: '合规培训与监督', item: 'ICO 业务培训内容更新情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '涉及发行业务', riskLevel: '中' },
  { region: 'HK', domain: '合规体系', subdomain: '合规培训与监督', item: '加密货币挖矿业务培训内容更新情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '否', riskLevel: '中' },
  { region: 'HK', domain: '合规体系', subdomain: '合规培训与监督', item: 'ICO 业务合规检查标准更新情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '涉及发行业务', riskLevel: '中' },
  { region: 'HK', domain: '合规体系', subdomain: '合规培训与监督', item: '加密货币挖矿业务合规检查标准更新情况', basis: '《持牌法团及证监会持牌虚拟资产服务提供者指引》', mustRule: '否', riskLevel: '中' },

  // 风险管理和内部控制｜风险管理制度（7）
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '风险管理制度', item: '全业务风险管理制度制定情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRK 条牌照条件', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '风险管理制度', item: '市场风险管控流程制定情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRK 条牌照条件', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '风险管理制度', item: '信用风险管控流程制定情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRK 条牌照条件', mustRule: '是', riskLevel: '中' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '风险管理制度', item: '操作风险管控流程制定情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRK 条牌照条件', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '风险管理制度', item: '合规风险管控流程制定情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRK 条牌照条件', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '风险管理制度', item: '证券型代币差异化风险管控措施制定情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRK 条牌照条件', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '风险管理制度', item: '实用型代币差异化风险管控措施制定情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRK 条牌照条件', mustRule: '是', riskLevel: '中' },

  // 风险管理和内部控制｜技术风险防控（9）
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '技术风险防控', item: '技术系统合规性', basis: '无特定专项条款，参考行业技术标准', mustRule: '否', riskLevel: '高' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '技术风险防控', item: '虚拟资产存储安全措施情况', basis: '无特定专项条款，参考行业技术安全标准', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '技术风险防控', item: '交易系统稳定性', basis: '无特定专项条款，参考行业技术标准', mustRule: '是', riskLevel: '中' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '技术风险防控', item: '网络安全防护措施情况', basis: '无特定专项条款，参考行业网络安全标准', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '技术风险防控', item: '技术风险评估开展情况', basis: '无特定专项条款，参考行业技术风险管理标准', mustRule: '否', riskLevel: '中' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '技术风险防控', item: '漏洞测试开展情况', basis: '无特定专项条款，参考行业技术风险管理标准', mustRule: '是', riskLevel: '中' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '技术风险防控', item: '技术故障应急预案制定情况', basis: '无特定专项条款，参考行业技术应急标准', mustRule: '是', riskLevel: '中' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '技术风险防控', item: '区块链分叉应对机制制定情况', basis: '无特定专项条款，参考行业技术风险应对标准', mustRule: '是', riskLevel: '低' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '技术风险防控', item: '代币空投应对机制制定情况', basis: '无特定专项条款，参考行业技术风险应对标准', mustRule: '是', riskLevel: '低' },

  // 风险管理和内部控制｜客户资产保护（4）
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '客户资产保护', item: '客户资产分离存放情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRT 条', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '客户资产保护', item: '客户虚拟资产安全措施情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRT 条', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '客户资产保护', item: '客户资产账目核对情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRT 条', mustRule: '是', riskLevel: '高' },
  { region: 'HK', domain: '风险管理和内部控制', subdomain: '客户资产保护', item: '账目核对记录留存情况', basis: '《打击洗钱及恐怖分子资金筹集条例》（第 615 章）第 53ZRT 条', mustRule: '是', riskLevel: '中' }
];

// 计算基于必须性与风险等级的权重
function computeWeight(mustFinal, riskLevel) {
  const isMust = mustFinal === '必须';
  if (isMust && riskLevel === '高') return 5;
  if (!isMust && riskLevel === '高') return 4;
  if (isMust && riskLevel === '中') return 3;
  if (!isMust && riskLevel === '中') return 2;
  if (isMust && riskLevel === '低') return 2;
  // 非必须 + 低
  return 1;
}

function resolveMustFinal(mustRule, subjectBasic) {
  if (mustRule === '是') return '必须';
  if (mustRule === '否') return '非必须';
  // 条件：涉及发行业务
  const involved = (subjectBasic && subjectBasic.issuerBiz) === '是';
  return involved ? '必须' : '非必须';
}

window.HK_RULES = HK_RULES;
window.RuleUtils = { computeWeight, resolveMustFinal };


