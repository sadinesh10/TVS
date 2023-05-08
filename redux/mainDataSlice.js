import { createSlice, findNonSerializableValue } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  menus: [],
  projectsLiat: [],
  projectSecurityId: null,
  projectLocations: [],
  selectedFrom: [],
  selectedTo: [],
  date_time: null,
  location_id: null,
  assetsProjectName: null,
  assetsSelectedProjectName: null,
  assetDetails: [],
  driverNo: null,
  vehicleNo: null,
  lrNo: null,
  holdDispatch: [],
  holdList: null,
  recentTransactions: [],
  transaction_id: null,
  transaction_state: {

  },
  recieve_dc_number:null,
  recieve_date_time:null,
  recieve_project_list:null,
  recieve_select_project_name:null,
  recieve_selected_project_security_id:null,
  recieve_hublists:null,
  recieve_selected_to:null,
  recieve_selected_from:null,
  recieve_dc_numbers:null,
  recieve_selected_dc_number:"",
  recieve_selected_dc_details:null,
  recieve_selected_dc_assets:null
}

const mainDataSlice = createSlice({
  name: "Main Data",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setMenu: (state, action) => {
      state.menus = action.payload;
    },
    setProjectList: (state, action) => {
      state.projectsLiat = action.payload;
    },
    setProjectSecurityId: (state, action) => {
      state.projectSecurityId = action.payload;
    },
    setProjectLocations: (state, action) => {
      state.projectLocations = action.payload;
    },
    setSelectedFrom: (state, action) => {
      state.selectedFrom = action.payload;
    },
    setSelectedTo: (state, action) => {
      state.selectedTo = action.payload;
    },
    setDateTime: (state, action) => {
      state.date_time = action.payload;
    },
    setAssetsProjectName: (state, action) => {
      state.assetsProjectName = action.payload;
    },
    setAssetsSelectedProjectName: (state, action) => {
      state.assetsSelectedProjectName = action.payload;
    },
    setAssetDetails: (state, action) => {
      state.assetDetails = action.payload;
    },
    setDriverNo: (state, action) => {
      state.driverNo = action.payload;
    },
    setVehicleNo: (state, action) => {
      state.vehicleNo = action.payload;
    },
    setLrNo: (state, action) => {
      state.lrNo = action.payload;
    },
    setHoldDispatch: (state, action) => {
      state.holdDispatch = action.payload;
    },
    setHoldList: (state, action) => {
      state.holdList = action.payload;
    },
    setRecentTransactions: (state, action) => {
      state.recentTransactions = action.payload;
    },
    setTransactionId: (state, action) => {
      state.transaction_id = action.payload;
    },
    setRecieveDCNumber: (state, action) => {
      state.recieve_dc_number = action.payload;
    },
    setRecieveDateTime: (state, action) => {
      state.recieve_date_time = action.payload;
    },
    setRecieveProjectList: (state, action) => {
      state.recieve_project_list = action.payload;
    },
    setRecieveSelectedProjectName: (state, action) => {
      state.recieve_select_project_name = action.payload;
    },
    setRecieveSelectedProjectSecurityId: (state, action) => {
      state.recieve_selected_project_security_id = action.payload;
    },
    setRecieveHubsList: (state, action) => {
      state.recieve_hublists = action.payload;
    },
    setRecieveSelectedFrom: (state, action) => {
      state.recieve_selected_from = action.payload;
    },
    setRecieveSelectedTo: (state, action) => {
      state.recieve_selected_to = action.payload;
    },
    setRecieveDCNumbers: (state, action) => {
      state.recieve_dc_numbers = action.payload;
    },
    setRecievedSelectedDCNumber: (state, action) => {
      state.recieve_selected_dc_number = action.payload;
    },
    setRecievedSelectedDCDetails: (state, action) => {
      state.recieve_selected_dc_details = action.payload;
    },
    setRecievedSelectedDCAssets: (state, action) => {
      state.recieve_selected_dc_assets = action.payload;
    },
    resetTransactionState: (state) => {
      state.driverNo = null;
      state.driverNo = null;
      state.driverNo = null;
      state.driverNo = null;
      state.driverNo = null;
      state.driverNo = null;
    },
    
  },
});

export default mainDataSlice.reducer;
export const {
  setUserData,
  setMenu,
  setProjectList,
  setProjectSecurityId,
  setProjectLocations,
  setSelectedFrom,
  setSelectedTo,
  setLocationId,
  setDateTime,
  setAssetsProjectName,
  setAssetsSelectedProjectName,
  setAssetDetails,
  setDriverNo,
  setVehicleNo,
  setLrNo,
  setSubAssets,
  setChangedSubAssetsQuantity,
  setHoldDispatch,
  setHoldList,
  setRecentTransactions,
  setTransactionId,
  setRecieveDCNumber,
  setRecieveDateTime,
  setRecieveProjectList,
  setRecieveSelectedProjectName,
  setRecieveSelectedProjectSecurityId,
  setRecieveHubsList,
  setRecieveSelectedTo,
  setRecieveSelectedFrom,
  setRecieveDCNumbers,
  setRecievedSelectedDCNumber,
  setRecievedSelectedDCDetails,
  setRecievedSelectedDCAssets
} = mainDataSlice.actions;
