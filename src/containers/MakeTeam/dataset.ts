import { IPlayer, ILayout } from "./types";

export const layouts: Array<ILayout> = [
  {
    id: 1,
    name: "4-4-2",
    positions: [
      {
        x: 50,
        y: 90
      },
      {
        x: 12,
        y: 70
      },
      {
        x: 37,
        y: 75
      },
      {
        x: 62,
        y: 75
      },
      {
        x: 87,
        y: 70
      },
      {
        x: 12,
        y: 45
      },
      {
        x: 37,
        y: 50
      },
      {
        x: 62,
        y: 50
      },
      {
        x: 87,
        y: 45
      },
      {
        x: 37,
        y: 15
      },
      {
        x: 62,
        y: 15
      }
    ]
  },
  {
    id: 2,
    name: "4-3-3",
    positions: [
      {
        x: 50,
        y: 90
      },
      {
        x: 12,
        y: 70
      },
      {
        x: 37,
        y: 75
      },
      {
        x: 62,
        y: 75
      },
      {
        x: 87,
        y: 70
      },
      {
        x: 50,
        y: 50
      },
      {
        x: 25,
        y: 45
      },
      {
        x: 75,
        y: 45
      },
      {
        x: 15,
        y: 20
      },
      {
        x: 50,
        y: 15
      },
      {
        x: 85,
        y: 20
      }
    ]
  },
  {
    id: 3,
    name: "3-5-2",
    positions: [
      {
        x: 50,
        y: 90
      },
      // def
      {
        x: 50,
        y: 75
      },
      {
        x: 25,
        y: 70
      },
      {
        x: 75,
        y: 70
      },
      // mid
      {
        x: 50,
        y: 55
      },
      {
        x: 25,
        y: 50
      },
      {
        x: 75,
        y: 50
      },
      {
        x: 10,
        y: 35
      },
      {
        x: 90,
        y: 35
      },
      {
        x: 37,
        y: 15
      },
      {
        x: 62,
        y: 15
      }
    ]
  }
];

export const players: Array<IPlayer> = [
  {
    id: 1,
    firstName: "Hugo",
    lastName: "Gatti",
    number: 1
  },
  {
    id: 2,
    firstName: "Daniel",
    lastName: "Pasarella",
    number: 6
  },
  {
    id: 3,
    firstName: "Roman",
    lastName: "Riquelme",
    number: 10
  },
  {
    id: 4,
    firstName: "Fernando",
    lastName: "Redondo",
    number: 5
  },
  {
    id: 5,
    firstName: "Andres",
    lastName: "Iniesta",
    number: 8
  },
  {
    id: 6,
    firstName: "Andrea",
    lastName: "Pirlo",
    number: 12
  }
];
