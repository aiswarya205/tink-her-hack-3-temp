document.getElementById("wasteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let plastic = parseFloat(document.getElementById("plastic").value);
    let paper = parseFloat(document.getElementById("paper").value);
    let food = parseFloat(document.getElementById("food").value);
    
    let extraPlastic = plastic > 20 ? plastic - 20 : 0;
    let extraPaper = paper > 10 ? paper - 10 : 0;
    let extraFood = food > 10 ? food - 10 : 0;

    let extraWeight = extraPlastic + extraPaper + extraFood;
    let extraCost = extraWeight * 50;

    let costOutput = `Total extra cost: ₹${extraCost}`;
    
    document.getElementById("costOutput").innerText = costOutput;

    // Send data to server
    fetch("server/server.php", {
        method: "POST",
        body: JSON.stringify({ plastic, paper, food, extraCost }),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.text())
      .then(data => alert(data));
});