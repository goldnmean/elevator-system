var Elevator = require('./elevator');
var ElevatorController = require('./elevatorController');

// Setup Elevator System (new ElevatorController(elevatorObj, numOfElevators, numOfFloors);)
var ec = new ElevatorController(Elevator, 2, 10);
ec.floorRequest(2,3); //floorRequest(currentFloor, requestedFloor)
