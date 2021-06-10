import Comparisson_GDU from './../scripts/Comparisson_GDU.js';
let comp = new Comparisson_GDU(dat);
window.comp = comp;

var keys = comp.getListOfKeys();
var types = comp.getListOfTypes();
var names = comp.getNamesOfType(types[0]);
var object = comp.getObject(types[0], comp.getNamesOfType(types[0])[0]);
var dataCurrent, dataNew;

let difference_cost_total;
let difference_co_total;
let currentTrees;
let newTrees;
let differenceTrees;
// console.log(object);
// console.log(types);

// var test = [
// 	{ "type": "licht", "naam": "gloeilamp", "uren": 1.000, "€/W": 0.03, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 60, "uur/dag": 4, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "licht", "naam": "halogeenlamp", "uren": 2.000, "€/W": 0.06, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 50, "uur/dag": 4, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "licht", "naam": "spaarlamp", "uren": 8.000, "€/W": 0.23, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 11, "uur/dag": 4, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "licht", "naam": "led", "uren": 20.000, "€/W": 0.31, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 7, "uur/dag": 4, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "kookvuur", "naam": "elektrisch", "uren": 5.475, "€/W": 0.09, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 7000, "uur/dag": 1, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "kookvuur", "naam": "vitrokeramisch", "uren": 5.475, "€/W": 0.05, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 6000, "uur/dag": 1, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "kookvuur", "naam": "inductie", "uren": 7.300, "€/W": 0.16, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 5000, "uur/dag": 1, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "koelkast met vriesvak", "naam": "A+++ / A", "uren": 122.640, "€/W": 73.00, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 13.69863014, "uur/dag": 24, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "koelkast met vriesvak", "naam": "A++ /  B", "uren": 122.640, "€/W": 34.10, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 20.54794521, "uur/dag": 24, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "koelkast met vriesvak", "naam": "A+ /  C", "uren": 122.640, "€/W": 20.90, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 28.76712329, "uur/dag": 24, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "koelkast met vriesvak", "naam": "A /  D", "uren": 122.640, "€/W": 11.90, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 37.78538813, "uur/dag": 24, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "koelkast met vriesvak", "naam": "B /  E", "uren": 122.640, "€/W": 5.80, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 51.48401826, "uur/dag": 24, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "koelkast met vriesvak", "naam": "C /  F", "uren": 122.640, "€/W": 3.20, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 61.75799087, "uur/dag": 24, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "televisie LCD", "naam": "groot toestel", "uren": 25.000, "€/W": 1.50, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 200, "uur/dag": 5, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "televisie LCD", "naam": "middelmatig toestel", "uren": 25.000, "€/W": 2.00, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 100, "uur/dag": 5, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "televisie LCD", "naam": "klein toestel", "uren": 25.000, "€/W": 1.80, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 50, "uur/dag": 5, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "stofzuiger", "naam": "A+++ / A", "uren": 365, "€/W": 10.00, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 30, "uur/dag": 0.2, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "stofzuiger", "naam": "A++ / B", "uren": 365, "€/W": 7.50, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 40, "uur/dag": 0.2, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "stofzuiger", "naam": "A+ / C", "uren": 365, "€/W": 6.00, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 50, "uur/dag": 0.2, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "stofzuiger", "naam": "A / D", "uren": 365, "€/W": 5.00, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 60, "uur/dag": 0.2, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "stofzuiger", "naam": "B / E", "uren": 365, "€/W": 4.29, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 70, "uur/dag": 0.2, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "stofzuiger", "naam": "C / F", "uren": 365, "€/W": 3.75, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 80, "uur/dag": 0.2, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "wasmachine", "naam": "A+++ -50%  /  A", "uren": 5.694, "€/W": 1.44, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 553.8461538, "uur/dag": 1.3, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "wasmachine", "naam": "A+++ -40%  / B", "uren": 5.694, "€/W": 0.95, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 738.4615385, "uur/dag": 1.3, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "wasmachine", "naam": "A+++ -30%  / C", "uren": 5.694, "€/W": 0.65, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 923.0769231, "uur/dag": 1.3, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "wasmachine", "naam": "A+++ -20%  / D", "uren": 5.694, "€/W": 0.4513888889, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 1107.692308, "uur/dag": 1.3, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "wasmachine", "naam": "A+++ -10% / E", "uren": 5.694, "€/W": 0.3482142857, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 1292.307692, "uur/dag": 1.3, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "wasmachine", "naam": "A+++  / F", "uren": 5.694, "€/W": 0.3046875, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 1476.923077, "uur/dag": 1.3, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 },
// 	{ "type": "wasmachine", "naam": "A++  / G", "uren": 5.694, "€/W": 0.2407407407, "kg CO2eq/W": 30, "kg CO2eq2/W": 0, "W (gemiddeld)": 1661.538462, "uur/dag": 1.3, "kg CO2eq3/W": 0, "kg CO2eg/W": 10 }
// ]

//alert(JSON.stringify(test[0]));

$(document).ready(function () {

	set_situation_options(types);

	function set_situation_options(types) {

		// current_situation dropdown variable
		var type_dropdown = $('.machine');

		//reset dropdown
		//$(type_dropdown).empty()

		//add options to the dropdown
		$.each(types, function (val, text) {
			var capitalizedText = capitalizeFirstLetter(text);
			type_dropdown.append(
				$('<option></option>').val(text).html(capitalizedText)
			);
		});
	}

	//----------------------------------------------------- POPULATE DROPDOWNS ON MACHINE SELECT ----------------------------------------------------- //
	//On Machine change -> Check value and insert situation dropdown
	$(".machine").change(function () {

		$(".label_price_wrapper, .label_age_wrapper, .label_lifespan_wrapper, .label_wattage_wrapper, .label_daily_usage_wrapper, .label_kwh_wrapper, .select_current").css('opacity', '1');
		$( ".current_install, .current_situation" ).prop( "disabled", false );

		var machine = $(".machine").val();

		//Empty current_vars
		$(".current_price").val("");
		$(".current_age").val("");
		$(".current_lifespan").val("");
		$(".current_power").val("");
		$(".current_use_day").val("");
		$(".current_use_year").val("");

		//Empty new_vars
		$(".new_price").val("");
		$(".new_age").val("");
		$(".new_lifespan").val("");
		$(".new_power").val("");
		$(".new_use_day").val("");
		$(".new_use_year").val("");

		//console.log(types);
		var names = comp.getNamesOfType(machine);
		set_situation_options(names);

		//Set current and new situation options
		function set_situation_options(names) {

			// current_situation dropdown variable
			var current_situation = $('.current_situation');
			var new_situation = $('.new_situation');

			//reset dropdown
			$(current_situation).empty()
			$(new_situation).empty()

			current_situation.append(
				$('<option selected disabled></option>').val("Selecteer een optie").html("Selecteer een optie")
			);

			new_situation.append(
				$('<option selected disabled></option>').val("Selecteer een optie").html("Selecteer een optie")
			);

			//add options to the dropdown
			$.each(names, function (val, text) {
				var capitalizedText = capitalizeFirstLetter(text);
				current_situation.append(
					$('<option></option>').val(text).html(capitalizedText)
				);
				new_situation.append(
					$('<option></option>').val(text).html(capitalizedText)
				);
			});
		}

	});

	//----------------------------------------------------- END OF LIFE CHECKBOX ----------------------------------------------------- //

	$(".end_of_life").change(function () {
		if ($('.end_of_life:checkbox:checked').length) {
			//console.log('checked');
			comp._keep = 1;
			if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
				calculate_result();
			}
		} else {
			//console.log('unchecked')
			comp._keep = 0;
			if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
				calculate_result();
			}
		}
	});

	$("[data-labelfor]").click(function () {
		$('#' + $(this).attr("data-labelfor")).prop('checked',
			function (i, oldVal) { return !oldVal; });
		if ($('.end_of_life:checkbox:checked').length) {
			//console.log('checked');
			comp._keep = 1;
			if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
				calculate_result();
			}
		} else {
			//console.log('unchecked')
			comp._keep = 0;
			if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
				calculate_result();
			}
		}
	});

	//----------------------------------------------------- SET CURRENT SITUATION VARS ----------------------------------------------------- //

	$(".current_situation").change(function () {
		var type = $(".machine").val();
		var current_situation = $(".current_situation").val();
		$(".current_object").html(current_situation);
		dataCurrent = comp.getObject(type, current_situation);
		//console.log(dataCurrent);
		set_current_variables(dataCurrent.prijs, dataCurrent.age, dataCurrent.use, dataCurrent.leven, dataCurrent.power, dataCurrent.useyear);

		$(".label_new_price, .label_new_age, .label_new_lifespan, .label_new_wattage, .label_new_daily_usage, .label_new_kwh, .select_new").css('opacity', '1');
		$( ".new_install, .new_situation" ).prop( "disabled", false );
		// console.log(dataCurrent.prijs, dataCurrent.age, dataCurrent.use, dataCurrent.leven, dataCurrent.power, dataCurrent.useyear)

		// Set all variables
		function set_current_variables(prijs, age, use, leven, power, useyear) {
			$(".current_price").val(Math.round(prijs * 10) / 10);
			$(".current_age").val(age);
			$(".current_lifespan").val(Math.round(leven * 10) / 10);
			$(".current_power").val(Math.round(power));
			$(".current_use_day").val(use);
			$(".current_use_year").val(Math.round(useyear * 10) / 10);
		}

		if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
			console.log($(".current_install").val(), $(".new_install").val());
			calculate_result();
		}
	});

	//----------------------------------------------------- SET NEW SITUATION VARS ----------------------------------------------------- //

	$(".new_situation").change(function () {

		var type = $(".machine").val();
		var new_situation = $(".new_situation").val();
		$(".new_object").html(new_situation);
		dataNew = comp.getObject(type, new_situation);
		set_new_variables(dataNew.prijs, dataNew.age, dataNew.use, dataNew.leven, dataNew.power, dataNew.useyear)

		// Set all variables
		function set_new_variables(prijs, age, use, leven, power, useyear) {
			$(".new_price").val(Math.round(prijs * 10) / 10);
			$(".new_age").val(age);
			$(".new_lifespan").val(Math.round(leven * 10) / 10);
			$(".new_power").val(Math.round(power));
			$(".new_use_day").val(use);
			$(".new_use_year").val(Math.round(useyear * 10) / 10);
		}

		if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
			calculate_result();
		}
	});

	//----------------------------------------------------- USAGE INLINE CALCULATION ----------------------------------------------------- //

	//Current situation --> kwh

	$(".current_power").change(function(){
		let wattage = $(".current_power").val();
		let usage = $(".current_use_day").val();
		let kwh = $(".current_use_year").val();
		let calculation = wattage * usage * 365 / 1000
		$(".current_use_year").val(calculation);
		if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
			calculate_result();
		}
	});

	$(".current_use_day").change(function(){
		let wattage = $(".current_power").val();
		let usage = $(".current_use_day").val();
		let kwh = $(".current_use_year").val();
		let calculation = wattage * usage * 365 / 1000
		$(".current_use_year").val(calculation);
		if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
			calculate_result();
		}
	});


	//New situation --> kwh
	$(".new_power").change(function(){
		let wattage = $(".new_power").val();
		let usage = $(".new_use_day").val();
		let kwh = $(".new_use_year").val();
		let calculation = wattage * usage * 365 / 1000
		$(".new_use_year").val(calculation);
		if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
			calculate_result();
		}
	});

	$(".new_use_day").change(function(){
		let wattage = $(".new_power").val();
		let usage = $(".new_use_day").val();
		let kwh = $(".new_use_year").val();
		let calculation = wattage * usage * 365 / 1000
		$(".new_use_year").val(calculation);
		if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
			calculate_result();
		}
	});

	//----------------------------------------------------- CALCULATE ----------------------------------------------------- //

	$(".price_kwh").change(function () {
		if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
			calculate_result();
		}
	});

	$(".co2_consumption").change(function () {
		if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
			calculate_result();
		}
	});

	$(".period").change(function () {
		if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
			calculate_result();
		}
	});

	$(".amount_machines").change(function () {
		if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
			calculate_result();
		}
	});

	function calculateTrees(){
		var current_co_total = comp._currentCoMaterial + comp._currentCoConsumption
		var new_co_total = comp._newCoMaterial + comp._newCoConsumption

		currentTrees = (current_co_total / comp._period) / comp._kgCO2TreeYear;
        newTrees = (new_co_total / comp._period ) / comp._kgCO2TreeYear;
		differenceTrees = currentTrees - newTrees;

		//console.log(">>>> currentTrees",currentTrees)
		//console.log(">>>> newTrees", newTrees)
		//console.log(">>>> differenceTrees", differenceTrees)
	}

	function calculate_result() {
		var kwh_prijs = $(".price_kwh").val();
		var co_comsumption = $(".co2_consumption").val();
		var termijn = $(".period").val();
		var maal = $(".amount_machines").val();
		comp.calculate(dataCurrent, dataNew, kwh_prijs, co_comsumption, termijn, maal);


		// ---- Calculate replacements ---- //
		// Current Replacements
		$(".current_replacements").html(JSON.stringify(comp._currentReplacements));
		// New Replacements
		$(".new_replacements").html(JSON.stringify(comp._newReplacements));
		// Difference Replacements
		$(".difference_replacements").html(JSON.stringify(comp._differenceReplacements));


		// ---- Calculate Costpurchase ---- //
		// Current Costpurchase
		$(".current_cost_purchase").html("€" + Math.round(JSON.stringify(comp._currentCostPurchase)*100) / 100);
		//console.log(comp._currentCostPurchase);
		// New Costpurchase
		$(".new_cost_purchase").html("€" + Math.round(JSON.stringify(comp._newCostPurchase)*100) / 100);
		// Difference Costpurchase
		difference_cost_total = Math.round(JSON.stringify(comp._differenceCostPurchase) * 100) / 100;
		$(".difference_cost_purchase").html("€" + difference_cost_total);


		// ---- Calculate Use ---- //
		// Current use
		$(".current_cost_consumption_one").html("€" + Math.round(JSON.stringify(comp._currentCostConsumption) * 100) / 100);
		// New use
		$(".new_cost_consumption_one").html("€" + Math.round(JSON.stringify(comp._newCostConsumption) * 100) / 100);
		// Difference Use
		$(".difference_cost_consumption_one").html("€" + Math.round(JSON.stringify(comp._differenceCostConsumption) * 100) / 100);

		// ---- Calculate totals one ---- //
		// Situation one total
		$(".current_cost_total").html("€" + Math.round(JSON.stringify(comp._currentCostPurchase + comp._currentCostConsumption) * 100) / 100);
		// Situation two total
		$(".new_cost_total").html("€" + Math.round(JSON.stringify(comp._newCostPurchase + comp._newCostConsumption) * 100) / 100);
		// difference total
		$(".difference_cost_total").html("€" + Math.round(JSON.stringify(comp._differenceCostConsumption - comp._differenceCostPurchase)*100)/100);

		// ---- Calculate CO Material ---- //
		$(".current_co_material").html(Math.round(JSON.stringify(comp._currentCoMaterial))+ " kg");
		$(".new_co_material").html(Math.round(JSON.stringify(comp._newCoMaterial))+ " kg");
		difference_co_total = Math.round(JSON.stringify(comp._currentCoMaterial - comp._newCoMaterial));
		$(".difference_co_material").html(difference_co_total + " kg");

		// ---- Calculate CO Usage ---- //
		$(".current_cost_consumption").html(Math.round(JSON.stringify(comp._currentCoConsumption))+ " kg");
		$(".new_cost_consumption").html(Math.round(JSON.stringify(comp._newCoConsumption))+ " kg");
		$(".difference_cost_consumption").html(Math.round(JSON.stringify(comp._currentCoConsumption - comp._newCoConsumption))+ " kg");

		// ---- Calculate totals two ---- //
		$(".current_co_total").html(Math.round(JSON.stringify(comp._currentCoMaterial + comp._currentCoConsumption))+ " kg");
		$(".new_co_total").html(Math.round(JSON.stringify(comp._newCoMaterial + comp._newCoConsumption))+ " kg");
		$(".difference_co_total").html(Math.round(JSON.stringify(comp._differenceCoMaterial + comp._differenceCoConsumption))+ " kg");

		calculateTrees();
		showResult();
		generateResult();

	}

	function showResult() {
		$("#sectionThree").slideDown(300);
		$("#wrapper--dark").slideDown(300);
	}

	//----------------------------------------------------- SET NEW DATA ON CHANGE ----------------------------------------------------- //

	//Change comp of curren installation on value change
	$(".current_install").change(function (e) {
		switch (e.target.name) {
			case "current_price":
				dataCurrent.prijs = parseInt(e.target.value);
				break;
			case "current_age":
				dataCurrent.age = parseInt(e.target.value);
				break;
			case "current_lifespan":
				dataCurrent.leven = parseInt(e.target.value);
				break;
			case "current_power":
				dataCurrent.power = parseInt(e.target.value);
				break;
			case "current_use_day":
				dataCurrent.use = parseInt(e.target.value);
				break;
			case "current_use_year":
				dataCurrent.useyear = parseInt(e.target.value);
				break;
			default:
				console.log("default");
				break;
		}
		if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
			calculate_result();
		}
	});

	$(".new_install").change(function (e) {
		switch (e.target.name) {
			case "new_price":
				dataNew.prijs = parseInt(e.target.value);
				break;
			case "new_age":
				dataNew.age = parseInt(e.target.value);
				break;
			case "new_lifespan":
				dataNew.leven = parseInt(e.target.value);
				break;
			case "new_power":
				dataNew.power = parseInt(e.target.value);
				break;
			case "new_use_day":
				dataNew.use = parseInt(e.target.value);
				break;
			case "new_use_year":
				dataNew.useyear = parseInt(e.target.value);
				break;
			default:
				console.log("default");
				break;
		}
		if($(".current_install").val() !== "" && $(".new_install").val() !== ""){
			calculate_result();
		}
	});


	//----------------------------------------------------- RESULT ----------------------------------------------------- //

	function generateResult() {
		var machine = $(".machine").val();
		var currentSituation = $(".current_situation").val();
		var newSituation = $(".new_situation").val();
		var maal = $(".amount_machines").val();
		var termijn = $(".period").val();

		var currentReplacements = comp._currentReplacements;
		var newReplacements = comp._newReplacements;
		var differenceReplacements = comp._differenceReplacements;

		var current_cost_purchase = comp._currentCostPurchase;
		var current_cost_consumption = comp._currentCostConsumption;
		var current_cost_total = comp._currentCostPurchase + comp._currentCostConsumption;
	
		var new_cost_purchase = comp._newCostPurchase;
		var new_cost_consumption = comp._newCostConsumption;
		var new_cost_total = comp._newCostPurchase + comp._newCostConsumption;

		var current_co_material = comp._currentCoMaterial;
		var current_co_consumption = comp._currentCoConsumption;
		var current_co_total = comp._currentCoMaterial + comp._currentCoConsumption;

		var new_co_material = comp._newCoMaterial;
		var new_co_consumption = comp._newCoConsumption;
		var new_co_total = comp._newCoMaterial + comp._newCoConsumption;



		// Resultaat na x jaar
		$(".periodText").html("Resultaat na " + termijn + " jaar");

		$(".analyseresultaat").html("Analyseresultaat " + machine + " - " + currentSituation + " naar " + newSituation);
		$(".resultIntro").html(`Door direct uw ${currentSituation} ${maal >= 1 ? " " : maal} te vervangen door een ${newSituation} maakt u over een termijn van ${termijn} jaar €${Math.abs(difference_cost_total)} ${difference_cost_total < 0 ? "verlies" : "winst"} en zorgt U voor ${Math.abs(difference_co_total)} kg CO₂eq ${difference_co_total < 0 ? "meer" : "minder"} uitstoot. ${difference_cost_total < 0 & difference_co_total < 0 ? " U kan dus beter bij uw huidige situatie blijven!" : "Het is dus een zeer goed idee om te wisselen naar een " + newSituation + "!"}`);
		$(".resultReplacements").html(`U moet op ${termijn} jaar uw ${currentReplacements == newReplacements ? "toestellen in de huidige en nieuwe situatie " + newReplacements + " keer vervangen." : currentSituation + " " + currentReplacements + " maal en uw " + newSituation + " " + newReplacements + " keer vervangen binnen de respectievelijke levensduur."} U moet dus ${Math.abs(differenceReplacements)} keer ${differenceReplacements < 0 ? "minder" : "meer"} wisselen wat niet alleen ${differenceReplacements < 0 ? "minder" : "meer"} werk en ${differenceReplacements < 0 ? "minder" : "meer"} aankopen en afval betekent, maar ook een ${differenceReplacements < 0 ? "goede" : "slechte"} impact heeft op de CO₂eq die nodig is om toestellen te vervaardigen en te vernietigen.`)
		//$(".resultUsageVsBuy").html(`${current_cost_purchase > 0 && current_cost_total < 0 ? "Voor een " + currentSituation + " kost het verbruik " + current_cost_consumption_one/current_cost_purchase*100 + " % meer dan de aankoop zelf." : "dat" }`);
		$(".resultIntro").html(`Door direct uw ${currentSituation} ${maal >= 1 ? " " : maal} te vervangen door een ${newSituation} maakt u over een termijn van ${termijn} jaar €${Math.abs(difference_cost_total)} ${difference_cost_total < 0 ? "verlies" : "winst"} en zorgt U voor ${Math.abs(difference_co_total)} kg CO₂eq ${difference_co_total < 0 ? "meer" : "minder"} uitstoot. ${difference_cost_total < 0 & difference_co_total < 0 ? " U kan dus beter bij uw huidige situatie blijven!" : "Het is dus een zeer goed idee om te wisselen naar een " + newSituation + "!"}`);
		$(".resultIntro").html(`Door direct uw ${currentSituation} ${maal >= 1 ? " " : maal} te vervangen door een ${newSituation} maakt u over een termijn van ${termijn} jaar €${Math.abs(difference_cost_total)} ${difference_cost_total < 0 ? "verlies" : "winst"} en zorgt u voor ${Math.abs(difference_co_total)} kg CO₂eq ${difference_co_total < 0 ? "meer" : "minder"} uitstoot. ${difference_cost_total < 0 & difference_co_total < 0 ? " U kan dus beter bij uw huidige situatie blijven!" : "Het is dus een zeer goed idee om te wisselen naar een " + newSituation + "!"}`);
		$(".resultReplacements").html(`U moet op ${termijn} jaar uw ${currentReplacements == newReplacements ? "toestellen in de huidige en nieuwe situatie " + newReplacements + " keer vervangen." : currentSituation + " " + currentReplacements + " maal en uw " + newSituation + " " + newReplacements + " keer vervangen binnen de respectievelijke levensduur."} U moet dus ${Math.abs(differenceReplacements)} keer ${differenceReplacements < 0 ? "minder" : "meer"} wisselen wat niet alleen ${differenceReplacements < 0 ? "minder" : "meer"} werk en ${differenceReplacements < 0 ? "minder" : "meer"} aankopen en afval betekent, maar ook een ${differenceReplacements < 0 ? "goede" : "slechte"} impact heeft op de CO₂eq die nodig is om toestellen te vervaardigen en te vernietigen.`)
		
		//€ Verbruik versus aankoop
		var text = ""; 
		if(current_cost_purchase>0 && current_cost_total>0){
			text += `Voor een ${currentSituation} kost `;
			
			if(current_cost_consumption>current_cost_purchase){
				text += `het verbruik ${(current_cost_consumption/current_cost_purchase*100).toFixed(1)} % meer dan de aankoop zelf. `
			} else {
				text += `de aankoop ${(current_cost_consumption/current_cost_purchase*100).toFixed(1)} % meer dan het verbruik.`
			} 
			 
			text += ` Op een totale kost van € ${(current_cost_total).toFixed(2)} kosten de aankopen €${(current_cost_purchase).toFixed(2)} (${(current_cost_purchase/current_cost_total*100).toFixed(1)}%) en het verbruik: €${(current_cost_consumption).toFixed(2)} (${(current_cost_consumption/current_cost_total*100).toFixed(1)}%). Voor een ${newSituation} kost `
			
			if(new_cost_consumption>new_cost_purchase) {
				text += `het verbruik ${(new_cost_consumption/new_cost_purchase*100).toFixed(1)} % meer dan de aankoop zelf. `
			} else {
				text += `de aankoop ${(new_cost_consumption/new_cost_purchase*100).toFixed(1)} % meer dan het verbruik.`
			}
			
			text += `Op een totale kost van €${(new_cost_total).toFixed(2)} kosten de aankopen: €${(new_cost_purchase).toFixed(2)} (${(new_cost_purchase/new_cost_total*100).toFixed(1)}%), verbruik: €${(new_cost_consumption).toFixed(2)} (${(new_cost_consumption/new_cost_total*100).toFixed(1)}%). `
			$(".resultUsageVsBuy").html(text);
		} else {
			text += `Omdat de aankoopprijs of verbruik van de huidige installatie 0 is kan geen procentuele vergelijking worden gemaakt tussen verbruik en aankoop.`
			$(".resultUsageVsBuy").html(text);
		}

		//"CO2 UITSTOOT - VERBRUIK VERSUS AANKOOP" 
		var textCo = "";
		if(current_co_material>0 && current_co_consumption>0) {
			
			textCo += `Voor een ${currentSituation} stoot `;

			if(current_co_consumption  >current_co_material) {
				textCo += `het verbruik ${ (current_co_consumption/current_co_material*100).toFixed(1) } % meer uit dan de aankoop zelf. `;
			} else {
				textCo += `de aankoop ${ (current_co_material/current_co_consumption*100).toFixed(1) } % meer uit dan het verbruik.`;
			}
			
			textCo += ` Op een totale uitstoot van ${(current_co_total).toFixed(2)} kg CO₂eq stoot de aankoop ${(current_co_material).toFixed(2)} kg CO₂eq uit (${(current_co_material/current_co_total*100).toFixed(1)}%) 
			en het verbruik: ${(current_co_consumption).toFixed(2)} kg CO₂eq (${(current_co_consumption/current_co_total*100).toFixed(1)}%). `;
			
			textCo += `Voor een ${newSituation} stoot `;

			if(new_co_consumption>new_co_material) {
				textCo += `het verbruik ${(new_co_consumption/new_co_material*100).toFixed(1)} % meer uit dan de aankoop zelf. `;
			} else {
				textCo += `de aankoop ${(new_co_material/new_co_consumption*100).toFixed(1)} % meer uit dan het verbruik.`;
			}
			
			textCo += ` Op een totale uitstoot van ${(new_co_total).toFixed(2)} kg CO₂eq stoot de aankoop ${(new_co_material).toFixed(2)} kg CO₂eq uit (${(new_co_material/new_co_total*100).toFixed(1)}%) 
			en het verbruik: ${(new_co_consumption).toFixed(2)} kg CO₂eq (${(new_co_consumption/new_co_total*100).toFixed(1)}%).`;

			$(".resultCoUsageVsBuy").html(textCo);
		} else {
			textCo += `Omdat CO2 kost van verbruik of materialen 0 is kan geen procentuele vergelijking worden gemaakt tussen inherente CO2 kost tussen verbruik en aankoop.`;
			$(".resultCoUsageVsBuy").html(textCo);
		}

		// BOMEN" & TEKEN(10) & "Als U wisselt naar een "&nieuweinstallatie1&" hebt U nog " & AFRONDEN(O24;1) & " bomen nodig gedurende een termijn van " &termijn & " jaar om om de totale CO2 uitstoot van uw verbruikte energie en gebruikte materialen te compenseren."&" Dit zijn "&ABS(AFRONDEN(O25;1))&" bomen "&ALS(O25<0;"minder";"meer") & " dan als U niets doet,want voor een "&huidigeinstallatie&" zijn "&AFRONDEN(O23;1)&" gemiddelde bomen nodig."
		$(".resultTrees").html(`Als u wisselt naar een ${newSituation} hebt u nog ${Math.round(newTrees * 10) / 10} bomen nodig gedurende een termijn van ${termijn} jaar om de totale CO₂eq. uitstoot van uw verbruikte energie en gebruikte materialen te compenseren. <br/> <br/> Dit zijn ${Math.abs(Math.round(differenceTrees * 10) / 10)} bomen ${differenceTrees < 0 ? "minder" : "meer"} dan als u niets doet, want voor een ${currentSituation} zijn er gemiddeld ${Math.round(currentTrees * 10) / 10} bomen nodig.`)

		// if(D23 < 0 && F23 < 0){
		// 	Voor een "&huidigeinstallatie&" kost "&ALS(E23>D23;"het verbruik "&AFRONDEN(E23/D23*100;1)&" % meer dan de aankoop zelf.
		// } else {
		// 	de aankoop "&AFRONDEN(E23/D23*100;1)&" % meer dan het verbruik.
		// }
		// Op een totale kost van €"&AFRONDEN(F23;2)&" kosten de aankopen €"&AFRONDEN(D23;2)&" ("&AFRONDEN(D23/F23*100;1)&"%)"&"en het verbruik: €"&AFRONDEN(E23;2)&" ("&AFRONDEN(E23/F23*100;1)&"%)




		//"Voor een "&nieuweinstallatie1&" kost "&ALS(E24>D24;"het verbruik "&AFRONDEN(E24/D24*100;1)&" % meer dan de aankoop zelf. ";"de aankoop "&AFRONDEN(E24/D24*100;1)&" % meer dan het verbruik.")&"Op een totale kost van €"&AFRONDEN(F24;2)&" kosten de aankopen: €"&AFRONDEN(D24;2)&" ("&AFRONDEN(D24/F24*100;1)&"%)"&", verbruik: €"&AFRONDEN(E24;2)&" ("&AFRONDEN(E24/F24*100;1)&"%) ";"Omdat de aankoopprijs of verbruik van de huidige installatie 0 is kan geen procentuele vergelijking worden gemaakt tussen verbruik en aankoop.")&TEKEN(10) & "CO2 UITSTOOT - VERBRUIK VERSUS AANKOOP" & TEKEN(10) & ALS(EN(H23>0;I23>0);"Voor een "&huidigeinstallatie&" stoot "&ALS(I23>H23;"het verbruik "&AFRONDEN(I23/H23*100;1)&" % meer uit dan de aankoop zelf. ";"de aankoop "&AFRONDEN(H23/I23*100;1)&" % meer uit dan het verbruik.")&" Op een totale uitstoot van "&AFRONDEN(J23;2)&" kg CO2eq stoot de aankoop "&AFRONDEN(H23;2)&" kg CO2 eq uit ("&AFRONDEN(H23/J23*100;1)&"%) en het verbruik: "&AFRONDEN(I23;2)&" kg CO2eq ("&AFRONDEN(I23/J23*100;1)&"%) "&TEKEN(10) &"Voor een "&nieuweinstallatie1 &" stoot "&ALS(I24>H24;"het verbruik "&AFRONDEN(I24/H24*100;1)&" % meer uit dan de aankoop zelf. ";"de aankoop "&AFRONDEN(H24/I24*100;1)&" % meer uit dan het verbruik.")&" Op een totale uitstoot van "&AFRONDEN(J24;2)&" kg CO2eq stoot de aankoop "&AFRONDEN(H24;2)&" kg CO2 eq uit ("&AFRONDEN(H24/J24*100;1)&"%) en het verbruik: "&AFRONDEN(I24;2)&" kg CO2eq ("&AFRONDEN(I24/J24*100;1)&"%)";"Omdat CO2 kost van verbruik of materialen 0 is kan geen procentuele vergelijking worden gemaakt tussen inherente CO2 kost tussen verbruik en aankoop. ");"")

		$("#arrow--div").click(function (e) {
			setTimeout(
				function () {
					$(window).scrollTop($('#result').offset().top);
				}, 300);
		});
	}

	//----------------------------------------------------- CAPITALIZE FIRST LETTER ----------------------------------------------------- //

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

});
