<script setup>
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined, ToolOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '../store.js';

const router = useRouter();
const open = ref(false);
const idOfModal = ref(null);

function list(id) {
	return store.getListById(id);
}

function goToPrevious() {
	router.go(-1);
}

function reviewSubsection() {
	if (!store.getIdOfCurrentCar()) {
		router.replace(`/`);
	} else {
		return store.getNameOfSubsection();
	}
}
</script>

<template>
  <div class="wrapper">
    <header>
      <h4>
        <div>{{ reviewSubsection() }}</div>
        <div>{{ store.getCarModelWithNumber() }}</div>
      </h4>
    </header>
    <main>
      <button
        class="previous"
        @click="goToPrevious"
      >
        <ArrowLeftOutlined />
        <p>Назад</p>
      </button>
      <div class="list">
        <ul>
          <li
            v-for="todo in store.getListOfChecks(store.getActiveSubsection())"
            :key="todo.id"
          >
            <div
              class="text"
            >
              {{ todo.name }}
            </div>
            <div class="icons">
              <div
                v-if="!todo.data.availability"
                :class="{'yellow': store.getColor(todo.id) === 'absent' }"
                @click="store.setCarState(todo.id, 'state', 'absent')"
              >
                <CloseOutlined class="icon" />
              </div>
              <div
                :class="{'green': store.getColor(todo.id) === 'good'}"
                @click="store.setCarState(todo.id, 'state', 'good')"
              >
                <CheckOutlined class="icon" />
              </div>
              <div
                :class="{'red': store.getColor(todo.id) === 'breakage' }"
                @click="store.setCarState(todo.id, 'state', null)"
              >
                <ToolOutlined
                  class="icon"
                  @click="open = true, idOfModal = todo.id"
                />
              </div>
            </div>
          </li>
        </ul>
        <Teleport to="body">
          <div
            v-if="open"
            class="modal"
          >
            <div class="breakages">
              <button
                v-for="breakage in list(idOfModal)"
                :key="breakage.id"
                :class="{'redButton': store.getCheckById(idOfModal).data.breakage.includes(breakage.name)}"
                class="breakage"
                @click="store.setCarState(idOfModal, 'setBreakage', breakage.name)"
              >
                {{ breakage.name }}
              </button>
            </div>
            <div class="control">
              <button
                class="redButton modalButtons"
                @click="store.setCarState(idOfModal, 'removeAll')"
              >
                Очистить
              </button>
              <button
                class="greenButton modalButtons"
                @click="open = false"
              >
                Применить
              </button>
            </div>
          </div>
          <div
            v-if="open"
            class="modal-background"
            @click="open = false"
          />
        </Teleport>
      </div>
    </main>
    <footer>
      <div class="footerApply">
        <button
          class="footerButtons"
          @click="store.getPreviousSubsection()"
        >
          Предыдущий список
        </button>
        <button
          class="footerButtons"
          @click="store.getNextSubsection()"
        >
          Далее
        </button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
  .wrapper {
    height: 100dvh;
    justify-content: space-between;
  }

  .list {
    width: 90vw;
    margin: 0 5vw;
    padding-top: 3dvh;
  }

  ul {
    display: flex;
    flex-direction: column;
    background-color: #1a1919;
    height: 67dvh;
    overflow: auto;
    margin-bottom: 0;
  }

  li {
    height: 10dvh;
    list-style-type: none;
    padding: 3dvh 5vw;
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
  display: flex;
  flex-direction: column;
  font-size: 2dvh;
  padding: 1.5dvh 3vw;
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
    flex-wrap: wrap;
    justify-content: center;
  }

  .breakage {
    height: fit-content;
    padding: 0.6dvh 1.5vw;
    margin: 1.2dvh 2vw;
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

  .modalButtons {
    padding: 0.6dvh 1.5vw;
    margin: 1.2dvh 2vw;
    border-radius: 5px;
    background-color: #1a1919;
  }

  .greenButton {
    border: 2px solid rgb(0, 94, 0);
    color: green;
  }

  .redButton {
    border: 2px solid rgb(121, 0, 0);
    color: rgb(158, 3, 3);
  }

  footer {
    align-self: flex-end;
    margin-top: 1dvh;
  }

  .footerApply {
    margin: 1dvh 5vw;
  }

  .footerButtons {
    padding: 1.2dvh 3vw;
    margin: 0 3vw;
    border: 2px solid #4d4c4c;
    background-color: #1a1919;
    color: #848484;
    font-size: 1.8dvh;
    border-radius: 5%;
  }

</style>
