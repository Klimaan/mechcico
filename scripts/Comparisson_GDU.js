import database_GDU from './../database/database_GDU.js';

export default class Comparisson_GDU extends database_GDU {
    constructor(jFile) {
        super(jFile);

        // result variables
        this._currentReplacements = null;
        this._newReplacements = null;
        this._differenceReplacements = null;
        this._currentCostPurchase = null;
        this._newCostPurchase = null;
        this._differenceCostPurchase = null;
        this._currentCostConsumption = null;
        this._newCostConsumption = null;
        this._diffeenceCostConsumption = null;
        this._currentCostTotal = null;
        this._newCostTotal = null;
        this._differenceCostTotal = null;
        this._currentCoMaterial = null;
        this._newCoMaterial = null;
        this._differenceCoMaterial = null;
        this._currentCoConsumption = null;
        this._newCoConsumption = null;
        this._differenceCoConsumption = null;
        this._currentCoTotal = null;
        this._newCoTotal = null;
        this._differenceCoTotal = null;
        this._differenceTrees = null;

        // setting variables
        this._period = 10;       // [years]
        this._nbOfMachines = 1;        // [number of]
        this._currentInstallation = null;     // directly from database
        this._newInstallation = null;     // directly from database
        this._priceKwh = 0.25;     // [€]
        this._co2Kwh = 0.260;    // [kg CO2eq]
        this._keep = 0;        // 1 = change old installation only after full lifespan
        this._kgCO2TreeYear = 26.635;

        // help variables
        this._devswap = 0;        //[uur] time to replace a device

    }

    // setters
    set currentInstallation(x) { this._currentInstallation = x; }
    set newInstallation(x) { this._newInstallation = x; }
    set Period(x) { this._period = x; }
    set NbOfMachines(x) { this._nbOfMachines = x; }
    set PriceKwh(x) { this._priceKwh = x; }
    set Co2Kwh(x) { this._co2Kwh = x; }
    set Keep(x) { this._keep = x; }

    //getters
    get currentInstallation() { return this._currentInstallation; }
    get newInstallation() { return this._newInstallation; }
    get Period() { return this._period; }
    get NbOfMachines() { return this._nbOfMachines; }
    get PriceKwh() { return this._priceKwh; }
    get Co2Kwh() { return this._co2Kwh; }
    get Keep() { return this._keep; }

    //main calculation
    calculate(dataCurrent, dataNew, kwh_prijs, co_consumption, termijn, maal) {

        // console.log(kwh_prijs);
        // console.log(co_consumption);
        // console.log(termijn);

        //console.log(dataCurrent);
        //console.log(dataNew);

        //     var currentUseData = this._currentInstallation;
        //     var newUseData = this._newInstallation;

        //     if (currentData != null){ currentUseData    = currentData; }
        //     if (newData != null)    { newUseData        = newData; }

        //     console.log(+(currentUseData.age) + ";" + +(currentUseData.leven) + ";" + +(newUseData.age) + ";" + +(newUseData.leven))
        this.CalculateReplacements(+(dataCurrent.age), +(dataCurrent.leven), +(dataNew.age), +(dataNew.leven));

        this.CalculateCostPurchase(+(dataCurrent.prijs), +(dataNew.prijs), +(dataCurrent.age), +(maal));

        this.CalculateCostConsumption(+(dataCurrent.power), +(dataCurrent.use), +(kwh_prijs), +(termijn), +(maal), +(dataNew.power), +(dataNew.use), +(dataCurrent.leven), +(dataCurrent.age));

        //    //this.#CalculateTotalCost();
        // (ALS(hleven>(termijn+devswap);hprod;hprod*vh+heol*(vh-1)))*maal;(ALS((hleven-hage)>(termijn+devswap);0;(hprod+heol)*vh))*maal))
        this.CalculateCoMaterial(+(dataCurrent.leven), +(termijn), +(maal), +(dataCurrent.product), +(dataCurrent.eol), +(dataNew.leven), +(dataNew.product), +(dataNew.eol), +(dataNew.age), +(dataCurrent.age) );     //TODO
        this.CalculateCoConsumption(+(dataCurrent.power), +(dataCurrent.use), +(co_consumption), +(termijn), +(maal), +(dataNew.power), +(dataNew.use), +(dataCurrent.leven), +(dataCurrent.age), );  //TODO
        
        //TODO
        // this.CalculateCoTotal();        
        // this.CalculateTrees( );
    }

    //private calculations
    /**
        P = period
        A = age of first installation not yet replaced
        L = lifespan of 1 installation
        Q = L - A
        number of replacements old device = 1 + floor((P - Q) / L) = 1 + floor((P-(L-A))/L) = floor((P + A)/L))

            |------------P---------------|
            |-Q-|------------------------|
            |   |                        |
old installation                         |
        |-A-|---|                        |
        |---L---|---L---|---L---|---L---|---L---|
            |   |                        |
            |   |                        |
            |   |                        |
new installation|                        |
keep=0 |-An-|-------|                    |
       |---Ln-------|---Ln-------|---Ln-------|
        number of replacements new device = floor((P + An)/Ln))
            |   |                        |
            |   |                        |
            |   |                        |
keep=1     |-An-|-------|                |
           |---Ln-------|---Ln-------|---Ln-------|

        number of replacements new device = floor((P - keep*(L - A) + An)/Ln))

Excell current replacement
--------------------------
=ALS(LENGTE(huidigeinstallatie)=0;
    "";
    ALS(hage=0;
        1+GEHEEL((termijn-devswap)/hleven;0);
        ALS((hleven-hage)<(termijn-devswap);
            AFRONDEN.NAAR.BOVEN(((termijn+devswap)-(hleven-hage))/hleven;0);
            0)
        )
    )
Excell new replacement
----------------------
=ALS(LENGTE(nieuweinstallatie1)=0;
    "";
    ALS(keep=0;

        ALS(nage1=0;
            1+GEHEEL((termijn-devswap)/nleven1;0);
            ALS((nleven1-nage1)<(termijn-devswap);
                AFRONDEN.NAAR.BOVEN(((termijn+devswap)-(nleven1-nage1))/nleven1;0);
                0)
            );

        ALS(nage1=0;
            ALS(hleven<(termijn-devswap);1;0)+GEHEEL(MAX(0;(termijn-devswap-(hleven-hage)))/nleven1;0);
            AFRONDEN.NAAR.BOVEN((MAX(0;(termijn-devswap-(hleven-hage))-(nleven1-nage1)))/(nleven1);0)
            )
        )
    )
    */
    CalculateReplacements(current_age, current_lifespan, new_age, new_lifespan) {
        var currentReplacements = 0
        if (current_age == 0) {
            currentReplacements = 1 + Math.floor((this._period - this._devswap) / current_lifespan);
        }
        else {
            if ((current_lifespan - current_age) < (this._period - this._devswap)) {
                currentReplacements = Math.ceil(((this._period + this._devswap) - (current_lifespan - current_age)) / current_lifespan)
            }
        }

        var newReplacements = 0;
        if (this._keep == 0) {
            if (new_age == 0) {
                newReplacements = 1 + Math.floor((this._period - this._devswap) / new_lifespan);
            }
            else {
                if ((new_lifespan - new_age) < (this._period - this._devswap)) {
                    newReplacements = Math.ceil(((this._period + this._devswap) - (new_lifespan - new_age)) / new_lifespan)
                }
            }
        }
        else {
            if (current_age == 0) {
                var x = 0
                if (current_lifespan < (this._period - this._devswap)) {
                    x = 1;
                }
                newReplacements = x + Math.round(Math.max(0, (this._period - this._devswap - (current_lifespan - current_age))) / new_lifespan);
            }
            else {
                newReplacements = Math.ceil(Math.max(0, (this._period - this._devswap - (current_lifespan - current_age)) - (new_lifespan - new_age)) / new_lifespan);
            }
        }
        //var currentReplacements     = Math.floor((+(this._period) + current_age) / current_lifespan);
        //var newReplacements         = Math.floor((+(this._period) - +(this._keep) * (current_lifespan - current_age) + new_age) / new_lifespan);
        var differenceReplacements = newReplacements - currentReplacements;

        this._currentReplacements = currentReplacements;
        this._newReplacements = newReplacements;
        this._differenceReplacements = differenceReplacements;
    }
    /*
    current
    -------
    =ALS(LENGTE(huidigeinstallatie)=0;
        "";
        B23*hprijs*maal
        )
    new
    ---
    =ALS(LENGTE(nieuweinstallatie1)=0;
        "";
        B24*nprijs1*maal+ALS(keep=1;
                                ALS(EN(vh>0;hage=0);
                                    D23/vh;
                                    0)
                            )
        )
    */
    CalculateCostPurchase(current_price, new_price, current_age, maal) {
        var currentCostPurchase = this._currentReplacements * current_price * maal;

        var newCostPurchase = 0;
        var x = 0;
        if (this._keep == 1) {
            if ((this._currentReplacements > 0) && (current_age == 0)) {
                x = currentCostPurchase / this._currentReplacements;
            }
        }
        newCostPurchase = x + this._newReplacements * (Math.round(new_price * 10) / 10) * maal;


        /*
        var replacedOld = 1;
        if (this._currentReplacements === 0) {
           replacedOld = 0;
        }

        var currentCostPurchase     = this._currentReplacements * current_price * this._nbOfMachines;
        var newCostPurchase         = (this._newReplacements * new_price) + (this._keep * replacedOld * current_price) * this._nbOfMachines;
        */
        var differenceCostPurchase = newCostPurchase - currentCostPurchase;

        this._currentCostPurchase = currentCostPurchase;
        this._newCostPurchase = newCostPurchase;
        this._differenceCostPurchase = differenceCostPurchase;
    }
    /*
    Current
    -------
    =ALS(LENGTE(huidigeinstallatie)=0;
        "";
        (hpower*huse/1000*prijs*365*termijn*maal)
        )
    new
    ---
    =ALS(LENGTE(nieuweinstallatie1)=0;
        "";
        ALS(keep=0;
            npower1*nuse1/1000*prijs*365*termijn*maal;
            ((hpower*huse/1000*prijs*365*MIN(termijn;hleven-hage))+(npower1*nuse1/1000*prijs*365*MAX(0;(termijn-(hleven-hage)))))*maal
            )
        )
    */
    // hpower*huse/1000*prijs*365*termijn*maal))
    // #CalculateCostConsumption(current_power,current_use_day, current_lifespan, current_age, new_power, new_use_day){
    //     var currentCostConsumption      = ((current_power * current_use_day)/1000)*this._priceKwh*365*this._period*this._nbOfMachines;
    //     var newCostConsumption          = (this._keep * ((current_power * current_use_day / 1000) * this._price_kwh * 365 * Math.min(this._period,(current_lifespan - current_age))) +
    //                                       ((new_power * new_use_day / 1000) * this._price_kwh * 365 * Math.max(0,(this._period - this._keep * (current_lifespan - current_age)))))*this._nbOfMachines;
    //     var diffeenceCostConsumption    = newCostConsumption - currentCostConsumption;

    //     this._currentCostConsumption     = currentCostConsumption;
    //     this._newCostConsumption         = newCostConsumption;
    //     this._diffeenceCostConsumption   = diffeenceCostConsumption;

    //     console.log(this._currentCostConsumption);
    //     console.log(this._newCostConsumption);
    //     console.log(this._diffeenceCostConsumption);
    // }

    CalculateCostConsumption(current_power, current_use_day, kwh_prijs, termijn, maal, new_power, new_use_day, current_leven, current_age) {

        var currentCostConsumption = current_power * current_use_day / 1000 * kwh_prijs * 365 * termijn * maal;
        if(this._keep == 0){
            var newCostConsumption = new_power*new_use_day/1000*kwh_prijs*365*termijn*maal;
        } else {
            var newCostConsumption = (current_power*current_use_day/1000*kwh_prijs*365*Math.min(termijn,current_leven-current_age))+(new_power*new_use_day/1000*kwh_prijs*365*Math.max(0,(termijn-(current_leven-current_age))))*maal;
        }
        
        var differenceCostConsumption = currentCostConsumption - newCostConsumption;

        //console.log(differenceCostConsumption);

        this._currentCostConsumption = currentCostConsumption;
        this._newCostConsumption = newCostConsumption;
        this._differenceCostConsumption = differenceCostConsumption;
    }

    /*
    Current
    -------

    new
    ---

    */
    CalculateTotalCost() {
        var currentCostTotal = this._currentCostPurchase + this._currentCostConsumption;
        var newCostTotal = this._newCostPurchase + this._newCostConsumption;
        var differenceCostTotal = newCostTotal - currentCostTotal;

        this._currentCostTotal = currentCostTotal;
        this._newCostTotal = newCostTotal;
        this._differenceCostTotal = differenceCostTotal;
    }
    /*
    Current
    -------
    =ALS(LENGTE(huidigeinstallatie)=0;
        "";
        ALS(hage=0;
            (ALS(hleven>(termijn+devswap);
                hprod;
                hprod*vh+heol*(vh-1)))*maal;
            (ALS((hleven-hage)>(termijn+devswap);
                0;
                (hprod+heol)*vh))*maal
            )
        )
    new
    ---
    =ALS(LENGTE(nieuweinstallatie1)=0;
        "";
        ALS((nleven1-nage1)>termijn;
            ALS(nage1=0;nprod;0);
            (nprod*vn+neol*(vn-ALS(nage1=0;1;0)))+ALS(EN(keep=1;hage=0);hprod;0))*maal
        )
    */
   // (ALS(hleven>(termijn+devswap);hprod;hprod*vh+heol*(vh-1)))*maal;(ALS((hleven-hage)>(termijn+devswap);0;(hprod+heol)*vh))*maal))
    CalculateCoMaterial(current_lifespan, termijn, maal, current_product, current_eol, new_lifespan, new_product, new_eol, new_age, current_age) {
        
        if(current_age == 0){
            if(current_lifespan > termijn){
                var currentCoMaterial = current_product;
            } else {
                var currentCoMaterial = (current_product * this._currentReplacements + current_eol * (this._currentReplacements - 1)) * maal;
            }
        } else {
            if((current_lifespan - current_lifespan) > termijn){
                var currentCoMaterial = 0
            } else {
                var currentCoMaterial = ((current_product + current_eol) * this._currentReplacements) * maal;
            }
        }

        // if(current_lifespan > termijn){
        //     var currentCoMaterial = ((current_product / current_eol) * this._currentReplacements) * maal;
        // } else {
        //     var currentCoMaterial = (current_product * this._currentReplacements + current_eol * (this._currentReplacements - 1)) * maal;
        // }

        if(new_age == 0){
            var last = 1;
        } else {
            var last = 0;
        }

        if((new_lifespan - new_age) > termijn){
            if(new_age == 0){
                var newCoMaterial = new_product * maal
            } else {
                var newCoMaterial = 0
            }
        } else {
            var newCoMaterial = (new_product * this._newReplacements + new_eol * (this._newReplacements - last)) * maal;
        }

        this._currentCoMaterial = currentCoMaterial;
        this._newCoMaterial = newCoMaterial;
        this._differenceCoMaterial = currentCoMaterial - newCoMaterial;
    }
    /*
   Current
   -------
   =ALS(LENGTE(huidigeinstallatie)=0;"";(hpower*huse/1000*CO2verbruik*365*termijn*maal))
   new
   ---
  =ALS(LENGTE(nieuweinstallatie1)=0;"";(ALS(keep=0;npower1*nuse1/1000*CO2verbruik*365*termijn;(hpower*huse/1000*CO2verbruik*365*MIN(termijn;hleven-hage))+(npower1*nuse1/1000*CO2verbruik*365*MAX(0;(termijn-(hleven-hage))))))*maal)
   */
  
    CalculateCoConsumption(current_power, current_use, co, termijn, maal, new_power, new_use, current_lifespan, current_age) {

        var currentCoConsumption = current_power * current_use / 1000 * co * 365 * termijn * maal;
        
        if(this._keep == 0){
            var newCoConsumption = (new_power * new_use) / 1000 * co * 365 * termijn * maal;
        } else {
            var newCoConsumption = (current_power*current_use/1000*co*365*Math.min(termijn, current_lifespan-current_age))+(new_power*new_use/1000*co*365*Math.max(0,(termijn - (current_lifespan-current_age))))*maal;
            //(hpower*huse/1000*CO2verbruik*365*MIN(termijn;hleven-hage))+(npower1*nuse1/1000*CO2verbruik*365*MAX(0;(termijn-(hleven-hage))))))*maal)
        }
        
        var differenceCoConsumption = currentCoConsumption - newCoConsumption;

        this._currentCoConsumption = currentCoConsumption;
        this._newCoConsumption = newCoConsumption;
        this._differenceCoConsumption = differenceCoConsumption;
    }
    /*
    Current
    -------

    new
    ---

    */
    CalculateCoTotal() {
        var currentCoTotal = this._currentCoMaterial + this._currentCoConsumption;
        var newCoTotal = this._newCoMaterial + this._newCoConsumption;
        var differenceCoTotal = this._differenceCoMaterial + this._differenceCoConsumption;

        this._currentCoTotal = currentCoTotal;
        this._newCoTotal = newCoTotal;
        this._differenceCoTotal = differenceCoTotal;
    }
    /*
    Current
    -------

    new
    ---

    */
    CalculateTrees() {
        var currentTrees = (this._currentCoTotal / this._period) / this._kgCO2TreeYear;
        var newTrees = (this._newCoTotal / this._period ) / this._kgCO2TreeYear;
        var differenceTrees = currentTrees - newTrees;


        this._currentTrees = currentTrees;
        this._newTrees = newTrees;
        this._differenceTrees = differenceTrees;
    }

    /*
    =ALS(LENGTE(current_installation)=0;
        "";
        ALS(current_age=0;
            (ALS(current_lifespan>(period+now);
                hprod;
                hprod*current_replacements+heol*(current_replacements-1)))
                *amount_machines;
            (ALS((current_lifespan-current_age)>(period+now);
                0;
                (hprod+heol)*current_replacements))
            *amount_machines))
    */
    // help methods


}
