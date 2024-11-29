<script setup>
import { startsWith } from 'lodash';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import carsJson from '../../fixtures/cars.json';
import store from '../store.js';

const model = ref('');
const cars = ref(carsJson.cars);
const router = useRouter();

function search(number) {
	cars.value = carsJson.cars
		.filter((item) => (
			startsWith(item.number, number.model.trim().toUpperCase()) || startsWith(item.vin, number.model.trim().toUpperCase())
		));
}

function goToDiagnostics(id) {
	store.addCar(id);
	router.push(`diagnostics/`);
}
</script>

<template>
  <div class="wrapper">
    <header>
      <h4>Автомобили для диагностики</h4>
    </header>
    <main>
      <input
        v-model="model"
        placeholder="Поиск по госномеру или VIN"
        @keyup="search({ model })"
      >
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
            <tr
              v-for="todo in cars"
              :key="todo.id"
              @click="goToDiagnostics(todo.id)"
            >
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
  main {
    height: 90dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .wrapper input {
    background: #1a1919;
    font-size: 2dvh;
    outline: none;
    width: 90vw;
    height: 6dvh;
    padding: 3dvh 3vw;
    border: 2px solid #4d4c4c;
    color: #fcfcfc;
  }

  .wrapper input:focus {
    border-color: #fcfcfc;
  }

  .table {
    width: 90vw;
    margin-top: 3dvh;
    height: 75dvh;
    overflow: auto;
  }

  table {
    width: 90vw;
    background-color: #1a1919;
    border: none;
    font-size: 1.45dvh;
    line-height: 2dvh;
    border-collapse: collapse;
  }

  .table thead tr {
    text-align: left;
    /* position: sticky;
    top: 0; */
  }
  .table thead th  {
    height: 8dvh;
    border-bottom: 1px solid #4d4c4c;
    padding: 2dvh 0 2dvh 3vw;
  }
  .table tbody td {
    height: 8dvh;
    padding: 2dvh 0 2dvh 3vw;
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
