import ptr from "json-ptr";

function arrayOrObject(ob, arrayFunc, obFunc) {
  if (Array.isArray(ob)) {
    // ob is an array
    // perform the operation for each array element and return the array
    return ob.map(arrayFunc);
  }
  // ob is not array, perform operation once on the object
  return obFunc();
}

function performOp(ob, op) {
  // if ob is undefined return ob
  if (!ob) return ob;

  const { $ref } = op;
  if ($ref) {
    // existance of $ref implies that we have to return the value in that path directly
    const path = $ref.split("#")[1] || "/";
    // perform different operations depending on ob being array or object
    return arrayOrObject(
      ob,
      (el) => ptr.JsonPointer.get(el, path),
      () => ptr.JsonPointer.get(ob, path)
    );
  } else {
    // have to return object

    function returnNewOb(ob) {
      const newOb = {};
      Object.keys(op).forEach((key) => {
        const $ref = op[key].$ref || {};
        const path = $ref.split("#")[1] || "/";

        // calculate actual prop
        let prop = "";
        if (key.charAt(0) === '#') {
          // if key starts with #, then it's a relative path to the field containing the actual key
          prop = ptr.JsonPointer.get(ob, key);
        } else prop = key;

        // assign new prop value
        newOb[prop] = ptr.JsonPointer.get(ob, path);
      });
      return newOb;
    }

    // perform different operations depending on ob being array or object
    return arrayOrObject(
      ob,
      (el) => returnNewOb(el),
      () => returnNewOb(ob)
    );
  }
}

export default function (jsonOb, op) {
  return op.reduce((ac, cr) => performOp(ac, cr), jsonOb);
}
