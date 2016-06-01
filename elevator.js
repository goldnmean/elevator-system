function Elevator(id, floors) {
    this.id = id;
    this.groundFloor = 1;
    this.topFloor = floors;
    this.currentFloor = 0;
    this.destinationFloor = 0;
    this.floorsPassed = 0;
    this.totalTrips = 0;
    this.maintenance = false;
    this.moving = false;
    this.doorsOpen = false;
    this.floorRequests = [];
}

// 2. Each elevator will report as it moves from floor to floor.
Elevator.prototype.reportMoving = function(destFloor) {
    var msg = 'Elevator ' + this.id + ' is currently';
    if (this.moving) {
        msg = msg + ' moving ' + this.getDirection(destFloor) + ' to destination floor:' + destFloor + ' current floor: ' + this.currentFloor;
    } else {
        msg = msg + ' not moving and has stopped on floor ' + this.currentFloor;
    }
    return console.log(msg);
};

Elevator.prototype.getDirection = function(floorRequested) {
    if (this.currentFloor <= floorRequested) {
        return 'up';
    } else {
        return 'down';
    }
}

// 3. Each elevator will report when it opens or closes its doors.
Elevator.prototype.reportDoorStatus = function() {
    var status = this.doorsOpen ? 'open' : 'closed';
    var msg = 'Elevator ' + this.id + ' doors are ' + status;
    return console.log(msg);
};

// 4 & 5. Elevator cannot proceed below groundFloor or above topFloor
Elevator.prototype.isValidFloor = function(floor) {
    var valid = false;
    typeof floor === 'number' && floor >= this.groundFloor && floor <= this.topFloor ? valid = true : valid;
    return valid;
};

// 6. An elevator request can be made at any floor, to go to any other floor.
Elevator.prototype.request = function(id, floor) {
    this.floorRequests.push({
        id: id,
        floor: floor
    });
};

Elevator.prototype.move = function(floorRequested) {
    this.destinationFloor = floorRequested;
    if (!this.isValidFloor(this.destinationFloor)) {
        return false;
    }
    var timePerFloor = 1000;
    var numOfFloors = Math.abs(this.currentFloor - this.destinationFloor);
    var startingFloor = this.currentFloor;
    var direction = this.getDirection(floorRequested);

    var that = this;
    // Start moving
    that.doorsOpen = false;
    that.reportDoorStatus();
    that.moving = true;
    that.reportMoving(that.destinationFloor);
    if (direction === 'up') {
        for (var i = that.currentFloor; i < numOfFloors; i++) {
            setTimeout(function() {
                that.currentFloor++;
                // 8. Track floors
                that.floorsPassed++;
                that.reportMoving(that.destinationFloor);
                if (that.currentFloor === that.destinationFloor) {
                    that.moving = false;
                    that.reportMoving();
                    that.doorsOpen = true;
                    that.reportDoorStatus();
                }
            }, timePerFloor * i);
        }
    } else if (direction === 'down') {
        for (var i = that.currentFloor; i > numOfFloors; i--) {
            setTimeout(function() {
                that.currentFloor--;
                // 8. Track floors
                that.floorsPassed++;
                that.reportMoving(that.destinationFloor);
                if (that.destinationFloor === that.currentFloor) {
                    that.moving = false;
                    that.reportMoving();
                    that.doorsOpen = true;
                    that.reportDoorStatus();
                }
            }, timePerFloor);
        }
    }
};

/* 8. The elevator should keep track of how many trips it has made, and how many floors it has passed.
The elevator should go into maintenance mode after 100 trips, and stop functioning until serviced,
therefore not be available for elevator calls.*/

module.exports = Elevator;
