<script setup>
import { ref } from 'vue';
import carsJson from '../../fixtures/cars.json';
import { startsWith } from 'lodash';
import { useRouter } from 'vue-router'
import store from '@/store';

const model = ref('');
const cars = ref(carsJson.cars);
function search(number) {
  cars.value = carsJson.cars
    .filter((item) => startsWith(item.number, number.model.trim().toUpperCase()) || startsWith(item.vin, number.model.trim().toUpperCase()))
}
const router = useRouter()
function goToDiagnostics(id) {
  store.addCar(id);
  router.push(`diagnostics/`)
}

</script>

<template>
  <div class="wrapper">
    <header>
      <h4>Автомобили для диагностики</h4>
    </header>
    <main>
      <input @keyup="search({ model })" v-model="model" placeholder="Поиск по госномеру или VIN">
      <div class="table">
        <table>
          <thead>
            <tr>
              <th>Автомобиль</th>
              <th>Госномер</th>
              <th>VIN</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in cars" :key="todo.id" @click="goToDiagnostics(todo.id)" >
              <td>{{ todo.model }}</td>
              <td>{{ todo.number }}</td>
              <td>{{ todo.vin }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
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
  .wrapper input {
    background: #1a1919;
    font-size: 2vh;
    outline: none;
    width: 90vw;
    height: 6vh;
    padding: 3vh 3vh;
    margin: 0 5vw 3vw 5vw;
    border: 2px solid #4d4c4c;
    color: #fcfcfc;
  }

  .wrapper input:focus {
    border-color: #fcfcfc;
  }

  .table {
    width: 90vw;
    margin: 0 5vw 3vw 5vw;
    padding: 3vw 0;
  }

  table {
    width: 90vw;
    background-color: #1a1919;
    border: none;
    font-size: 1.45vh;
    line-height: 2vh;
    border-collapse: collapse;
  }

  .table thead tr {
    text-align: left;
  }
  .table thead th  {
    height: 8vh;
    border-bottom: 1px solid #4d4c4c;
    padding: 2vh 0 2vh 3vw;
  }
  .table tbody td {
    height: 8vh;
    padding: 2vh 0 2vh 3vw;
  }
  .table tbody tr  {
    border-bottom: 1px solid #4d4c4c;
  }
  .table tbody tr:nth-last-child(1) {
    border: none;
  }
  tbody tr:active {
    background: #575757;
  }
</style>
