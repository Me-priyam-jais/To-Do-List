
import http from 'k6/http';
import { check} from 'k6';

const BASE_URL = 'http://localhost:8000';
const TASKS_URL = `${BASE_URL}/task/user/tasks`;

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '3m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const cookieName = __ENV.COOKIE_NAME;
  const cookieValue = __ENV.COOKIE_VALUE;

  if (!cookieName || !cookieValue) {
    throw new Error(
      'Set COOKIE_NAME and COOKIE_VALUE before running the test.'
    );
  }

  const jar = http.cookieJar();
  jar.set(BASE_URL, cookieName, cookieValue);

  const response = http.get(TASKS_URL, {
    tags: { endpoint: 'get-user-tasks' },
    timeout: '10s',
  });

  check(response, {
    'status is 200': (r) => r.status === 200,
  });

}
