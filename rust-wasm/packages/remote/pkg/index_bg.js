import * as wasm from './index_bg.wasm';

const lTextDecoder =
  typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  if (typeof heap_next !== 'number') throw new Error('corrupt heap');

  heap[idx] = obj;
  return idx;
}

function getObject(idx) {
  return heap[idx];
}

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

function _assertNum(n) {
  if (typeof n !== 'number') throw new Error('expected a number argument');
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}

function logError(f) {
  return function () {
    try {
      return f.apply(this, arguments);
    } catch (e) {
      let error = (function () {
        try {
          return e instanceof Error ? `${e.message}\n\nStack:\n${e.stack}` : e.toString();
        } catch (_) {
          return '<failed to stringify thrown value>';
        }
      })();
      console.error(
        'wasm-bindgen: imported JS function that was not marked as `catch` threw an error:',
        error,
      );
      throw e;
    }
  };
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder =
  typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString =
  typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
      }
    : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
          read: arg.length,
          written: buf.length,
        };
      };

function passStringToWasm0(arg, malloc, realloc) {
  if (typeof arg !== 'string') throw new Error('expected a string argument');

  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);
    getUint8Memory0()
      .subarray(ptr, ptr + buf.length)
      .set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7f) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, (len = offset + arg.length * 3));
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    if (ret.read !== arg.length) throw new Error('failed to pass whole string');
    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}
/**
 * @param {string} string
 */
export function greet(string) {
  var ptr0 = passStringToWasm0(string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.greet(ptr0, len0);
}

/**
 */
export function main_js() {
  wasm.main_js();
}

/**
 */
export const Cell = Object.freeze({ Dead: 0, 0: 'Dead', Alive: 1, 1: 'Alive' });
/**
 */
export class Universe {
  constructor() {
    throw new Error('cannot invoke `new` directly');
  }

  static __wrap(ptr) {
    const obj = Object.create(Universe.prototype);
    obj.ptr = ptr;

    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;

    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_universe_free(ptr);
  }
  /**
   * @returns {Universe}
   */
  static new() {
    var ret = wasm.universe_new();
    return Universe.__wrap(ret);
  }
  /**
   */
  tick() {
    if (this.ptr == 0) throw new Error('Attempt to use a moved value');
    _assertNum(this.ptr);
    wasm.universe_tick(this.ptr);
  }
  /**
   */
  reset() {
    if (this.ptr == 0) throw new Error('Attempt to use a moved value');
    _assertNum(this.ptr);
    wasm.universe_reset(this.ptr);
  }
  /**
   * @returns {string}
   */
  render() {
    try {
      if (this.ptr == 0) throw new Error('Attempt to use a moved value');
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertNum(this.ptr);
      wasm.universe_render(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  }
}

export const __wbg_alert_4914cfe43bafd4ba = logError(function (arg0, arg1) {
  alert(getStringFromWasm0(arg0, arg1));
});

export const __wbindgen_string_new = function (arg0, arg1) {
  var ret = getStringFromWasm0(arg0, arg1);
  return addHeapObject(ret);
};

export const __wbg_error_4bb6c2a97407129a = logError(function (arg0, arg1) {
  try {
    console.error(getStringFromWasm0(arg0, arg1));
  } finally {
    wasm.__wbindgen_free(arg0, arg1);
  }
});

export const __wbg_new_59cb74e423758ede = logError(function () {
  var ret = new Error();
  return addHeapObject(ret);
});

export const __wbg_stack_558ba5917b466edd = logError(function (arg0, arg1) {
  var ret = getObject(arg1).stack;
  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
});

export const __wbindgen_object_drop_ref = function (arg0) {
  takeObject(arg0);
};

export const __wbg_log_386a8115a84a780d = logError(function (arg0) {
  console.log(getObject(arg0));
});

export const __wbindgen_throw = function (arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
};

export const __wbindgen_rethrow = function (arg0) {
  throw takeObject(arg0);
};
