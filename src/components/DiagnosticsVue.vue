<script setup>
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import store from '../store';

const sections = store.getSectionsOfChecks();
const router = useRouter();

function goToCars() {
	router.replace(`/`);
}

function goToSubsections(id) {
	store.setActiveSubsection(id);
	router.push(`subsection`);
}

function reviewCar() {
	if (!store.getIdOfCurrentCar()) {
		goToCars();
	} else {
		return store.getCarModelWithNumber();
	}
}
</script>

<template>
  <KeepAlive>
    <div class="wrapper">
      <header>
        <h4>
          <div>Диагностика</div>
          <div>{{ reviewCar() }}</div>
        </h4>
      </header>
      <main>
        <button
          class="previous"
          @click="goToCars"
        >
          <ArrowLeftOutlined />
          <p>Машины</p>
        </button>
        <div class="nav">
          <nav
            v-for="todo in sections"
            :key="todo.id"
            @click="goToSubsections(todo.id)"
          >
            <button>{{ todo.name }}</button>
          </nav>
        </div>
      </main>
    </div>
  </KeepAlive>
</template>

<style scoped>
  .nav {
    width: 90vw;
    margin: 0 5vw;
    padding: 3dvh 0;
    height: 75dvh;
    overflow: auto;
  }

  nav {
    display: flex;
    flex-direction: column;
    background-color: #1a1919;
  }

  nav button {
    height: 8dvh;
    padding: 3dvh 5vw;
    background-color: #1a1919;
    border: none;
    border-bottom: 1px solid #4d4c4c;
    color: #fcfcfc;
    text-align: left;
    font-size: 1.8dvh;
  }

  nav button:active {
    background: #575757;
  }
  .previous:active {
    background: #575757;
  }
</style>
