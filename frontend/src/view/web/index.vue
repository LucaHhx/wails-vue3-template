<template>
  <div>
    <el-row>
      <el-col
        v-for="(o, index) in 2"
        :key="o"
        :span="8"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          >
          <div style="padding: 14px">
            <span>Yummy hamburger</span>
            <div class="bottom">
              <time class="time">{{ currentDate }}</time>
              <el-button text class="button">Operating</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card v-for="game in games" :key="game.id" shadow="hover" :style="{ width: '240px', margin: '10px' }">
      <img :src="game.coverUrl" class="game-cover">
      <div style="padding: 14px;">
        <span class="game-title">{{ game.title }}</span>
        <p class="game-description">{{ game.description }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Web',
  data() {
    return {
      games: [
        { id: 1, title: '游戏1', description: '游戏1描述', coverUrl: 'http://127.0.0.1:8080/api/uploads/file/1f02f411cf025aad163e96e6abbfa402_20230529150022.png' },
        { id: 2, title: '游戏2', description: '游戏2描述', coverUrl: 'http://127.0.0.1:8080/api/uploads/file/1f02f411cf025aad163e96e6abbfa402_20230529150022.png' },
        { id: 3, title: '游戏3', description: '游戏3描述', coverUrl: 'http://127.0.0.1:8080/api/uploads/file/1f02f411cf025aad163e96e6abbfa402_20230529150022.png' },
        { id: 4, title: '游戏4', description: '游戏4描述', coverUrl: 'http://127.0.0.1:8080/api/uploads/file/1f02f411cf025aad163e96e6abbfa402_20230529150022.png' },
        // 添加更多游戏...
      ]
    }
  }
}
</script>

<style>
.game-cover {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.game-title {
  font-weight: bold;
  font-size: 18px;
}

.game-description {
  margin-top: 8px;
  color: #888;
}
</style>

<style lang="scss" scoped>
@import "@/style/newLogin.scss";
</style>
