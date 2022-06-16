import http from 'k6/http';
import {check, sleep} from 'k6';
import { Counter } from 'k6/metrics';

export const requestCounter = new Counter('http_reqs');

export const options = {
  vus: 100,
  duration: '15s'
}

const randomCount = () =>Math.floor(Math.random() * (100000 - 99900) + 99900);

export default function () {
  const url = `http://localhost:3001/products/${randomCount()}/styles`;
  const res = http.get(url);
  check(res, {
    'is status 200': r => r.status === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });
}