const container = document.getElementById("container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = parseInt(movieSelect.value); //+ converts to int

const saveMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

const populateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if(selectedSeats && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){ //quiere decir que existe si es > -1
                seat.classList.add("selected");
            } 
        });
    }    

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    
    if(selectedMovieIndex){
        movieSelect.selectedIndex = selectedMovieIndex;
        ticketPrice = parseInt(movieSelect.value);
    }  
}

const updateSelectedCount = () => {

    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //guarda en el browser los valores dados 

    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
}

movieSelect.addEventListener("change", () => {
    ticketPrice = parseInt(movieSelect.value);    
    total.innerText = parseInt(count.innerText) * ticketPrice;
    saveMovieData(movieSelect.selectedIndex, parseInt(movieSelect.value));
});

container.addEventListener("click", (e) => {
    if(
        e.target.classList.contains("seat") && 
        !e.target.classList.contains("occupied")
    ){
        e.target.classList.toggle("selected"); //agrega o remueve la clase mencionada
        updateSelectedCount();
    }
});

populateUI();
updateSelectedCount();
saveMovieData(movieSelect.selectedIndex, parseInt(movieSelect.value));


