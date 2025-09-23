---
migrated: 2025-09-20T01:58:06.308478
source: apple-notes-exporter
original_path: Backup/iCloud/Notes/Trading strategy.md
vault_folder: Inbox/to-review
---
# Trading strategy

Prompt

You are a professional PineScript version=6 developer.
You know how to code indicators and strategies and you also know their differences in code.
I need your help to turn a TradingView indicator into a strategy please.

Go Long when….
Close Long when…

**Respect these instructions:**

- Convert all Indicator specific code to Strategy specific code. Don't use any code that a TradingView Strategy won't support. Especially timeframes and gaps. Define those in code so they are semantically the same as before.

- Preserve the timeframe logic if there is one. Fill gaps.

- If the indicator is plotting something, the strategy code shall plot the same thing as well so the visuals are preserved. Set plot offsets to 0.

- Don't trigger a short. Simply go Long and Flat.

- Use this strategy code line. It contains all default parameters you need: strategy("NAME", overlay=true, calc_on_every_tick=false, initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1, slippage=3, pyramiding=1, margin_long=0, margin_short=0, fill_orders_on_standard_ohlc=true)

- strategy.commission.percent and strategy.slippage don't exist in PineScript. Please avoid this mistake. Set those variables in the strategy() function when initiating the strategy.

- Never make line breaks when calling functions, in IFs, Loops or when defining Variables. It would cause syntax errors. Of course you do need to make line breaks when defining new functions. Search the web for the PineScript documentation to be sure how it’s done.

- Leave all other strategy settings to default values (aka. don't set them at all).

- Never use lookahead_on because that’s cheating. 

- Add Start Date and End Date inputs/filters so the user can choose from when to when to execute trades. Start with 1st January 2018 and go to 31st December 2069.

- When setting the title of the strategy, add "AI - " at the start of the name and then continue with the name of the strategy.

**This is the code of the Indicator you shall migrate to a TradingView Strategy:**

—————

//**@version=**6
strategy("AI - Triple MA Swing Trading Strategy", overlay=true, calc_on_every_tick=false, initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1, slippage=3, pyramiding=1, margin_long=0, margin_short=0, fill_orders_on_standard_ohlc=true)

// Date Range Inputs
startDate = input.time(timestamp("2018-01-01"), title="Start Date")
endDate = input.time(timestamp("2069-12-31"), title="End Date")

// Moving Average Inputs
ma5_length = input.int(5, title="Fast MA Length", minval=1)
ma20_length = input.int(20, title="Medium MA Length", minval=1)
ma200_length = input.int(200, title="Slow MA Length", minval=1)
ma_source = input.source(close, title="MA Source")

// Additional Filter Inputs
min_bars_between_trades = input.int(25, title="Minimum Bars Between Trades", minval=1, tooltip="Helps achieve ~1 trade per week on daily chart")
momentum_threshold = input.float(0.5, title="Momentum Threshold %", minval=0.1, step=0.1, tooltip="Minimum % above MA20 for entry")
exit_momentum_threshold = input.float(-0.2, title="Exit Momentum Threshold %", maxval=0, step=0.1, tooltip="Exit when price falls below MA20 by this %")
enable_alerts = input.bool(true, title="Enable Alerts", group="Alert Settings")
alert_on_entries = input.bool(true, title="Alert on Entries", group="Alert Settings")
alert_on_exits = input.bool(true, title="Alert on Exits", group="Alert Settings")

// Calculate Moving Averages
ma5 = ta.sma(ma_source, ma5_length)
ma20 = ta.sma(ma_source, ma20_length)
ma200 = ta.sma(ma_source, ma200_length)

// Plot Moving Averages
plot(ma5, color=color.new(color.blue, 0), linewidth=2, title="MA 5", offset=0)
plot(ma20, color=color.new(color.orange, 0), linewidth=2, title="MA 20", offset=0)
plot(ma200, color=color.new(color.red, 0), linewidth=3, title="MA 200", offset=0)

// Track bars since last trade using v6 improved tracking
var **int** bars_since_trade = 0
if strategy.position_size != 0
    bars_since_trade := 0
else
    bars_since_trade += 1

// Long Entry Conditions with v6 boolean evaluation
// 1. Price above all three MAs
// 2. MA5 > MA20 > MA200 (proper alignment)
// 3. Price at least X% above MA20 (momentum filter)
// 4. Minimum bars since last trade
price_above_all_mas = close > ma5 and close > ma20 and close > ma200
ma_alignment = ma5 > ma20 and ma20 > ma200
momentum_filter = close > ma20 * (1 + momentum_threshold / 100)
trade_spacing_filter = bars_since_trade >= min_bars_between_trades

// Use v6's lazy evaluation for better performance
long_condition = price_above_all_mas and ma_alignment and momentum_filter and trade_spacing_filter

// Long Exit Conditions with v6 boolean handling
// 1. Price falls below MA20 by threshold
// 2. Or MA5 crosses below MA20 (trend reversal)
price_below_ma20_threshold = close < ma20 * (1 + exit_momentum_threshold / 100)
ma5_cross_below_ma20 = ta.crossunder(ma5, ma20)

// Use v6's lazy evaluation
exit_condition = price_below_ma20_threshold or ma5_cross_below_ma20

// Date Filter
in_date_range = time >= startDate and time <= endDate

// Execute Strategy with v6 improvements
if long_condition and in_date_range and strategy.position_size == 0
    strategy.entry("Long", strategy.long, alert_message="Triple MA Long Entry\nPrice: " + str.tostring(close, "#.##") + "\nMA5: " + str.tostring(ma5, "#.##") + "\nMA20: " + str.tostring(ma20, "#.##") + "\nMA200: " + str.tostring(ma200, "#.##"))
    bars_since_trade := 0
    if enable_alerts and alert_on_entries
        alert("Long Entry Signal: Price crossed above all MAs with momentum", alert.freq_once_per_bar_close)

if exit_condition and strategy.position_size > 0
    exit_reason = price_below_ma20_threshold ? "Momentum Loss" : "MA Crossunder"
    strategy.close("Long", alert_message="Triple MA Exit - " + exit_reason + "\nPrice: " + str.tostring(close, "#.##"))
    if enable_alerts and alert_on_exits
        alert("Exit Signal: " + exit_reason, alert.freq_once_per_bar_close)

// Visual Signals
plotshape(long_condition and strategy.position_size == 0 and in_date_range, title="Long Signal", location=location.belowbar, color=color.new(color.green, 0), style=shape.triangleup, size=size.small, offset=0)
plotshape(exit_condition and strategy.position_size > 0, title="Exit Signal", location=location.abovebar, color=color.new(color.red, 0), style=shape.triangledown, size=size.small, offset=0)

// Background Color for Position
bgcolor(strategy.position_size > 0 ? color.new(color.green, 90) : na, offset=0)

// Information Table with v6 text formatting improvements
var **table** infoTable = table.new(position.top_right, 2, 6, bgcolor=color.new(color.black, 85), border_color=color.gray, border_width=1)

if barstate.islast
    table.cell(infoTable, 0, 0, "Status", text_color=color.white, text_size=size.small)
    table.cell(infoTable, 1, 0, strategy.position_size > 0 ? "LONG" : "FLAT", text_color=strategy.position_size > 0 ? color.green : color.gray, text_size=size.small)
    
    table.cell(infoTable, 0, 1, "MA Alignment", text_color=color.white, text_size=size.small)
    table.cell(infoTable, 1, 1, ma_alignment ? "✓" : "✗", text_color=ma_alignment ? color.green : color.red, text_size=size.small)
    
    table.cell(infoTable, 0, 2, "Momentum", text_color=color.white, text_size=size.small)
    momentum_pct = (close - ma20) / ma20 * 100
    table.cell(infoTable, 1, 2, str.tostring(momentum_pct, "#.##") + "%", text_color=momentum_filter ? color.green : color.red, text_size=size.small)
    
    table.cell(infoTable, 0, 3, "Bars Since Trade", text_color=color.white, text_size=size.small)
    table.cell(infoTable, 1, 3, str.tostring(bars_since_trade), text_color=color.white, text_size=size.small)
    
    table.cell(infoTable, 0, 4, "Can Trade", text_color=color.white, text_size=size.small)
    table.cell(infoTable, 1, 4, trade_spacing_filter ? "✓" : "✗", text_color=trade_spacing_filter ? color.green : color.red, text_size=size.small)
    
    table.cell(infoTable, 0, 5, "Next Trade In", text_color=color.white, text_size=size.small)
    bars_until_trade = math.max(0, min_bars_between_trades - bars_since_trade)
    table.cell(infoTable, 1, 5, str.tostring(bars_until_trade) + " bars", text_color=color.white, text_size=size.small)

// Performance Metrics (v6 feature - better strategy management)
if barstate.islastconfirmedhistory or barstate.isrealtime
    label.new(bar_index, high * 1.02, "Win Rate: " + str.tostring(strategy.wintrades / strategy.closedtrades * 100, "#.#") + "%", style=label.style_label_down, color=color.new(color.blue, 80), textcolor=color.white, size=size.small)
