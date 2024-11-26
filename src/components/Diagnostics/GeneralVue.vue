<script setup>
import { ref } from 'vue'
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined, ToolOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import store from '@/store';

const router = useRouter();

function list(id) {
  return store.getListById(id);
}

function goToPrevious() {
  router.go(-1);
}

const open = ref(false)
const idOfModal = ref(null)

function reviewSubsection() {
  if (!store.getIdOfCurrentCar()) {
    router.replace(`/cars/`)
  } else {
    return store.getNameOfSubsection();
  }
}
</script>

<template>
  <div class="wrapper">
    <header>
      <h4><div>{{ reviewSubsection() }}</div><div>{{ store.getCarModelWithNumber() }}</div></h4>
    </header>
    <main>
      <button class="previous" @click="goToPrevious">
        <ArrowLeftOutlined />
        <p>Назад</p>
      </button>
      <div class="list">
        <ul>
          <li v-for="todo in store.getListOfChecks(store.getActiveSubsection())" :key="todo.id">
            <div class="text">{{ todo.name }}</div>
            <div class="icons">
              <div v-if="!todo.data.availability" :class="{'yellow': store.getColor(todo.id) === 'absent' }" @click="store.setCarState(todo.id, 'state', 'absent')">
                <CloseOutlined class="icon"/>
              </div>
              <div :class="{'green': store.getColor(todo.id) === 'good'}" @click="store.setCarState(todo.id, 'state', 'good')">
                <CheckOutlined class="icon"/>
              </div>
              <div :class="{'red': store.getColor(todo.id) === 'breakage' }" @click="store.setCarState(todo.id, 'state', null)">
                <ToolOutlined class="icon" @click="open = true, idOfModal = todo.id"/>
                <Teleport to="body">
                  <div v-if="open" class="modal">
                    <div class="breakages">
                      <button :class="{'redButton': store.getCheckById(idOfModal).data.breakage.includes(breakage.name)}" class="breakage" v-for="breakage in list(idOfModal)" :key="breakage.id" @click="store.setCarState(idOfModal, 'setBreakage', breakage.name)">
                        {{ breakage.name }}
                      </button>
                    </div>
                    <div class="control">
                      <button class="clean" @click="store.setCarState(idOfModal, 'removeAll')">Очистить</button>
                      <button class="apply" @click="open = false">Применить</button>
                    </div>
                  </div>
                  <div v-if="open" class="modal-background"></div>
              </Teleport>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
    <footer>
    <div class="footerApply">
      <button class="footerPrevious" @click="store.getPreviousSubsection()">Предыдущий список</button>
      <button class="next" @click="store.getNextSubsection()">Далее</button>
    </div>
  </footer>
  </div>
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
    width: 100%;
    padding: 3vh 8vw;
    margin-top: 4vh;
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
  .previous:active {
    background: #575757;
  }

  .list {
    width: 90vw;
    margin: 0 5vw;
    padding-top: 3vh;
  }

  ul {
    display: flex;
    flex-direction: column;
    background-color: #1a1919;
    height: 63vh;
    overflow: auto;
    margin-bottom: 0;
  }

  li {
    height: 10vh;
    list-style-type: none;
    padding: 3vh 5vw;
    background-color: #1a1919;
    border: none;
    border-bottom: 1px solid #4d4c4c;
    color: #fcfcfc;
    text-align: left;
    font-size: 1.8vh;
    display: flex;
    align-items: center;
  }

  li .text {
    width: 70vw;
  }

  .icons {
    width: 30vw;
    display: flex;
    justify-content: flex-end;
  }

  .icon {
    margin: 0 3vw;
  }
  .green {
    color: rgb(106, 255, 0);
  }

  .yellow {
    color: yellow;
  }

  .red {
    color: red;
  }

  .modal {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #1a1919;
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  width: 100vw;
  /* height: 40vh; */
  display: flex;
  flex-direction: column;
  font-size: 2vh;
  padding: 1.5vh 3vw;
  justify-content: space-between;
  }

  .modal-background {
    background-color: aliceblue;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 900;
    top: 0%;
    left: 0%;
    width: 100vw;
    opacity: 0.05;
  }

  .breakages {
    display: flex;
    /* flex-flow: column wrap; */
    flex-wrap: wrap;
    /* flex-direction: column; */
    justify-content: center;
  }

  .breakage {
    /* width: 40vw; */
    height: fit-content;
    padding: 0.6vh 1.5vw;
    margin: 1.2vh 2vw;
    border-radius: 5px;
    background-color: #1a1919;
    border: 2px solid #4d4c4c;
    color: #848484;
    justify-content: center;
    align-items: center;
    display: block;
  }

  .breakage div {
    color: #767676;
  }

  .control {
    align-self: flex-end;
  }

  .apply {
    padding: 0.6vh 1.5vw;
    margin: 1.2vh 2vw;
    border-radius: 5px;
    border: 2px solid rgb(0, 94, 0);
    background-color: #1a1919;
    color: green;
  }

  .clean {
    padding: 0.6vh 1.5vw;
    margin: 1.2vh 2vw;
    border-radius: 5px;
    border: 2px solid rgb(105, 1, 1);
    background-color: #1a1919;
    color: rgb(158, 3, 3);
  }

  .redButton {
    border: 2px solid rgb(121, 0, 0);
    color: rgb(158, 3, 3);
  }

  footer {
    align-self: flex-end;
  }

  .footerApply {
    margin: 1vh 5vw;
  }

  .footerPrevious {
    padding: 1.2vh 3vw;
    margin: 0 3vw;
    border: 2px solid #4d4c4c;
    background-color: #1a1919;
    color: #848484;
    font-size: 1.8vh;
    border-radius: 5%;
  }

  .next {
    padding: 1.2vh 3vw;
    margin-left: 3vw;
    border: 2px solid #4d4c4c;
    background-color: #1a1919;
    color: #848484;
    border-radius: 5%;
    font-size: 1.8vh;
  }

</style>
