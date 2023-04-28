function saveFriend() {
  var friend = $("#input-search").val();

  if (!friend) {
    alert("Please enter a name");
    return;
  }

  var savedFriends = JSON.parse(localStorage.getItem("friends")) || [];

  if (savedFriends.includes(friend)) {
    alert(`You're already friends with ${friend}`);
    return;
  }
  savedFriends.push(friend);
  localStorage.setItem("friends", JSON.stringify(savedFriends));

  displayFriends();
}



function sayHello(friendName) {
  alert(`${friendName} says hello`);
}

displayFriends()