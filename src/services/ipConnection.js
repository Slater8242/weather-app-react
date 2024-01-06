export default function ipConnection  () {
  const request = fetch("https://ipinfo.io/json?token=e000eea0006ac7")
    .then((ip) => ip.json())
    .then((cityIp) => cityIp);
  return request;
};
