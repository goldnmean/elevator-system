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
    };

    ElevatorController.prototype.processRequests = function() {
        var elevators = this.elevators;
        var floorRequests = this.floorRequests;
        var closestElevators = [];

        elevators.forEach(function(elevator) {
            if (floorRequests.length > 0) {
                // If an unoccupied elevator is already stopped at that floor it has first priority
                if (!elevator.moving && elevator.currentFloor === floorRequests[0].currentFloor) {
                    elevator.doorsOpen = true;
                    elevator.move(floorRequests[0].floorRequested);
                    floorRequests.splice(0, 1);
                } else if (elevator.moving && floorRequests[0].currentFloor < elevator.destinationFloor) {
                    // An occupied elevator is moving and will pass that floor on its way
                } else {
                    // The unoccupied elevator closest to it will answer
                }
            }
        });
    };
};

module.exports = ElevatorController;
