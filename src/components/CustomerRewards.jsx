import React, { useEffect, useState, useCallback } from "react";

const CustomerRewards = () => {
  const [userList, setUserList] = useState([]);

  const calculateRewards = (amount) => {
    if (amount >= 50 && amount < 100) {
      return amount - 50;
    } else if (amount > 100) {
      return 2 * (amount - 100) + 50;
    }
    return 0;
  };

  const computeRewards = useCallback((customerTransaction) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const userList = [];
    customerTransaction.map((user) => {
      let getIndex = userList.findIndex((data) => data.email === user.email);
      const reward = calculateRewards(user.amount);
      let strDate = new Date(user.created_at);
      let month = monthNames[strDate.getMonth()];
      if (getIndex === -1) {
        user.rewardsHistory = [];
        user.totalReward = reward;
        user.totalSpent = user.amount;
        const rewardsMonthly = {};
        rewardsMonthly[month] = 0;
        rewardsMonthly[month] = reward;
        user.rewardsMonthly = rewardsMonthly;
        userList.push(user);
      } else {
        userList[getIndex]["totalReward"] =
          userList[getIndex]["totalReward"] + reward;
        userList[getIndex]["totalSpent"] =
          userList[getIndex]["totalSpent"] + user.amount;
        const rewardsMonthly = userList[getIndex]["rewardsMonthly"];
        if (rewardsMonthly[month]) {
          userList[getIndex]["rewardsMonthly"][month] =
            rewardsMonthly[month] + reward;
        } else {
          userList[getIndex]["rewardsMonthly"][month] = reward;
        }
      }
      return true;
    });
    setUserList(userList);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      /**
       * Fetch data using api call
       */
      // const url = "/api/customerTransaction"
      // const response = await fetch(url);
      // const json = await response.json();
      try {
        const mockData = [
          {
            id: 7,
            email: "michael.lawson@reqres.in",
            first_name: "Michael",
            last_name: "Lawson",
            amount: 120.0,
            created_at: "2022-11-10T15:10:36.512Z",
          },
          {
            id: 13,
            email: "michael.lawson@reqres.in",
            first_name: "Michael",
            last_name: "Lawson",
            amount: 120.0,
            created_at: "2022-10-10T15:10:36.512Z",
          },
          {
            id: 14,
            email: "michael.lawson@reqres.in",
            first_name: "Michael",
            last_name: "Lawson",
            amount: 120.0,
            created_at: "2022-10-10T15:10:36.512Z",
          },
          {
            id: 8,
            email: "lindsay.ferguson@reqres.in",
            first_name: "Lindsay",
            last_name: "Ferguson",
            amount: 150.0,
            created_at: "2022-12-10T15:10:36.512Z",
          },
          {
            id: 9,
            email: "michael.lawson@reqres.in",
            first_name: "Tobias",
            last_name: "Funke",
            amount: 24.0,
            created_at: "2022-11-10T15:10:36.512Z",
          },
          {
            id: 10,
            email: "byron.fields@reqres.in",
            first_name: "Byron",
            last_name: "Fields",
            amount: 600.0,
            created_at: "2022-11-10T15:10:36.512Z",
          },
          {
            id: 11,
            email: "michael.lawson@reqres.in",
            first_name: "George",
            last_name: "Edwards",
            amount: 120.0,
            created_at: "2022-12-10T15:10:36.512Z",
          },
          {
            id: 12,
            email: "rachel.howell@reqres.in",
            first_name: "Rachel",
            last_name: "Howell",
            amount: 90.0,
            created_at: "2022-11-10T15:10:36.512Z",
          },
        ];
        computeRewards(mockData);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [computeRewards]);

  return (
    <div>
      <div>
        <h2>Customer Total Rewards Points</h2>
        <div>
          {userList.map((user) => (
            <div className="user-section" key={user.id}>
              <p className="font-bold">
                Name:{user.first_name} {user.last_name}
              </p>
              <p className="font-bold">Email:{user.email}</p>
              <table className="margin">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(user.rewardsMonthly).map((key, i) => (
                    <tr key={user.id + i}>
                      <td>{key}</td>
                      <td>{user.rewardsMonthly[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="font-bold">Total Rewards: {user.totalReward}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerRewards;
