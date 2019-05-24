function aircraftChecker() {
    let input = document.getElementById("userInput").value;
    let valueAPI = 'https://aviation-edge.com/v2/public/flights?key=002a16-94be96&flightIata=' + input;
    let output = document.getElementById("result");

    // API CALL
    fetch(valueAPI).then(response => {
        if (response.ok) {
            console.log("Content received");
            return response.json();
        }
        if (response.status >= 100 && response.status < 200) {
            console.log("Info for the client");
        }
        if (response.status >= 300 && response.status < 399) {
            console.log("Redirecting");
        }
        if (response.status >= 400 && response.status < 499) {
            console.log("Wrong request");
        }
        if (response.status >= 500 && response.status < 599) {
            console.log("Server error");
        }
    }).then(data => {
        console.log(data[0].aircraft.icaoCode);

        switch (data[0].aircraft.icaoCode) {
            case '':
                output.innerHTML = 'I could not detect your aircraft model 🤷‍♂️';
                break;
            case 'B38M':
                output.innerHTML = 'You are FLYING on a 737 Max 8!!! 😱';
                document.getElementById("panicBtn").classList.remove('hidden');
                break;
            default:
                output.innerHTML = 'You are NOT flying on a 737 Max 8 🥳';
                break;
        }
    }).catch(error => {
        output.innerHTML = 'I could not detect your aircraft model 🤷‍♂️'
        console.log('Error occured!!! ' + error);
    });
}