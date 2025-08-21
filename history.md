---
layout: page
aside: false
outline: false
sidebar: false
title: 团队发展时间轴
---

<style>
    body { background:#f7f7f7 !important; }
:root {
  /* 整体最大宽度 & 内边距 */
  --timeline-max-width: 680px;
  --timeline-padding: 1rem;

  /* 年份卡片 */
  --year-font-size: 2.25rem;   /* 36px */
  --year-font-style: italic;
  --year-font-weight: 700;
  --year-padding: 1.5rem;
  --year-radius: 16px;
  --year-shadow: 0 4px 12px rgba(0,0,0,.08);

  /* 事件卡片 */
  --event-padding: 12px 16px;
  --event-radius: 12px;
  --event-shadow: 0 2px 6px rgba(0,0,0,.06);
  --event-gap: 12px;

  /* 时间轴竖线 & 圆点 */
  --axis-color: #d1d5db;
  --axis-width: 2px;
  --dot-size: 14px;
}

/* 时间轴容器 */
.timeline {
  position: relative;
  max-width: var(--timeline-max-width);
  margin: 0 auto;
  padding: var(--timeline-padding);
  padding-left: 40px;       /* 左侧给竖线留空间 */
}
.timeline::before {
  content: "";
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: var(--axis-width);
  background: var(--axis-color);
}

/* 每年大卡片 */
.timeline-year {
  position: relative;
  margin-bottom: 3rem;
  border-radius: var(--year-radius);
  box-shadow: var(--year-shadow);
  padding: var(--year-padding);
}
/* 左侧圆点定位 */
.timeline-year::before {
  content: "";
  position: absolute;
  left: calc(-1 * var(--dot-size) / 2 - 20px);
  top: calc(var(--year-padding) + 0.6rem);
  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--axis-color);
  z-index: 2;
}

/* 年份标题 */
.year-title {
  font-size: var(--year-font-size);
  font-style: var(--year-font-style);
  font-weight: var(--year-font-weight);
  margin: 0 0 1rem 0;
  color: #fff;
}

/* 事件卡片容器（内层） */
.events {
  display: flex;
  flex-direction: column;
  gap: var(--event-gap);
}

/* 事件小卡片 */
.event-card {
  background: #fff;
  border-radius: var(--event-radius);
  padding: var(--event-padding);
  box-shadow: var(--event-shadow);
  font-size: 14px;
  line-height: 1.6;
}

/* 马卡龙色随机渐变（共 12 组，可循环）*/
.timeline-year:nth-child(12n+1) { background:linear-gradient(135deg,#ffecd2,#fcb69f); }
.timeline-year:nth-child(12n+2) { background:linear-gradient(135deg,#a8edea,#fed6e3); }
.timeline-year:nth-child(12n+3) { background:linear-gradient(135deg,#ff9a9e,#fad0c4); }
.timeline-year:nth-child(12n+4) { background:linear-gradient(135deg,#fbc2eb,#a6c1ee); }
.timeline-year:nth-child(12n+5) { background:linear-gradient(135deg,#fdcbf1,#e6dee9); }
.timeline-year:nth-child(12n+6) { background:linear-gradient(135deg,#a1c4fd,#c2e9fb); }
.timeline-year:nth-child(12n+7) { background:linear-gradient(135deg,#d4fc79,#96e6a1); }
.timeline-year:nth-child(12n+8) { background:linear-gradient(135deg,#84fab0,#8fd3f4); }
.timeline-year:nth-child(12n+9) { background:linear-gradient(135deg,#f6d365,#fda085); }
.timeline-year:nth-child(12n+10){ background:linear-gradient(135deg,#ffecd2,#fcb69f); }
.timeline-year:nth-child(12n+11){ background:linear-gradient(135deg,#a8edea,#fed6e3); }
.timeline-year:nth-child(12n+12){ background:linear-gradient(135deg,#ff9a9e,#fad0c4); }
</style>

<!-- ===== 内容 ===== -->
<div class="timeline">

  <!-- 2020 -->
  <section class="timeline-year">
    <h2 class="year-title">2020</h2>
    <div class="events">
      <div class="event-card">4月：明月庄主内服独立，ANS破军天赋服务器成立，ADWS工作室萌芽</div>
      <div class="event-card">5月：Alioth-DWS首批成员聚集，准备独立</div>
      <div class="event-card">6月：ADWS部分玩家被ANS踢出，借此契机和ANS宣告分裂</div>
      <div class="event-card">7月：ADWS服务器一周目生电服计划启动</div>
      <div class="event-card">8月：元素计划提出</div>
      <div class="event-card">9月：元素计划正式实施，服务器改组，GeDK、GaDK成立</div>
    </div>
  </section>

  <!-- 2021 -->
  <section class="timeline-year">
    <h2 class="year-title">2021</h2>
    <div class="events">
      <div class="event-card">1月29日：GeDK一周目结束，服务器改组，引进新人，二周目开启</div>
      <div class="event-card">7月1日：服务器自主研发mod计划开始</div>
    </div>
  </section>

  <!-- 2022 -->
  <section class="timeline-year">
    <h2 class="year-title">2022</h2>
    <div class="events">
      <div class="event-card">1月：二周目由于特殊情况结束</div>
      <div class="event-card">2月：三周目开启</div>
    </div>
  </section>

  <!-- 2023 -->
  <section class="timeline-year">
    <h2 class="year-title">2023</h2>
    <div class="events">
      <div class="event-card">2月7日：服务器三周目结束，生电服阶段完结</div>
      <div class="event-card">7月：mod生存计划（四周目）开启，引进机械动力等mod试图营造不同的社交游戏体验</div>
      <div class="event-card">10月：四周目结束</div>
      <div class="event-card">10月27日：新服务器（五周目）正式开启，定为养老生活服务器，旨在寻得现实生活之外的一片秘境</div>
    </div>
  </section>

  <!-- 2024 -->
  <section class="timeline-year">
    <h2 class="year-title">2024</h2>
    <div class="events">
      <div class="event-card">2月：五周目并不顺利，结束关服，开始帕鲁服务器的运营</div>
      <div class="event-card">7月4日：六周目开始，与四周目相同为机械动力等mod生存</div>
    </div>
  </section>

  <!-- 2025 -->
  <section class="timeline-year">
    <h2 class="year-title">2025</h2>
    <div class="events">
      <div class="event-card">2月20日：自费购入Mac mini M4，准备开启新周目</div>
      <div class="event-card">3月9日：服务器新周目开启，版本1.21，服务器改名为MCOO墨客小筑，原版生存的基础上进行建筑建造</div>
      <div class="event-card">6月23日：因为服主要备战教资与公考，没有精力管理服务器，暂时关服，择机再开</div>
      <div class="event-card">8月20日：五周年之际，MCOO网站开始运营</div>
    </div>
  </section>

  <!-- 以后只需复制 <section class="timeline-year"> ... </section>，新一年自动随机马卡龙色 -->
</div>