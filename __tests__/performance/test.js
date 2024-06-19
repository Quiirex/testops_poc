import http from 'k6/http';

export default function () {
  http.get('http://34.117.137.171/app');
}
