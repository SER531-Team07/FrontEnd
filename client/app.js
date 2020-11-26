var search = () => {
    var location = document.getElementById('location').value;
    var company = document.getElementById('company').value;
    var title = document.getElementById('title').value;
    var industry = document.getElementById('industry').value;
    var jobType = document.getElementById('jobType').value;
    var filter = { location, company, title, industry, jobType };
    searchAPI(filter);
    createCharts();
}

var searchAPI = (filter) => {
    let endpoint = 'http://localhost:8080/jobs?'
    filter.location != '' && (endpoint += `city=${filter.location}&`)
    filter.company != '' && (endpoint += `company=${filter.company}&`)
    filter.title != '' && (endpoint += `title=${filter.title}&`)
    filter.jobType != '' && (endpoint += `jobtype=${filter.jobType}&`)
    filter.industry != '' && (endpoint += `industry=${filter.industry}&`)
    fetch(endpoint)
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            console.log('Error occured');
            return {};
        }
    })
    .then(res => res.json())
    .then(data => printResults(data))
    .catch(err => console.error(err));
}

var printResults = (results) => {
    var resultHTML = '';
    for (let row of results.job) {
        resultHTML += `<div class="border border-light card">
            <div class="card-header">${row.cityName}</div>
            <div class="card-body">
                <h4 class="card-title">${row.companyName}</h4>
                <h5 class="card-text">${row.title}</h5>
                <div class="card-text">${row.type}</div>
                <div class="card-text">${row.industry}</div>
                <div class="card-text">
                <i class="fas fa-wallet"></i> ${row.salary}</div>
                <small class="card-text">Posted on: ${row.date}</small>
            </div>
            <a 
                class="btn btn-link"
                target="_blank"
                href=${row.link}>
                Apply Now
            </a>
        </div>`;
    }

    document.getElementById("results").innerHTML = resultHTML;
    renderChart();
}

var createCharts = () => {
    document.getElementById("row").innerHTML = `<div class="border border-light p-4 col-3" id="graphs">
        <div class="card">
            <div class="card-header">Radar Chart</div>
            <div class="card-body">
                <canvas id="radarChart"></canvas>
            </div>
        </div>
        <div class="p-4"></div>
        <div class="card">
            <div class="card-header">Horizontal Bar Chart</div>
            <div class="card-body">
                <canvas id="horizontalBar"></canvas>
            </div>
        </div>
    </div>
    <div class="border border-light p-4 col-9 " id="results"></div>`;
}


function renderChart() {
    var ctxR = document.getElementById("radarChart").getContext('2d');
    new Chart(ctxR, {
        type: 'radar',
        data: {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [{
                label: "My First dataset",
                data: [65, 59, 90, 81, 56, 55, 40],
                backgroundColor: [
                    'rgba(105, 0, 132, .2)',
                ],
                borderColor: [
                    'rgba(200, 99, 132, .7)',
                ],
                borderWidth: 2
            }, {
                label: "My Second dataset",
                data: [28, 48, 40, 19, 96, 27, 100],
                backgroundColor: [
                    'rgba(0, 250, 220, .2)',
                ],
                borderColor: [
                    'rgba(0, 213, 132, .7)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true
        }
    });


    new Chart(document.getElementById("horizontalBar"), {
        "type": "horizontalBar",
        "data": {
            "labels": ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Grey"],
            "datasets": [{
                "label": "My First Dataset",
                "data": [22, 33, 55, 12, 86, 23, 14],
                "fill": false,
                "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"
                ],
                "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)"
                ],
                "borderWidth": 1
            }]
        },
        "options": {
            "scales": {
                "xAxes": [{
                    "ticks": {
                        "beginAtZero": true
                    }
                }]
            }
        }
    });
}
