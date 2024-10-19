// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.19;

contract WildlifeSpottingRecords {
    struct SpottingRecord {
        string species;
        string latitude;
        string longitude;
        string timeCaptured;
        string imageWalrusBlobId;
        string descriptionWalrusBlobId;
        address userAddress;
    }

    SpottingRecord[] public records;
    mapping(address => uint[]) public userRecordIndices;

    event RecordAdded(uint recordId, address userAddress);

    function addRecord(
        string memory _species,
        string memory _latitude,
        string memory _longitude,
        string memory _timeCaptured,
        string memory _imageWalrusBlobId,
        string memory _descriptionWalrusBlobId
    ) public {
        SpottingRecord memory newRecord = SpottingRecord({
            species: _species,
            latitude: _latitude,
            longitude: _longitude,
            timeCaptured: _timeCaptured,
            imageWalrusBlobId: _imageWalrusBlobId,
            descriptionWalrusBlobId: _descriptionWalrusBlobId,
            userAddress: msg.sender
        });

        records.push(newRecord);
        uint newRecordId = records.length - 1;
        userRecordIndices[msg.sender].push(newRecordId);

        emit RecordAdded(newRecordId, msg.sender);
    }

    function getRecord(uint _recordId) public view returns (SpottingRecord memory) {
        require(_recordId < records.length, "Record does not exist");
        return records[_recordId];
    }

    function getUserRecordCount(address _userAddress) public view returns (uint) {
        return userRecordIndices[_userAddress].length;
    }

    function getUserRecord(address _userAddress, uint _index) public view returns (SpottingRecord memory) {
        require(_index < userRecordIndices[_userAddress].length, "Record index out of bounds");
        uint recordId = userRecordIndices[_userAddress][_index];
        return records[recordId];
    }

    function getAllUserRecords(address _userAddress) public view returns (SpottingRecord[] memory) {
        uint[] memory userIndices = userRecordIndices[_userAddress];
        SpottingRecord[] memory userRecords = new SpottingRecord[](userIndices.length);

        for (uint i = 0; i < userIndices.length; i++) {
            userRecords[i] = records[userIndices[i]];
        }

        return userRecords;
    }
}