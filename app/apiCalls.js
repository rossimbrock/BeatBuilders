export function sendSearchQueryData(searchData) {
    fetch ("http://localhost:8080/searchQuery", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({search_data:searchData})
    })
    .then((response) => console.log(response.text()))
    .catch((error) => console.error("Bad Request: 400"))
}
