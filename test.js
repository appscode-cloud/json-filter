const JsonFilter = require("./dist/json-filter.min.js");

const testOb = {
  type: "multi-step-form",
  steps: [
    {
      form: {
        type: "single-step-form",
        elements: [
          {
            type: "input",
            schema: {
              $ref: "schema#/properties/name",
            },
            label: "Name Sakib",
          },
          {
            http: {
              method: "post",
              data: {
                type: "application/json",
                params: {
                  body: "This is a demo post by s4k1b",
                  title: "demo post sakib",
                  userId: {
                    $ref: "store#/user/data/uid",
                  },
                },
              },
              response: {
                value: {
                  $ref: "#/id",
                },
              },
              path: "https://jsonplaceholder.typicode.com/posts",
            },
            type: "input",
            schema: {
              $ref: "schema#/properties/demo",
            },
            label: "Demo",
          },
          {
            url: {
              params: {
                name: {
                  $ref: "model#/name",
                },
              },
              path: "/${name}",
            },
            type: "anchor",
            label: "Same Domain Route",
            if: {
              expression: "name === 'Sakib'",
              params: {
                name: {
                  $ref: "model#/name",
                },
              },
            },
          },
          {
            if: {
              params: {
                name: {
                  $ref: "model#/name",
                },
              },
              expression: "name === 'Sakib'",
            },
            type: "anchor",
            url: {
              params: {
                name: {
                  $ref: "model#/name",
                },
              },
              path: "https://jsonplaceholder.typicode.com/${name}",
            },
            label: "External Domain Route",
          },
          {
            label: "New Tab",
            target: "_blank",
            type: "anchor",
            if: {
              expression: "name === 'Sakib'",
              params: {
                name: {
                  $ref: "model#/name",
                },
              },
            },
            url: {
              path: "/${name}",
              params: {
                name: {
                  $ref: "model#/name",
                },
              },
            },
          },
          {
            schema: {
              $ref: "schema#/properties/postOb",
            },
            values: {
              label: "Value",
              type: "input",
              schema: {
                $ref: "schema#/properties/postOb/additionalProperties",
              },
            },
            label: "Post 1",
            http: {
              path: "https://jsonplaceholder.typicode.com/posts/1",
              method: "get",
            },
            keys: {
              label: "Property",
            },
            type: "object-input-form",
          },
        ],
      },
      title: "POST Demo",
    },
  ],
};

const operations1 = [
  { $ref: "#/steps/0/form" },
  { $ref: "#/elements" },
  { $ref: "#/type" },
];

const operations2 = [
  { $ref: "#/steps/0/form" },
  { $ref: "#/elements" },
  { text: { $ref: "#/type" }, value: { $ref: "#/schema/$ref" } },
];

const operations = [
  { $ref: "#/steps/0/form/elements/0" },
  { text: { $ref: "#/label" }, value: { $ref: "#/type" } },
];

console.log(JsonFilter(testOb, operations1));
