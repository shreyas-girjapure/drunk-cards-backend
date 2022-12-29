let ratePerRarity = {
  Common: 0.6,
  Rare: 0.25,
  Epic: 0.1,
  Legendary: 0.05,
};

function fillCapacity(rateMap, lengthOfCardsArray) {
  let res = {};
  for (const [key, value] of Object.entries(rateMap)) {
    res[key] = Math.floor(lengthOfCardsArray * value);
  }
  return res;
}

function filterCardRecords(rarity, listOfCards) {
  let result = Array.from(listOfCards).filter((item) => {
    return item.Rarity__c === rarity;
  });
  return result;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function mapRecordsAndRarity(listOfRecords) {
  let finalMappedObject = {};

  Array.from(listOfRecords).forEach((it) => {
    if (!finalMappedObject[it.Rarity__c]) {
      let tempArr = [];
      tempArr.push(it);
      finalMappedObject[it.Rarity__c] = tempArr;
    } else {
      let currentArray = finalMappedObject[it.Rarity__c];
      currentArray.push(it);
    }
  });
  return finalMappedObject;
}

function fillArrayBasedOnCapacity(capacityMap, mappedArray) {
  let finalArray = [];
  for (const [key, value] of Object.entries(capacityMap)) {
    let slicedArray = mappedArray[key].slice(
      0,
      value || mappedArray[key].length
    );
    finalArray = finalArray.concat(slicedArray);
  }
  return finalArray;
}

function getShuffledAndProbableArray(arrayList) {
  arrayList = shuffle(arrayList);
  let arrayListFromBackend = arrayList;
  let capacityArray = fillCapacity(ratePerRarity, arrayList.length);
  let mappedArray = mapRecordsAndRarity(arrayListFromBackend);
  let finalArray = fillArrayBasedOnCapacity(capacityArray, mappedArray);
  finalArray = shuffle(finalArray);
  return finalArray;
}

module.exports = { getShuffledAndProbableArray, filterCardRecords, shuffle };