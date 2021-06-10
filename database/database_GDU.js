export default class database_GDU {
    constructor(jFile) {
        //read as JSON and parse it into class variable
        this._data = JSON.parse(JSON.stringify(jFile));
    }
    getListOfTypes() {
        return this._data.map(obj=>obj.type).filter((elem, index, self) => {return index == self.indexOf(elem)});
    }
    getNamesOfType(type) {
        return this._data.filter(obj => obj.type == type).map(obj=>obj.naam).filter((elem, index, self) => {return index == self.indexOf(elem)});
    }
    getObject(type,naam) {

        //conversions of units
        var data = this._data.filter(obj => obj.type == type).filter(obj => obj.naam == naam)[0];
        var dataReturn = {};

        //console.log(data)

        dataReturn.prijs    = +(data["€/W"]) * +(data["W (gemiddeld)"]);
        dataReturn.age      = 0;
        dataReturn.use      = +(data["uur/dag"]);
        dataReturn.leven    = (+(data["uren"])/dataReturn.use)/365;
        dataReturn.power    = +(data["W (gemiddeld)"]);
        dataReturn.useyear  = dataReturn.power*dataReturn.use*365/1000;
        dataReturn.product  = +(data["kg CO2eq/W"]);
        dataReturn.eol      = +(data["kg CO2eg/W"]);

        //console.log(dataReturn.prijs)

        return dataReturn;
    }
    getListOfKeys() {
        return Object.keys(this._data[0]);
    }

}
