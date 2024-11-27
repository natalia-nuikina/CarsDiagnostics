<script setup>
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import store from '@/store';

const sections = store.getSectionsOfChecks();

const router = useRouter();
function goToCars() {
  router.replace(`/`)
}

function goToSubsections(id) {
  store.setActiveSubsection(id);
  router.push(`subsection`);
}

function reviewCar() {
  if (!store.getIdOfCurrentCar()) {
    goToCars()
  } else {
    return store.getCarModelWithNumber();
  }
}
</script>

<template>
  <KeepAlive>
  <div class="wrapper">
    <header>
      <h4>Диагностика {{ reviewCar() }}</h4>
    </header>
    <main>
      <button class="previous" @click="goToCars">
        <ArrowLeftOutlined />
        <p>Машины</p>
      </button>
      <div class="nav">
        <nav v-for="todo in sections" :key="todo.id" @click="goToSubsections(todo.id)">
          <button>{{ todo.name }}</button>
        </nav>
      </div>
    </main>
  </div>
</KeepAlive>
</template>

<style scoped>
  .wrapper {
    width: 100vw;
    display: flex;
    flex-direction: column;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #fcfcfc;
  }

  h4 {
    width: 100vw;
    padding: 3vh 8vw;
    margin-top: 3vh;
    font-size: 2.5vh;
  }

  .previous {
    background: #1a1919;
    width: 90vw;
    height: 8vh;
    padding: 3vh 5vw;
    margin: 0 5vw;
    border: none;
    color: #fcfcfc;
    text-align: left;
    font-size: 2vh;
    display: flex;
  }
  .previous p {
    margin-left: 4vw;
  }

  .nav {
    width: 90vw;
    margin: 0 5vw;
    padding: 3vh 0;
  }

  nav {
    display: flex;
    flex-direction: column;
    background-color: #1a1919;
  }

  nav button {
    height: 8vh;
    padding: 3vh 5vw;
    background-color: #1a1919;
    border: none;
    border-bottom: 1px solid #4d4c4c;
    color: #fcfcfc;
    text-align: left;
    font-size: 1.8vh;
  }

  nav button:active {
    background: #575757;
  }
  .previous:active {
    background: #575757;
  }
</style>
