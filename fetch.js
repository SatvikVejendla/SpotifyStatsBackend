//This file is used to test the server requests to the SQL database.

/*fetch("http://localhost:8000/request", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'buffer': '1',
    },

}).then(res => res.json()).then(body => {
    console.log(body);
});
*/


fetch("http://localhost:8000/authorize", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'buffer': "ABCD",
        'token': "TOKEN",
        'refresh_token': "REFRESH_TOKEN",
    },

}).then(res => res.text()).then(body => {
    console.log(body);
});