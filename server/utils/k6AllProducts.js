import http from 'k6/http';
import {check, sleep} from 'k6';
import { Counter } from 'k6/metrics';

export const requestCounter = new Counter('http_reqs');

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, // spike to 1400 users
    { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
    { duration: '10s', target: 100 }, // scale down. Recovery stage.
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 },
  ],
};

const randomCount = () => Math.floor(Math.random() * (100000 - 99900) + 99900);
export default function () {
  const url = `http://localhost:3000/products/${randomCount()}/styles`;
  const res = http.get(url);
  sleep(1)
  check(res, {
    'is status 200': r => r.status === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });
}