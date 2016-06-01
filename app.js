var Elevator = require('./elevator');
var ElevatorController = require('./elevatorController');

// Setup Elevator System (new ElevatorController(elevatorObj, numOfElevators, numOfFloors);)
var ec = new ElevatorController(Elevator, 2, 10);
// ec.floorRequest(2,3); //floorRequest(currentFloor, requestedFloor)

ec.elevators[0].request(0, 5); //elevatorRequest(elevatorId, requestedFloor)
ec.elevators[1].request(1, 10);

ec.elevators[0].move(5);
