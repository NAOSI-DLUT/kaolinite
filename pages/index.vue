<template>
  <div class="banner">
    <h1 class="title"><img src="/logo.svg" height="40px" /> Quiz</h1>
    <p>网络与开源软件协会百团大战综合答题平台</p>
    <ElButton type="primary" @click="navigateTo('/quiz')">进入答题平台</ElButton>
  </div>
  <main>
    <h3>NAOSI 是什么？</h3>
    <p>
      NAOSI（网络与开源软件协会）是一个致力于推广和普及开源软件及其文化的学生组织。我们通过举办各种活动和讲座，帮助学生了解和掌握开源软件的使用和开发。我们的目标是培养学生的创新精神和实践能力，推动开源软件在校园内外的发展。
    </p>
    <p>加入 NAOSI，你可以收获：</p>
    <ul>
      <li>结识志同道合的伙伴，一起开发项目、参与比赛和交流</li>
      <li>锻炼 Git、Linux 与现代项目开发等课内所学不到的能力</li>
      <li>参与保研、就业wo谈会，学习优秀学长学姐的经验分享</li>
    </ul>
    <h3>如何加入 NAOSI？</h3>
    <ul>
      <li>例会/聊天 QQ 群：<a href="https://qm.qq.com/q/9F2CFKdubC">724021138</a></li>
      <li>我也想参与 NAOSI 的项目开发！NAOSI Dev QQ群：<a href="https://qm.qq.com/q/JvpPneLkoo">704159634</a></li>
    </ul>
    <h3>有关 NAOSI 的更多资源——</h3>
    <ul>
      <li>NAOSI 官网：<a href="https://naosi.org">naosi.org</a></li>
      <li>大工生存手册：<a href="https://man.naosi.org">man.naosi.org</a></li>
      <li>NAOSI 学习资料云盘：<a href="https://pan.naosi.org">pan.naosi.org</a></li>
      <li>NAOSI GitHub：<a href="https://github.com/NAOSI-DLUT">NAOSI-DLUT</a></li>
    </ul>
    <p class="copy">© NAOSI 网络与开源软件协会</p>
  </main>
</template>

<style scoped>
.banner {
  text-align: center;
}

.title {
  color: #549b35;
}

.copy {
  text-align: center;
}
</style>