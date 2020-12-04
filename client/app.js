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
    let endpoint = '/jobs?'
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
    let endpoint = '/visualization/location?city=' + location;
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
    .then(data => locationVisualization(data))
    .catch(err => console.error(err));
}

var companyVisualizationAPI = (company) => {
    let endpoint = '/visualization/company?company=' + company;
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
    .then(data => companyVisualization(data))
    .catch(err => console.error(err));
}

var industryVisualizationAPI = (industry) => {
    let endpoint = '/visualization/count?industry=' + industry;
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
    .then(data => industryVisualization(data, industry))
    .catch(err => console.error(err));
}

var titleVisualizationAPI = (title) => {
    let endpoint = '/visualization/count?title=' + title;
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
    .then(data => titleVisualization(data, title))
    .catch(err => console.error(err));
}

var jobtypeVisualizationAPI = (jobtype) => {
    let endpoint = '/visualization/count?type=' + jobtype;
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
    .then(data => jobtypeVisualization(data, jobtype))
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
        <div id="visualizeLocation"></div>
        <div id="visualizeCompany"></div>
        <div id="visualizeIndustry"></div>
        <div id="visualizeJobtype"></div>
        <div id="visualizeTitle"></div>
        </div>
        <div class="border border-light p-4 col-9 " id="results">
            ${startLoading()}
        </div>`;
}

var locationVisualization = (locations) => {
    if (locations.length === 0) return;
    var html = `<div class="card">
        <div class="card-header">Suggested Nearby Locations</div>
        <div class="card-body">
            ${locations.join(", ")}
        </div>
    </div>
    <div class="p-4"></div>`;
    document.getElementById('visualizeLocation').innerHTML = html;
}

var companyVisualization = (company) => {
    if (company.company.length === 0) return;
    var html = '';
    company.company.forEach(comp => {
        let card = `<div class="card">
        <div class="card-header">${comp.companyName}</div>
            <div class="card-body">
                CEO: ${comp.ceoName}
            </div>
                <div class="card-body">
                Number Of Employees: ${comp.employees}
            </div>
                <div class="card-body">
                Total Jobs Posted: ${comp.jobCount}
            </div>
        </div>
        <div class="p-4"></div>`;
        html += card;
    });
    
    document.getElementById('visualizeCompany').innerHTML = html;
}

var industryVisualization = (data, industry) => {
    if (data.length === 0) return;
    var sum = data.reduce((a, b) => {
        return parseInt(a) + parseInt(b);
    });
    var html = `<div class="card">
        <div class="card-header">${industry} Industry Jobs</div>
        <div class="card-body">
            Number of jobs relavant to ${industry}: ${sum}
        </div>
    </div>
    <div class="p-4"></div>`;
    document.getElementById('visualizeIndustry').innerHTML = html;
}

var jobtypeVisualization = (data, jobtype) => {
    if (data.length === 0) return;
    var html = `<div class="card">
        <div class="card-header">${jobtype}</div>
        <div class="card-body">
            Number of ${jobtype} jobs: ${data}
        </div>
    </div>
    <div class="p-4"></div>`;
    document.getElementById('visualizeJobtype').innerHTML = html;
}

var titleVisualization = (data, title) => {
    if (data.length === 0) return;
    var sum = data.reduce((a, b) => {
        return parseInt(a) + parseInt(b);
    });
    var html = `<div class="card">
        <div class="card-header">Job title: ${title}</div>
        <div class="card-body">
            Number of jobs containing title "${title}": ${sum}
        </div>
    </div>
    <div class="p-4"></div>`;
    document.getElementById('visualizeTitle').innerHTML = html;
}

var startLoading = () => {
    return `<div id="loading" class="d-flex align-items-center">
        <strong>Please wait while we fetch data...</strong>
        <div class="spinner-border ml-auto" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></div>
    </div>`;
}

var stopLoading = () => {
    var loading = document.getElementById('loading');
    if (loading && loading != null) {
        document.getElementById('loading').remove();
    }
}