//1. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.
[
  {
    $project: {
      _id: 0,
      restaurant_id: 1,
      name: 1,
      borough: 1,
      cuisine: 1,
    },
  },
  {
    $match: {
      name: {
        $regex: new RegExp("Reg"),
      },
    },
  },
][
  //2. Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish.
  {
    $match: {
      borough: "Bronx",
      $or: [
        {
          cuisine: "American ",
        },
        {
          cuisine: "Chinese",
        },
      ],
    },
  }
][
  //3. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn.

  ({
    $project: {
      _id: 0,
      restaurant_id: 1,
      name: 1,
      borough: 1,
      cuisine: 1,
    },
  },
  {
    $match: {
      $or: [
        {
          borough: "Staten Island",
        },
        {
          borough: "Bronxor Brooklyn",
        },
        {
          borough: "Queens",
        },
      ],
    },
  })
][
  //4. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn.
  ({
    $project: {
      _id: 0,
      restaurant_id: 1,
      name: 1,
      borough: 1,
      cuisine: 1,
    },
  },
  {
    $match: {
      borough: {
        $nin: ["Staten Island", "Queens", "Bronx"],
      },
    },
  })
][
  //5. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10.

  ({
    $project: {
      restaurant_id: 1,
      name: 1,
      borough: 1,
      cuisine: 1,
      grades: 1,
      _id: 0,
    },
  },
  {
    $unwind: {
      path: "$grades",
      includeArrayIndex: "index",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $match: {
      "grades.score": {
        $lte: 10,
      },
    },
  })
][
  //   6. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil'.

  ({
    $project: {
      _id: 0,
      restaurant_id: 1,
      name: 1,
      borough: 1,
      cuisine: 1,
    },
  },
  {
    $match: {
      $or: [
        {
          cuisine: {
            $nin: ["American", "Chinese"],
          },
          name: {
            $regex: new RegExp("^Wil"),
          },
        },
      ],
    },
  })
][
  // 7. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates..

  ({
    $project: {
      _id: 0,
      restaurant_id: 1,
      name: 1,
      grades: 1,
    },
  },
  {
    $match: {
      "grades.date": new Date("Mon, 11 Aug 2014 00:00:00 GMT"),
      "grades.grade": "A",
      "grades.score": 11,
    },
  })
][
  // 8. Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z".

  ({
    $project: {
      _id: 0,
      restaurant_id: 1,
      name: 1,
      grades: 1,
    },
  },
  {
    $match: {
      "grades.1.date": new Date("Mon, 11 Aug 2014 00:00:00 GMT"),
      "grades.1.grade": "A",
      "grades.1.score": 9,
    },
  })
][
  // 9. Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52..

  ({
    $project: {
      restaurant_id: 1,
      name: 1,
      address: 1,
      coord: 1,
    },
  },
  {
    $match: {
      "address.coord.1": {
        $gt: 42,
        $lte: 52,
      },
    },
  })
][
  // 9. Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns.

  {
    $sort: {
      name: 1,
    },
  }
][
  // 10. Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns.

  {
    $sort: {
      name: -1,
    },
  }
][
  // 11. Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order.
  {
    $sort: {
      cuisine: 1,
      borough: -1,
    },
  }
][
  // 12. Write a MongoDB query to know whether all the addresses contains the street or not.

  {
    $match: {
      "address.street": {
        $exists: true,
      },
    },
  }
];
