export const wagmiAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "recordId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "RecordAdded",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string", name: "_species", type: "string" },
      { internalType: "string", name: "_latitude", type: "string" },
      { internalType: "string", name: "_longitude", type: "string" },
      { internalType: "string", name: "_timeCaptured", type: "string" },
      { internalType: "string", name: "_imageWalrusBlobId", type: "string" },
      {
        internalType: "string",
        name: "_descriptionWalrusBlobId",
        type: "string",
      },
    ],
    name: "addRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_userAddress", type: "address" },
    ],
    name: "getAllUserRecords",
    outputs: [
      {
        components: [
          { internalType: "string", name: "species", type: "string" },
          { internalType: "string", name: "latitude", type: "string" },
          { internalType: "string", name: "longitude", type: "string" },
          { internalType: "string", name: "timeCaptured", type: "string" },
          { internalType: "string", name: "imageWalrusBlobId", type: "string" },
          {
            internalType: "string",
            name: "descriptionWalrusBlobId",
            type: "string",
          },
          { internalType: "address", name: "userAddress", type: "address" },
        ],
        internalType: "struct WildlifeSpottingRecords.SpottingRecord[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_recordId", type: "uint256" }],
    name: "getRecord",
    outputs: [
      {
        components: [
          { internalType: "string", name: "species", type: "string" },
          { internalType: "string", name: "latitude", type: "string" },
          { internalType: "string", name: "longitude", type: "string" },
          { internalType: "string", name: "timeCaptured", type: "string" },
          { internalType: "string", name: "imageWalrusBlobId", type: "string" },
          {
            internalType: "string",
            name: "descriptionWalrusBlobId",
            type: "string",
          },
          { internalType: "address", name: "userAddress", type: "address" },
        ],
        internalType: "struct WildlifeSpottingRecords.SpottingRecord",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_userAddress", type: "address" },
      { internalType: "uint256", name: "_index", type: "uint256" },
    ],
    name: "getUserRecord",
    outputs: [
      {
        components: [
          { internalType: "string", name: "species", type: "string" },
          { internalType: "string", name: "latitude", type: "string" },
          { internalType: "string", name: "longitude", type: "string" },
          { internalType: "string", name: "timeCaptured", type: "string" },
          { internalType: "string", name: "imageWalrusBlobId", type: "string" },
          {
            internalType: "string",
            name: "descriptionWalrusBlobId",
            type: "string",
          },
          { internalType: "address", name: "userAddress", type: "address" },
        ],
        internalType: "struct WildlifeSpottingRecords.SpottingRecord",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_userAddress", type: "address" },
    ],
    name: "getUserRecordCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "records",
    outputs: [
      { internalType: "string", name: "species", type: "string" },
      { internalType: "string", name: "latitude", type: "string" },
      { internalType: "string", name: "longitude", type: "string" },
      { internalType: "string", name: "timeCaptured", type: "string" },
      { internalType: "string", name: "imageWalrusBlobId", type: "string" },
      {
        internalType: "string",
        name: "descriptionWalrusBlobId",
        type: "string",
      },
      { internalType: "address", name: "userAddress", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "userRecordIndices",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
