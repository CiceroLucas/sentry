import * as ping from 'ping';

export async function verificarLatencia(host: string) {
  const res = await ping.promise.probe(host);
  return {
    host: res.host,
    alive: res.alive,
    time: res.time,
    output: res.output,
  };
}
