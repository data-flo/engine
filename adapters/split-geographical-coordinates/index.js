const { convert } = require("geo-coordinates-parser"); // CommonJS

// const stopwatch = require("../../utils/stopwatch.js");
const { Datatable } = require("../../types/datatable.js");

function trackValues() {
  return {
    rows: {},

    add(rowIdx, query) {
      const { count = 0, first = rowIdx } = this.rows[query] || {};
      this.rows[query] = {
        count: count + 1,
        first,
      };
    },

    _getRows() {
      return Object
        .entries(this.rows)
        .map(([
          value,
          { first, count },
        ]) => ({
          "Value": value,
          "First row": first,
          "Row count": count,
        }));
    },

    async getDatatable() {
      return Datatable.createFromIterable(this._getRows());
    },
  };
}

// function dmsToDecimal(degrees, minutes, seconds, direction) {
//   let dd = parseFloat(degrees) + parseFloat(minutes) / 60 + parseFloat(seconds) / (60 * 60);

//   if (direction === "S" || direction === "W") {
//     dd *= -1;
//   }

//   return dd;
// }

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args["coordinates column"]);
  const invalidValues = trackValues();
  const data = await args.data.transformSync(
    (row, context) => {
      if (row[args["coordinates column"]]) {
        const query = row[args["coordinates column"]];
        if (query) {
          // 32° 18' 23.1" N 122° 36' 52.5" W
          const DMSParts = query.match(/^(\d+[\.,]?\d*)°\s?(-?\d+[\.,]?\d*')?\s?(-?\d+[\.,]?\d*")?\s?([NS]?)\s?(\d+[\.,]?\d*)°\s?(-?\d+[\.,]?\d*')?\s?(-?\d+[\.,]?\d*")?\s?([EW]?)$/i);
          if (DMSParts) {
            const { decimalLatitude, decimalLongitude } = convert(query);
            // const [_, latDegrees, latMinutes, latSeconds, latDirection, longDegrees, longMinutes, longSeconds, longDirection] = DMSParts;
            // const latitude = dmsToDecimal(latDegrees.replace(",", "."), latMinutes.replace(",", "."), latSeconds.replace(",", "."), latDirection);
            // const longitude = dmsToDecimal(longDegrees.replace(",", "."), longMinutes.replace(",", "."), longSeconds.replace(",", "."), longDirection);
            row[args["latitude column"]] = decimalLatitude;
            row[args["longitude column"]] = decimalLongitude;
            return row;
          }

          // stopwatch.start("query.match")
          const parts = query.match(/^(-?\d+[\.,]?\d*)\s?([NS]?)[^0-9-]+(-?\d+[\.,]?\d*)\s?([EW]?)$/i);
          // stopwatch.stop("query.match")
          if (parts) {
            const [_, lat, north, long, east] = parts;
            let latitude = lat.replace(",", ".");
            let longitude = long.replace(",", ".");

            if (north === "S" || north === "s") {
              latitude = `-${latitude}`;
            }

            if (east === "W" || east === "w") {
              longitude = `-${longitude}`;
            }

            row[args["latitude column"]] = latitude;
            row[args["longitude column"]] = longitude;
            return row;
          }

          invalidValues.add(context.records, query);
          row[args["latitude column"]] = "";
          row[args["longitude column"]] = "";
          return null;
        }
      }

      return row;
    },
  );

  return {
    "data": data,
    "invalid values": await invalidValues.getDatatable(),
  };
};

module.exports.manifest = require("./manifest.js");
