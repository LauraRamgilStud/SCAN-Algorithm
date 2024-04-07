export function SCAN(array, head, direction, diskSize) {
  let seekCount = 0;
  let distance, currentTrack;
  let left = [],
    right = [];
  let seekSequence = [];

  // Appending values that are to be visited before changing direction
  if (direction === "left") {
    left.push(-1);
    console.log("LEFT: " + left);
  } else if (direction === "right") {
    right.push(diskSize - 1);
    console.log("RIGHT: " + left);
  }

  /* if (array.length === 1) {
    seekSequence.push(array[0]);
    return seekSequence; // Return immediately after adding the single number
  } */
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    if (array[i] < head && !left.includes(array[i])) {
      left.push(array[i]);
    } else if (array[i] > head && !right.includes(array[i])) {
      right.push(array[i]);
    }
  }

  // sorting left and right
  left.sort(function (a, b) {
    return a - b;
  });
  right.sort(function (a, b) {
    return a - b;
  });

  // run loop two times
  // one by one scanning right and left of the head
  let run = 2;
  while (run-- > 0) {
    if (direction === "left") {
      for (let i = left.length - 1; i >= 0; i--) {
        currentTrack = left[i];

        // add current track to seek sequence
        seekSequence.push(currentTrack);

        // calculate absolute distance
        distance = Math.abs(currentTrack - head);

        // increase total count
        seekCount += distance;

        // accessed track is now the new head
        head = currentTrack;
      }
      direction = "right";
    } else if (direction === "right") {
      for (let i = 0; i < right.length; i++) {
        currentTrack = right[i];

        // add current track to seek sequence
        seekSequence.push(currentTrack);

        // calculate absolute distance
        distance = Math.abs(currentTrack - head);

        // increase total count
        seekCount += distance;

        // accessed track is now the new head
        head = currentTrack;
      }
      direction = "left";
    }
  }

  return { seekSequence, seekCount };
}
