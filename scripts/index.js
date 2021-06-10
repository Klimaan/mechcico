$(document).ready(function () {

    $(".container").slideToggle();

    $("#arrow--div").click(function () {
        $(".container").slideToggle();
        $(".arrow").toggleClass("example");
    });


    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("professor");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function (e) {
        modal.style.display = "block";
        e.preventDefault();
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $(".current_install").change(function () {
        let current_age = $(".current_age").val();
        let current_lifespan = $(".current_lifespan").val();

        if (current_age > current_lifespan) {
            $(".notification").css("display", "block");
            $(".clip").css("pointer-events", "pointer");
            $(".situationOne").css("display", "inline-block");
            $(".cancel").css("display", "inline-block");
            $(".modal-content p").html("De door u ingegeven ouderdom is groter dan de totale levensduur. Dat is onmogelijk, en het systeem zal de ouderdom automatisch aanpassen naar een waarde die net iets kleiner is dan de levensduur.");
            $(".modal").css("display", "block");
        } else {
            $(".notification").css("display", "none");
            $(".clip").css("pointer-events", "none");
        }
    });

    $(".new_install").change(function () {
        let new_age = $(".new_age").val();
        let new_lifespan = $(".new_lifespan").val();

        if (new_age > new_lifespan) {
            $(".notification").css("display", "block");
            $(".clip").css("pointer-events", "pointer");
            $(".situationOne").css("display", "inline-block");
            $(".cancel").css("display", "inline-block");
            $(".modal-content p").html("De door u ingegeven ouderdom is groter dan de totale levensduur. Dat is onmogelijk, en het systeem zal de ouderdom automatisch aanpassen naar een waarde die net iets kleiner is dan de levensduur.");
            $(".modal").css("display", "block");
        } else {
            $(".notification").css("display", "none");
            $(".clip").css("pointer-events", "none");
        }
    });

    // Button situation One
    $(".situationOne").click(function () {
        let current_age = $(".current_age").val();
        let current_lifespan = $(".current_lifespan").val();

        if (current_age > current_lifespan) {
            $(".current_age").val(current_lifespan - 0.1);
            modal.style.display = "none";
        }

        let new_age = $(".new_age").val();
        let new_lifespan = $(".new_lifespan").val();

        if (new_age > new_lifespan) {
            $(".new_age").val(new_lifespan - 0.1);
            modal.style.display = "none";
        }

        $(".notification").css("display", "none");
        $(".clip").css("pointer-events", "none");
    });

    $(".cancel").click(function () {
        modal.style.display = "none";
    });

    $(".current_use_day").change(function () {
        let current_use_day = $(".current_use_day").val();
        let new_use_day = $(".new_use_day").val();

        if (current_use_day !== new_use_day && current_use_day !== "" && new_use_day !== "") {
            $(".notification").css("display", "block");
            $(".clip").css("pointer-events", "pointer");
            $(".situationTwo").css("display", "inline-block");
            $(".cancel").css("display", "inline-block");
            $(".modal-content p").html("Opgepast, In een wetenschappelijk correcte vergelijking moet u toestellen met gelijke grootteorde vergelijken! Zet het gebruik in uur/dag in de huidige en nieuwe situatie gelijk om een wetenschappelijk correcte vergelijking te maken.");
            $(".modal").css("display", "block");
        } else {
            $(".notification").css("display", "none");
            $(".clip").css("pointer-events", "none");
        }
    });

    $(".new_use_day").change(function () {
        let current_use_day = $(".current_use_day").val();
        let new_use_day = $(".new_use_day").val();

        if (current_use_day !== new_use_day && current_use_day !== "" && new_use_day !== "") {
            $(".notification").css("display", "block");
            $(".clip").css("pointer-events", "pointer");
            $(".situationTwo").css("display", "inline-block");
            $(".cancel").css("display", "inline-block");
            $(".modal-content p").html("Opgepast, In een wetenschappelijk correcte vergelijking moet u toestellen met gelijke grootteorde vergelijken! Zet het gebruik in uur/dag in de huidige en nieuwe situatie gelijk om een wetenschappelijk correcte vergelijking te maken.");
            $(".modal").css("display", "block");
        } else {
            $(".notification").css("display", "none");
            $(".clip").css("pointer-events", "none");
        }
    });

    $(".situationTwo").click(function () {
        console.log("test");
        let new_use_day = $(".new_use_day").val();
        console.log(new_use_day);

        $(".current_use_day").val(new_use_day);
        modal.style.display = "none";

        $(".notification").css("display", "none");
        $(".clip").css("pointer-events", "none");
    });    
});