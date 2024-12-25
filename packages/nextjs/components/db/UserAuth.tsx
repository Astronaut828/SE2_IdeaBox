import { useEffect, useState } from "react";
import { db, testRedisConnection } from "~~/utils/upstash_db";

interface User {
  _id: string;
  name: string;
  payed: boolean;
}

const UserAuth = () => {
  const [user, setUser] = useState<User>({ _id: "", name: "", payed: false });
  const [readId, setReadId] = useState("");
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);

  useEffect(() => {
    // Test the Redis connection on component mount
    testRedisConnection();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleWrite = async () => {
    try {
      await db.writeUser(user._id, user);
      alert("User saved successfully!");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleRead = async () => {
    try {
      const userData = await db.readUser(readId);
      setFetchedUser(userData);
    } catch (error) {
      console.error("Error reading user:", error);
    }
  };

  return (
    <div className="p-6 bg-base-100 border border-base-300 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Write User Data</h2>
      <p>User Auth Database widget</p>
      <div className="space-y-4">
        <input
          type="text"
          name="_id"
          placeholder="User ID"
          value={user._id}
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <label className="flex items-center space-x-2">
          <span className="font-medium">Payed:</span>
          <input type="checkbox" name="payed" checked={user.payed} onChange={handleInputChange} className="checkbox" />
        </label>
        <button onClick={handleWrite} className="btn btn-primary w-full">
          Save User
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Read User Data</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter User ID"
          value={readId}
          onChange={e => setReadId(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleRead} className="btn btn-secondary w-full">
          Read User
        </button>
      </div>

      {fetchedUser && (
        <div className="mt-6 p-4 bg-base-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Fetched User:</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">ID:</span> {fetchedUser._id}
            </p>
            <p>
              <span className="font-medium">Name:</span> {fetchedUser.name}
            </p>
            <p>
              <span className="font-medium">Payed:</span> {fetchedUser.payed ? "Yes" : "No"}
            </p>

            <div className="mt-4 p-4 bg-base-300 rounded-lg">
              <p className="font-medium mb-2">Debug Data:</p>
              <pre className="text-xs overflow-auto whitespace-pre-wrap">{JSON.stringify(fetchedUser, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAuth;
