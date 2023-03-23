describe('API testing with dummy APIs', () => {
    // Define a unique ID value for API use
    let airlineId = Date.now()
    
    // Define Airline Data
    let airlineName = "Cypress Test Automation"
    let country = "USA"
    let logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/sri_lanka.png"
    let slogan = "Cypress API Automation Works!"
    let headquarters = "Palo Alto, CA"
    let website = "www.apple.com"
    let established = "1976"

    // Define Passenger Data
    let passengerId
    let passengerName = "Automation Passenger " + Date.now()

    it('Create a new airline entry via POST endpoint', () => {
        cy.request('POST', 'https://api.instantwebtools.net/v1/airlines', {
            "id": airlineId,
            "name": airlineName,
            "country": country,
            "logo": logo,
            "slogan": slogan,
            "head_quaters": headquarters,
            "website": website,
            "established": established
        }).then((response) => {
        expect(response.status).to.eql(200)
            })
        })

    it('Verify newly created airline is returned in GET endpoint', () => {
        cy.request('GET', `https://api.instantwebtools.net/v1/airlines/${airlineId}`).then((response) => {
        expect(response.status).to.eql(200)
        expect(response.body.country).to.eql(country)
        expect(response.body.established).to.eql(established)
        expect(response.body.head_quaters).to.eql(headquarters)
        expect(response.body.id).to.eql(airlineId)
        expect(response.body.logo).to.eql(logo)
        expect(response.body.name).to.eql(airlineName)
        expect(response.body.slogan).to.eql(slogan)
        expect(response.body.website).to.eql(website)
            })
        })

    it('Create New Passenger to Newly Created Airline via POST endpoint', () => {
        cy.request('POST', 'https://api.instantwebtools.net/v1/passenger', {
            "name": passengerName,
            "trips": 15,
            "airline": airlineId
        }).then((response) => {
        expect(response.status).to.eql(200)
        
        // Store the passenger ID to use in other tests
        passengerId = response.body._id
            })
        })

    it('Retriever Passenger with Passenger ID using GET endpoint', () => {
        cy.request('GET', `https://api.instantwebtools.net/v1/passenger/${passengerId}`).then((response) => {
        expect(response.status).to.eql(200)
        expect(response.body._id).to.eql(passengerId)
            })
        })

    it('Update the details of the Passenger using PUT endpoint', () => {
        cy.request('PUT', `https://api.instantwebtools.net/v1/passenger/${passengerId}`, {
            "name": passengerName,
            "trips": 30,
            "airline": airlineId
        }).then((response) => {
        expect(response.status).to.eql(200)
        expect(response.body.message).to.eql("Passenger data put successfully completed.")
            })
        })

    it('Delete the Passenger using DELETE endpoint', () => {
        cy.request('DELETE', `https://api.instantwebtools.net/v1/passenger/${passengerId}`).then((response) => {
        expect(response.status).to.eql(200)
        expect(response.body.message).to.eql("Passenger data deleted successfully.")
            })
        })
})
