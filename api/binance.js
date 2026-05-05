export default async function handler(req, res) {
  // 支持的交易所
  const map = {
    binance: "api.binance.com",
    okx: "www.okx.com",
    bybit: "api.bybit.com",
    kucoin: "api.kucoin.com",
    mexc: "api.mexc.com",
    bitget: "api.bitget.com",
    htx: "api.huobi.pro"
  };

  const host = map[req.query.exchange || "binance"];
  if (!host) return res.status(400).json({ error: "不支持的交易所" });

  try {
    // 转发请求
    const response = await fetch(`https://${host}${req.query.path || ""}`, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    // 跨域核心
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ error: "代理请求失败", message: e.message });
  }
}
