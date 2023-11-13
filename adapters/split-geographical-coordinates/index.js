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

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args["coordinates column"]);
  const invalidValues = trackValues();
  let rowIdx = 0;
  const data = await args.data.transformSync(
    (row) => {
      rowIdx += 1;
      if (row[args["coordinates column"]]) {
        const query = row[args["coordinates column"]];
        if (query) {
          // stopwatch.start("query.match")
          const parts = query.match(/(-?\d+[\.,]?\d*)\s?([NS]?)[^0-9]+(-?\d+[\.,]?\d*)\s?([EW]?)/i);
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
          }
          else {
            console.error(row);
            invalidValues.add(rowIdx, query);
            row[args["latitude column"]] = "";
            row[args["longitude column"]] = "";
            return null;
          }
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
