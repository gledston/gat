const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.getElementById('item');
const batchIni = '(type = \'I\' AND open_date >= 1527822060 AND group.last_name NOT LIKE \'Operadora%\' AND ( status.code = \'ZAGATD\' OR status.code = \'WIP\') AND category.sym NOT LIKE \'%Certificação Digital%\' AND last_mod_dt < '
const batchEnd = ') '
var horaCob = ''
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const liMaker = (text) => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  
  calcDia();
  
  itemsArray.push(batchIni + horaCob + batchEnd);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  liMaker(input.value);
  input.value = "";
});

function calcDia(){
	//Math.round(new Date().getTime()/1000.0);
	var dia = new Date();
	if (dia.getDay()==0){
		dia.setDate(dia.getDate()-2);
	} else if (dia.getDay()==6){
		dia.setDate(dia.getDate()-1);
	} else if (dia.getDay() == 1 && dia.getHours()>=0 && dia.getHours() < 18){
		dia.setDate(dia.getDate()-3);
	} else {
		if (dia.getHours()>=0 && dia.getHours() < 18){
			dia.setDate(dia.getDate()-1);
		} else {
			dia.setDate(dia.getDate());
		}
	};
	dia.setHours(7);
	dia.setMinutes(59);
	dia.setSeconds(0);
	dia.setMilliseconds(0);
	horaCob = Math.round(dia.getTime()/1000.0);
};

data.forEach(item => {
  liMaker(item);
});

button.addEventListener('click', function () {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
});