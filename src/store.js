import { uniqueId, uniq } from 'lodash';
import { reactive } from 'vue';
import carsJson from '../fixtures/cars.json';
import checksJson from '../fixtures/checks.json';

const sectionsOfChecks = checksJson.reduce((acc, item) => [...acc, (item.name)], [])
	.map((item) => ({ name: item, id: uniqueId() }));


const checks = checksJson.reduce((acc, item) => ([...acc, ...item.subsections]), [])
	.map((item) => ({ ...item, id: uniqueId() }));

const getCarsFromLocalStorage = () => {
	if (!localStorage.getItem('cars')) {
		return [];
	}
	const idsOfCars = JSON.parse(localStorage.getItem('cars'));
	const cars = idsOfCars.map((id) => {
		const car = JSON.parse(localStorage.getItem(`${id}`));
		return car;
	});
	return cars;
};

const store = reactive({
	idOfCurrentCar: localStorage.getItem('idOfCurrentCar'),
	sectionsOfChecks,
	activeSubsection: localStorage.getItem('activeSubsection'),
	checks,
	cars: getCarsFromLocalStorage(),

	addCar(id) {
		if (!localStorage.getItem(id)) {
			const [car] = carsJson.cars.filter((item) => item.id === Number (id));
			localStorage.setItem(`${id}`, JSON.stringify({id, model: car.model, number: car.number, vin: car.vin, checks }));
			const cars = JSON.parse(localStorage.getItem('cars')) ?? [];
			localStorage.setItem('cars', JSON.stringify(uniq([id, ...cars])));
			this.cars = [{ id, model: car.model, number: car.number, vin: car.vin, checks }, ...this.cars];
		}
		localStorage.setItem('idOfCurrentCar', id);
		this.idOfCurrentCar = localStorage.getItem('idOfCurrentCar');
	},

	getIdOfCurrentCar() {
		return this.idOfCurrentCar;
	},

	getCarModelWithNumber() {
		const id = localStorage.getItem('idOfCurrentCar');
		const [car] = this.cars.filter((item) => Number(item.id) === Number(id));
		return `${car.model} ${car.number}`;
	},

	getSectionsOfChecks() {
		return this.sectionsOfChecks;
	},

	setActiveSubsection(id) {
		localStorage.setItem('activeSubsection', id);
		this.activeSubsection = id;
	},

	getActiveSubsection() {
		return this.activeSubsection;
	},

	getNextSubsection() {
		if (this.activeSubsection < this.sectionsOfChecks.length) {
			const id =  Number(this.activeSubsection) + 1;
			localStorage.setItem('activeSubsection', id);
			this.activeSubsection = id;
		}
	},

	getPreviousSubsection() {
		if (this.activeSubsection > 1) {
			const id = Number(this.activeSubsection) - 1;
			localStorage.setItem('activeSubsection', id);
			this.activeSubsection = id;
		}
	},

	getListOfChecks(id) {
		const [car] = this.cars.filter((item) => {
			return Number(item.id) === Number(this.idOfCurrentCar);
		});
		return car.checks.filter((item) => item.sectionId === Number(id));
	},

	getColor(idOfCheck) {
		const car = JSON.parse(localStorage.getItem(`${this.idOfCurrentCar}`));
		const [check] = car.checks.filter((item) =>  Number(item.id) === Number(idOfCheck));
		if (check.data.breakage.length > 0) {
			return 'breakage';
		}
		return check.data.state;
	},

	getListById(idOfCheck) {
		const [check] = this.checks.filter((item) => Number(item.id) === Number(idOfCheck));
		return check.data.repair.map((item) => ({ name: item, id: uniqueId() }));
	},

	setCarState(idOfCheck, flag, value) {
		const car = JSON.parse(localStorage.getItem(`${this.idOfCurrentCar}`));
		let result;
		switch (flag) {
		case 'removeAll':
			result = car.checks.map((item) => {
				if (Number(item.id) === Number(idOfCheck)) {
					item.data.breakage = [];
				}
				return item;
			});
			break;
		case 'state':
			result = car.checks.map((item) => {
				if (Number(item.id) === Number(idOfCheck)) {
					if (item.data.state === value) {
						item.data.state = null;
					} else {
						item.data.state = value;
						item.data.breakage = [];
					}
				}
				return item;
			});
			break;
		case 'setBreakage':
			result = car.checks.map((item) => {
				if (Number(item.id) === Number(idOfCheck)) {
					if (item.data.breakage.includes(value)) {
						item.data.breakage = item.data.breakage.filter((item) => item !== value);
					} else {
						item.data.breakage = [...item.data.breakage, value];
					}
				}
				return item;
			});
			break;
		default:
			break;
		}
		this.cars = this.cars.map((item) => {
			if (Number(item.id) === Number(this.idOfCurrentCar)) {
				item.checks = result;
			}
			return item;
		});
		const [carWithNewChecks] = this.cars.filter((item) => Number(item.id) === Number(this.idOfCurrentCar));
		localStorage.setItem(`${this.idOfCurrentCar}`, JSON.stringify(carWithNewChecks));
	},

	getCheckById(idOfCheck) {
		const car = JSON.parse(localStorage.getItem(`${this.idOfCurrentCar}`));
		const [check] = car.checks.filter((item) => Number(item.id) === Number(idOfCheck));
		return check;
	},

	getNameOfSubsection() {
		if (!this.activeSubsection) {
			return null;
		}
		const [check] = this.sectionsOfChecks.filter((item) => Number(item.id) === Number(this.activeSubsection));
		return check.name;
	}
});

export default store;
