javascript
export default async function handler(req,res){
  const ex={binance:'api.binance.com',okx:'www.okx.com',bybit:'api.bybit.com',kucoin:'api.kucoin.com',mexc:'api.mexc.com',bitget:'api.bitget.com',htx:'api.huobi.pro'}[req.query.exchange||'binance'];
  if(!ex)return res.status(400).json({error:'unsupported'});
  try{const r=await fetch('https://'+ex+(req.query.path||''));res.setHeader('Access-Control-Allow-Origin','*');res.status(r.status).
json(await r.json())}
  catch(e){res.status(502).json({error:e.message})}
}
