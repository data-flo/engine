// const Queue = require("yocto-queue");
const mapLimit = require("promise-map-limit");

const geocoder = require("../../utils/geocoding/opencage-geocoder.js");
const formater = require("../../utils/geocoding/opencage-formater.js");

const cache = require("../../utils/cache/index.js");

module.exports = async function (args) {
  let sum3 = 0;
  let count3 = 0;
  let sum4 = 0;
  let count4 = 0;
  let sum5 = 0;
  let count5 = 0;

  // const Queue = await import("yocto-queue");
  // const queue = new Queue.default();
  const queue = new Set();

  for await (const row of args.data.getPartialReader([ args["latitude column"], args["longitude column"] ])) {
    if (row[args["latitude column"]] && row[args["longitude column"]]) {
      const coordinates = `${row[args["latitude column"]]},${row[args["longitude column"]]}`;
      queue.add(coordinates);
    }
  }

  await mapLimit(
    Array.from(queue),
    5,
    async (coordinates) => {
      const cacheKey = `reverse-geocoding ${coordinates}`;
      await cache(
        cacheKey,
        () => {
          return geocoder(
            args["api key"],
            coordinates,
          );
        },
      );
    },
  );

  const data = await args.data.transformAsync(
    async (row) => {
      row[args["location column"]] = "";

      if (row[args["latitude column"]] && row[args["longitude column"]]) {
        const t3 = performance.now();
        const coordinates = `${row[args["latitude column"]]},${row[args["longitude column"]]}`;
        const cacheKey = `reverse-geocoding ${coordinates}`;

        const t5 = performance.now();

        const place = await cache(
          cacheKey,
          async () => {
            const t4 = performance.now();
            const res = await geocoder(
              args["api key"],
              coordinates,
            );
            sum4 += (performance.now() - t4);
            count4 += 1;
            return res;
          },
          360 * 24,
        );

        sum5 += (performance.now() - t5);
        count5 += 1;

        sum3 += (performance.now() - t3);
        count3 += 1;

        if (place) {
          const feature = formater(place, args["location type"]);
          if (feature) {
            row[args["location column"]] = feature;
          }
        }
      }

      return row;
    },
  );

  console.log("timer 3", sum3, count3, sum3 / count3);
  console.log("timer 4", sum4, count4, sum4 / count4);
  console.log("timer 5", sum5, count5, sum5 / count5);

  return { data };
};

// module.exports = async function (args) {
//   let sum3 = 0;
//   let count3 = 0;
//   let sum4 = 0;
//   let count4 = 0;
//   let sum5 = 0;
//   let count5 = 0;
//   const data = await args.data.addColumnAsync(
//     args["location column"],
//     async (row) => {
//       if (row[args["latitude column"]] && row[args["longitude column"]]) {
//         const t3 = performance.now();
//         const coordinates = `${row[args["latitude column"]]},${row[args["longitude column"]]}`;
//         const cacheKey = `reverse-geocoding ${coordinates}`;

//         const t5 = performance.now();

//         const place = await cache(
//           cacheKey,
//           async () => {
//             const t4 = performance.now();
//             const res = await geocoder(
//               args["api key"],
//               coordinates,
//             );
//             sum4 += (performance.now() - t4);
//             count4 += 1;
//             return res;
//           },
//           360 * 24,
//         );

//         sum5 += (performance.now() - t5);
//         count5 += 1;

//         sum3 += (performance.now() - t3);
//         count3 += 1;

//         if (place) {
//           const feature = formater(place, args["location type"]);
//           if (feature) {
//             return feature;
//           }
//         }
//       }

//       return "";
//     },
//   );

//   console.log("timer 3", sum3, count3, sum3 / count3);
//   console.log("timer 4", sum4, count4, sum4 / count4);
//   console.log("timer 5", sum5, count5, sum5 / count5);

//   return { data };
// };

module.exports.manifest = require("./manifest.js");
