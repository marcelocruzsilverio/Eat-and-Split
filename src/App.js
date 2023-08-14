import { useState } from "react";
import FriendsList from "./Components/FriendList";
import FormAddFriend from "./Components/FormAddFriend";
import Button from "./Components/Button";
import FormSplitBill from "./Components/FormSplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend() {
    setShowAddFriend((isFalse) => !isFalse);
  }

  function handleAddNewFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
  }

  function handleSelect(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((currentSelectedFriend) =>
      currentSelectedFriend?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSliptBill(value) {
    console.log(value);

    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelect={handleSelect}
          selectedFriend={selectedFriend}
        />
        {showAddFriend ? (
          <FormAddFriend onAddNewFriend={handleAddNewFriend} />
        ) : null}
        <Button onClick={handleAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSliptBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}
