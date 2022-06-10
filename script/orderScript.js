loadOrders(sessionStorage.getItem("username"));
function loadOrders(em) {
  console.log(em);
  var userName = em;
  var url = "http://localhost:3030/getAllOrders/" + userName;
  (async () => {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const content = await rawResponse.json();
    content.forEach((order) => {
      var trElement = document.createElement("tr");
      var thElement = document.createElement("th");
      thElement.setAttribute("scope", "row");
      thElement.textContent = order.orderName;
      trElement.appendChild(thElement);
      var td1 = document.createElement("td");
      td1.textContent = order.orderId;
      trElement.appendChild(td1);
      var td2 = document.createElement("td");
      td2.textContent = order.orderAmount;
      trElement.appendChild(td2);
      var td3 = document.createElement("td");
      td3.textContent = order.orderStatus ? "Completed" : "Processing";
      trElement.appendChild(td3);
      var tableBody = document.getElementById("tableBody");
      tableBody.appendChild(trElement);
    });
  })();
}
