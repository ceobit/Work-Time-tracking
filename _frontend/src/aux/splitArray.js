 export const splitArray = (recordsArray, filter) => {
   const getDate = (date) => date.slice(0, 10);

   if (recordsArray.length === 0) {
     return recordsArray;
   }

  return Object.values(recordsArray.flat().reduce((acc, x) => {
    acc[getDate(x.created_at)] = [...(acc[getDate(x.created_at)] || []), x ];
    return acc;
  }, {}));

};



