// Find the current room, and update the state.
// (This is barren right now, but it will be necessary
//  when there is more than one room)
function roomUpdate() {
  var currentRoom = room;
  room.update();
}
