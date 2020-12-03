const url = 'http://localhost:8080';

var search = () => {
    var location = document.getElementById('location').value;
    var company = document.getElementById('company').value;
    var title = document.getElementById('title').value;
    var industry = document.getElementById('industry').value;
    var jobType = document.getElementById('jobType').value;
    var filter = { location, company, title, industry, jobType };
    searchAPI(filter);
    createCharts();
    if (location) {
        locationVisualizationAPI(location);
    }
    if (company) {
        companyVisualizationAPI(company);
    }
    if (title) {
        titleVisualizationAPI(title);
    }
    if (industry) {
        industryVisualizationAPI(industry);
    }
    if (jobType) {
        jobtypeVisualizationAPI(jobType);
    }
}

var searchAPI = (filter) => {
    let endpoint = url + '/jobs?'
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

var locationVisualizationAPI = (location) => {
    let endpoint = url + '/visualization/location?city=' + location;
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
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

var companyVisualizationAPI = (company) => {
    let endpoint = url + '/visualization/company?company=' + company;
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
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

var industryVisualizationAPI = (industry) => {
    let endpoint = url + '/visualization/count?industry=' + industry;
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
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

var titleVisualizationAPI = (title) => {
    let endpoint = url + '/visualization/count?title=' + title;
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
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

var jobtypeVisualizationAPI = (jobtype) => {
    let endpoint = url + '/visualization/count?type=' + jobtype;
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
    .then(data => console.log(data))
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
}

var createCharts = () => {
    document.getElementById("row").innerHTML = `<div class="border border-light p-4 col-3" id="graphs">
        </div>
        <div class="border border-light p-4 col-9 " id="results"></div>`;
}

var locationVisualization = (location) => {
    var html = `<div class="card">
        <div class="card-header">Nearby Locations</div>
        <div class="card-body">
            <canvas id="horizontalBar"></canvas>
        </div>
    </div>
    <div class="p-4"></div>`;
}

var companyVisualization = (company) => {
    var html = `<div class="card">
        <div class="card-header">${company}</div>
        <div class="card-body">
            Number of jobs by ${company}
        </div>
    </div>
    <div class="p-4"></div>`;
}

var industryVisualization = (industry) => {
    var html = `<div class="card">
        <div class="card-header">${industry}</div>
        <div class="card-body">
            Number of jobs relavant to ${industry}: 
        </div>
    </div>
    <div class="p-4"></div>`;
}

var jobtypeVisualization = (jobtype) => {
    var html = `<div class="card">
        <div class="card-header">${jobtype}</div>
        <div class="card-body">
            Number of ${jobtype} jobs: 
        </div>
    </div>
    <div class="p-4"></div>`;
}

var titleVisualization = (title) => {
    var html = `<div class="card">
        <div class="card-header">${title}</div>
        <div class="card-body">
            Number of "${jobtype}" related jobs: 
        </div>
    </div>
    <div class="p-4"></div>`;
}
