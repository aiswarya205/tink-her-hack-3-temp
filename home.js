function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 20.5937, lng: 78.9629 }, // Default location (India)
        zoom: 5,
    });

    let marker = new google.maps.Marker({
        position: { lat: 20.5937, lng: 78.9629 },
        map: map,
        draggable: true
    });

    google.maps.event.addListener(map, 'click', function(event) {
        marker.setPosition(event.latLng);
        document.getElementById('location').value = event.latLng.lat() + ", " + event.latLng.lng();
    });
}

document.getElementById("wasteForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let plastic = parseFloat(document.getElementById("plastic").value) || 0;
    let paper = parseFloat(document.getElementById("paper").value) || 0;
    let food = parseFloat(document.getElementById("food").value) || 0;

    // Waste Price Calculation
    let plasticPrice = plastic * 5;
    let paperPrice = paper * 5;
    let foodPrice = food * 10;
    
    let totalCharge = plasticPrice + paperPrice + foodPrice;

    // Fine Calculation (if waste > 10kg per type)
    let finePlastic = plastic > 10 ? (plastic - 10) * 15 : 0;
    let finePaper = paper > 10 ? (paper - 10) * 15 : 0;
    let fineFood = food > 10 ? (food - 10) * 15 : 0;

    let totalFine = finePlastic + finePaper + fineFood;
    let totalAmountDue = totalCharge + totalFine;

    let tableBody = document.getElementById("wasteTableBody");
    let newRow = tableBody.insertRow();
    newRow.insertCell(0).innerText = plastic;
    newRow.insertCell(1).innerText = paper;
    newRow.insertCell(2).innerText = food;
    newRow.insertCell(3).innerText = "₹" + totalCharge;
    newRow.insertCell(4).innerText = totalFine > 0 ? "₹" + totalFine : "₹0";

    document.getElementById("amountDue").innerText = "Total Amount Due: ₹" + totalAmountDue;
});
