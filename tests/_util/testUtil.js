import { jest } from "@jest/globals";
import { Readable, Writable } from "stream";
import { handler } from "../../server/routes";

export default class TestUtil {
  static generateReadableStream(data) {
    return new Readable({
      read() {
        for (const item of data) {
          this.push(item);
        }
        this.push(null);
      },
    });
  }

  static generateWritableStream(onData) {
    return new Writable({
      write(chunk, cnv, cb) {
        onData(chunk);
        cb(null, chunk);
      },
    });
  }

  static defaultHandleParams() {
    const requestStream = TestUtil.generateReadableStream([""]);
    const responseStream = TestUtil.generateWritableStream(() => {});
    const data = {
      request: Object.assign(requestStream, {
        headers: {},
        method: "",
        url: "",
      }),
      response: Object.assign(responseStream, {
        writeHead: jest.fn(),
        end: jest.fn(),
      }),
    };
    handler(...data.values());
    return {
      values: () => Object.values(data),
      ...data,
    };
  }
}
