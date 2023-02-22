import moment  from "moment";
import toString  from "../../utils/date/to-string";



export default function (args) {

  toString(
    args.value || new Date(),
    args.format,
    args.locale,
    args.timezone,
  );

  const momentValue = moment(args.value || new Date());

  if (momentValue.isValid()) {
    if (args.locale) {
      momentValue.locale(args.locale);
    }
    return {
      text: (
        (args.format === "ISO 8601")
          ?
          momentValue.format()
          :
          momentValue.format(args.format)
      ),
    };
  }

  return {
    text: null,
  };
};

export { default as manifest } from "./manifest";
