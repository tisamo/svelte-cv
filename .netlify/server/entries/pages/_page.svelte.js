import { n as noop, b as set_current_component, r as run_all, d as current_component, f as assign, i as identity, g as get_store_value, o as onDestroy, c as create_ssr_component, a as subscribe, h as add_attribute, e as escape, j as each, v as validate_component } from "../../chunks/ssr.js";
import { B as BROWSER, w as writable, d as derived } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
import * as devalue from "devalue";
import { parse, stringify } from "devalue";
import { z } from "zod";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const browser = BROWSER;
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const Icon = "/_app/immutable/assets/imglad.52655ad2.png";
const Glass = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0EAAAChCAYAAAABUbTGAAAHwElEQVR42u3XgQkEQQgEQfNPWsMYZEqoAJb/s3HGGGOMMcYYYwpnAQAASjiCAAAARxAAAIAjCAAAwBEEAADgCAIAAHAEAQAAOIIAAAAcQQAAAI4gAAAARxAAAIAjCAAAwBEEAADgCAIAABxBAAAAjiAAAABHEAAAgCMIAADAEQQAAOAIAgAAcAQBAAA4ggAAABxBAAAAjiAAAABHEAAAgCMIAABwBAEAADiCAAAAHEEAAACOIAAAAEcQAACAIwgAAMARFJQe7/chQjoCxeM/oAfeD44gS9/St/TBEeQI0kM91ENwBFn6lr6lD44gR5Ae6qEegiPI0rf0LX1wBDmC9FAP9RAcQZa+pW/pgyPIEaSHeqiH4Aiy9C19Sx8cQY4gPdRDPQRHkKVv6Vv64AhyBOmhHuohOIIsPe8HHEGOID3wfsARZOl5P+AIcgTpgfcDjiBLz/sBR5AjSA+8H3AEWXreDziCHEF64P2AI8jS837AEeQI0gPvBxxBlp73A44g/dMD7wdHkKVv6Vv64AhyBOmhHuohOIIsfUvf0gdHkCNID/VQD8ERZOlb+pY+OIIcQXqoh3oIjiBL39K39MER5AjSQz3UQ3AEWfqWvqUPjiBHkB7qoR6CI8jSt/QtfXAEOYL0UA/1EBxBlp73A44gR5AeeD/gCLL0vB9wBDmC9MD7AUeQpef9gCPIEaQH3g84giw97wccQY4gPfB+wBFk6Xk/4AhyBOmB9wOOIEvP+wFHkCNID7wfEAFL39IHR5AjCD3QQ3AEWfqWvqUPjiBHkB7qoR6CI8jSt/QtfXAEOYL0UA/1EBxBlr6lb+mDI8gRpId6qIfgCLL0LX1LHxxBjiA91EM9BEeQpW/pW/rgCHIE6aEe6iE4gix9S99HCI4gR5Ae6qEeQmP/REd0RAccQfqjh3qoh+iPCFn6lr6lDyKkP3qoh3qI/oiQpW/pW/ogQvqjh3qoh+iPCFn6lr6lDyKkP3qoh3qI/oiQpW/pW/ogQvqjh3qoh+iPCFn6lr6lDyKkP3qoh3qI/oiQpef9IEL6gx54P+iPCFl63g8ipD/ogfeD/oiQpef9IEL6gx54P+iPCFl63g8ipD/ogfeD/oiQpef9IEL6gx54P+iPCFl63g8ipD/ogfeD/IiQpW/pgwjpD3qgh+iPCFn6lr6lDyKkP3qoh3qI/oiQpW/pW/ogQvqjh3qoh+iPCFn6lr6lDyKkP3qoh3qI/oiQpW/pW/ogQvqjh3qoh+iPCFn6lr6lDyKkP3qoh3qI/oiQpW/pW0KIkP6gh3qoh+iPCFl63g8ipD/ogfeD/oiQpef9IEL6gx54P+iPCFl63g8ipD/ogfeD/oiQpef9IEL6gx54P+iPCFl63g8ipD/ogfeD/oiQpef9IEL6gx54P/ojQpa+pW/pgwjpjx7qoR6iPyJk6Vv6lj6IkP7ooR7qIfojQpa+pW/pgwjpjx7qoR6iPyJk6Vv6lj6IkP7ooR7qIfojQpa+pW/pgwjpjx7qoR6iPyJk6Vv6lj6IkN9fD/VQD9EfEbL0vB9ESH/QA+8H/RFB0REd0UEEjP7ooR7qof4YEbL0LX1LHxEy+qOHeqiH+mNEyNK39C19RMjojx7qoR7qjxEhS9/St/QRIaM/eqiHeqg/RoQsfUvf0keEjCNID/VQD/XHiJCl5/2IkNEf9MD70R8jQpae9yNCRn/QA+9Hf4wIWXrejwgZ/UEPvB/9MSJk6Xk/ImT0Bz3wfvTHiJCl5/2IkNEf9MD70R8jQpae9yNCRn/QA+/XHyNClr6lb+kjQkZ/9FAP9VB/jAhZ+pa+pY8IGf3RQz3UQ/0xImTpW/qWPiJk9EcP9VAP9ceIkKVv6Vv6iJDRHz3UQz3UHyNClr6lb+kjQkZ/9FAP9VB/jAhZ+pa+pY8IGf3RQz3UQ/0xImTpeT8iZPQHPfB+9MeIkKXn/YiQ0R/0wPvRHyNClp73I0JGf9AD70d/jAhZet6PCBn9QQ+8H/0xImTpeT8iZPQHPfB+9MeIkKXn/YiQ0R/0wPvRHyNClr6ljwgZ/UEP9FB/jAhZ+pa+pY8IGf3RQz3UQ/0xImTpW/qWPiJk9EcP9VAP9ceIkKVv6Vv6iJDRHz3UQz3UHyNClr6lb+kjQkZ/9FAP9VB/jAhZ+pa+pY8IGf3RQz3UQ/0xImTpW/qWsAgZ/UEP9VAP9ceIkKXn/YiQ0R/0wPvRHyNClp73I0JGf9AD70d/jAgCImCM/oD+GCNCgAgZoz+gP8aIECBCxugP6I8xIgRYP0Z/AP0xRoRAhIzRH0B/jBEhECFj9AfQH2NECETIGP0B9McYEQIRMkZ/AP0xRoRAhIzRH0B/jBEhECFj9Af0xxgRAkTIGP0B/TFGhAARMkZ/QH+MESFAhIzRH9AfY0QIECFj9Af0xxgRAkTIGP0B/TFGhAARMsb3D/pjjAiBCBmjP4D+GCNCIELG6A+gP8aIEIiQMfoD6I8xIgQiZIz+APpjjAiBCBmjP4D+GCNCIELG6A/ojzEiBIiQMfoD+mOMCAEiZIz+gP4YI0KACBmjP6A/xogQIELG6A/ojzEiBIiQMfoD+mOMCAEiZIz+gP4YI0IgQsboD6A/xogQiJAx+gPojzEiBCJkjP4A+mOMCIEIGaM/gP78mQMQTfCklLhrRQAAAABJRU5ErkJggg==";
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = identity,
      interpolate = get_interpolator
    } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const invalidateAll = /* @__PURE__ */ client_method("invalidate_all");
const beforeNavigate = /* @__PURE__ */ client_method("before_navigate");
const afterNavigate = /* @__PURE__ */ client_method("after_navigate");
function splitPath(path) {
  return path.toString().split(/[[\].]+/).filter((p) => p);
}
function mergePath(path) {
  return path.reduce((acc, next) => {
    if (typeof next === "number" || !isNaN(parseInt(String(next), 10)))
      acc += `[${String(next)}]`;
    else if (!acc)
      acc += String(next);
    else
      acc += `.${String(next)}`;
    return acc;
  }, "");
}
class SuperFormError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, SuperFormError.prototype);
  }
}
function setPath(parent, key, value) {
  parent[key] = value;
  return "skip";
}
function isInvalidPath(originalPath, pathData) {
  return pathData.value !== void 0 && typeof pathData.value !== "object" && pathData.path.length < originalPath.length;
}
function pathExists(obj, path, options = {}) {
  if (!options.modifier) {
    options.modifier = (pathData) => isInvalidPath(path, pathData) ? void 0 : pathData.value;
  }
  const exists = traversePath(obj, path, options.modifier);
  if (!exists)
    return void 0;
  if (options.value === void 0)
    return exists;
  return options.value(exists.value) ? exists : void 0;
}
function traversePath(obj, realPath, modifier) {
  if (!realPath.length)
    return void 0;
  const path = [realPath[0]];
  let parent = obj;
  while (path.length < realPath.length) {
    const key2 = path[path.length - 1];
    const value = modifier ? modifier({
      parent,
      key: String(key2),
      value: parent[key2],
      path: path.map((p) => String(p)),
      isLeaf: false,
      set: (v) => setPath(parent, key2, v)
    }) : parent[key2];
    if (value === void 0)
      return void 0;
    else
      parent = value;
    path.push(realPath[path.length]);
  }
  const key = realPath[realPath.length - 1];
  return {
    parent,
    key: String(key),
    value: parent[key],
    path: realPath.map((p) => String(p)),
    isLeaf: true,
    set: (v) => setPath(parent, key, v)
  };
}
function traversePaths(parent, modifier, path = []) {
  for (const key in parent) {
    const value = parent[key];
    const isLeaf = value === null || typeof value !== "object";
    const pathData = {
      parent,
      key,
      value,
      path: path.map(String).concat([key]),
      isLeaf,
      set: (v) => setPath(parent, key, v)
    };
    const status = modifier(pathData);
    if (status === "abort")
      return status;
    else if (status === "skip")
      continue;
    else if (!isLeaf) {
      const status2 = traversePaths(value, modifier, pathData.path);
      if (status2 === "abort")
        return status2;
    }
  }
}
async function traversePathsAsync(parent, modifier, path = []) {
  for (const key in parent) {
    const value = parent[key];
    const isLeaf = value === null || typeof value !== "object";
    const pathData = {
      parent,
      key,
      value,
      path: path.map(String).concat([key]),
      isLeaf,
      set: (v) => setPath(parent, key, v)
    };
    const status = await modifier(pathData);
    if (status === "abort")
      return status;
    else if (status === "skip")
      break;
    else if (!isLeaf) {
      const status2 = traversePaths(value, modifier, pathData.path);
      if (status2 === "abort")
        return status2;
    }
  }
}
function eqSet(xs, ys) {
  return xs === ys || xs.size === ys.size && [...xs].every((x) => ys.has(x));
}
function comparePaths(newObj, oldObj) {
  const diffPaths = /* @__PURE__ */ new Map();
  function checkPath(data, compareTo) {
    const exists = traversePath(compareTo, data.path);
    function addDiff() {
      diffPaths.set(data.path.join(" "), data.path);
    }
    if (data.isLeaf) {
      if (!exists) {
        addDiff();
      } else if (data.value !== exists.value) {
        addDiff();
      }
    } else if (exists) {
      if (data.value instanceof Date && exists.value instanceof Date && data.value.getTime() != exists.value.getTime()) {
        addDiff();
      } else if (data.value instanceof Set && exists.value instanceof Set && !eqSet(data.value, exists.value)) {
        addDiff();
      }
    }
  }
  traversePaths(newObj, (data) => checkPath(data, oldObj));
  traversePaths(oldObj, (data) => checkPath(data, newObj));
  return Array.from(diffPaths.values());
}
function setPaths(obj, paths, value) {
  for (const path of paths) {
    const leaf = traversePath(obj, path, ({ parent, key, value: value2 }) => {
      if (value2 === void 0 || typeof value2 !== "object") {
        parent[key] = {};
      }
      return parent[key];
    });
    if (leaf)
      leaf.parent[leaf.key] = value;
  }
}
function fieldProxy(form, path) {
  const path2 = splitPath(path);
  const proxy = derived(form, ($form) => {
    const data = traversePath($form, path2);
    return data?.value;
  });
  return {
    subscribe(...params) {
      const unsub = proxy.subscribe(...params);
      return () => {
        unsub();
      };
    },
    //subscribe: proxy.subscribe,
    update(upd) {
      form.update((f) => {
        const output = traversePath(f, path2);
        if (output)
          output.parent[output.key] = upd(output.value);
        return f;
      });
    },
    set(value) {
      form.update((f) => {
        const output = traversePath(f, path2);
        if (output)
          output.parent[output.key] = value;
        return f;
      });
    }
  };
}
function clone$1(data) {
  if ("structuredClone" in globalThis) {
    return structuredClone(data);
  }
  return parse(stringify(data));
}
function unwrapZodType(zodType) {
  const originalType = zodType;
  let _wrapped = true;
  let isNullable = false;
  let isOptional = false;
  let hasDefault = false;
  let effects = void 0;
  let defaultValue = void 0;
  while (_wrapped) {
    if (zodType._def.typeName == "ZodNullable") {
      isNullable = true;
      zodType = zodType.unwrap();
    } else if (zodType._def.typeName == "ZodDefault") {
      hasDefault = true;
      defaultValue = zodType._def.defaultValue();
      zodType = zodType._def.innerType;
    } else if (zodType._def.typeName == "ZodOptional") {
      isOptional = true;
      zodType = zodType.unwrap();
    } else if (zodType._def.typeName == "ZodEffects") {
      if (!effects)
        effects = zodType;
      zodType = zodType._def.schema;
    } else if (zodType._def.typeName == "ZodPipeline") {
      zodType = zodType._def.out;
    } else {
      _wrapped = false;
    }
  }
  return {
    zodType,
    originalType,
    isNullable,
    isOptional,
    hasDefault,
    defaultValue,
    effects
  };
}
const _cachedErrorShapes = /* @__PURE__ */ new WeakMap();
function errorShape(schema) {
  if (!_cachedErrorShapes.has(schema)) {
    _cachedErrorShapes.set(schema, _errorShape(schema));
  }
  return _cachedErrorShapes.get(schema);
}
function _errorShape(type) {
  const unwrapped = unwrapZodType(type).zodType;
  if (unwrapped._def.typeName == "ZodObject") {
    return Object.fromEntries(Object.entries(unwrapped.shape).map(([key, value]) => {
      return [key, _errorShape(value)];
    }).filter((entry) => entry[1] !== void 0));
  } else if (unwrapped._def.typeName == "ZodArray") {
    return _errorShape(unwrapped._def.type) ?? {};
  } else if (unwrapped._def.typeName == "ZodRecord") {
    return _errorShape(unwrapped._def.valueType) ?? {};
  } else if (unwrapped._def.typeName == "ZodUnion") {
    const options = unwrapped._def.options;
    return options.reduce((shape, next) => {
      const nextShape = _errorShape(next);
      if (nextShape)
        shape = { ...shape ?? {}, ...nextShape };
      return shape;
    }, void 0);
  }
  return void 0;
}
function mapErrors(obj, errorShape2, inObject = true) {
  const output = {};
  const entries = Object.entries(obj);
  if ("_errors" in obj && obj._errors.length) {
    if (!errorShape2 || !inObject) {
      return obj._errors;
    } else {
      output._errors = obj._errors;
    }
  }
  for (const [key, value] of entries.filter(([key2]) => key2 !== "_errors")) {
    const numericKey = !isNaN(parseInt(key, 10));
    output[key] = mapErrors(
      value,
      errorShape2 ? numericKey ? errorShape2 : errorShape2[key] : void 0,
      !!errorShape2?.[key]
      // We're not in an object if there is no key in the ErrorShape
    );
  }
  return output;
}
function flattenErrors(errors) {
  return _flattenErrors(errors, []);
}
function _flattenErrors(errors, path) {
  const entries = Object.entries(errors);
  return entries.filter(([, value]) => value !== void 0).flatMap(([key, messages]) => {
    if (Array.isArray(messages) && messages.length > 0) {
      const currPath = path.concat([key]);
      return { path: mergePath(currPath), messages };
    } else {
      return _flattenErrors(errors[key], path.concat([key]));
    }
  });
}
function clearErrors(Errors, options) {
  Errors.update(($errors) => {
    traversePaths($errors, (pathData) => {
      if (pathData.path.length == 1 && pathData.path[0] == "_errors" && !options.clearFormLevelErrors) {
        return;
      }
      if (Array.isArray(pathData.value)) {
        return pathData.set(void 0);
      }
    });
    if (options.undefinePath)
      setPaths($errors, [options.undefinePath], void 0);
    return $errors;
  });
}
async function clientValidation(options, checkData, formId, constraints, posted) {
  return _clientValidation(options.validators, checkData, formId, constraints, posted);
}
async function _clientValidation(validators, checkData, formId, constraints, posted) {
  let valid = true;
  let clientErrors = {};
  if (validators) {
    if ("safeParseAsync" in validators) {
      const validator = validators;
      const result = await validator.safeParseAsync(checkData);
      valid = result.success;
      if (!result.success) {
        clientErrors = mapErrors(
          result.error.format(),
          errorShape(validator)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        );
      }
    } else {
      checkData = { ...checkData };
      for (const [key, value] of Object.entries(validators)) {
        if (typeof value === "function" && !(key in checkData)) {
          checkData[key] = void 0;
        }
      }
      const validator = validators;
      const newErrors = [];
      await traversePathsAsync(checkData, async ({ value, path }) => {
        const validationPath = path.filter((p) => isNaN(parseInt(p)));
        const maybeValidator = traversePath(validator, validationPath);
        if (typeof maybeValidator?.value === "function") {
          const check = maybeValidator.value;
          let errors;
          if (Array.isArray(value)) {
            for (const key in value) {
              try {
                errors = await check(value[key]);
                if (errors) {
                  valid = false;
                  newErrors.push({
                    path: path.concat([key]),
                    errors: typeof errors === "string" ? [errors] : errors ?? void 0
                  });
                }
              } catch (e) {
                valid = false;
                console.error(`Error in form validators for field "${path}":`, e);
              }
            }
          } else {
            try {
              errors = await check(value);
              if (errors) {
                valid = false;
                newErrors.push({
                  path,
                  errors: typeof errors === "string" ? [errors] : errors ?? void 0
                });
              }
            } catch (e) {
              valid = false;
              console.error(`Error in form validators for field "${path}":`, e);
            }
          }
        }
      });
      for (const { path, errors } of newErrors) {
        const errorPath = traversePath(clientErrors, path, ({ parent, key, value }) => {
          if (value === void 0)
            parent[key] = {};
          return parent[key];
        });
        if (errorPath) {
          const { parent, key } = errorPath;
          parent[key] = errors;
        }
      }
    }
  }
  return {
    valid,
    posted,
    errors: clientErrors,
    data: checkData,
    constraints,
    message: void 0,
    id: formId
  };
}
async function validateObjectErrors(formOptions, data, Errors, tainted) {
  if (typeof formOptions.validators !== "object" || !("safeParseAsync" in formOptions.validators)) {
    return;
  }
  const validators = formOptions.validators;
  const result = await validators.safeParseAsync(data);
  if (!result.success) {
    const newErrors = mapErrors(result.error.format(), errorShape(validators));
    Errors.update((currentErrors) => {
      traversePaths(currentErrors, (pathData) => {
        if (pathData.key == "_errors") {
          return pathData.set(void 0);
        }
      });
      traversePaths(newErrors, (pathData) => {
        if (pathData.key == "_errors") {
          const taintedPath = pathData.path.length == 1 ? { value: true } : tainted && traversePath(tainted, pathData.path.slice(0, -1));
          if (taintedPath && taintedPath.value) {
            return setPaths(currentErrors, [pathData.path], pathData.value);
          }
        }
      });
      return currentErrors;
    });
  } else {
    Errors.update((currentErrors) => {
      traversePaths(currentErrors, (pathData) => {
        if (pathData.key == "_errors") {
          return pathData.set(void 0);
        }
      });
      return currentErrors;
    });
  }
}
async function validateField(path, formOptions, data, Errors, Tainted, options = {}) {
  function Errors_clear() {
    clearErrors(Errors, { undefinePath: path, clearFormLevelErrors: true });
  }
  function Errors_update(errorMsgs) {
    if (typeof errorMsgs === "string")
      errorMsgs = [errorMsgs];
    if (options.update === true || options.update == "errors") {
      Errors.update((errors2) => {
        const error = traversePath(errors2, path, (node) => {
          if (isInvalidPath(path, node)) {
            throw new SuperFormError("Errors can only be added to form fields, not to arrays or objects in the schema. Path: " + node.path.slice(0, -1));
          } else if (node.value === void 0) {
            node.parent[node.key] = {};
            return node.parent[node.key];
          } else {
            return node.value;
          }
        });
        if (!error)
          throw new SuperFormError("Error path could not be created: " + path);
        error.parent[error.key] = errorMsgs ?? void 0;
        return errors2;
      });
    }
    return errorMsgs ?? void 0;
  }
  const errors = await _validateField(path, formOptions.validators, data, Errors, Tainted, options);
  if (errors.validated) {
    if (errors.validated === "all" && !errors.errors) {
      Errors_clear();
    } else {
      return Errors_update(errors.errors);
    }
  } else if (errors.validated === false && formOptions.defaultValidator == "clear") {
    return Errors_update(void 0);
  }
  return errors.errors;
}
async function _validateField(path, validators, data, Errors, Tainted, options = {}) {
  if (options.update === void 0)
    options.update = true;
  if (options.taint === void 0)
    options.taint = false;
  if (typeof options.errors == "string")
    options.errors = [options.errors];
  const Context = {
    value: options.value,
    shouldUpdate: true,
    currentData: void 0,
    // Remove numeric indices, they're not used for validators.
    validationPath: path.filter((p) => isNaN(parseInt(p)))
  };
  async function defaultValidate() {
    return { validated: false, errors: void 0 };
  }
  function Tainted_isPathTainted(path2, tainted) {
    if (tainted === void 0)
      return false;
    const leaf = traversePath(tainted, path2);
    if (!leaf)
      return false;
    return leaf.value;
  }
  function Errors_update(updater) {
    Errors.update(updater);
  }
  function Errors_clearAll() {
    clearErrors(Errors, { undefinePath: null, clearFormLevelErrors: true });
  }
  function Errors_fromZod(errors, validator) {
    return mapErrors(errors.format(), errorShape(validator));
  }
  if (!("value" in options)) {
    Context.currentData = get_store_value(data);
    const dataToValidate = traversePath(Context.currentData, path);
    Context.value = dataToValidate?.value;
  } else if (options.update === true || options.update === "value") {
    data.update(($data) => {
      setPaths($data, [path], Context.value);
      return Context.currentData = $data;
    }, { taint: options.taint });
  } else {
    Context.shouldUpdate = false;
  }
  if (typeof validators !== "object") {
    return defaultValidate();
  }
  if ("safeParseAsync" in validators) {
    if (!Context.shouldUpdate) {
      Context.currentData = clone$1(Context.currentData ?? get_store_value(data));
      setPaths(Context.currentData, [path], Context.value);
    }
    const result = await validators.safeParseAsync(Context.currentData);
    if (!result.success) {
      const newErrors = Errors_fromZod(result.error, validators);
      if (options.update === true || options.update == "errors") {
        const taintedFields = get_store_value(Tainted);
        Errors_update((currentErrors) => {
          traversePaths(currentErrors, (pathData) => {
            if (pathData.key == "_errors") {
              return pathData.set(void 0);
            }
          });
          traversePaths(newErrors, (pathData) => {
            if (pathData.key == "_errors" && (pathData.path.length == 1 || Tainted_isPathTainted(pathData.path.slice(0, -1), taintedFields))) {
              return setPaths(currentErrors, [pathData.path], pathData.value);
            }
            if (!Array.isArray(pathData.value))
              return;
            if (Tainted_isPathTainted(pathData.path, taintedFields)) {
              setPaths(currentErrors, [pathData.path], pathData.value);
            }
            return "skip";
          });
          return currentErrors;
        });
      }
      const current = traversePath(newErrors, path);
      return {
        validated: true,
        errors: options.errors ?? current?.value
      };
    } else {
      Errors_clearAll();
      return { validated: true, errors: void 0 };
    }
  } else {
    const validator = traversePath(validators, Context.validationPath);
    if (!validator || validator.value === void 0) {
      return defaultValidate();
    } else {
      const result = await validator.value(Context.value);
      return {
        validated: true,
        errors: result ? options.errors ?? result : result
      };
    }
  }
}
function applyAction(result) {
  {
    throw new Error("Cannot call applyAction(...) on the server");
  }
}
function deserialize(result) {
  const parsed = JSON.parse(result);
  if (parsed.data) {
    parsed.data = devalue.parse(parsed.data);
  }
  return parsed;
}
function clone(element) {
  return (
    /** @type {T} */
    HTMLElement.prototype.cloneNode.call(element)
  );
}
function enhance(form_element, submit = () => {
}) {
  const fallback_callback = async ({ action, result, reset }) => {
    if (result.type === "success") {
      if (reset !== false) {
        HTMLFormElement.prototype.reset.call(form_element);
      }
      await invalidateAll();
    }
    if (location.origin + location.pathname === action.origin + action.pathname || result.type === "redirect" || result.type === "error") {
      applyAction();
    }
  };
  async function handle_submit(event) {
    const method = event.submitter?.hasAttribute("formmethod") ? (
      /** @type {HTMLButtonElement | HTMLInputElement} */
      event.submitter.formMethod
    ) : clone(form_element).method;
    if (method !== "post")
      return;
    event.preventDefault();
    const action = new URL(
      // We can't do submitter.formAction directly because that property is always set
      event.submitter?.hasAttribute("formaction") ? (
        /** @type {HTMLButtonElement | HTMLInputElement} */
        event.submitter.formAction
      ) : clone(form_element).action
    );
    const form_data = new FormData(form_element);
    const submitter_name = event.submitter?.getAttribute("name");
    if (submitter_name) {
      form_data.append(submitter_name, event.submitter?.getAttribute("value") ?? "");
    }
    const controller = new AbortController();
    let cancelled = false;
    const cancel = () => cancelled = true;
    const callback = await submit({
      action,
      cancel,
      controller,
      get data() {
        return form_data;
      },
      formData: form_data,
      get form() {
        return form_element;
      },
      formElement: form_element,
      submitter: event.submitter
    }) ?? fallback_callback;
    if (cancelled)
      return;
    let result;
    try {
      const response = await fetch(action, {
        method: "POST",
        headers: {
          accept: "application/json",
          "x-sveltekit-action": "true"
        },
        cache: "no-store",
        body: form_data,
        signal: controller.signal
      });
      result = deserialize(await response.text());
      if (result.type === "error")
        result.status = response.status;
    } catch (error) {
      if (
        /** @type {any} */
        error?.name === "AbortError"
      )
        return;
      result = { type: "error", error };
    }
    callback({
      action,
      get data() {
        return form_data;
      },
      formData: form_data,
      get form() {
        return form_element;
      },
      formElement: form_element,
      update: (opts) => fallback_callback({ action, result, reset: opts?.reset }),
      // @ts-expect-error generic constraints stuff we don't care about
      result
    });
  }
  HTMLFormElement.prototype.addEventListener.call(form_element, "submit", handle_submit);
  return {
    destroy() {
      HTMLFormElement.prototype.removeEventListener.call(form_element, "submit", handle_submit);
    }
  };
}
const isElementInViewport = (el, topOffset = 0) => {
  const rect = el.getBoundingClientRect();
  return rect.top >= topOffset && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
const scrollToAndCenter = (el, offset = 1.125, behavior = "smooth") => {
  const elementRect = el.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const top = absoluteElementTop - window.innerHeight / (2 * offset);
  window.scrollTo({ left: 0, top, behavior });
};
var FetchStatus;
(function(FetchStatus2) {
  FetchStatus2[FetchStatus2["Idle"] = 0] = "Idle";
  FetchStatus2[FetchStatus2["Submitting"] = 1] = "Submitting";
  FetchStatus2[FetchStatus2["Delayed"] = 2] = "Delayed";
  FetchStatus2[FetchStatus2["Timeout"] = 3] = "Timeout";
})(FetchStatus || (FetchStatus = {}));
const activeTimers = /* @__PURE__ */ new Set();
let _initialized = false;
function Form(formEl, timers, options) {
  let state = FetchStatus.Idle;
  let delayedTimeout, timeoutTimeout;
  let aboutToNavigate = false;
  const Timers = activeTimers;
  function Timers_start() {
    Timers_clear();
    Timers_setState(state != FetchStatus.Delayed ? FetchStatus.Submitting : FetchStatus.Delayed);
    delayedTimeout = window.setTimeout(() => {
      if (delayedTimeout && state == FetchStatus.Submitting)
        Timers_setState(FetchStatus.Delayed);
    }, options.delayMs);
    timeoutTimeout = window.setTimeout(() => {
      if (timeoutTimeout && state == FetchStatus.Delayed)
        Timers_setState(FetchStatus.Timeout);
    }, options.timeoutMs);
    Timers.add(Timers_clear);
  }
  function Timers_clear() {
    clearTimeout(delayedTimeout);
    clearTimeout(timeoutTimeout);
    delayedTimeout = timeoutTimeout = 0;
    Timers.delete(Timers_clear);
    Timers_setState(FetchStatus.Idle);
  }
  function Timers_clearAll() {
    Timers.forEach((t) => t());
    Timers.clear();
  }
  function Timers_setState(s) {
    state = s;
    timers.submitting.set(state >= FetchStatus.Submitting);
    timers.delayed.set(state >= FetchStatus.Delayed);
    timers.timeout.set(state >= FetchStatus.Timeout);
  }
  const ErrorTextEvents = formEl;
  function ErrorTextEvents__selectText(e) {
    const target = e.target;
    if (options.selectErrorText)
      target.select();
  }
  function ErrorTextEvents_addErrorTextListeners() {
    if (!options.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => {
      el.addEventListener("invalid", ErrorTextEvents__selectText);
    });
  }
  function ErrorTextEvents_removeErrorTextListeners() {
    if (!options.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => el.removeEventListener("invalid", ErrorTextEvents__selectText));
  }
  const Form2 = formEl;
  function Form_shouldAutoFocus(userAgent) {
    if (typeof options.autoFocusOnError === "boolean")
      return options.autoFocusOnError;
    else
      return !/iPhone|iPad|iPod|Android/i.test(userAgent);
  }
  const Form_scrollToFirstError = async () => {
    if (options.scrollToError == "off")
      return;
    const selector = options.errorSelector;
    if (!selector)
      return;
    await tick();
    let el;
    el = Form2.querySelector(selector);
    if (!el)
      return;
    el = el.querySelector(selector) ?? el;
    const nav = options.stickyNavbar ? document.querySelector(options.stickyNavbar) : null;
    if (typeof options.scrollToError != "string") {
      el.scrollIntoView(options.scrollToError);
    } else if (!isElementInViewport(el, nav?.offsetHeight ?? 0)) {
      scrollToAndCenter(el, void 0, options.scrollToError);
    }
    if (!Form_shouldAutoFocus(navigator.userAgent))
      return;
    let focusEl;
    focusEl = el;
    if (!["INPUT", "SELECT", "BUTTON", "TEXTAREA"].includes(focusEl.tagName)) {
      focusEl = focusEl.querySelector('input:not([type="hidden"]):not(.flatpickr-input), select, textarea');
    }
    if (focusEl) {
      try {
        focusEl.focus({ preventScroll: true });
        if (options.selectErrorText && focusEl.tagName == "INPUT") {
          focusEl.select();
        }
      } catch (err) {
      }
    }
  };
  {
    ErrorTextEvents_addErrorTextListeners();
    const completed = (cancelled, clearIfNotNavigating = false) => {
      Timers_clear();
      if (!cancelled)
        setTimeout(Form_scrollToFirstError);
      if (clearIfNotNavigating && !aboutToNavigate) {
        Timers_clearAll();
      }
    };
    onDestroy(() => {
      ErrorTextEvents_removeErrorTextListeners();
      completed(true);
    });
    if (!_initialized) {
      beforeNavigate(() => {
        aboutToNavigate = true;
      });
      afterNavigate((nav) => {
        if (nav.type == "enter")
          return;
        aboutToNavigate = false;
        Timers_clearAll();
      });
      _initialized = true;
    }
    return {
      submitting: () => {
        aboutToNavigate = false;
        Timers_start();
      },
      completed,
      scrollToFirstError: () => {
        setTimeout(Form_scrollToFirstError);
      },
      isSubmitting: () => state === FetchStatus.Submitting || state === FetchStatus.Delayed
    };
  }
}
function cancelFlash(options) {
  if (!options.flashMessage || !browser)
    return;
  if (!shouldSyncFlash(options))
    return;
  document.cookie = `flash=; Max-Age=0; Path=${options.flashMessage.cookiePath ?? "/"};`;
}
function shouldSyncFlash(options) {
  if (!options.flashMessage || !browser)
    return false;
  return options.syncFlashMessage;
}
const noCustomValidityDataAttribute = "noCustomValidity";
function setCustomValidity(el, errors) {
  const message = errors && errors.length ? errors.join("\n") : "";
  el.setCustomValidity(message);
  if (message)
    el.reportValidity();
}
function setCustomValidityForm(formEl, errors) {
  for (const el of formEl.querySelectorAll("input,select,textarea,button")) {
    if (noCustomValidityDataAttribute in el.dataset) {
      continue;
    }
    const error = traversePath(errors, splitPath(el.name));
    setCustomValidity(el, error?.value);
    if (error?.value)
      return;
  }
}
function formEnhance(formEl, submitting, delayed, timeout, errs, Form_updateFromActionResult, options, data, message, enableTaintedForm, formEvents, formId, constraints, tainted, lastChanges, Context_findValidationForms, posted) {
  enableTaintedForm();
  const errors = errs;
  async function validateChange(change, event, validityEl) {
    if (options.validationMethod == "submit-only")
      return;
    if (options.customValidity && validityEl) {
      if ("setCustomValidity" in validityEl) {
        validityEl.setCustomValidity("");
      }
      if (event == "input" && options.validationMethod == "onblur")
        return;
      if (noCustomValidityDataAttribute in validityEl.dataset)
        if (event == "input")
          return;
        else
          validityEl = null;
    }
    const newErrors = await validateField(change, options, data, errors, tainted);
    if (validityEl) {
      setCustomValidity(validityEl, newErrors);
    }
  }
  function timingIssue(el) {
    return el && (el instanceof HTMLSelectElement || el instanceof HTMLInputElement && (el.type == "radio" || el.type == "checkbox"));
  }
  async function checkBlur(e) {
    if (options.validationMethod == "oninput" || options.validationMethod == "submit-only") {
      return;
    }
    if (timingIssue(e.target)) {
      await new Promise((r) => setTimeout(r, 0));
    }
    for (const change of get_store_value(lastChanges)) {
      let validityEl = null;
      if (options.customValidity) {
        const name = CSS.escape(mergePath(change));
        validityEl = formEl.querySelector(`[name="${name}"]`);
      }
      validateChange(change, "blur", validityEl);
    }
    lastChanges.set([]);
  }
  formEl.addEventListener("focusout", checkBlur);
  async function checkCustomValidity(e) {
    if (options.validationMethod == "onblur" || options.validationMethod == "submit-only") {
      return;
    }
    if (timingIssue(e.target)) {
      await new Promise((r) => setTimeout(r, 0));
    }
    for (const change of get_store_value(lastChanges)) {
      const name = CSS.escape(mergePath(change));
      const validityEl = formEl.querySelector(`[name="${name}"]`);
      if (!validityEl)
        continue;
      const hadErrors = traversePath(get_store_value(errors), change);
      if (hadErrors && hadErrors.key in hadErrors.parent) {
        setTimeout(() => validateChange(change, "input", validityEl), 0);
      }
    }
  }
  if (options.customValidity) {
    formEl.addEventListener("input", checkCustomValidity);
  }
  onDestroy(() => {
    formEl.removeEventListener("focusout", checkBlur);
    formEl.removeEventListener("input", checkCustomValidity);
  });
  const htmlForm = Form(formEl, { submitting, delayed, timeout }, options);
  let currentRequest;
  return enhance(formEl, async (submit) => {
    const submitCancel = submit.cancel;
    let cancelled = false;
    function cancel() {
      cancelled = true;
      return submitCancel();
    }
    submit.cancel = cancel;
    if (htmlForm.isSubmitting() && options.multipleSubmits == "prevent") {
      cancel();
    } else {
      if (htmlForm.isSubmitting() && options.multipleSubmits == "abort") {
        if (currentRequest)
          currentRequest.abort();
      }
      currentRequest = submit.controller;
      for (const event of formEvents.onSubmit) {
        await event(submit);
      }
    }
    if (cancelled) {
      if (options.flashMessage)
        cancelFlash(options);
    } else {
      const validation = await clientValidation(options, get_store_value(data), get_store_value(formId), get_store_value(constraints), get_store_value(posted));
      if (!validation.valid) {
        cancel();
        const result = {
          type: "failure",
          status: (typeof options.SPA === "boolean" ? void 0 : options.SPA?.failStatus) ?? 400,
          data: { form: validation }
        };
        setTimeout(() => validationResponse({ result }), 0);
      }
      if (!cancelled) {
        switch (options.clearOnSubmit) {
          case "errors-and-message":
            errors.clear();
            message.set(void 0);
            break;
          case "errors":
            errors.clear();
            break;
          case "message":
            message.set(void 0);
            break;
        }
        if (options.flashMessage && (options.clearOnSubmit == "errors-and-message" || options.clearOnSubmit == "message") && shouldSyncFlash(options)) {
          options.flashMessage.module.getFlash(page).set(void 0);
        }
        htmlForm.submitting();
        const submitData = "formData" in submit ? submit.formData : submit.data;
        if (options.SPA) {
          cancel();
          const validationResult = {
            valid: true,
            posted: true,
            errors: {},
            data: get_store_value(data),
            constraints: get_store_value(constraints),
            message: void 0,
            id: get_store_value(formId)
          };
          const result = {
            type: "success",
            status: 200,
            data: { form: validationResult }
          };
          setTimeout(() => validationResponse({ result }), 0);
        } else if (options.dataType === "json") {
          const postData = get_store_value(data);
          const chunks = chunkSubstr(stringify(postData), options.jsonChunkSize ?? 5e5);
          for (const chunk of chunks) {
            submitData.append("__superform_json", chunk);
          }
          Object.keys(postData).forEach((key) => {
            if (typeof submitData.get(key) === "string") {
              submitData.delete(key);
            }
          });
        }
        if (!options.SPA && !submitData.has("__superform_id")) {
          const id = get_store_value(formId);
          if (id !== void 0)
            submitData.set("__superform_id", id);
        }
      }
    }
    function chunkSubstr(str, size) {
      const numChunks = Math.ceil(str.length / size);
      const chunks = new Array(numChunks);
      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substring(o, o + size);
      }
      return chunks;
    }
    async function validationResponse(event) {
      const result = event.result;
      currentRequest = null;
      let cancelled2 = false;
      const data2 = {
        result,
        formEl,
        cancel: () => cancelled2 = true
      };
      for (const event2 of formEvents.onResult) {
        await event2(data2);
      }
      if (!cancelled2) {
        if ((result.type === "success" || result.type == "failure") && result.data) {
          const forms = Context_findValidationForms(result.data);
          if (!forms.length) {
            throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
          }
          for (const newForm of forms) {
            if (newForm.id !== get_store_value(formId))
              continue;
            const data3 = {
              form: newForm,
              formEl,
              cancel: () => cancelled2 = true
            };
            for (const event2 of formEvents.onUpdate) {
              await event2(data3);
            }
            if (!cancelled2 && options.customValidity) {
              setCustomValidityForm(formEl, data3.form.errors);
            }
          }
        }
        if (!cancelled2) {
          if (result.type !== "error") {
            if (result.type === "success" && options.invalidateAll) {
              await invalidateAll();
            }
            if (options.applyAction) {
              await applyAction();
            } else {
              await Form_updateFromActionResult(result);
            }
          } else {
            if (options.applyAction) {
              if (options.onError == "apply") {
                await applyAction();
              } else {
                ({
                  type: "failure",
                  status: Math.floor(result.status || 500),
                  data: result
                });
                await applyAction();
              }
            }
            if (options.onError !== "apply") {
              const data3 = { result, message };
              for (const event2 of formEvents.onError) {
                if (event2 !== "apply")
                  await event2(data3);
              }
            }
          }
          if (options.flashMessage) {
            if (result.type == "error" && options.flashMessage.onError) {
              await options.flashMessage.onError({
                result,
                message: options.flashMessage.module.getFlash(page)
              });
            }
          }
        }
      }
      if (cancelled2 && options.flashMessage) {
        cancelFlash(options);
      }
      if (cancelled2 || result.type != "redirect") {
        htmlForm.completed(cancelled2);
      } else if (result.type == "redirect" && new URL(result.location, /^https?:\/\//.test(result.location) ? void 0 : document.location.origin).pathname == document.location.pathname) {
        setTimeout(() => {
          htmlForm.completed(true, true);
        }, 0);
      }
    }
    return validationResponse;
  });
}
const defaultFormOptions = {
  applyAction: true,
  invalidateAll: true,
  resetForm: false,
  autoFocusOnError: "detect",
  scrollToError: "smooth",
  errorSelector: '[aria-invalid="true"],[data-invalid]',
  selectErrorText: false,
  stickyNavbar: void 0,
  taintedMessage: "Do you want to leave this page? Changes you made may not be saved.",
  onSubmit: void 0,
  onResult: void 0,
  onUpdate: void 0,
  onUpdated: void 0,
  onError: (event) => {
    console.warn("Unhandled Superform error, use onError event to handle it:", event.result.error);
  },
  dataType: "form",
  validators: void 0,
  defaultValidator: "keep",
  customValidity: false,
  clearOnSubmit: "errors-and-message",
  delayMs: 500,
  timeoutMs: 8e3,
  multipleSubmits: "prevent",
  validation: void 0,
  SPA: void 0,
  validateMethod: "auto"
};
const formIds = /* @__PURE__ */ new WeakMap();
const initializedForms = /* @__PURE__ */ new WeakMap();
function multipleFormIdError(id) {
  return `Duplicate form id's found: "${id}". Multiple forms will receive the same data. Use the id option to differentiate between them, or if this is intended, set the warnings.duplicateId option to false in superForm to disable this warning. More information: https://superforms.rocks/concepts/multiple-forms`;
}
function superForm(form, options = {}) {
  {
    options = {
      ...defaultFormOptions,
      ...options
    };
    if (options.SPA && options.validators === void 0) {
      console.warn("No validators set for superForm in SPA mode. Add them to the validators option, or set it to false to disable this warning.");
    }
  }
  let _formId = options.id;
  if (!form || Context_isValidationObject(form) === false) {
    if (options.warnings?.noValidationAndConstraints !== false) {
      console.warn((form ? "Form data sent directly to superForm instead of through superValidate. No initial data validation is made. " : "No form data sent to superForm, schema type safety cannot be guaranteed. ") + "Also, no constraints will exist for the form. Set the warnings.noValidationAndConstraints option to false to disable this warning.");
    }
    form = {
      valid: false,
      posted: false,
      errors: {},
      data: form ?? {},
      constraints: {}
    };
  } else {
    if (_formId === void 0)
      _formId = form.id;
  }
  const _initialFormId = _formId;
  const _currentPage = get_store_value(page);
  if (options.warnings?.duplicateId !== false) {
    if (!formIds.has(_currentPage)) {
      formIds.set(_currentPage, /* @__PURE__ */ new Set([_initialFormId]));
    } else {
      const currentForms = formIds.get(_currentPage);
      if (currentForms?.has(_initialFormId)) {
        console.warn(multipleFormIdError(_initialFormId));
      } else {
        currentForms?.add(_initialFormId);
      }
    }
  }
  if (!initializedForms.has(form)) {
    initializedForms.set(form, clone$1(form));
  }
  const initialForm = initializedForms.get(form);
  if (typeof initialForm.valid !== "boolean") {
    throw new SuperFormError("A non-validation object was passed to superForm. It should be an object of type SuperValidated, usually returned from superValidate.");
  }
  const postedData = _currentPage.form;
  if (postedData && typeof postedData === "object") {
    for (const postedForm of Context_findValidationForms(postedData).reverse()) {
      if (postedForm.id === _formId && !initializedForms.has(postedForm)) {
        initializedForms.set(postedData, postedData);
        const pageDataForm = form;
        form = postedForm;
        if (form.valid && options.resetForm && (options.resetForm === true || options.resetForm())) {
          form = clone$1(pageDataForm);
          form.message = clone$1(postedForm.message);
        }
        break;
      }
    }
  } else {
    form = clone$1(initialForm);
  }
  const form2 = form;
  const _errors = writable(form2.errors);
  const FormId = writable(_formId);
  const Context = {
    taintedMessage: options.taintedMessage,
    taintedFormState: clone$1(initialForm.data)
  };
  function Context_randomId(length = 8) {
    return Math.random().toString(36).substring(2, length + 2);
  }
  function Context_setTaintedFormState(data) {
    Context.taintedFormState = clone$1(data);
  }
  function Context_findValidationForms(data) {
    const forms = Object.values(data).filter((v) => Context_isValidationObject(v) !== false);
    return forms;
  }
  function Context_isValidationObject(object) {
    if (!object || typeof object !== "object")
      return false;
    if (!("valid" in object && "errors" in object && typeof object.valid === "boolean")) {
      return false;
    }
    return "id" in object && typeof object.id === "string" ? object.id : void 0;
  }
  function Context_useEnhanceEnabled() {
    options.taintedMessage = Context.taintedMessage;
    if (_formId === void 0)
      FormId.set(Context_randomId());
  }
  function Context_newFormStore(data) {
    const _formData = writable(data);
    return {
      subscribe: _formData.subscribe,
      set: (value, options2 = {}) => {
        Tainted_update(value, Context.taintedFormState, options2.taint ?? true);
        Context_setTaintedFormState(value);
        return _formData.set(clone$1(value));
      },
      update: (updater, options2 = {}) => {
        return _formData.update((value) => {
          const output = updater(value);
          Tainted_update(output, Context.taintedFormState, options2.taint ?? true);
          Context_setTaintedFormState(output);
          return output;
        });
      }
    };
  }
  const Unsubscriptions = [
    FormId.subscribe((id) => _formId = id)
  ];
  function Unsubscriptions_unsubscribe() {
    Unsubscriptions.forEach((unsub) => unsub());
  }
  const Form2 = Context_newFormStore(form2.data);
  function Form_checkForNestedData(key, value) {
    if (!value || typeof value !== "object")
      return;
    if (Array.isArray(value)) {
      if (value.length > 0)
        Form_checkForNestedData(key, value[0]);
    } else if (!(value instanceof Date)) {
      throw new SuperFormError(`Object found in form field "${key}". Set the dataType option to "json" and add use:enhance to use nested data structures. More information: https://superforms.rocks/concepts/nested-data`);
    }
  }
  async function Form_updateFromValidation(form3, untaint) {
    if (form3.valid && untaint && options.resetForm && (options.resetForm === true || options.resetForm())) {
      Form_reset(form3.message);
    } else {
      rebind(form3, untaint);
    }
    if (formEvents.onUpdated.length) {
      await tick();
    }
    for (const event of formEvents.onUpdated) {
      event({ form: form3 });
    }
  }
  function Form_reset(message, data, id) {
    const resetData = clone$1(initialForm);
    resetData.data = { ...resetData.data, ...data };
    if (id !== void 0)
      resetData.id = id;
    rebind(resetData, true, message);
  }
  const Form_updateFromActionResult = async (result, untaint) => {
    if (result.type == "error") {
      throw new SuperFormError(`ActionResult of type "${result.type}" cannot be passed to update function.`);
    }
    if (result.type == "redirect") {
      if (options.resetForm && (options.resetForm === true || options.resetForm())) {
        Form_reset();
      }
      return;
    }
    if (typeof result.data !== "object") {
      throw new SuperFormError("Non-object validation data returned from ActionResult.");
    }
    const forms = Context_findValidationForms(result.data);
    if (!forms.length) {
      throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
    }
    for (const newForm of forms) {
      if (newForm.id !== _formId)
        continue;
      await Form_updateFromValidation(newForm, untaint ?? (result.status >= 200 && result.status < 300));
    }
  };
  const LastChanges = writable([]);
  const Message = writable(form2.message);
  const Constraints = writable(form2.constraints);
  const Posted = writable(false);
  const Errors = {
    subscribe: _errors.subscribe,
    set: _errors.set,
    update: _errors.update,
    /**
     * To work with client-side validation, errors cannot be deleted but must
     * be set to undefined, to know where they existed before (tainted+error check in oninput)
     */
    clear: () => clearErrors(_errors, {
      undefinePath: null,
      clearFormLevelErrors: true
    })
  };
  const Tainted = writable();
  async function Tainted__validate(path, taint) {
    let shouldValidate = options.validationMethod === "oninput";
    if (!shouldValidate) {
      const errorContent = get_store_value(Errors);
      const errorNode = errorContent ? pathExists(errorContent, path, {
        modifier: (pathData) => {
          if (isInvalidPath(path, pathData)) {
            throw new SuperFormError("Errors can only be added to form fields, not to arrays or objects in the schema. Path: " + pathData.path.slice(0, -1));
          }
          return pathData.value;
        }
      }) : void 0;
      const hasError = errorNode && errorNode.key in errorNode.parent;
      shouldValidate = !!hasError;
    }
    if (shouldValidate) {
      await validateField(path, options, Form2, Errors, Tainted, { taint });
      return true;
    } else {
      return false;
    }
  }
  async function Tainted_update(newObj, compareAgainst, taintOptions) {
    if (taintOptions === false) {
      return;
    } else if (taintOptions === "untaint-all") {
      Tainted.set(void 0);
      return;
    }
    let paths = comparePaths(newObj, compareAgainst);
    if (typeof taintOptions === "object") {
      if (typeof taintOptions.fields === "string")
        taintOptions.fields = [taintOptions.fields];
      paths = taintOptions.fields.map((path) => splitPath(path));
      taintOptions = true;
    }
    if (taintOptions === true) {
      LastChanges.set(paths);
    }
    if (paths.length) {
      Tainted.update((tainted) => {
        if (!tainted)
          tainted = {};
        setPaths(tainted, paths, taintOptions === true ? true : void 0);
        return tainted;
      });
      if (!(options.validationMethod == "onblur" || options.validationMethod == "submit-only")) {
        let updated = false;
        for (const path of paths) {
          updated = updated || await Tainted__validate(path, taintOptions);
        }
        if (!updated) {
          await validateObjectErrors(options, get_store_value(Form2), Errors, get_store_value(Tainted));
        }
      }
    }
  }
  function Tainted_set(tainted, newData) {
    Tainted.set(tainted);
    Context_setTaintedFormState(newData);
  }
  const Submitting = writable(false);
  const Delayed = writable(false);
  const Timeout = writable(false);
  const AllErrors = derived(Errors, ($errors) => {
    if (!$errors)
      return [];
    return flattenErrors($errors);
  });
  options.taintedMessage = void 0;
  onDestroy(() => {
    Unsubscriptions_unsubscribe();
    for (const events of Object.values(formEvents)) {
      events.length = 0;
    }
    formIds.get(_currentPage)?.delete(_initialFormId);
  });
  if (options.dataType !== "json") {
    for (const [key, value] of Object.entries(form2.data)) {
      Form_checkForNestedData(key, value);
    }
  }
  function rebind(form3, untaint, message) {
    if (untaint) {
      Tainted_set(typeof untaint === "boolean" ? void 0 : untaint, form3.data);
    }
    message = message ?? form3.message;
    Form2.set(form3.data, { taint: false });
    Message.set(message);
    Errors.set(form3.errors);
    FormId.set(form3.id);
    Posted.set(form3.posted);
    if (options.flashMessage && shouldSyncFlash(options)) {
      const flash = options.flashMessage.module.getFlash(page);
      if (message && get_store_value(flash) === void 0) {
        flash.set(message);
      }
    }
  }
  const formEvents = {
    onSubmit: options.onSubmit ? [options.onSubmit] : [],
    onResult: options.onResult ? [options.onResult] : [],
    onUpdate: options.onUpdate ? [options.onUpdate] : [],
    onUpdated: options.onUpdated ? [options.onUpdated] : [],
    onError: options.onError ? [options.onError] : []
  };
  const Fields = Object.fromEntries(Object.keys(initialForm.data).map((key) => {
    return [
      key,
      {
        name: key,
        value: fieldProxy(Form2, key),
        errors: fieldProxy(Errors, key),
        constraints: fieldProxy(Constraints, key)
      }
    ];
  }));
  function validate(path, opts) {
    if (path === void 0) {
      return clientValidation(options, get_store_value(Form2), _formId, get_store_value(Constraints), false);
    }
    return validateField(splitPath(path), options, Form2, Errors, Tainted, opts);
  }
  return {
    form: Form2,
    formId: FormId,
    errors: Errors,
    message: Message,
    constraints: Constraints,
    fields: Fields,
    tainted: Tainted,
    submitting: derived(Submitting, ($s) => $s),
    delayed: derived(Delayed, ($d) => $d),
    timeout: derived(Timeout, ($t) => $t),
    options,
    capture: function() {
      return {
        valid: initialForm.valid,
        posted: get_store_value(Posted),
        errors: get_store_value(Errors),
        data: get_store_value(Form2),
        constraints: get_store_value(Constraints),
        message: get_store_value(Message),
        id: _formId,
        tainted: get_store_value(Tainted)
      };
    },
    restore: function(snapshot) {
      return rebind(snapshot, snapshot.tainted ?? true);
    },
    validate,
    enhance: (el, events) => {
      if (events) {
        if (events.onError) {
          if (options.onError === "apply") {
            throw new SuperFormError('options.onError is set to "apply", cannot add any onError events.');
          } else if (events.onError === "apply") {
            throw new SuperFormError('Cannot add "apply" as onError event in use:enhance.');
          }
          formEvents.onError.push(events.onError);
        }
        if (events.onResult)
          formEvents.onResult.push(events.onResult);
        if (events.onSubmit)
          formEvents.onSubmit.push(events.onSubmit);
        if (events.onUpdate)
          formEvents.onUpdate.push(events.onUpdate);
        if (events.onUpdated)
          formEvents.onUpdated.push(events.onUpdated);
      }
      return formEnhance(el, Submitting, Delayed, Timeout, Errors, Form_updateFromActionResult, options, Form2, Message, Context_useEnhanceEnabled, formEvents, FormId, Constraints, Tainted, LastChanges, Context_findValidationForms, Posted);
    },
    allErrors: AllErrors,
    posted: Posted,
    reset: (options2) => Form_reset(options2?.keepMessage ? get_store_value(Message) : void 0, options2?.data, options2?.id)
  };
}
const emailSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1)
});
const ContactFrom_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".text.svelte-11vxa6p{font-weight:600}form.svelte-11vxa6p{display:flex;flex-direction:column}label.svelte-11vxa6p{font-weight:600;font-size:20px;color:var(--red);text-transform:uppercase;margin-bottom:10px}input.svelte-11vxa6p{margin-bottom:10px;height:25px;padding-left:5px;border:1px solid black}textarea.svelte-11vxa6p{padding:5px;min-height:140px;border:1px solid black}button.svelte-11vxa6p{text-align:left;color:var(--red);font-size:25px;background-color:unset;width:min-content;margin-top:20px;font-weight:600;border:unset;cursor:pointer}small.svelte-11vxa6p{color:red;font-size:12px;font-weight:600}",
  map: null
};
const ContactFrom = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $errors, $$unsubscribe_errors;
  const { form, errors, enhance: enhance2 } = superForm($form, { validators: emailSchema });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$result.css.add(css$2);
  $$unsubscribe_form();
  $$unsubscribe_errors();
  return `<div><div class="text svelte-11vxa6p" data-svelte-h="svelte-61dtts">You can email me using this form!</div> <form id="myForm" method="post" class="svelte-11vxa6p"><label for="name" class="svelte-11vxa6p" data-svelte-h="svelte-bs9sy6">Name</label> <input type="text" name="name" id="name" class="svelte-11vxa6p"${add_attribute("value", $form.name, 0)}> ${$errors.name ? `<small class="svelte-11vxa6p" data-svelte-h="svelte-olwwqw">Field is required!</small>` : ``} <label type="text" for="email" class="svelte-11vxa6p" data-svelte-h="svelte-19jp8yc">Email</label> <input type="text" name="email" id="email" class="svelte-11vxa6p"${add_attribute("value", $form.email, 0)}> ${$errors.email ? `<small class="svelte-11vxa6p" data-svelte-h="svelte-1rrvgs1">Incorrect email</small>` : ``} <label type="text" for="subject" class="svelte-11vxa6p" data-svelte-h="svelte-dk9k1g">Subject</label> <input type="text" name="subject" id="subject" class="svelte-11vxa6p"${add_attribute("value", $form.subject, 0)}>  ${$errors.subject ? `<small class="svelte-11vxa6p" data-svelte-h="svelte-olwwqw">Field is required!</small>` : ``} <label for="message" class="svelte-11vxa6p" data-svelte-h="svelte-4uee20">Message</label> <textarea id="message" cols="10" name="message" class="svelte-11vxa6p">${escape($form.message || "")}</textarea>  ${$errors.message ? `<small class="svelte-11vxa6p" data-svelte-h="svelte-mxn2z9">Field is required!!</small>` : ``} <button class="svelte-11vxa6p" data-svelte-h="svelte-1dvi08a">Send</button></form> </div>`;
});
const Experience_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".container.svelte-1u14n2i{display:flex;flex-direction:column;text-transform:uppercase;font-weight:600;row-gap:30px;padding-top:20px}.workplace.svelte-1u14n2i{color:var(--red);font-size:20px;margin-bottom:5px}.date.svelte-1u14n2i{color:var(--blue);font-size:16px;margin-bottom:10px}.text.svelte-1u14n2i{font-size:12px;line-height:24px}a.svelte-1u14n2i{font-size:12px}",
  map: null
};
const Experience = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { workplaces } = $$props;
  if ($$props.workplaces === void 0 && $$bindings.workplaces && workplaces !== void 0)
    $$bindings.workplaces(workplaces);
  $$result.css.add(css$1);
  return `<div class="container svelte-1u14n2i">${each(workplaces, (w) => {
    return `<div><div class="workplace svelte-1u14n2i">${escape(w.title)}</div> ${w?.link ? `<a${add_attribute("href", w.link, 0)} target="_blank" class="svelte-1u14n2i">${escape(w.link)} </a>` : ``} ${w?.date ? `<div class="date svelte-1u14n2i">${escape(w.date)} </div>` : ``} ${w?.description ? `<div class="text svelte-1u14n2i">${each(w.description, (d) => {
      return `${escape(d)}`;
    })} </div>` : ``} </div>`;
  })} </div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.svelte-pm3jpf{height:1000px;width:100%;perspective:1500px}.cube.svelte-pm3jpf{margin-top:150px;position:relative;margin-inline:auto auto;width:700px;height:700px;transform-style:preserve-3d}.side.svelte-pm3jpf{width:700px;height:700px;background-color:white;position:absolute;font-size:2rem}.front.svelte-pm3jpf{transform:translateZ(350px)}.back.svelte-pm3jpf{transform:translateZ(-350px) rotateY(180deg)}.left.svelte-pm3jpf{transform:translateX(-350px) rotateY(-90deg)}.right.svelte-pm3jpf{transform:translateX(350px) rotateY(90deg)}.top.svelte-pm3jpf{transform:translateY(-350px) rotateX(90deg)}.bottom.svelte-pm3jpf{transform:translateY(350px) rotateX(-90deg)}.introduction.svelte-pm3jpf{display:flex;flex-direction:column;margin-top:20px;row-gap:20px}.my-big-head.svelte-pm3jpf{width:300px;position:absolute;top:20px;right:20px;float:right}.glass.svelte-pm3jpf{position:absolute;width:160px;right:110px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $rotation, $$unsubscribe_rotation;
  let $glass, $$unsubscribe_glass;
  const education = [
    {
      title: "University of Pécs Faculty of Engineering and Information Technology",
      date: "September 2016 – 2017",
      description: "Bachelor's Degree\nField of study: Communication and Media Studies\n\nI was not really interested in media, but I had to figure it out."
    },
    {
      title: "Simonyi Károly High School",
      date: "September 2018 – 2019",
      description: "Software Engineer OKJ\nField of study: Programming and software development\n\nBasic programming knowledge. Simultaneously, I worked on projects with Angular and in Android Studio to learn them, as all the details are in the documentation."
    },
    {
      title: "Selftaught",
      date: "September 2018 – Now",
      description: "I started my web developer journey with picking angular as a popular javascript framework since then i checked and picked up many new technologies"
    }
  ];
  const workExperience = [
    {
      title: "Self-employed",
      date: "2020 May – 2020 Dec",
      description: [
        "Worked with a lot of clients on many different problems.",
        "Full-stack development with Angular, Node.js",
        "Mobile development with Ionic and NativeScript."
      ]
    },
    {
      title: "Junior front-end developer at Devoralime (HU)",
      date: "2020 Dec – 2021 July",
      description: [
        "Had to build Angular web applications from a design plan.",
        "Worked with Node.js to create endpoints for my work.",
        "Had daily standups."
      ]
    },
    {
      title: "Medior front-end (Ionic 4) developer",
      date: "2021 Dec – 2022 – Feb",
      description: [
        "I worked as an entrepreneur with a small dev team",
        "Solving creative problems, had to build a lot of custom components.",
        "Building views from a specific design plan.",
        "Integrating data from APIs.",
        "Solving cross-platform problems (Android, iOS)."
      ]
    },
    {
      title: "Medior front-end angular developer at Trendency",
      date: "2022 Feb – 2023 – Sept",
      description: [
        "I worked with a lot of people in a relatively big company.",
        "I have developed CMS systems and mostly news portals.",
        "Worked on also many projects simultaneously.",
        "Also filled a support role where I had to work on live projects."
      ]
    }
  ];
  const contact = [
    {
      title: "Email",
      date: "kristof.krasznai95@gmail.com",
      description: "Or just use the email form at the last page"
    },
    {
      title: "Linkedin",
      link: "https://www.linkedin.com/in/krist%C3%B3f-krasznai-07ab49167/"
    },
    {
      title: "Github to this project",
      link: "https://github.com/tisamo/svelte-cv",
      description: "(My github includes lot of projects many of them are old as dirt and/or made for learning or interviews)"
    }
  ];
  const rotation = tweened({ x: 0, y: 0 }, { duration: 1e3, easing: cubicOut });
  $$unsubscribe_rotation = subscribe(rotation, (value) => $rotation = value);
  const glass = tweened(0, { duration: 2e3, easing: cubicOut });
  $$unsubscribe_glass = subscribe(glass, (value) => $glass = value);
  $$result.css.add(css);
  $$unsubscribe_rotation();
  $$unsubscribe_glass();
  return `${$$result.head += `<!-- HEAD_svelte-133oiut_START -->${$$result.title = `<title>Kristóf Krasznai CV</title>`, ""}<meta name="description" content="Krasznai Kristóf CV"><!-- HEAD_svelte-133oiut_END -->`, ""} <div class="container svelte-pm3jpf"><div class="cube svelte-pm3jpf" style="${"transform: rotateY(" + escape($rotation.y, true) + "deg) rotateX(" + escape($rotation.x, true) + "deg);"}"><div class="side top svelte-pm3jpf"><div class="side-container side-container--150"><h1 data-svelte-h="svelte-1r6ig88">Experience</h1> ${validate_component(Experience, "Experience").$$render($$result, { workplaces: workExperience }, {}, {})}</div></div> <div class="side bottom svelte-pm3jpf" data-svelte-h="svelte-1k8qm7g"><div class="side-container side-container--150"><h1>About me</h1> <h2>Hello I&#39;m Kristóf,</h2> <div class="introduction svelte-pm3jpf"><p>Over the last 3-4 years, I&#39;ve worked as a software developer, primarily using Angular and Ionic.</p> <p>I&#39;m currently enthusiastic about learning new technologies, having recently picked up Svelte and Flutter.</p> <p>I&#39;m also familiar with backend development using Node.js and C#.</p> <p>I&#39;m a quick learner, and I&#39;ve noticed many similarities among these technologies.</p></div></div></div> <div class="side left svelte-pm3jpf"><div class="side-container"><h1 data-svelte-h="svelte-v2wv6o">Education</h1> ${validate_component(Experience, "Experience").$$render($$result, { workplaces: education }, {}, {})}</div></div> <div class="side right svelte-pm3jpf"><div class="side-container"><h1 data-svelte-h="svelte-sul845">Contact Infos</h1> ${validate_component(Experience, "Experience").$$render($$result, { workplaces: contact }, {}, {})}</div></div> <div class="side front svelte-pm3jpf"><div class="side-container "><h1 data-svelte-h="svelte-1nngukd">Kristóf Krasznai</h1> <h2 data-svelte-h="svelte-a3jo9c">Software Engineer</h2> <h6 data-svelte-h="svelte-189nbty">(please use the mousewheel for paging)</h6> <img alt="myhead" class="my-big-head svelte-pm3jpf"${add_attribute("src", Icon, 0)}> <img alt="glass" class="glass svelte-pm3jpf"${add_attribute("src", Glass, 0)} style="${"top: " + escape($glass, true) + "px"}"></div></div> <div class="side back svelte-pm3jpf"><div class="side-container side-container--150"><h1 data-svelte-h="svelte-tbczl2">Contact</h1> ${validate_component(ContactFrom, "ContactFrom").$$render($$result, {}, {}, {})}</div></div></div> </div>`;
});
export {
  Page as default
};
