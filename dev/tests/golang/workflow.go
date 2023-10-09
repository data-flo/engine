package main

import (
    "encoding/csv"
    "fmt"
    "os"
		"regexp"
		"strings"
)

func Values[M ~map[K]V, K comparable, V any](m M) []V {
	r := make([]V, 0, len(m))
	for _, v := range m {
			r = append(r, v)
	}
	return r
}

func main() {
    // Open the CSV file
    file, err := os.Open("./dataset.csv")
    if err != nil {
        fmt.Println("Error opening CSV file:", err)
        return
    }
    defer file.Close()

		outfile, err := os.Create("output.csv")
    if err != nil {
        panic(err)
    }
    defer outfile.Close()

    // Create a CSV writer
    writer := csv.NewWriter(outfile)
    defer writer.Flush()

    // Create a CSV reader
    reader := csv.NewReader(file)

		header, err := reader.Read()

		err = writer.Write(header)
		if err != nil {
				panic(err)
		}

    // Read and process the CSV records
    for {
        line, err := reader.Read()
        if err != nil {
            break
				}

				dict := map[string]string{}
				for i := range header {
					dict[header[i]] = line[i]
				}

        // Assuming the address column is in the first position (index 0)
        address := dict["lat_lon"]

				var re = regexp.MustCompile(`(?i)(-?\d+[\.,]?\d*)\s?([NS]?)\s?(-?\d+[\.,]?\d*)\s?([EW]?)`)

				// fmt.Print(address)
				// fmt.Print(re.FindStringSubmatch(address))

				matches := re.FindStringSubmatch(address)

				if len(matches) > 0 {
					latitude := strings.Replace(matches[1], ",", ".", 1)
					longitude := strings.Replace(matches[3], ",", ".", 1)

					if matches[2] == "S" || matches[2] == "s" {
							latitude = "-" + latitude
					}

					if matches[4] == "W" || matches[4] == "e" {
							longitude = "-" + longitude
					}

					dict["Latitude"] = latitude;
					dict["Longitude"] = longitude;
					// r.SubexpNames()
        	// fmt.Printf("Address: %s\n", address)
        	// fmt.Print(re.SubexpNames())
				}

				err = writer.Write(Values(dict))
        if err != nil {
            panic(err)
        }

        // // Geocode the address
        // location, err := geocoder.Geocode(address)
        // if err != nil {
        //     fmt.Printf("Error geocoding address '%s': %v\n", address, err)
        //     continue
        // }

        // Print the geocoded location information
        // fmt.Printf("Address: %s\n", address)
        // fmt.Printf("Latitude: %f\n", location.Latitude)
        // fmt.Printf("Longitude: %f\n", location.Longitude)
        // fmt.Printf("Formatted Address: %s\n", location.FormattedAddress)
        // fmt.Println()
    }
}
