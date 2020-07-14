# JSON-FILTER

This is a tool to filter out relevant information out of JSON objects by providing a set of operations.

## Install

```bash
npm i @appscode/json-filter
```

## Usage

```js
// import the package
import JsonFilter from "@appscode/json-filter";

// call the function
const filteredOutput = JsonFilter(jsonObject, operations);
```

## Parameters

The filter function takes 2 parameters. One is the JSON object we want to filter or extract relevant information from. The other one is the Array of operations that we want to run in order to filter out our information.

### Operations

In order to filter out relvent fields from the javascript object, you need to provide a set of operations to the filter function.

- Each operation run on the aggregated output of the previous operations.
- If the agrregated output of the previous operations is an array, then the new operation is performed on each item of the array.

There are two types of operation:

  1) **Fetch:** This operations fetches the value at a given path inside the object.

      ```json
      {
        "$ref": "#/demo/path"
      }
      ```

  2) **Fetch & Map:** This operation fetches relevant values and maps them into a new object

      ```json
      {
        "prop1": {
          "$ref": "#/demo/path/to/prop1"
        },
        "prop2": {
          "$ref": "#/demo/path/to/prop2"
        }
      }
      ```

## Examples

Example json object:

```javascript
const jsonOb = {
  name: "John Doe",
  age: 18,
  previousJobs: [
    {
      companyName: "Appscode",
      desgnation: "Front-end Software Engineer",
      duration: 2
    },
    {
      companyName: "Google",
      desgnation: "Software Engineer",
      duration: 1
    }
  ]
}
```

Now, let's fetch the array of previous jobs

```javascript
const operations = [
  {
    $ref: "#/previousJobs"
  }
];
const previousJobs = JsonFilter(jsonOb, operations);
console.log(previousJobs);

/* output
[
  {
    companyName: "Appscode",
    desgnation: "Front-end Software Engineer",
    duration: 2
  },
  {
    companyName: "Google",
    desgnation: "Software Engineer",
    duration: 1
  }
]
*/
```

Let's say, we dont need the whole company object in our previous jobs array. We just want the array of previous company names. Then, our operatons array will look like -

```javascript
const operations = [
  {
    $ref: "#/previousJobs"
  },
  {
    $ref: "#/companyName"
  }
];
const previousJobs = JsonFilter(jsonOb, operations);
console.log(previousJobs);

/* output
[
  "Appscode",
  "Google"
]
*/
```

Now, if we only want specific properties of the company object, then we would have to use **Fetch & Map** type operatoins. Let's suppose, we only want the `companyName` and `designation` in our company object array.

```javascript
const operations = [
  {
    $ref: "#/previousJobs"
  },
  {
    companyName: {
      $ref: "#/companyName"
    },
    designation: {
      $ref: "#/designation"
    }
  }
];
const previousJobs = JsonFilter(jsonOb, operations);
console.log(previousJobs);

/* output
[
  {
    companyName: "Appscode",
    desgnation: "Front-end Software Engineer",
  },
  {
    companyName: "Google",
    desgnation: "Software Engineer",
  }
]
*/
```

We can also rename these properties to our desired names. eg:

```javascript
const operations = [
  {
    $ref: "#/previousJobs"
  },
  {
    name: {
      $ref: "#/companyName"
    },
    position: {
      $ref: "#/designation"
    }
  }
];
const previousJobs = JsonFilter(jsonOb, operations);
console.log(previousJobs);

/* output
[
  {
    name: "Appscode",
    position: "Front-end Software Engineer",
  },
  {
    name: "Google",
    position: "Software Engineer",
  }
]
*/
```