function ElevatorController(elevatorObj, elevators, floors) {
    this.numOfElevators = elevators;
    this.floors = floors;
    this.elevators = [];
    this.floorRequests = [];
    /* 1. Initialize the elevator simulation with the desired number of elevators, and the desired number of floors.
          Assume ground/min of 1. */
    this.generateElevators = (() => {
        for (var i = 0; i < this.numOfElevators; i++) {
            this.elevators[i] = new elevatorObj(i, this.floors);
        }
        console.log('Number of Elevators: ' + this.elevators.length + ' - ' + JSON.stringify(this.elevators));
    })();

    // 6. An elevator request can be made at any floor, to go to any other floor.
    ElevatorController.prototype.floorRequest = (currentFloor, floorRequested) => {
        var request = {
            currentFloor: currentFloor,
            floorRequested: floorRequested
        }
        this.floorRequests.push(request);
        console.log(this.floorRequests);
    };

    /* 7.  When an elevator request is made, the unoccupied elevator closest to it will answer
          the call, unless an occupied elevator is moving and will pass that floor on its way.
          The exception is that if an unoccupied elevator is already stopped at that floor,
          then it will always have the highest priority answering that call. */
    ElevatorController.prototype.processRequests = function() {

    };
};

module.exports = ElevatorController;
