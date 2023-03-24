describe('API testing with dummy APIs', () => {

  beforeEach(function () {
    // Get Airline Data from fixture
    cy.fixture('airlineData').then(function (data) {
      this.data = data;
    })
  })
    
    // Define unique values 
    let airlineId = Date.now()
    let passengerName = "Automation Passenger " + Date.now()
    let passengerId

    it('Create a new airline entry via POST endpoint', function () {
        cy.request('POST', 'https://api.instantwebtools.net/v1/airlines', {
            "id": airlineId,
            "name": this.data.airlineName,
            "country": this.data.country,
            "logo": this.data.logo,
            "slogan": this.data.slogan,
            "head_quaters": this.data.headquarters,
            "website": this.data.website,
            "established": this.data.established
        }).then((response) => {
        expect(response.status).to.eql(200)
            })
        })

    it('Verify newly created airline is returned in GET endpoint', function () {
        cy.request('GET', `https://api.instantwebtools.net/v1/airlines/${airlineId}`).then((response) => {
        expect(response.status).to.eql(200)
        expect(response.body.country).to.eql(this.data.country)
        expect(response.body.established).to.eql(this.data.established)
        expect(response.body.head_quaters).to.eql(this.data.headquarters)
        expect(response.body.id).to.eql(airlineId)
        expect(response.body.logo).to.eql(this.data.logo)
        expect(response.body.name).to.eql(this.data.airlineName)
        expect(response.body.slogan).to.eql(this.data.slogan)
        expect(response.body.website).to.eql(this.data.website)
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
